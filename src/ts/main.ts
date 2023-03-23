import { addNewTodoFromForm, createTodoHtml } from "./functions";
import { Todo } from "./models/Todo";

function init() {
  let todos: Todo[] = [];

  console.log("hej");
  addNewTodoFromForm(todos);
  createTodoHtml(todos);
}

init();
