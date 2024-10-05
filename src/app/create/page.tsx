"use client";
import { createTodoItem } from "@/actions/actions";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  Button,
  Container,
  FormGroup,
  Input,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function createTodoItemForm() {
  const router = useRouter();

  const handleOnSubmit = () => {
    toast.success("To do item has been created!");
    router.push("/");
  };

  return (
    <Box className="pt-10 pl-0 lg:pl-10 min-h-screen bg-gray-300">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <button
          type="button"
          className="text-left text-black px-5"
          onClick={() => router.back()}
        >
          <ArrowBackIcon />
        </button>
        <Typography
          variant="h3"
          className="text-center pl-0 pb-0 lg:pb-10 pt-10 text-black"
        >
          My To Do List!
        </Typography>
      </div>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <form
          action={createTodoItem}
          onSubmit={handleOnSubmit}
          className="w-full lg:w-1/2 py-20 lg:shadow-md flex justify-center pt-10"
        >
          <div className="w-full lg:w-3/4">
            <FormGroup className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <Box className="sm:col-span-6">
                <InputLabel
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Item
                </InputLabel>
                <div className="mt-2">
                  <Input
                    id="title"
                    name="title"
                    type="text"
                    placeholder=" Walk in the square"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </Box>

              <Box className="sm:col-span-6 w-full">
                <div className="mt-2">
                  <TextField
                    id="content"
                    name="content"
                    label="Description"
                    multiline
                    fullWidth
                    rows={4}
                  />
                </div>
              </Box>

              <Box className="sm:col-span-6">
                <Button
                  variant="contained"
                  type="submit"
                  className="w-full"
                  sx={{ bgcolor: "#4338ca" }}
                >
                  Add the new Todo Item
                </Button>
              </Box>
            </FormGroup>
          </div>
        </form>
      </Container>
    </Box>
  );
}
