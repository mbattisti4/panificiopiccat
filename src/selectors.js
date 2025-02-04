import { createSelector } from "@reduxjs/toolkit";

export const getTodos = (state) => state.todos.value;
export const getTodosAreLoading = (state) => !state.loading.value.completed;

export const getCompletedTodos = createSelector([getTodos], (todos) =>
  todos.filter((i) => i.quantity > 0)
);

export const getUncompletedTodos = createSelector([getTodos], (todos) =>
  todos.filter((i) => i.quantity == 0)
);
