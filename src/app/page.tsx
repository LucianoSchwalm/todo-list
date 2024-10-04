"use server";

import EditIcon from "@mui/icons-material/Edit";
import { getAllTodos } from "@/actions/actions";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Todo } from "@/dtos/todo";

export default async function Home() {
  const todosItems = await getAllTodos();

  return (
    <Box className="pt-10 pl-0 lg:pl-10 min-h-screen bg-gray-300">
      <div className="grid grid-cols-1 lg:grid-cols-3 pt-10">
        <Typography
          variant="h3"
          className="text-center col-start-1 lg:col-start-2 pl-0 text-black"
        >
          Todo List!
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
                <Table className="bg-gray-300 text-black text-left">
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell>Title</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Date of Creation</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  {todosItems.map((todoItem: Todo) => (
                    <TableBody key={todoItem.id}>
                      <TableRow>
                        <TableCell>
                          <Checkbox
                            color="primary"
                            className="pt-4"
                            icon={<RadioButtonUncheckedIcon />}
                            checkedIcon={<CheckCircleIcon />}
                            disabled
                            // checked={isItemSelected}
                          />
                        </TableCell>
                        <TableCell>{todoItem.title}</TableCell>
                        <TableCell>{todoItem.content}</TableCell>
                        <TableCell>
                          {todoItem.createdAt.toLocaleDateString()}
                        </TableCell>
                        <TableCell>{todoItem.statusId}</TableCell>
                        <TableCell>
                          <Button type="submit" color="inherit">
                            <EditIcon />
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  ))}
                  {/* <TableRow>
                      <TableCell>
                        <Checkbox
                          color="primary"
                          className="pt-4"
                          icon={<RadioButtonUncheckedIcon />}
                          checkedIcon={<CheckCircleIcon />}
                          // checked={isItemSelected}
                        />
                      </TableCell>
                      <TableCell>Walk in the plaza</TableCell>
                      <TableCell>Im gonna walk in central park in NY</TableCell>
                      <TableCell>09/15/2024</TableCell>
                      <TableCell>Pending</TableCell>
                      <TableCell>
                        <Button type="submit" color="inherit">
                          <EditIcon />
                        </Button>
                      </TableCell>
                    </TableRow> */}
                </Table>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
