import { editTodo } from "./thunks";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import NewTodoForm from "./NewTodoForm";
import TodoListItem from "./TodoListItem";
import {
  getCompletedTodos,
  getUncompletedTodos,
  getTodosAreLoading,
} from "./selectors";

import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

export default function TodoList() {
  const completedTodos = useSelector(getCompletedTodos);
  const uncompletedTodos = useSelector(getUncompletedTodos);
  const todosAreLoading = useSelector(getTodosAreLoading);
  const numberConfig = {
    locale: "it-IT",
    config: {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    },
  };
  const dispatch = useDispatch();

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Prodotti
      </Typography>

      {todosAreLoading ? (
        <Button loading loadingPosition="end" endDecorator={<SendIcon />}>
          loading
        </Button>
      ) : (
        <>
          <Grid container spacing={1} padding={0}>
            <Grid size={8}>
              <TableContainer component={Paper}>
                <Table aria-label="Article table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">#</TableCell>
                      <TableCell>Articolo</TableCell>
                      <TableCell align="right">Prezzo</TableCell>
                      <TableCell align="center">Azioni</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {uncompletedTodos.map((todo, index) => (
                      <TodoListItem
                        key={todo.id}
                        todo={todo}
                        rowNumber={index}
                      ></TodoListItem>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            {completedTodos.length > 0 && (
              <Grid size={4}>
                <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
                  Carrello
                </Typography>
                {completedTodos.map((todo, index) => (
                  <Card sx={{ minWidth: 275, mb: 1 }}>
                    <CardContent>
                      <Typography
                        sx={{
                          color: "text.primary",
                          fontWeight: "lg",
                          mb: 1,
                        }}
                      >
                        {todo.quantity}&nbsp;x&nbsp;
                        <b>{todo.description.toLowerCase()}</b>
                      </Typography>
                      <Typography
                        sx={{ color: "text.secondary", fontSize: 14 }}
                      >
                        {todo.prices[0].value.toLocaleString(
                          numberConfig.locale,
                          numberConfig.config
                        )}
                        € - Totale:{" "}
                        {(todo.quantity * todo.prices[0].value).toLocaleString(
                          numberConfig.locale,
                          numberConfig.config
                        )}
                        €
                      </Typography>
                      <Typography align="right">
                        <Button
                          sx={{ margin: 0 }}
                          onClick={() => {
                            todo = { ...todo, quantity: todo.quantity + 1 };
                            dispatch(editTodo(todo));
                          }}
                        >
                          <AddCircleIcon />
                        </Button>
                        <Button
                          sx={{ margin: 0 }}
                          onClick={() => {
                            if (todo.quantity - 1 >= 0) {
                              todo = { ...todo, quantity: todo.quantity - 1 };
                              dispatch(editTodo(todo));
                            }
                          }}
                        >
                          <RemoveCircleIcon />
                        </Button>
                      </Typography>
                    </CardContent>
                  </Card>
                ))}

                <Typography variant="h4" component="h1" sx={{ mt: 2 }}>
                  <NewTodoForm></NewTodoForm>
                </Typography>
              </Grid>
            )}
          </Grid>
        </>
      )}
    </>
  );
}
