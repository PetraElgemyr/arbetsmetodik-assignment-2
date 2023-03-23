import { Todo } from "./models/Todo";

let removedTodos: Todo[] = [];
let todos: Todo[] = [];

export function addNewTodoFromForm() {
  const form: HTMLFormElement = document.getElementById(
    "todoForm"
  ) as HTMLFormElement;
  const inputBox: HTMLInputElement = document.getElementById(
    "todoInput"
  ) as HTMLInputElement;
  const errorBox: HTMLParagraphElement = document.getElementById(
    "errorInput"
  ) as HTMLParagraphElement;
  const messageBox: HTMLParagraphElement = document.getElementById(
    "errorInput"
  ) as HTMLParagraphElement;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (inputBox.value !== "") {
      let newTodo = new Todo(inputBox.value, false, false);
      todos.push(newTodo);
      createTodoHtml(todos);
      console.log("Ny todo lista", todos);
      messageBox.innerHTML = "";
      inputBox.value = "";
    } else {
      messageBox.innerHTML = "Du måste skriva en todo innan du lägger till";
    }
  });
}

export function createTodoHtml(todos: Todo[]) {
  console.log("Jag ska skriva ut dessa", todos);

  const todosContainer: HTMLUListElement = document.getElementById(
    "myList"
  ) as HTMLUListElement;
  todosContainer.innerHTML = "";

  for (let i = 0; i < todos.length; i++) {
    const myTodo: HTMLLIElement = document.createElement("li");
    myTodo.className = "myTodoItem";

    let todoText: HTMLSpanElement = document.createElement("span");
    todoText.className = "todo__span";
    todoText.innerHTML = todos[i].name;

    let checkbox: HTMLInputElement = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkbox";

    let theObject = todos[i]; //sparar ner det nuvarande objektet för detta varv i loopen (behövs för clickevent)
    myTodo.append(todoText, checkbox);
    todosContainer.appendChild(myTodo);

    todoText.addEventListener("click", () => {
      theObject.finished = !theObject.finished;
      todoText.classList.toggle("__checked");
      console.log("Nu ändras finished på objektet", theObject);
    });

    checkbox.addEventListener("change", () => {
      checkingCheckbox();
    });
  }
}

export function checkingCheckbox() {}
