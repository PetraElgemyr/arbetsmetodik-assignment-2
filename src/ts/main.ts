import { createRemovedTodosHtml, createTodosHtml } from "./htmlFunctions";
import { addNewTodoFromForm, emptyList, sortTodos } from "./functions";
import { Todo } from "./models/Todo";
import "../scss/main.scss";

const sortTodosBtn: HTMLButtonElement = document.getElementById(
  "sortBtn"
) as HTMLButtonElement;
const sortRemovedBtn: HTMLButtonElement = document.getElementById(
  "sortRemBtn"
) as HTMLButtonElement;
const emptyBtn: HTMLButtonElement = document.getElementById(
  "emptyTodos"
) as HTMLButtonElement;
const emptyRemovedBtn: HTMLButtonElement = document.getElementById(
  "emptyRemTodos"
) as HTMLButtonElement;

function init() {
  // let todos: Todo[] = [];
  // let removedTodos: Todo[] = [];

  console.log("hej");
  addNewTodoFromForm(todos, removedTodos);
  sortTodosBtn.addEventListener("click", () => {
    sortTodos(todos);
    createTodosHtml(todos, removedTodos);
  });
  sortRemovedBtn.addEventListener("click", () => {
    sortTodos(removedTodos);
    createRemovedTodosHtml(removedTodos, todos);
  });
  emptyBtn.addEventListener("click", () => {
    emptyList(todos);
    createTodosHtml(todos, removedTodos);
  });
  emptyRemovedBtn.addEventListener("click", () => {
    emptyList(removedTodos);
    createRemovedTodosHtml(removedTodos, todos);
  });
  createTodosHtml(todos, removedTodos);
  // createRemovedTodosHtml(todos, removedTodos);
  createRemovedTodosHtml(removedTodos, todos);
}

init();
