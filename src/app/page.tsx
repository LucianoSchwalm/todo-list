"use server";

import { getAllTodos } from "@/actions/actions";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormGroup,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export default async function Home() {
  // const allUsers = await getAllTodos();
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 90,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
    },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  const paginationModel = { page: 0, pageSize: 5 };
  return (
    <Box className="pt-10 pl-0 lg:pl-10 min-h-screen bg-gray-300">
      <div className="grid grid-cols-1 lg:grid-cols-3 pt-10">
        <Typography
          variant="h3"
          className="text-center col-start-1 lg:col-start-2 pl-0 pb-0 lg:pb-10 text-black"
        >
          Todo List!
        </Typography>
        <div className="text-center ">
          <Button
            variant="outlined"
            className="bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded"
          >
            + Add a new Todo Item
          </Button>
        </div>
      </div>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <form className="w-full py-20 flex justify-center pt-10">
          <Box className="w-full lg:w-3/4">
            <Box className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <Box className="sm:col-span-6">
                <Table className="bg-gray-300 text-black text-left">
                  <TableHead>
                    <TableRow>
                      <Checkbox
                        color="primary"
                        className="pt-4"
                        // checked={isItemSelected}
                      />
                      <TableCell>Title</TableCell>
                      <TableCell>Content</TableCell>
                      <TableCell>Date of Creation</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <Checkbox
                        color="primary"
                        className="pt-4"
                        // checked={isItemSelected}
                      />
                      <TableCell>Walk in the plaza</TableCell>
                      <TableCell>Im gonna walk in central park in NY</TableCell>
                      <TableCell>09/15/2024</TableCell>
                      <TableCell>Created</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Box>
          </Box>
        </form>
      </Container>
    </Box>
  );
}
