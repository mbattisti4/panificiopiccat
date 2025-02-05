import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import TodoList from "./TodoList";
import { loadTodos } from "./thunks";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadTodos());
  }, []);

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 2 }}>
        <TodoList />
      </Box>
    </Container>
  );
}

export default App;
