import { useSelector } from "react-redux";
import NewTodoForm from "./NewTodoForm";
import TodoListItem from "./TodoListItem";
import {
  getCompletedTodos,
  getUncompletedTodos,
  getTodosAreLoading,
} from "./selectors";

export default function TodoList() {
  const completedTodos = useSelector(getCompletedTodos);
  const uncompletedTodos = useSelector(getUncompletedTodos);
  const todosAreLoading = useSelector(getTodosAreLoading);

  return (
    <>
      {/* <h1>My Todos</h1> */}
      <h1>Ordine</h1>
      <br />
      <p>New Todo Form</p>
      <NewTodoForm></NewTodoForm>
      <br />
      {todosAreLoading ? (
        <h1>Loading</h1>
      ) : (
        <>
          <h2>Completed:</h2>
          <table>
            <thead>
              <tr>
                <th>Articolo</th>
                <th>Quantità</th>
                <th>Prezzo</th>
                <th>Totale</th>
                <th>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {completedTodos.map((todo) => (
                <TodoListItem key={todo.id} todo={todo}></TodoListItem>
              ))}
            </tbody>
          </table>
          <h2>Incompleted:</h2>
          <table>
          <thead>
              <tr>
                <th>Articolo</th>
                <th>Quantità</th>
                <th>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {uncompletedTodos.map((todo) => (
                <TodoListItem key={todo.id} todo={todo}></TodoListItem>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}
