import {
  addNewTodoFromForm,
  createRemovedTodosHtml,
  createTodosHtml,
} from "./functions";
import { Todo } from "./models/Todo";

function init() {
  let todos: Todo[] = [];
  let removedTodos: Todo[] = [];

  console.log("hej");
  addNewTodoFromForm(todos, removedTodos);
  createTodosHtml(todos, removedTodos);
  createRemovedTodosHtml(removedTodos, todos);
}

init();
