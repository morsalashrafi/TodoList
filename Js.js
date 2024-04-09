const btnStart = document.querySelector("#btnStart");
const todoMain = document.querySelector(".todoMain");
const sectionStart = document.querySelector(".section-start");
const close = document.querySelector(".close");

btnStart.addEventListener("click", (e) => {
  todoMain.classList.remove("hidden");
  sectionStart.classList.add("hidden");
});

close.addEventListener("click", (e) => {
  sectionStart.classList.remove("hidden");
  todoMain.classList.add("hidden");
});

// let todo = [];
let filterValue = "all";

const todoInput = document.querySelector(".todo_input");
const todoForm = document.querySelector(".todo-form");
const todoList = document.querySelector(".todoList");
const selectFilters = document.querySelector(".filter-todos");

todoForm.addEventListener("submit", addNewTodo);
selectFilters.addEventListener("change", (e) => {
  filterValue = e.target.value;
  filterTodos();
});

// لود سایت
document.addEventListener("DOMContentLoaded", (e) => {
  const todo = getAllTodos();
  createTodos(todo);
});

function addNewTodo(e) {
  e.preventDefault();

  if (!todoInput.value) return null;

  const newTodo = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    title: todoInput.value,
    isCompleted: false,
  };

  savedTodo(newTodo);

  filterTodos();
}

function createTodos(todo) {
  let result = "";
  todo.forEach((t) => {
    result += ` <li class="todo">
        <h3 class="todo_title-h3 ${t.isCompleted ? "completed" : ""} "> ${
      t.title
    }</h3>
        
        <div class="todoImages">
            <h5 class="todo_createdAt">${new Date(
              t.createdAt
            ).toLocaleDateString("en")}</h5>
            <button data-todo-id=${
              t.id
            } class="todo-img todo__check "><img src="./image/8819101.png" alt=""></button>
            <button data-todo-id=${
              t.id
            } class="todo-img todo__remove "><img src="./image/6861362.png" alt=""></button>
        </div>
    </li>`;
  });
  todoList.innerHTML = result;
  todoInput.value = "";

  const removeBtns = document.querySelectorAll(".todo__remove");
  removeBtns.forEach((btn) => btn.addEventListener("click", removeTodo));

  const checkBtns = document.querySelectorAll(".todo__check");
  checkBtns.forEach((btn) => btn.addEventListener("click", checkTodo));
}

function filterTodos() {
  const todo = getAllTodos();

  switch (filterValue) {
    case "all":
      createTodos(todo);
      break;

    case "completed": {
      const filteredTodos = todo.filter((t) => t.isCompleted);
      createTodos(filteredTodos);
      break;
    }

    case "uncompleted": {
      const filteredTodos = todo.filter((t) => !t.isCompleted);
      createTodos(filteredTodos);
      break;
    }

    default:
      createTodos(todo);
  }
}

function removeTodo(e) {
  let todo = getAllTodos();

  const todoId = Number(e.target.dataset.todoId);
  todo = todo.filter((t) => t.id !== todoId);
  // createTodos(todo);
  saveAllTodos(todo);

  filterTodos();
}

function checkTodo(e) {
  // console.log(e.target);
  let todo = getAllTodos();

  const todoId = Number(e.target.dataset.todoId);
  const todoFind = todo.find((t) => t.id === todoId);
  todoFind.isCompleted = !todoFind.isCompleted;
  // createTodos(todo);
  saveAllTodos(todo);

  filterTodos();
}




function getAllTodos() {
  const savedTodos = JSON.parse(localStorage.getItem("todo")) || [];
  return savedTodos;
}


function savedTodo(todo) {
  const savedTodos = getAllTodos();
  savedTodos.push(todo);
  localStorage.setItem("todo", JSON.stringify(savedTodos));
  return savedTodos;
}

function saveAllTodos(todo) {
  localStorage.setItem("todo", JSON.stringify(todo));
}
