import express from "express";

const app = express();
const port = 3000;

let todos = {
  products: [],
};
app.use(express.json());

app.get("/api/", (req, res) => {
  console.log("GET");
  res.json(todos);
});

app.delete("/api/:id", (req, res) => {
  const todoId = parseInt(req.params.id);
  todos.products = todos.products.filter((i) => i.id !== todoId);
  res.status(202).send();
});

app.put("/api/:id", (req, res) => {
  console.log("PUT", req.body);
  const todoId = parseInt(req.params.id);
  const todo = req.body;
  const updatedTodo = { ...todo, lastUpdate: new Date() };

  var todoIndex = todos.products.findIndex((i) => i.id === todoId);
  todos.products[todoIndex] = { ...todos.products[todoIndex], ...updatedTodo };
  res.json(todos.products[todoIndex]);
});

app.post("/api", (req, res) => {
  console.log("POST", req.body);

  const todo = req.body;
  const id = parseInt(Date.now());
  const newTodo = {
    ...todo,
    lastUpdate: new Date(),
    id: id,
  };

  console.log(newTodo);
  todos.products.push(newTodo);
  res.json(newTodo);
});

app.listen(port, () => {
  console.log("Server listening on port " + port);
});
