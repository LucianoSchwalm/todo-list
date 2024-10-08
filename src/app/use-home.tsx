import {
  deleteTodoItem,
  getAllTodos,
  updateStatusId,
  updateTodoItem,
} from "@/actions/actions";
import { TodoState } from "@/dtos/todoState";
import { useState } from "react";
import toast from "react-hot-toast";

export const useHome = () => {
  const [todoItemsState, setTodoItemsState] = useState<TodoState[]>();

  const getTodos = async (filter?: number) => {
    let todoItems;
    if (filter) todoItems = await getAllTodos(filter);
    else todoItems = await getAllTodos();
    const newTodoItemsState = todoItems.map((todoItem) => {
      return { ...todoItem, isEditting: false };
    });
    console.log(newTodoItemsState);
    setTodoItemsState(newTodoItemsState);
  };

  async function handleTodoCheck(todoItemId: number, checked: boolean) {
    const newTodoItemsState = [...todoItemsState!];
    const todoItem = newTodoItemsState.find(
      (todoItem) => todoItem.id === todoItemId
    );
    todoItem!.statusId = checked ? 2 : 1;
    setTodoItemsState(newTodoItemsState);
    toast.success("Your Task Got Updated!");
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

  function handleIsEditting(todoItemId: number, isEditting: boolean) {
    const newTodoItemsState = [...todoItemsState!];
    const todoItem = newTodoItemsState.find(
      (todoItem) => todoItem.id === todoItemId
    );
    todoItem!.isEditting = isEditting;
    setTodoItemsState(newTodoItemsState);
  }

  const handleTodoItemUpdate = async (todoItem: TodoState) => {
    await updateTodoItem(todoItem);
    handleIsEditting(todoItem.id, !todoItem.isEditting);
    toast.success("Your Task Got Updated!");
  };

  const handleDeleteButton = async (id: number) => {
    await deleteTodoItem(id);
    await getTodos();
    toast.success("Your Task Got Deleted!");
  };

  return {
    todoItemsState,
    getTodos,
    handleTodoCheck,
    handleTodoTitle,
    handleTodoContent,
    handleTodoItemUpdate,
    handleDeleteButton,
    handleIsEditting,
  };
};
