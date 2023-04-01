// get DOM elements
const timeText = document.querySelector(".time-text");
const focusText = document.querySelector(".focus-text");
const focusInput = document.querySelector(".focus-input");
const weatherText = document.querySelector(".weather-text");
const focus = document.querySelector(".focus");
const focusButton = document.getElementById("focus-button");
const focusCheckbox = document.getElementById("focus-checkbox");

// set background image
var backgrounds = [
  "url('/bg-img/1.jpg')",
  "url('/bg-img/2.jpg')",
  "url('/bg-img/4.jpg')",
  "url('/bg-img/5.jpg')",
];

var currentIndex = 0;
function changeBackground() {
  currentIndex++;
  if (currentIndex >= backgrounds.length) {
    currentIndex = 0;
  }
  document.body.style.backgroundImage = backgrounds[currentIndex];
}
setInterval(changeBackground, 5000); // Call the function every 1 minute

function clearLocalStorage() {
  localStorage.clear();
  focusCheckbox.checked = false;
  focusText.style.textDecoration = "none";
  updateFocus();
  console.log("local storage cleared");
  location.reload();
}

// time API
let is12HourFormat = true;
const currentTimeElement = document.getElementById("current-time");
const toggleButton = document.getElementById("toggle-button");

async function updateTime() {
  const response = await fetch(
    "http://worldtimeapi.org/api/timezone/Asia/Manila"
  );
  const json = await response.json();
  const dateTimeString = json.datetime;

  const options = {
    hour: is12HourFormat ? "numeric" : "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: is12HourFormat,
  };

  const formattedTime = new Intl.DateTimeFormat(undefined, options).format(
    new Date(dateTimeString)
  );
  currentTimeElement.textContent = formattedTime;
}

toggleButton.addEventListener("click", function () {
  is12HourFormat = !is12HourFormat;
  updateTime();
});

setInterval(updateTime, 1000);

// update focus text and input value
function updateFocus() {
  if (localStorage.getItem("focus")) {
    focusText.textContent = localStorage.getItem("focus");
    focusInput.value = localStorage.getItem("focus");
    focusInput.classList.add("hidden", "opacity-0");
  }

  if (localStorage.getItem("checkboxState")) {
    focusCheckbox.checked = JSON.parse(localStorage.getItem("checkboxState"));
    if (focusCheckbox.checked) {
      focusText.style.textDecoration = "line-through";
    } else {
      focusText.style.textDecoration = "none";
    }
  }
}
updateFocus();
focusInput.addEventListener("keyup", function (event) {
  if (event.keyCode === 13 && event.target.value.trim() !== "") {
    localStorage.setItem("focus", event.target.value);
    updateFocus();
    focusButton.style.display = "block";
    focusCheckbox.style.display = "block";
  } else if (event.keyCode === 13 && event.target.value.trim() === "") {
    localStorage.removeItem("focus");
    updateFocus();
    console.log("focus removed");
  }
});

focusCheckbox.addEventListener("change", function () {
  localStorage.setItem("checkboxState", focusCheckbox.checked);
  if (focusCheckbox.checked) {
    focusText.style.textDecoration = "line-through";
  } else {
    focusText.style.textDecoration = "none";
  }
});

// focus edit
focusButton.addEventListener("click", () => {
  localStorage.removeItem("checkboxState");
  focusCheckbox.checked = false;
  focusText.style.textDecoration = "none";
  focusText.textContent = "What's your main focus for today?";
  focusInput.classList.remove("hidden", "opacity-0");
  focusButton.style.display = "none";
  focusCheckbox.style.display = "none";
});

// focus hover effect
focus.addEventListener("mouseenter", (event) => {
  event.preventDefault();
  focusCheckbox.classList.remove("opacity-0");
  focusButton.classList.remove("opacity-0");
});
focus.addEventListener("mouseleave", (event) => {
  event.preventDefault();
  focusCheckbox.classList.add("opacity-0");
  focusButton.classList.add("opacity-0");
});

// get DOM elements
const todoList = document.querySelector(".todo-list");
const todoInput = document.querySelector(".todo-input");
const todoWidget = document.getElementById("todo-widget");

// set up todo items
let todos = JSON.parse(localStorage.getItem("todos")) || [];

