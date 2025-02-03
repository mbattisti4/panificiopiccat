import { editTodo, deleteTodo } from "./thunks";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const CardContainer = styled.div`
  ${(props) => {
    console.log("xxx => ", props);
    return props.important && "background-color: blue;";
  }}
  padding: 5px;
  border-radius: 10px;
  border: 1px solid red;
`;

export default function TodoListItem({ todo }) {
  const dispatch = useDispatch();

  return (
    <tr>
      <td>{todo.id}</td>
      <td>{todo.description}</td>
      <td>
        <CardContainer important>{todo.quantity}</CardContainer>
      </td>
      {/* <td>
        {new Date(todo.lastUpdate).toLocaleDateString("IT-it")}&nbsp;
        {new Date(todo.lastUpdate).toLocaleTimeString("IT-it")}
      </td> */}
      <td>
        {todo.isCompleted ? (
          <button onClick={() => dispatch(deleteTodo(todo))}>
            Delete item!
          </button>
        ) : (
          <button
            onClick={() => {
              todo = { ...todo, isCompleted: true };
              dispatch(editTodo(todo));
            }}
          >
            Mark as completed
          </button>
        )}
      </td>
      <td>
        <button onClick={() => dispatch(editTodo(todo))}>Edit</button>
        <button
          onClick={() => {
            todo = { ...todo, quantity: todo.quantity + 1 };
            dispatch(editTodo(todo));
          }}
        >
          +
        </button>
        <button
          onClick={() => {
            if (todo.quantity - 1 >= 0) {
              todo = { ...todo, quantity: todo.quantity - 1 };
              dispatch(editTodo(todo));
            }
          }}
        >
          -
        </button>
      </td>
    </tr>
  );
}
