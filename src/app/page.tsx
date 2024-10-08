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
  InputLabel,
  Link,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Status } from "@/dtos/status";
import { useHome } from "./use-home";
import { TodoState } from "@/dtos/todoState";

const useStyles = makeStyles({
  tableRow: {
    height: 100,
  },
  tableHeadRow: {
    fontWeight: 700,
  },
});

export default function Home() {
  const classes = useStyles();
  const {
    data,
    filter,
    handleFilterMutation,
    handleTodoCheckMutation,
    handleTodoContentMutation,
    handleTodoTitleMutation,
    handleDeleteButtonMutation,
    handleIsEdittingMutation,
    updateTodoItemMutation,
  } = useHome();

  return (
    <Box className="pt-10 pl-0 lg:pl-10 min-h-screen bg-gray-300">
      <div className="grid grid-cols-1 lg:grid-cols-3 pt-10">
        <div className="text-center col-start-1 lg:col-start-2 pb-10 lg:pb-0 text-black">
          <Typography variant="h3">Welcome Back!</Typography>
          <Typography variant="h6" className="pt-2">
            Here are your tasks
          </Typography>
          <Box className="flex flex-row justify-center pt-5">
            <InputLabel
              htmlFor="filter"
              className="block text-xl font-medium leading-6 text-gray-900 pt-4"
            >
              Filter By:
            </InputLabel>
            <div className="px-5">
              <Select
                id="filter"
                value={filter}
                className="px-5"
                onChange={(ev) =>
                  handleFilterMutation.mutate(Number.parseInt(ev.target.value))
                }
              >
                <MenuItem value={0}>None</MenuItem>
                <MenuItem value={1}>Pending</MenuItem>
                <MenuItem value={2}>Completed</MenuItem>
              </Select>
            </div>
          </Box>
        </div>
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
        <Box className="w-full flex justify-center">
          <Box className="w-full lg:w-full">
            <Box className="mt-10 grid grid-cols-1 sm:grid-cols-6">
              <Box className="sm:col-span-6">
                <Table
                  className="bg-gray-300 text-black text-left sm:col-span-6"
                  cellPadding="1000px"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell className={classes.tableHeadRow}>
                        Title
                      </TableCell>
                      <TableCell className={classes.tableHeadRow}>
                        Description
                      </TableCell>
                      <TableCell className={classes.tableHeadRow}>
                        Date of Creation
                      </TableCell>
                      <TableCell className={classes.tableHeadRow}>
                        Status
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  {data?.map((todoItem: TodoState) => (
                    <TableBody key={todoItem.id}>
                      <TableRow className={classes.tableRow}>
                        <TableCell>
                          <Checkbox
                            id={`${todoItem.id}`}
                            name={`${todoItem.id}`}
                            className="pt-4"
                            icon={<RadioButtonUncheckedIcon />}
                            checkedIcon={<CheckCircleIcon />}
                            checked={todoItem.statusId == Status.COMPLETE}
                            onChange={(ev) =>
                              handleTodoCheckMutation.mutate({
                                todoItemId: todoItem.id,
                                checked: ev.target.checked,
                              })
                            }
                          />
                        </TableCell>
                        <TableCell className="min-w-60 min-h-96">
                          {todoItem.isEditting ? (
                            <Input
                              id="title"
                              name="title"
                              type="text"
                              value={todoItem.title ?? ""}
                              onChange={(ev) =>
                                handleTodoTitleMutation.mutate({
                                  todoItemId: todoItem.id,
                                  title: ev.target.value,
                                })
                              }
                              className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          ) : (
                            <Typography variant="body1">
                              {todoItem.title}
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell className="min-w-96">
                          {todoItem.isEditting ? (
                            <TextField
                              id="content"
                              name="content"
                              fullWidth
                              multiline
                              minRows={2}
                              variant="standard"
                              value={todoItem.content ?? ""}
                              onChange={(ev) =>
                                handleTodoContentMutation.mutate({
                                  todoItemId: todoItem.id,
                                  content: ev.target.value,
                                })
                              }
                              rows={2}
                            />
                          ) : (
                            <Typography variant="body1">
                              {todoItem.content}
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell className="min-w-36">
                          <Typography variant="body1">
                            {todoItem.createdAt.toLocaleDateString()}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="body1"
                            color={
                              todoItem.statusId == Status.PENDING
                                ? "warning"
                                : "success"
                            }
                          >
                            {todoItem.statusId == Status.PENDING
                              ? "Pending"
                              : "Complete"}
                          </Typography>
                        </TableCell>
                        <TableCell className="min-w-40">
                          <>
                            <Button
                              key={`edit${todoItem.id}`}
                              color="inherit"
                              onClick={() =>
                                handleIsEdittingMutation.mutate({
                                  todoItemId: todoItem.id,
                                  isEditting: !todoItem.isEditting,
                                })
                              }
                              hidden={todoItem.isEditting}
                            >
                              <EditIcon />
                            </Button>
                            <Button
                              key={todoItem.id}
                              color="success"
                              onClick={() =>
                                updateTodoItemMutation.mutate(todoItem)
                              }
                              hidden={!todoItem.isEditting}
                            >
                              <CheckCircleIcon />
                            </Button>
                            <Button
                              key={`cancel${todoItem.id}`}
                              color="error"
                              onClick={() =>
                                handleIsEdittingMutation.mutate({
                                  todoItemId: todoItem.id,
                                  isEditting: !todoItem.isEditting,
                                })
                              }
                              hidden={!todoItem.isEditting}
                            >
                              <CancelIcon />
                            </Button>
                          </>
                        </TableCell>
                        <TableCell>
                          <Button
                            onClick={() =>
                              handleDeleteButtonMutation.mutate(todoItem.id)
                            }
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