function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    const todoItem = document.createElement("li");
    todoItem.classList.add("todo-item");
    todoItem.innerHTML = `
      <input type="checkbox" id="todo${index}" ${
      todo.completed ? "checked" : ""
    }>
      <label for="todo${index}" class="todo-text ${
      todo.completed ? "completed" : ""
    }">${todo.text}</label>
      <button class="edit-button"><img src="resources/pen-clip.png" /></button>
      <button class="delete-button"><img src="resources/cross-circle.png" /></button>
    `;
    const todoCheckbox = todoItem.querySelector("input[type='checkbox']");
    const todoText = todoItem.querySelector(".todo-text");
    const editButton = todoItem.querySelector(".edit-button");
    const deleteButton = todoItem.querySelector(".delete-button");
    todoCheckbox.addEventListener("change", function () {
      todo.completed = this.checked;
      if (todo.completed) {
        todoText.classList.add("completed");
      } else {
        todoText.classList.remove("completed");
      }
      saveTodos();
    });
    editButton.addEventListener("click", function () {
      const input = document.createElement("input");
      input.type = "text";
      input.value = todo.text;
      todoItem.replaceChild(input, todoText);
      input.focus();
      input.addEventListener("blur", function () {
        todo.text = input.value.trim();
        if (todo.text) {
          todoItem.replaceChild(todoText, input);
          todoText.textContent = todo.text;
          saveTodos();
        } else {
          todos.splice(index, 1);
          renderTodos();
          saveTodos();
        }
      });
      input.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
          todo.text = input.value.trim();
          if (todo.text) {
            todoItem.replaceChild(todoText, input);
            todoText.textContent = todo.text;
            saveTodos();
          } else {
            todos.splice(index, 1);
            renderTodos();
            saveTodos();
          }
        }
      });
    });
    deleteButton.addEventListener("click", function () {
      todos.splice(index, 1);
      renderTodos();
      saveTodos();
    });
    todoList.appendChild(todoItem);
  });
}
renderTodos();

// display todo widget
function displayWidget() {
  if (todoWidget.style.display === "none") {
    todoWidget.style.display = "flex";
  } else {
    todoWidget.style.display = "none";
  }
}

const todoButton = document.getElementById("todo-button");
todoButton.addEventListener("click", displayWidget);

// add new todo item
function addTodo() {
  const text = todoInput.value.trim();
  if (text) {
    todos.push({ text, completed: false });
    renderTodos();
    saveTodos();
    todoInput.value = "";
  }
}
todoInput.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    addTodo();
  }
});

// save todo items to local storage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// intro page
// declare DOM elements
const container1 = document.getElementById("container-1");
const container2 = document.getElementById("container-2");
const container3 = document.getElementById("container-3");

const formName = document.getElementById("form-name");
const formEmail = document.getElementById("form-email");
const nameInput = document.getElementById("name-input");
const emailInput = document.getElementById("email-input");
const nameFormContainer = document.getElementById("name-form-container");
const emailFormContainer = document.getElementById("email-form-container");

// check if user has logged in with name
function checkNameInLocalStorage() {
  const name = localStorage.getItem("name");
  if (name !== null) {
    // do something if the "name" key is present in localStorage
    showContainer3();
    console.log("Name is present in localStorage:", name);
  } else {
    // do something else if the "name" key is not present in localStorage
    console.log("Name is not present in localStorage");
  }
}
window.addEventListener("load", checkNameInLocalStorage);

// formName eventlistener to proceed to formEmail
formName.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = nameInput.value;
  localStorage.setItem("name", name); // store name in localStorage
  console.log(name);
  nameInput.value = ""; // reset the value of the input element

  showEmailFormContainer();
});

function showEmailFormContainer() {
  const name = localStorage.getItem("name");
  const emailLabel = document.getElementById("email-label");
  emailLabel.textContent = `What's your email, ${name}`;

  // fade out the name form container
  nameFormContainer.classList.add("opacity-0");
  setTimeout(() => {
    nameFormContainer.classList.add("hidden");
  }, 500); // delay the transition for 500 milliseconds

  // fade in the email form container
  setTimeout(() => {
    emailFormContainer.classList.remove("hidden");
    emailFormContainer.classList.add("opacity-1");
    emailInput.focus();
  }, 500); // delay the transition for 500 milliseconds
}

