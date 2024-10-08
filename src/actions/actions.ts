"use server";
import { Todo } from "@/dtos/todo";
import db from "@/lib/db";

export async function getAllTodos(filter?: number): Promise<Todo[]> {
  let todos;
  if (filter) {
    todos = await db.todo.findMany({
      where: {
        statusId: filter,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else {
    todos = await db.todo.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

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

export async function updateTodoItem(todoItem: Todo) {
  await db.todo.update({
    data: {
      title: todoItem.title,
      content: todoItem.content,
      statusId: todoItem.statusId,
    },
    where: {
      id: todoItem.id,
    },
  });
}

export async function updateStatusId(id: number, statusId: number) {
  await db.todo.update({
    data: {
      statusId: statusId,
    },
    where: {
      id: id,
    },
  });
}

export async function deleteTodoItem(id: number) {
  await db.todo.delete({
    where: {
      id: id,
    },
  });
}
