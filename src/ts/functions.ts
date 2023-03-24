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

export function sortTodos(todos: Todo[]) {
  todos.sort((a, b) => (a.name > b.name ? 1 : -1));
}
