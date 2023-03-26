import { createTodosHtml } from "./createHtml";
import { Todo } from "./models/Todo";

export function addNewTodoFromForm(todos: Todo[], removedTodos: Todo[]) {
  const form: HTMLFormElement = document.getElementById(
    "todoForm"
  ) as HTMLFormElement;
  const inputBox: HTMLInputElement = document.getElementById(
    "todoInput"
  ) as HTMLInputElement;
  const messageBox: HTMLParagraphElement = document.getElementById(
    "errorInput"
  ) as HTMLParagraphElement;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (inputBox.value !== "") {
      let newTodo = new Todo(inputBox.value, false, false);
      addToList(newTodo, todos);
      createTodosHtml(todos, removedTodos);
      messageBox.innerHTML = "";
      inputBox.value = "";
    } else {
      messageBox.innerHTML = "Du måste skriva en todo innan du lägger till";
    }
  });
}

export function addToList(todoToAdd: Todo, todoList: Todo[]) {
  todoList.push(todoToAdd);
}

export function removeFromList(todoToRemove: Todo, todoList: Todo[]) {
  const index = todoList.indexOf(todoToRemove);
  todoList.splice(index, 1);
}

export function toggleFinished(todo: Todo, todoText: HTMLSpanElement) {
  todoText.classList.toggle("--finished");
  if (todoText.classList.contains("--finished")) {
    todo.finished = true;
  } else {
    todo.finished = false;
  }
  console.log("Finished ändrad: ", todo);
}

export function sortTodos(todos: Todo[]) {
  todos.sort((a, b) => (a.name > b.name ? 1 : -1));
}
