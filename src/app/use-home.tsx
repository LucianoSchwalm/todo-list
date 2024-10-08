import {
  deleteTodoItem,
  getAllTodos,
  updateStatusId,
  updateTodoItem,
} from "@/actions/actions";
import { TodoState } from "@/dtos/todoState";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

export const useHome = () => {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState("0");

  const { data } = useQuery<TodoState[]>({
    queryKey: ["todos", filter],
    queryFn: () => getTodos(Number.parseInt(filter)),
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
      queryClient.setQueryData(newTodoItems, data);
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

  const getTodos = async (filter: number): Promise<TodoState[]> => {
    console.log(filter);
    const todoItems = await getAllTodos(filter);
    const newTodoItems: TodoState[] = todoItems.map((todoItem) => {
      return { ...todoItem, isEditting: false };
    });
    console.log(newTodoItems);
    return newTodoItems;
  };

  return {
    data,
    filter,
    handleFilterMutation,
    handleTodoCheckMutation,
    handleTodoTitleMutation,
    handleTodoContentMutation,
    updateTodoItemMutation,
    handleDeleteButtonMutation,
    handleIsEdittingMutation,
  };
};
