"use server";

import { Todo } from "@/dtos/todo";
import db from "@/lib/db";

export async function getAllTodos(): Promise<Todo[]> {
  const todos = await db.todo.findMany();
  return todos.map((todo) => {
    return {
      id: todo.id,
      title: todo.title,
      content: todo.content,
      createdAt: todo.createdAt,
      statusId: todo.statusId,
      updatedAt: todo.updatedAt,
    };
  });
}

export async function createTodoItem(formData: FormData) {
  await db.todo.create({
    data: {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      statusId: 1,
    },
  });
}
