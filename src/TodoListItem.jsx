import { editTodo } from "./thunks";
import { useDispatch } from "react-redux";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

// const CardContainer = styled.div`
//   ${(props) =>
//     props.quantity > 0 &&
//     `
//       background-color: yellow;
//       padding: 5px;
//       border-radius: 10px;
//       border: 1px solid blue;`}
// `;

export default function TodoListItem({ todo, rowNumber }) {
  const dispatch = useDispatch();

  return (
    <TableRow
      key={todo.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell align="center">{rowNumber}</TableCell>
      <TableCell>{todo.description.toLowerCase()}</TableCell>
      <TableCell align="right">
        {todo.prices[0].value.toLocaleString()}
      </TableCell>
      <TableCell align="center">
        <Button
          onClick={() => {
            todo = { ...todo, quantity: todo.quantity + 1 };
            dispatch(editTodo(todo));
          }}
        >
          <AddCircleIcon />
        </Button>
        <Button
          onClick={() => {
            if (todo.quantity - 1 >= 0) {
              todo = { ...todo, quantity: todo.quantity - 1 };
              dispatch(editTodo(todo));
            }
          }}
        >
          <RemoveCircleIcon />
        </Button>
      </TableCell>
    </TableRow>
  );
}
