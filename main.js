const section1 = document.querySelector('#section1');
const section2 = document.querySelector('#section2');
const section3 = document.querySelector('#section3');
const section4 = document.querySelector('#section4');
const section5 = document.querySelector('#section5');
const forms = document.querySelectorAll('form');
const form1 = document.getElementById("form-1");
const form2 = document.getElementById("form-2");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const footer = document.getElementById('main-footer');
let todoItem = JSON.parse(localStorage.getItem('todoItem')) || [];
function checkNameInLocal() {
  const name = localStorage.getItem("name");
  if (name === null || name === "0") {
    showSection1();
  } else {
    section1.classList.remove('section-show', 'pointer-events');
    showSection4();
  }
}

function showSection1() {
  section4.classList.remove('section-show', 'pointer-events');
  footer.classList.add('hidden');
  section2.classList.remove('section-show', 'pointer-events');
  section1.classList.add('section-show', 'pointer-events');
  nameInput.value = "";
  resetItems();
}
function showSection2() {
  section1.classList.remove('section-show', 'pointer-events');
  section2.classList.add('section-show', 'pointer-events');
  emailInput.value = "";
  const name = localStorage.getItem("name");
  let emailString = `What's your email, ${name}?`;
  document.getElementById("email-greeting").innerHTML = emailString;
}
function showSection3() {
  section2.classList.remove('section-show', 'pointer-events');
  section3.classList.add('section-show', 'pointer-events');
}
function showSection4() {
  section3.classList.remove('section-show', 'pointer-events');
  section4.classList.add('section-show', 'pointer-events');

  footer.classList.remove('hidden');
  const name = localStorage.getItem("name");
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  if (currentHour < 12) {
    document.getElementById("greeting").textContent = `Good morning, ${name}.`;
  } else if (currentHour < 18) {
    document.getElementById("greeting").textContent = `Good afternoon, ${name}.`;
  } else {
    document.getElementById("greeting").textContent = `Good evening, ${name}.`;
  }
  displayTodoToday();
}

function showSection5() {
  section5.classList.add('section-show', 'pointer-events');
}

window.addEventListener("load", checkNameInLocal);
form1.addEventListener("submit", (event) => {
  // prevent refreshing when submitted
  event.preventDefault();

  //hide form1
  section2.classList.add('section-show', 'pointer-events');
  // show form2
  section1.classList.remove('section-show', 'pointer-events');

  // concatenate name into email-greeting 

  const name = document.getElementById("name").value;
  localStorage.setItem("name", name);
  let emailString = `What's your email, ${name}?`;
  document.getElementById("email-greeting").innerHTML = emailString;

  // set focus to email input field
  form2.focus();
});

form2.addEventListener("submit", (event) => {
  event.preventDefault();

  section2.classList.remove('section-show', 'pointer-events');
  section3.classList.add('section-show', 'pointer-events');
})

const button1 = document.getElementById('button-1');
const button2 = document.getElementById('button-2');
const button3 = document.getElementById('button-3');

button1.addEventListener('click', showSection1);

button2.addEventListener('click', showSection3);

button3.addEventListener('click', showSection4);


// time API

let is12Hour = false;

function formatTime(date) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    hourCycle: is12Hour ? "h11" : "h23",
    hour12: is12Hour,
    hour: 'numeric',
    minute: 'numeric',
  });
  return formatter.format(date).replace(/\s?[AP]M/, ''); // remove "AM" or "PM"
}

async function getCurrentTime() {
  try {
    const response = await fetch('https://worldtimeapi.org/api/ip');
    const data = await response.json();
    return new Date(data.datetime);
  } catch (error) {
    console.error(error);
    // Handle the error here, e.g. display an error message to the user.
    return null;
  }
}

function displayTime() {
  getCurrentTime().then(time => {
    if (time !== null) {
      const formattedTime = formatTime(time);
      const timeEl = document.getElementById('time');
      timeEl.textContent = formattedTime;
    }
  });
}

function toggleFormat() {
  is12Hour = !is12Hour;
}

setInterval(displayTime, 1000);

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
  const filteredQuotes = allQuotes.filter(quote => {
    return quote.content.length >= minLength && quote.content.length <= maxLength;
  });
  
  // Select a random quote from the filtered list
  const randomQuote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
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
}

updateQuote();

setInterval(updateQuote, 60000);

// quote hover effect
const quoteContainer = document.getElementById('blockquote');
quoteContainer.addEventListener('mouseenter', () => {
    quote.style.transform = 'translateY(-10px)';
    quote.style.transition = 'all .3s ease-in-out';
    cite.style.opacity = '60%';
    cite.style.transform = 'translateY(3px)';
    cite.style.transition = 'all .3s ease-in-out';
});
quoteContainer.addEventListener('mouseleave', () => {
    quote.style.transform = 'translateY(10px)';
    quote.style.transition = 'all .3s ease-in-out';
    cite.style.opacity = '0%';
    cite.style.transform = 'translateY(-3px)';
    cite.style.transition = 'all .3s ease-in-out';
});


