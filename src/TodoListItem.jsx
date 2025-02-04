import { editTodo, deleteTodo } from "./thunks";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const CardContainer = styled.div`
  ${(props) => props.quantity > 0 && `
      background-color: yellow;  
      padding: 5px;
      border-radius: 10px;
      border: 1px solid blue;`
}`;

export default function TodoListItem({ todo }) {
  const dispatch = useDispatch();

  return (
    <tr>      
      <td><CardContainer quantity={todo.quantity}>{todo.description.toLowerCase()}</CardContainer></td>
      <td>
        {todo.quantity}
      </td>
      <td>
        {todo.prices[0].value}
      </td>
      <td>
        {todo.prices[0].value * todo.quantity}
      </td>
      <td>
        {/* <button onClick={() => dispatch(editTodo(todo))}>Edit</button> */}
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
      {/* <td>{todo.id}</td> */}
      {/* <td>
        {new Date(todo.lastUpdate).toLocaleDateString("IT-it")}&nbsp;
        {new Date(todo.lastUpdate).toLocaleTimeString("IT-it")}
      </td> */}
      {/* <td>
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
      </td> */}
    </tr>
  );
}
