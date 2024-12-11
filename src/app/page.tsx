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
  Pagination,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Status } from "@/dtos/status";
import { useHome } from "./use-home";
import { TodoState } from "@/dtos/todoState";
import { ChangeEvent, useState } from "react";

const useStyles = makeStyles({
  tableRow: {
    height: 100,
  },
  tableRowMobile: {
    height: "200px",
  },
  tableCell: {
    fontSize: "15px",
  },
  tableCellMedium: {
    fontSize: "12px",
    padding: "0px 5px",
  },
  tableCellMobile: {
    fontSize: "9px",
    padding: "0px 5px",
  },
  tableHeadRow: {
    fontWeight: 700,
    fontSize: "15px",
  },
  tableHeadRowMedium: {
    fontWeight: 700,
    fontSize: "12px",
    padding: "0px 5px",
  },
  tableHeadRowMobile: {
    fontWeight: 700,
    padding: "0px 5px",
    fontSize: "9px",
  },
});

export default function Home() {
  const isMedium = useMediaQuery("(max-width:1300px)");
  const isMobile = useMediaQuery("(max-width:600px)");
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const {
    data,
    filter,
    pageTotal,
    handleFilterMutation,
    handleTodoCheckMutation,
    handleTodoContentMutation,
    handleTodoTitleMutation,
    handleDeleteButtonMutation,
    handleIsEdittingMutation,
    updateTodoItemMutation,
  } = useHome(page);

  const handlePagination = (ev: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Box className="pt-10 pl-0 lg:pl-10 min-h-screen bg-gray-300">
      <div className="grid grid-cols-1 lg:grid-cols-3 pt-10">
        <div className="text-center col-start-1 lg:col-start-2 pb-10 lg:pb-0 text-black">
          <Typography variant="h3" className="text-base lg:text-2xl">
            Welcome Back!
          </Typography>
          <Typography variant="h6" className="pt-2 text-xs lg:text-xl">
            Here are your tasks
          </Typography>
          <Box className="flex flex-row justify-center pt-5">
            <InputLabel
              htmlFor="filter"
              className="text-sm lg:text-xl block leading-6 font-bold pt-5"
            >
              Filter By:
            </InputLabel>
            <div className="px-2 lg:px-5">
              <Select
                id="filter"
                value={filter}
                className="text-sm lg:text-xl lg:px-5"
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
              className="text-xs md:text-base lg:text-base bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-1 px-2 lg:py-2 lg:px-4 border border-indigo-500 hover:border-transparent rounded"
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
        <Box className="w-full lg:w-full flex justify-center">
          <Box className="w-full lg:w-full">
            <Box className="mt-10 grid grid-cols-1 sm:grid-cols-6">
              <Box className="sm:col-span-6">
                <Table
                  className="bg-gray-300 text-black text-left sm:col-span-6"
                  size={isMobile ? "small" : "medium"}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell
                        className={
                          isMobile
                            ? classes.tableHeadRowMobile
                            : isMedium
                            ? classes.tableHeadRowMedium
                            : classes.tableHeadRow
                        }
                      >
                        Title
                      </TableCell>
                      <TableCell
                        className={
                          isMobile
                            ? classes.tableHeadRowMobile
                            : isMedium
                            ? classes.tableHeadRowMedium
                            : classes.tableHeadRow
                        }
                      >
                        Description
                      </TableCell>
                      <TableCell
                        className={
                          isMobile
                            ? classes.tableHeadRowMobile
                            : isMedium
                            ? classes.tableHeadRowMedium
                            : classes.tableHeadRow
                        }
                      >
                        Date of Creation
                      </TableCell>
                      {!isMobile && !isMedium && (
                        <TableCell
                          className={
                            isMobile
                              ? classes.tableHeadRowMobile
                              : isMedium
                              ? classes.tableHeadRowMedium
                              : classes.tableHeadRow
                          }
                        >
                          Status
                        </TableCell>
                      )}
                    </TableRow>
                  </TableHead>
                  {data?.map((todoItem: TodoState) => (
                    <TableBody key={todoItem.id}>
                      <TableRow
                        className={
                          isMobile ? classes.tableRowMobile : classes.tableRow
                        }
                      >
                        <TableCell
                          className={
                            isMobile
                              ? classes.tableCellMobile
                              : isMedium
                              ? classes.tableCellMedium
                              : classes.tableCell
                          }
                          width="10%"
                        >
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
                        <TableCell
                          className={
                            isMobile
                              ? classes.tableCellMobile
                              : isMedium
                              ? classes.tableCellMedium
                              : classes.tableCell
                          }
                          width="20%"
                        >
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
                              className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                            />
                          ) : (
                            <>{todoItem.title}</>
                          )}
                        </TableCell>
                        <TableCell
                          className={
                            isMobile
                              ? classes.tableCellMobile
                              : isMedium
                              ? classes.tableCellMedium
                              : classes.tableCell
                          }
                          width="35%"
                        >
                          {todoItem.isEditting ? (
                            <TextField
                              id="content"
                              name="content"
                              fullWidth
                              multiline
                              minRows={isMobile ? 6 : 2}
                              variant="standard"
                              value={todoItem.content ?? ""}
                              onChange={(ev) =>
                                handleTodoContentMutation.mutate({
                                  todoItemId: todoItem.id,
                                  content: ev.target.value,
                                })
                              }
                            />
                          ) : (
                            <>{todoItem.content}</>
                          )}
                        </TableCell>
                        <TableCell
                          className={
                            isMobile
                              ? classes.tableCellMobile
                              : isMedium
                              ? classes.tableCellMedium
                              : classes.tableCell
                          }
                          width="10%"
                        >
                          <Box>{todoItem.createdAt.toLocaleDateString()}</Box>
                        </TableCell>
                        {!isMobile && !isMedium && (
                          <TableCell
                            className={
                              isMobile
                                ? classes.tableCellMobile
                                : isMedium
                                ? classes.tableCellMedium
                                : classes.tableCell
                            }
                          >
                            <Box
                              className={
                                todoItem.statusId == Status.PENDING
                                  ? "text-yellow-600"
                                  : "text-green-600"
                              }
                            >
                              {todoItem.statusId == Status.PENDING
                                ? "Pending"
                                : "Complete"}
                            </Box>
                          </TableCell>
                        )}
                        <TableCell
                          className={
                            isMobile
                              ? classes.tableCellMobile
                              : isMedium
                              ? classes.tableCellMedium
                              : classes.tableCell
                          }
                          width={isMobile ? "10%" : "20%"}
                        >
                          <Box>
                            {!todoItem.isEditting ? (
                              <Button
                                key={`edit${todoItem.id}`}
                                color="inherit"
                                onClick={() =>
                                  handleIsEdittingMutation.mutate({
                                    todoItemId: todoItem.id,
                                    isEditting: !todoItem.isEditting,
                                  })
                                }
                              >
                                <EditIcon fontSize="small" />
                              </Button>
                            ) : (
                              <>
                                <Button
                                  key={todoItem.id}
                                  color="success"
                                  onClick={() =>
                                    updateTodoItemMutation.mutate(todoItem)
                                  }
                                >
                                  <CheckCircleIcon fontSize="small" />
                                </Button>
                                <Button
                                  key={`cancel${todoItem.id}`}
                                  color="error"
                                  onClick={() =>
                                    handleIsEdittingMutation.mutate({
                                      todoItemId: todoItem.id,
                                      isEditting: !todoItem?.isEditting,
                                    })
                                  }
                                >
                                  <CancelIcon fontSize="small" />
                                </Button>
                              </>
                            )}
                          </Box>
                        </TableCell>
                        <TableCell
                          className={
                            isMobile
                              ? classes.tableCellMobile
                              : isMedium
                              ? classes.tableCellMedium
                              : classes.tableCell
                          }
                          width={isMobile ? "5%" : "10%"}
                        >
                          <Button
                            onClick={() =>
                              handleDeleteButtonMutation.mutate(todoItem.id)
                            }
                          >
                            <DeleteIcon color="action" fontSize="small" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  ))}
                </Table>
                <Pagination
                  count={pageTotal}
                  className="flex justify-center py-5"
                  onChange={(ev, page) => handlePagination(ev, page)}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
