import { Todo } from "./models/Todo";

// let removedTodos: Todo[] = [];
// let todos: Todo[] = [];

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
  console.log("Dessa ska skrivas ut", todos);

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
      //   toggleRemoveCheckbox(todos[i]);
    });
  }
}

// export function checkingCheckbox(
//   myTodo: HTMLLIElement,
//   todo: Todo,
//   checkbox: HTMLInputElement,
//   todoText: HTMLSpanElement,
//   todos: Todo[]
// ) {
//   if (checkbox.checked) {
//     //om checkboxen är icheckad
//     let index = todos.indexOf(todo); //hitta index, dvs placering av mitt klickade objekt, i listan den är i nu, todoList.
//     todos.splice(index, 1); //ta bort objektet i listan
//     myTodo.innerHTML = "";
//     myTodo.remove(); //ta bort innehåll samt ta bort li-tagen från todoList
//     todo.removed = !todo.removed;
//     console.log("Du klickade på objektet: ", todo);
//     console.log("den nya todo-listan: ", todos); //checka att objektet är borta från listan
//   }

//   if (todo.removed === true) {
//     //om removed=false när man klickar ska det bli true, värdet ska växla mellan klickningar
//     const ulWithRemovedItems: HTMLUListElement = document.getElementById(
//       "removedItemsList"
//     ) as HTMLUListElement; //hitta ul för borttagna todos
//     let removedLi: HTMLLIElement = document.createElement("li");
//     let removedSpan: HTMLSpanElement = document.createElement("span");
//     let checkboxForRemoved: HTMLInputElement = document.createElement("input"); //skapar ny li, span och checkbox för "borttagna listan"
//     removedSpan.className = "deletedSpan";
//     removedLi.className = "deletedLi";
//     checkboxForRemoved.type = "checkbox";
//     checkboxForRemoved.className = "checkbox__rem";
//     checkboxForRemoved.checked = true;
//     removedTodos.push(todo); //om removed=true ska de ligga i borttagna-listan
//     console.log("Här är listan med borttagna todos: ", removedTodos);
//     if (todo.finished === true) {
//       removedSpan.classList.add("--finished");

//       //   toggleFinished(todo, todoText);
//       //   removedSpan.classList.toggle(
//       //     "--rem-finished"
//       //   );
//       /*om något objekt är överstruket samt markerat som finished redan,
//       checkas av för att flyttas till andra listan behövs den överstrukna stylingen vara kvar. Så alla nya litaggar och checkboxes skapas
//       som vanligt och placeras ut i DOMen. och OM finished=true så får NYA li-tagen (removedLi) i borttagna-listan klassnamn för styling
//       för de finished OCH removed objekten */
//     }

//     if (todo.finished === false) {
//       removedSpan.classList.remove("--finished");
//     }

//     ulWithRemovedItems.appendChild(removedLi);
//     for (let i = 0; i < removedTodos.length; i++) {
//       removedSpan.innerHTML = todo.name;
//       removedLi.append(removedSpan, checkboxForRemoved);
//     }

//     removedSpan.addEventListener("click", () => {
//       toggleFinished(todo, removedSpan);
//       //   if (todo.finished === false) {
//       //     todo.finished = true; //om finished=false (standardvärdet) när man klickar blir det true
//       //     console.log("Nu blir finished=true på objektet ", todo);
//       //     removedLi.classList.toggle("__removed");
//       //   } else {
//       //     if (todo.finished === true) {
//       //       //om finished=true när man klickar ska det bli false
//       //       todo.finished = false;
//       //       console.log("Nu blir finished=false på objektet ", todo);
//       //       removedLi.classList.remove("__removed");
//       //     }
//       //   }
//     });
//     //för att flytta tillbaka mina borttagna saker, klicka på den nya checkboxen för de borttagna objekten
//     checkboxForRemoved.addEventListener("change", () => {
//       reverse(
//         todo,
//         checkboxForRemoved,
//         removedLi,
//         myTodo,
//         checkbox,
//         todoText,
//         todos
//       );
//     });
//   }
// }

