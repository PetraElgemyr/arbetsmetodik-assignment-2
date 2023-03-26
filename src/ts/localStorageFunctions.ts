import { Todo } from "./models/Todo";

export function getTodosFromLs() {
  let todos: Todo[] = JSON.parse(localStorage.getItem("todosInLs") || "[]");
  return todos;
}

export function getRemovedTodosFromLs() {
  let remTodos: Todo[] = JSON.parse(
    localStorage.getItem("removedTodosInLs") || "[]"
  );
  return remTodos;
}

export function setTodosToLs(todos: Todo[]) {
  localStorage.setItem("todosInLs", JSON.stringify(todos));
}

export function setRemovedTodosToLs(remTodos: Todo[]) {
  localStorage.setItem("removedTodosInLs", JSON.stringify(remTodos));
}
