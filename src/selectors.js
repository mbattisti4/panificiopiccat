import { createSelector } from "@reduxjs/toolkit";

export const getTodos = (state) => state.todos.value;
export const getTodosAreLoading = (state) => !state.loading.value.completed;

export const getCompletedTodos = createSelector([getTodos], (todos) =>
  todos.filter((i) => i.quantity > 0)
);

export const getTotalAmount = createSelector([getTodos], (todos) =>
  todos.reduce((a, b) => a + b.quantity * b.prices[0].value, 0)
);

export const getUncompletedTodos = createSelector(
  [getTodos],
  (todos) => todos //.filter((i) => i.quantity == 0)
);
