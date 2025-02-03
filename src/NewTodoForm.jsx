import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTodo } from "./thunks";

export default function NewTodoForm() {
  const [inputText, setInputText] = useState("");
  const dispatch = useDispatch();
  return (
    <div>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      ></input>
      <button
        onClick={() => {
          const newTodo = {
            description: inputText,
            isCompleted: false,
            quantity: 0,
          };
          dispatch(createTodo(newTodo));
          setInputText("");
        }}
      >
        Create Todo
      </button>
    </div>
  );
}
