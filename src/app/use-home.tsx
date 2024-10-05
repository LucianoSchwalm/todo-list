import {
  deleteTodoItem,
  getAllTodos,
  updateStatusId,
  updateTodoItem,
} from "@/actions/actions";
import { Todo } from "@prisma/client";
import { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";

export const useHome = (
  isEditting: boolean,
  setIsEditting: Dispatch<SetStateAction<boolean>>
) => {
  const [todoItemsState, setTodoItemsState] = useState<Todo[]>();

  const getTodos = async () => {
    const todoItems = await getAllTodos();
    setTodoItemsState(todoItems);
  };

  async function handleTodoCheck(todoItemId: number, checked: boolean) {
    const newTodoItemsState = [...todoItemsState!];
    const todoItem = newTodoItemsState.find(
      (todoItem) => todoItem.id === todoItemId
    );
    todoItem!.statusId = checked ? 2 : 1;
    setTodoItemsState(newTodoItemsState);
    toast.success("Your To do Item Got Updated!");
    await updateStatusId(todoItem!.id, todoItem!.statusId);
  }

  function handleTodoTitle(todoItemId: number, title: string) {
    const newTodoItemsState = [...todoItemsState!];
    const todoItem = newTodoItemsState.find(
      (todoItem) => todoItem.id === todoItemId
    );
    todoItem!.title = title;
    setTodoItemsState(newTodoItemsState);
  }

  function handleTodoContent(todoItemId: number, content: string) {
    const newTodoItemsState = [...todoItemsState!];
    const todoItem = newTodoItemsState.find(
      (todoItem) => todoItem.id === todoItemId
    );
    todoItem!.content = content;
    setTodoItemsState(newTodoItemsState);
  }

  const handleTodoItemUpdate = async (todoItem: Todo) => {
    await updateTodoItem(todoItem);
    setIsEditting(!isEditting);
    toast.success("Your To do Item Got Updated!");
  };

  const handleDeleteButton = async (id: number) => {
    await deleteTodoItem(id);
    await getTodos();
    toast.success("Your To do Item Got Deleted!");
  };

  return {
    todoItemsState,
    getTodos,
    handleTodoCheck,
    handleTodoTitle,
    handleTodoContent,
    handleTodoItemUpdate,
    handleDeleteButton,
  };
};