// to-do for today
  const noTodo = document.getElementById('form-3');
  const yesTodo = document.getElementById('cb-form-container');
  let todoToday = JSON.parse(localStorage.getItem('todoToday')) || [];
  const todoTodayInput = document.getElementById('todo-input');
  // todo submission 
  noTodo.addEventListener('submit', function(event) {
    event.preventDefault();
    const value = todoTodayInput.value.trim();
    if (value) {
      todoToday.push(value);
      localStorage.setItem('todoToday', JSON.stringify(todoToday));
      console.log(todoToday);
    }
    displayTodoToday();
  });

  // reset list 
  function resetTodoToday() {
  console.log('resetTodoToday called');
  // Empty the array
  today.classList.add('hidden');
  todoToday = [];

  // Remove the item from local storage
  localStorage.removeItem('todoToday');
  const todoInput = document.getElementById('todo-input');
  todoInput.value ='';
}

// Store the empty array in localStorage
localStorage.setItem("todoToday", JSON.stringify(todoToday));
  // displayTodoToday
  function displayTodoToday() {
    const todoTodayList = document.createElement('div');
    todoTodayList.setAttribute('id', 'todo-today-list');
    const todoTodayContainer = document.getElementById('todo-main-container');
    todoTodayContainer.appendChild(todoTodayList);

    if (todoToday.length === 0) {
      console.log('no todos for today');
      today.classList.add('hidden');
    } else {
        noTodo.style.display = 'none';
        const today = document.getElementById('today');
        today.classList.remove('hidden');
        const listItem = document.createElement('div');
        listItem.setAttribute('contenteditable', 'false');
        listItem.id = 'list-item-text';
        listItem.textContent = todoToday;
        todoTodayList.appendChild(listItem);

        const todayCheckbox = document.createElement('input');
        todayCheckbox.setAttribute('type', 'checkbox');
        todayCheckbox.setAttribute('class', 'opacity-0');
        todayCheckbox.setAttribute('id', 'today-checkbox');
        todoTodayList.appendChild(listItem);
        todoTodayList.insertBefore(todayCheckbox, todoTodayList.firstChild);

        // load checkbox saved state
        var storedValue = localStorage.getItem('todayCheckboxState');const checkboxEffect = document.getElementById('list-item-text')
        if (storedValue) {
          todayCheckbox.checked = true;
          
          checkboxEffect.classList.add('line-through');
        } else {
          todayCheckbox.checked = false;
          checkboxEffect.classList.remove('line-through');
        }

        const todoTodayEdit = document.createElement('button');
        todoTodayEdit.setAttribute('type', 'button');
        todoTodayEdit.setAttribute('id', 'today-button')
        todoTodayEdit.setAttribute('class', 'opacity-0');
        todoTodayList.appendChild(todoTodayEdit);
          const textElem = document.getElementById('list-item-text');
          todoTodayEdit.addEventListener('click', () => {
            textElem.setAttribute('contenteditable', 'true');
            textElem.focus();
          })
    // edit img
      const editImg = document.createElement('img');
      editImg.setAttribute('src', 'resources/edit.png');
      todoTodayEdit.appendChild(editImg);
          // event listener when editing
          const listItemText = document.getElementById('list-item-text');
listItemText.addEventListener('input', () => {
  if (listItemText.textContent.trim() === '') {
    // Remove the only item in the array
    todoToday.pop();
    console.log('todoToday item removed');

    // Remove todoTodayList from the DOM
    const todoTodayList = document.getElementById('todo-today-list');
    todoTodayList.remove();
    console.log('todoTodayList removed');

    // Reset the todo today section
    resetTodoToday();

    // Show the "Add to Today's Tasks" form
    const form3 = document.getElementById('form-3');
    form3.style.display = 'block';

    console.log('input deleted');
  } else {
    // Empty the todoToday array
    todoToday.length = 0;

    // Push the new value into the array
    todoToday.push(listItemText.value);

    // Update the local storage with the new value
    localStorage.setItem('todoToday', JSON.stringify(todoToday));
  }
});

          // editable stop
          textElem.addEventListener('blur', () => {
            textElem.setAttribute('disabled', 'true')
          });
          textElem.addEventListener('keydown', (event) => {
              if (event.key === 'Enter') {
                  textElem.setAttribute('disabled', 'true');
                }
          })

          //hover effect
          todoTodayList.addEventListener('mouseenter', () => {
            todoTodayEdit.classList.remove('opacity-0');
            todayCheckbox.classList.remove('opacity-0');
          });
          todoTodayList.addEventListener('mouseleave', () => {
            todoTodayEdit.classList.add('opacity-0');
            todayCheckbox.classList.add('opacity-0');
          });
          // checkbox effect
          const checkbox = document.getElementById('today-checkbox');
          checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
            localStorage.setItem('todayCheckboxState', checkbox.checked);
            console.log("Stored value: " + localStorage.getItem('todayCheckboxState'));
            textElem.classList.add('line-through');
          } else {
            textElem.classList.remove('line-through');
            localStorage.removeItem('todayCheckboxState');
          }
          })
    }
  }

// background 
const backgrounds = [
   "resources/bg1.jpg",
   "resources/bg2.jpg",
   "resources/bg3.jpg",
   "resources/bg4.jpg"
];

const slideTime = 20000;
let i = 0;

function changeBackground() {
  console.log("Changing background...");
  document.body.style.backgroundImage = "url(" + backgrounds[i] + ")";
  i++;
  if (i >= backgrounds.length) {
    i = 0;
  }
  console.log("Background set to: ", backgrounds[i]);
  setTimeout(changeBackground, slideTime);
}

console.log("Starting background slideshow...");
changeBackground();
