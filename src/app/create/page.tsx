import { getAllTodos } from "@/actions/actions";
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

export default async function Home() {
  const allUsers = await getAllTodos();
  console.log("teste", allUsers);
  return (
    <Box className="pt-10 pl-0 lg:pl-10 min-h-screen bg-gray-300">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <Typography
          variant="h3"
          className="text-center col-start-1 lg:col-start-2 pl-0 pb-0 lg:pb-10 pt-10 text-black"
        >
          Todo List!
        </Typography>
      </div>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <form className="w-full lg:w-1/2 py-20 lg:shadow-md flex justify-center pt-10">
          <div className="w-full lg:w-3/4">
            <div className="border-b border-gray-900/10 pb-12">
              <FormGroup className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <Box className="sm:col-span-6">
                  <InputLabel
                    htmlFor="item"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Item
                  </InputLabel>
                  <div className="mt-2">
                    <Input
                      id="item"
                      name="item"
                      type="text"
                      placeholder=" Walk in the square"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </Box>

                <Box className="sm:col-span-6 w-full">
                  <div className="mt-2">
                    <TextField
                      id="description"
                      label="Description"
                      multiline
                      fullWidth
                      rows={4}
                    />
                  </div>
                </Box>

                <Button
                  variant="contained"
                  className="w-full sm:col-span-6"
                  sx={{ bgcolor: "#4338ca" }}
                >
                  Add the new Todo Item
                </Button>
              </FormGroup>
            </div>
          </div>
        </form>
      </Container>
    </Box>
  );
}
