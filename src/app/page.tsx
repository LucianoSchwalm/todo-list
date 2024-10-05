"use client";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Input,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Todo } from "@/dtos/todo";
import { useEffect, useState } from "react";
import { Status } from "@/dtos/status";
import { useHome } from "./use-home";

export default function Home() {
  const [isEditting, setIsEditting] = useState(false);

  const {
    getTodos,
    handleTodoCheck,
    handleTodoContent,
    handleTodoTitle,
    handleTodoItemUpdate,
    handleDeleteButton,
    todoItemsState,
  } = useHome(isEditting, setIsEditting);

  useEffect(() => {
    getTodos();
  }, []);

  useEffect(() => {
    getTodos();
  }, [todoItemsState?.length]);

  return (
    <Box className="pt-10 pl-0 lg:pl-10 min-h-screen bg-gray-300">
      <div className="grid grid-cols-1 lg:grid-cols-3 pt-10">
        <Typography
          variant="h3"
          className="text-center col-start-1 lg:col-start-2 pb-10 lg:pb-0 text-black"
        >
          My To Do List!
        </Typography>
        <Link href={"/create"}>
          <div className="text-center">
            <Button
              variant="outlined"
              className="bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded"
            >
              + Add a new Todo Item
            </Button>
          </div>
        </Link>
      </div>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box className="w-full py-20 flex justify-center pt-10">
          <Box className="w-full lg:w-full">
            <Box className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <Box className="sm:col-span-6">
                <Table className="bg-gray-300 text-black text-left sm:col-span-6">
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell>Title</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Date of Creation</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  {todoItemsState?.map((todoItem: Todo) => (
                    <TableBody key={todoItem.id}>
                      <TableRow>
                        <TableCell>
                          <Checkbox
                            id={`${todoItem.id}`}
                            name={`${todoItem.id}`}
                            className="pt-4"
                            icon={<RadioButtonUncheckedIcon />}
                            checkedIcon={<CheckCircleIcon />}
                            checked={todoItem.statusId == Status.COMPLETE}
                            onChange={(ev) =>
                              handleTodoCheck(todoItem.id, ev.target.checked)
                            }
                          />
                        </TableCell>
                        <TableCell>
                          {isEditting ? (
                            <Input
                              id="title"
                              name="title"
                              type="text"
                              value={todoItem.title ?? ""}
                              onChange={(ev) =>
                                handleTodoTitle(todoItem.id, ev.target.value)
                              }
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          ) : (
                            todoItem.title
                          )}
                        </TableCell>
                        <TableCell>
                          {isEditting ? (
                            <Input
                              id="content"
                              name="content"
                              type="text"
                              value={todoItem.content ?? ""}
                              onChange={(ev) =>
                                handleTodoContent(todoItem.id, ev.target.value)
                              }
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          ) : (
                            todoItem.content
                          )}
                        </TableCell>
                        <TableCell>
                          {todoItem.createdAt.toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {todoItem.statusId == Status.PENDING
                            ? "Pending"
                            : "Complete"}
                        </TableCell>
                        <TableCell>
                          <>
                            <Button
                              key={`edit${todoItem.id}`}
                              color="inherit"
                              onClick={() => setIsEditting(!isEditting)}
                              hidden={isEditting}
                            >
                              <EditIcon />
                            </Button>
                            <Button
                              key={todoItem.id}
                              color="success"
                              onClick={() => handleTodoItemUpdate(todoItem)}
                              hidden={!isEditting}
                            >
                              <CheckCircleIcon />
                            </Button>
                            <Button
                              key={`cancel${todoItem.id}`}
                              color="error"
                              onClick={() => setIsEditting(!isEditting)}
                              hidden={!isEditting}
                            >
                              <CancelIcon />
                            </Button>
                          </>
                        </TableCell>
                        <TableCell>
                          <Button
                            onClick={() => handleDeleteButton(todoItem.id)}
                          >
                            <DeleteIcon color="action" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  ))}
                </Table>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