// export function reverse(
//   todo: Todo,
//   checkboxForRemoved: HTMLInputElement,
//   removedLi: HTMLLIElement,
//   myTodo: HTMLLIElement,
//   checkbox: HTMLInputElement,
//   todoText: HTMLSpanElement,
//   todos: Todo[]
// ) {
//   console.log(
//     "Nu flyttas ",
//     todo,
//     " tillbaka till todoList och tas bort från borttagna listan"
//   );
//   todos.push(todo);
//   let index = removedTodos.indexOf(todo);
//   removedTodos.splice(index, 1);
//   removedLi.innerHTML = "";
//   checkboxForRemoved.remove();
//   removedLi.remove();
//   todoText.innerHTML = todo.name;
//   myTodo.appendChild(todoText);

//   checkbox.checked = false;
//   todo.removed = false;
//   myTodo.appendChild(checkbox); //checkbox för todo-listan är tillbaka

//   if (todo.finished === false) {
//     myTodo.classList.remove("__removed");
//   }

//   let myUlTag: HTMLUListElement = document.getElementById(
//     "myList"
//   ) as HTMLUListElement;
//   myUlTag.appendChild(myTodo);
//   console.log("min uppdaterade todo-list: ", todos);
//   console.log("min uppdaterade removed-list: ", removedTodos);
// }

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
  console.log("Nu ändras todos finished värde", todo);
}
// export function toggleRemoveCheckbox(todo: Todo) {
//   if (todo.removed === true) {
//     removeFromList(todo, todos);
//     addToList(todo, removedTodos);
//   } else {
//     removeFromList(todo, removedTodos);
//     addToList(todo, todos);
//   }
//   createTodosHtml(todos);
//   createRemovedTodosHtml(removedTodos);
// }

export function createRemovedTodosHtml(removedTodos: Todo[], todos: Todo[]) {
  const removedTodosContainer: HTMLUListElement = document.getElementById(
    "removedItemsList"
  ) as HTMLUListElement;
  removedTodosContainer.innerHTML = "";
  console.log("Borttagna todos som ska skrivas ut", removedTodos);

  for (let i = 0; i < removedTodos.length; i++) {
    const myTodo: HTMLLIElement = document.createElement("li");
    myTodo.className = "myTodoItem";

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

/*{
  // todo.removed = !todo.removed;

export function createRemovedTodoHtml(removedTodos: Todo[]) {
  console.log("Borttagna todos:", removedTodos);

  const removedTodosContainer: HTMLUListElement = document.getElementById(
    "removedItemsList"
  ) as HTMLUListElement;
  removedTodosContainer.innerHTML = "";

  for (let i = 0; i < removedTodos.length; i++) {
    const theObject = todos[i]; //sparar ner det nuvarande objektet för detta varv i loopen (behövs för clickevent)
    const myTodo: HTMLLIElement = document.createElement("li");
    myTodo.className = "myTodoItem";

    const todoText: HTMLSpanElement = document.createElement("span");
    todoText.className = "todo__span";
    todoText.innerHTML = todos[i].name;
    if (removedTodos[i].finished === true) {
      todoText.classList.add("__checked");
    }

    const checkbox: HTMLInputElement = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkbox";
    checkbox.checked = true;

    myTodo.append(todoText, checkbox);
    removedTodosContainer.appendChild(myTodo);

    todoText.addEventListener("click", () => {
      removedTodos[i].finished = !removedTodos[i].finished;
      todoText.classList.toggle("__checked");
      console.log(
        "Nu ändras finished på objektet",
        theObject + "Nya listan med borttagna saker:",
        removedTodos
      );
    });

    // checkbox.addEventListener("change", () => {
    //   checkingCheckbox(checkbox, theObject, todos);
    // });
  }
}

*/

/******************************************** */
