import {
  deleteTodoItem,
  getAllTodos,
  getATodoItem,
  getTodosItemsWithPagination,
  updateStatusId,
  updateTodoItem,
} from "@/actions/actions";
import { TodoState } from "@/dtos/todoState";
import {
  Updater,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

export const useHome = (page: number) => {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState("0");
  const [pageTotal, setPageTotal] = useState(0);

  const pageSize = 10;

  const { data } = useQuery<TodoState[]>({
    queryKey: ["todos", filter, page],
    queryFn: () => getTodos(page, pageSize, Number.parseInt(filter)),
  });

  const updateTodoItemMutation = useMutation({
    mutationFn: async (todoItem: TodoState) => {
      await updateTodoItem(todoItem);
      handleIsEdittingMutation.mutate({
        todoItemId: todoItem.id,
        isEditting: !todoItem.isEditting,
      });
      toast.success("Your Task Has Been Updated!");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleTodoCheckMutation = useMutation({
    mutationFn: async ({
      todoItemId,
      checked,
    }: {
      todoItemId: number;
      checked: boolean;
    }) => {
      await updateStatusId(todoItemId, checked ? 2 : 1);
      toast.success("Your Task Has Been Updated!");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleTodoTitleMutation = useMutation({
    mutationFn: async ({
      todoItemId,
      title,
    }: {
      todoItemId: number;
      title: string;
    }) => {
      const newTodoItems = [...data!];
      const todoItem = newTodoItems.find(
        (todoItem) => todoItem.id === todoItemId
      );
      todoItem!.title = title;
      queryClient.setQueryData(newTodoItems, data);
    },
  });

  const handleTodoContentMutation = useMutation({
    mutationFn: async ({
      todoItemId,
      content,
    }: {
      todoItemId: number;
      content: string;
    }) => {
      const newTodoItems = [...data!];
      const todoItem = newTodoItems.find(
        (todoItem) => todoItem.id === todoItemId
      );
      todoItem!.content = content;
      queryClient.setQueryData(newTodoItems, data);
    },
  });

  const handleIsEdittingMutation = useMutation({
    mutationFn: async ({
      todoItemId,
      isEditting,
    }: {
      todoItemId: number;
      isEditting: boolean;
    }) => {
      const newTodoItems = [...data!];
      const todoItem = newTodoItems.find(
        (todoItem) => todoItem.id === todoItemId
      );
      todoItem!.isEditting = isEditting;
      if (isEditting) queryClient.setQueryData(newTodoItems, data);
      if (!isEditting) {
        getTodo(todoItemId);
      }
    },
  });

  const handleDeleteButtonMutation = useMutation({
    mutationFn: async (id: number) => {
      await deleteTodoItem(id);
      toast.success("Your Task Has Been Deleted!");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleFilterMutation = useMutation({
    mutationFn: async (filter: number) => {
      setFilter(filter.toString());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const getTodo = async (todoId: number) => {
    const todo = await getATodoItem(todoId);
    queryClient.setQueryData(["todos", filter, page], () => {
      const newTodoItems = [...data!];
      const newTodo = newTodoItems?.find(
        (todoItem) => todoItem.id === todo!.id
      );
      newTodo!.content = todo!.content;
      newTodo!.title = todo!.title;
      newTodo!.statusId = todo!.statusId;
    });
    console.log(data);
  };

  const getTodos = async (
    page: number,
    pageSize: number,
    filter: number
  ): Promise<TodoState[]> => {
    const { todos, pageTotal } = await getTodosItemsWithPagination(
      page,
      pageSize,
      filter
    );
    const newTodoItems: TodoState[] = todos.map((todoItem) => {
      return { ...todoItem, isEditting: false };
    });
    setPageTotal(pageTotal);
    return newTodoItems;
  };

  return {
    data,
    filter,
    pageTotal,
    handleFilterMutation,
    handleTodoCheckMutation,
    handleTodoTitleMutation,
    handleTodoContentMutation,
    updateTodoItemMutation,
    handleDeleteButtonMutation,
    handleIsEdittingMutation,
  };
};
