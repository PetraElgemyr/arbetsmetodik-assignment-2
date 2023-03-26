import { Todo } from "./models/Todo";
import { addToList, removeFromList, toggleFinished } from "./functions";

export function createTodosHtml(todos: Todo[], removedTodos: Todo[]) {
  const todosContainer: HTMLUListElement = document.getElementById(
    "myList"
  ) as HTMLUListElement;
  todosContainer.innerHTML = "";
  console.log("Todos att göra", todos);

  for (let i = 0; i < todos.length; i++) {
    const myTodo: HTMLLIElement = document.createElement("li");
    myTodo.className = "myTodoItem";

    let todoText: HTMLSpanElement = document.createElement("span");
    todoText.className = "todo__span";
    todoText.innerHTML = todos[i].name;
    if (todos[i].finished) {
      todoText.classList.add("--finished");
    }

    let checkbox: HTMLInputElement = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkbox";
    if (todos[i].removed) {
      checkbox.checked = true;
    }

    myTodo.append(todoText, checkbox);
    todosContainer.appendChild(myTodo);

    todoText.addEventListener("click", () => {
      toggleFinished(todos[i], todoText);
    });

    checkbox.addEventListener("change", () => {
      todos[i].removed = !todos[i].removed;
      addToList(todos[i], removedTodos);
      removeFromList(todos[i], todos);
      createTodosHtml(todos, removedTodos);
      createRemovedTodosHtml(removedTodos, todos);
    });
  }
}

export function createRemovedTodosHtml(removedTodos: Todo[], todos: Todo[]) {
  const removedTodosContainer: HTMLUListElement = document.getElementById(
    "removedItemsList"
  ) as HTMLUListElement;
  removedTodosContainer.innerHTML = "";
  console.log("Borttagna todos som ska skrivas ut", removedTodos);

  for (let i = 0; i < removedTodos.length; i++) {
    const myTodo: HTMLLIElement = document.createElement("li");
    myTodo.className = "myTodoItem";
    myTodo.classList.add("--removed");

    let todoText: HTMLSpanElement = document.createElement("span");
    todoText.className = "todo__span";
    todoText.innerHTML = removedTodos[i].name;
    if (removedTodos[i].finished) {
      todoText.classList.add("--finished");
    }

    let checkbox: HTMLInputElement = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkbox";
    if (removedTodos[i].removed) {
      checkbox.checked = true;
    }

    myTodo.append(todoText, checkbox);
    removedTodosContainer.appendChild(myTodo);

    todoText.addEventListener("click", () => {
      toggleFinished(removedTodos[i], todoText);
    });

    checkbox.addEventListener("change", () => {
      removedTodos[i].removed = !removedTodos[i].removed;
      addToList(removedTodos[i], todos);
      removeFromList(removedTodos[i], removedTodos);
      createTodosHtml(todos, removedTodos);
      createRemovedTodosHtml(removedTodos, todos);
    });
  }
}