// formEmail eventlistener to proceed to container-2
formEmail.addEventListener("submit", (event) => {
  event.preventDefault();

  container1.classList.add("opacity-0");
  setTimeout(() => {
    container1.classList.add("hidden");
  }, 500);

  setTimeout(() => {
    container2.classList.remove("hidden", "opacity-0");
    container2.classList.add("opacity-1");
  }, 500);
});

// proceed button eventlistener to show container-3
// declare container-3 elements
const mainGreeting = document.getElementById("main-greeting");
const proceedButton = document.getElementById("proceed-button");
proceedButton.addEventListener("click", (event) => {
  event.preventDefault();

  showContainer3();
});

function showContainer3() {
  const widget = document.getElementById("todo-widget");
  widget.style.display = "none";
  container1.classList.add("opacity-0", "hidden");
  container2.classList.add("opacity-0");
  setTimeout(() => {
    container2.classList.add("hidden");
  }, 500);

  setTimeout(() => {
    container3.classList.remove("hidden", "opacity-0");
    container3.classList.add("opacity-1");
  }, 500);
  updateContainerTime();
  updateContainerFocus();
}

function updateContainerTime() {
  const timeOfDay = new Date();
  const currentHour = timeOfDay.getHours();
  const name = localStorage.getItem("name");
  const mainGreeting = document.getElementById("main-greeting");
  if (currentHour < 12) {
    mainGreeting.textContent = `Good morning, ${name}`;
  } else if (currentHour < 18) {
    mainGreeting.textContent = `Good afternoon, ${name}`;
  } else {
    mainGreeting.textContent = `Good evening, ${name}`;
  }
}

function updateContainerFocus() {
  if (localStorage.getItem("focus")) {
    console.log("focus is present");
    focusCheckbox.style.display = "block";
    focusButton.style.display = "block";
  } else {
    console.log("focus is not present");
    focusCheckbox.style.display = "none";
    focusButton.style.display = "none";
  }
}

// quotes API
const quote = document.querySelector("blockquote p");
const cite = document.querySelector("blockquote cite");

let allQuotes = [];

async function getQuotes() {
  // Fetch a list of quotes from the Quotable API
  const response = await fetch("https://api.quotable.io/quotes?limit=100");
  const data = await response.json();

  if (response.ok) {
    // Save all the quotes in a global variable
    allQuotes = data.results;
  } else {
    console.log(data);
  }
}

function getRandomQuote(minLength, maxLength) {
  // Filter the list of quotes based on length
  const filteredQuotes = allQuotes.filter((quote) => {
    return (
      quote.content.length >= minLength && quote.content.length <= maxLength
    );
  });

  // Select a random quote from the filtered list
  const randomQuote =
    filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
  return randomQuote;
}

async function updateQuote(minLength = 0, maxLength = 60) {
  // Ensure that all quotes have been loaded before attempting to filter them
  if (allQuotes.length === 0) {
    await getQuotes();
  }

  // Get a random quote that meets the length criteria
  const quoteData = getRandomQuote(minLength, maxLength);

  // Update DOM elements
  quote.textContent = `"${quoteData.content}"`;
  cite.textContent = `- ${quoteData.author}`;
  cite.style.opacity = "0%";
}

updateQuote();

setInterval(updateQuote, 60000);

// quote hover effect
const quoteContainer = document.getElementById("blockquote");
quoteContainer.addEventListener("mouseenter", () => {
  quote.style.transform = "translateY(-5px)";
  quote.style.transition = "all .3s ease-in-out";
  cite.style.opacity = "70%";
  cite.style.transform = "translateY(3px)";
  cite.style.transition = "all .3s ease-in-out";
  console.log("mouse-enter");
});
quoteContainer.addEventListener("mouseleave", () => {
  quote.style.transform = "translateY(10px)";
  quote.style.transition = "all .3s ease-in-out";
  cite.style.opacity = "0%";
  cite.style.transform = "translateY(-3px)";
  cite.style.transition = "all .3s ease-in-out";
  console.log("mouse-leave");
});
