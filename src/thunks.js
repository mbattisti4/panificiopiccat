import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loadingCompleted, loadingStarted, loadingError } from "./loadingSlice";
import { todosUpdated } from "./todosSlice";
import { getTotalAmount } from "./selectors";

const ENDPOINT_LOCAL = "/api";
const ENDPOINT_CASSANOVA = "https://api.cassanova.com";
const ENDPOINT = ENDPOINT_CASSANOVA;

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
    //console.log("token", token);

    return token;
  } catch (e) {
    dispatch(loadingError(e));
  }
}

export const loadTodos = () => async (dispatch) => {
  try {
    dispatch(loadingStarted());
    var response = await getData();
    // var salesModes = await getSalesModes();
    // var customers = await getCustomers();
    // var organizations = await getOrganizations();
    // var taxes = await getTaxes();
    // var orders = await getOrders();
    // var order = await getOrder("79844d94-13ac-425f-b2b6-ff61d797c45e");

    /*console.log("salesModes", salesModes);
    console.log("customers", customers);
    console.log("organizations", organizations);
    console.log("taxes", taxes);*/
    //console.log("orders", orders);
    //console.log("order", orders);

    let newObjectArray = response.data.products.map((item) =>
      Object.assign({}, item, { quantity: 0 })
    );

    console.log(newObjectArray);

    dispatch(loadingCompleted(newObjectArray));
  } catch (e) {
    dispatch(loadingError(e));
  }
};

export const editTodo = (todo) => async (dispatch, getState) => {
  try {
    dispatch(loadingStarted());

    console.log("thunks - editTodo");
    //const updatedTodo = await putData(todo);
    const updatedTodo = todo;
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

export const placeOrder = (totalAmount) => async (dispatch, getState) => {
  try {
    console.log(
      "thunks - placeOrder",
      getState().todos.value.filter((i) => i.quantity > 0)
    );
    await placeOrderInternal(
      getState().todos.value.filter((i) => i.quantity > 0),
      totalAmount
    );
    let todosCopy = getState().todos.value.filter((i) => i.id !== 11111111111);

    dispatch(todosUpdated(todosCopy));
  } catch (e) {
    dispatch(loadingError(e));
  }
};

async function getData() {
  if (ENDPOINT === ENDPOINT_CASSANOVA) {
    var token = await getToken();
    var response = await axios.get(`${ENDPOINT}/products?start=1&limit=100`, {
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

async function getSalesModes() {
  if (ENDPOINT === ENDPOINT_CASSANOVA) {
    var token = await getToken();
    var response = await axios.get(`${ENDPOINT}/salesmodes?start=1&limit=100`, {
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

async function getOrganizations() {
  var token = await getToken();
  var response = await axios.get(
    `${ENDPOINT}/organizations?start=1&limit=100`,
    {
      headers: {
        "Content-Type": "application/json",
        "X-Version": "1.0.0",
        Authorization: token.token_type + " " + token.access_token,
      },
    }
  );
  return response;
}

async function getTaxes() {
  var token = await getToken();
  var response = await axios.get(`${ENDPOINT}/taxes?start=1&limit=100`, {
    headers: {
      "Content-Type": "application/json",
      "X-Version": "1.0.0",
      Authorization: token.token_type + " " + token.access_token,
    },
  });
  return response;
}

async function getOrders() {
  var token = await getToken();
  var response = await axios.get(
    `${ENDPOINT}/documents/orders?start=1&limit=100&datetimeFrom="2025-02-03"`,
    {
      headers: {
        "Content-Type": "application/json",
        "X-Version": "1.0.0",
        Authorization: token.token_type + " " + token.access_token,
      },
    }
  );
  return response;
}

async function getOrder(id) {
  var token = await getToken();
  var response = await axios.get(`${ENDPOINT}/documents/orders/${id}`, {
    headers: {
      "Content-Type": "application/json",
      "X-Version": "1.0.0",
      Authorization: token.token_type + " " + token.access_token,
    },
  });
  return response;
}

async function getCustomers() {
  if (ENDPOINT === ENDPOINT_CASSANOVA) {
    var token = await getToken();
    var response = await axios.get(`${ENDPOINT}/customers?start=1&limit=100`, {
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

async function placeOrderInternal(todos, totalAmount) {
  console.log("placeOrderInternal", todos);

  var token = await getToken();
  const order = generateOrder(todos, totalAmount);

  console.log("placeOrderInternal", order);
  var response = await axios.post(
    `${ENDPOINT}/documents/orders/batch`,
    { create: [order] },
    {
      headers: {
        "Content-Type": "application/json",
        "X-Version": "1.0.0",
        "X-Requested-With": "*",
        Authorization: `${token.token_type} ${token.access_token}`,
      },
    }
  );
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

function generateOrder(todos, totalAmount) {
  console.log("generateOrder - 0 - ", todos);
  console.log("generateOrder - 0.0 - ");

  var rowsFromProducts = [];

  let index = 0;
  todos.forEach((e) => {
    console.log("generateOrder - 0.1 - ");
    var calculatedQuantity = e.quantity;
    console.log("generateOrder - 0.2 - ");
    var notes = "";
    console.log("generateOrder - 0.3 - ");
    if (e.soldByWeight === true) {
      console.log("generateOrder - 1 - ");

      var gramsPerPiece = parseInt(e.externalId);
      calculatedQuantity = e.quantity * gramsPerPiece / 1000;
      notes = "prodotto venduto a peso";
      console.log("generateOrder - 2 - ");
    }
    console.log("generateOrder - 3 - ");

    var productSelled = {
      rowNumber: index,
      idProductVariant: e.variants[0].id,
      idDepartment: e.idDepartment,
      idTax: "30049607-cf46-48ee-a284-24b1e361704c", // TODO
      //idSalesMode: "", // TODO
      quantity: calculatedQuantity,
      price: e.prices[0].value,
      subtotal: false,
      shippingCost: false,
      note: notes,
      menu: false,
      composition: false,
    };

    console.log("generateOrder - 4 - ");

    rowsFromProducts.push(productSelled);

    index++;
  });

  console.log("generateOrder2", rowsFromProducts);

  var order = {
    externalId: "1001",
    internalWorkflowStatus: "PENDING",
    isExternalOrder: false,
    status: "PARTIALLY_PROCESSED",
    date: Date.now(),
    dueDate: null,
    deliveryMode: "PICKUP",
    destinationStreet: null,
    destinationCountry: null,
    destinationCity: null,
    destinationZipcode: null,
    destinationDistrict: null,
    otherDeliveryDestination: null,
    transportNote: null,
    rejectionReason: null,
    phoneNumber: "3470453431",
    prepay: false,
    prepaymentStatus: "WAITING",
    prepaymentTransactionId: null,
    idTable: null,
    document: {
      idSalesPoint: 1212, // TODO
      idOrganization: "6a4fc711-9cc8-4650-a6df-9586ead1250d", // TODO
      idCustomer: "010ef016-236e-45ed-a946-877ddc913084", // TODO
      taxFree: false,
      amount: totalAmount, // TODO
      note: "Note documento",
      email: "mbattisti4@gmail.com", // TODO
      rows: rowsFromProducts,
    },
  };

  return order;
}
