"use server";

import db from "@/lib/db";

export async function getAllTodos() {
  await db.todo.findMany();
}
