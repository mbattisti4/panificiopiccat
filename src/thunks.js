import axios from "axios";
import { loadingCompleted, loadingStarted, loadingError } from "./loadingSlice";
import { todosUpdated } from "./todosSlice";

const ENDPOINT_LOCAL = "/api";
const ENDPOINT_CASSANOVA = "https://api.cassanova.com";
const ENDPOINT = ENDPOINT_LOCAL;

async function getToken() {
  try {
    var response = await axios.post(
      "https://api.cassanova.com/apikey/token",
      { apiKey: "78ed7ff9-372c-4b3b-96b3-37c403f73b8a" },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "*",
        },
      }
    );

    var token = response.data;
    console.log("token" + token);

    return token;
  } catch (e) {
    dispatch(loadingError(e));
  }
}

export const loadTodos = () => async (dispatch) => {
  try {
    dispatch(loadingStarted());
    var response = await getData();

    var todos = response.data;
    console.log(todos.products);

    dispatch(loadingCompleted(todos.products));
  } catch (e) {
    dispatch(loadingError(e));
  }
};

export const editTodo = (todo) => async (dispatch, getState) => {
  try {
    dispatch(loadingStarted());

    const updatedTodo = await putData(todo);
    let todosCopy = getState().todos.value;

    todosCopy = update(getState().todos.value, todo.id, updatedTodo);

    dispatch(loadingCompleted(todosCopy));
  } catch (e) {
    dispatch(loadingError(e));
  }
};

export const deleteTodo = (todo) => async (dispatch, getState) => {
  try {
    await deleteData(todo);
    let todosCopy = getState().todos.value.filter((i) => i.id !== todo.id);

    dispatch(todosUpdated(todosCopy));
  } catch (e) {
    dispatch(loadingError(e));
  }
};

export const createTodo = (todo) => async (dispatch, getState) => {
  try {
    const newTodo = await postData(todo);
    let todosCopy = [...getState().todos.value, newTodo];
    console.log("createTodo", todosCopy);
    dispatch(todosUpdated(todosCopy));
  } catch (e) {
    dispatch(loadingError(e));
  }
};

async function getData() {
  if (ENDPOINT === ENDPOINT_CASSANOVA) {
    var token = await getToken();
    var response = await axios.get(`${ENDPOINT}?start=1&limit=100`, {
      headers: {
        "Content-Type": "application/json",
        "X-Version": "1.0.0",
        Authorization: token.token_type + " " + token.access_token,
      },
    });
  } else {
    var response = await axios.get(`${ENDPOINT}`);
  }

  console.log(response);

  return response;
}

async function putData(editedTodoForRequest) {
  if (ENDPOINT === ENDPOINT_CASSANOVA) {
    var token = await getToken();
    var response = await axios.put(
      `${ENDPOINT}/${editedTodoForRequest.id}`,
      editedTodoForRequest,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Version": "1.0.0",
          "X-Requested-With": "*",
          Authorization: `${token.token_type} ${token.access_token}`,
        },
      }
    );
  } else {
    var response = await axios.put(
      `${ENDPOINT}/${editedTodoForRequest.id}`,
      editedTodoForRequest
    );
  }
  return response.data;
}

async function deleteData(todo) {
  if (ENDPOINT === ENDPOINT_CASSANOVA) {
    var token = await getToken();
    var response = await axios.delete(`${ENDPOINT}/${todo.id}`, null, {
      headers: {
        "Content-Type": "application/json",
        "X-Version": "1.0.0",
        "X-Requested-With": "*",
        Authorization: `${token.token_type} ${token.access_token}`,
      },
    });
  } else {
    var response = await axios.delete(`${ENDPOINT}/${todo.id}`);
  }
  return response.data;
}

async function postData(newTodo) {
  if (ENDPOINT === ENDPOINT_CASSANOVA) {
    var token = await getToken();
    var response = await axios.post(`${ENDPOINT}`, newTodo, {
      headers: {
        "Content-Type": "application/json",
        "X-Version": "1.0.0",
        "X-Requested-With": "*",
        Authorization: `${token.token_type} ${token.access_token}`,
      },
    });
  } else {
    var response = await axios.post(`${ENDPOINT}`, newTodo);
  }
  return response.data;
}

function update(arr, id, updatedData) {
  return arr.map((item) =>
    item.id === id ? { ...item, ...updatedData } : item
  );
}
