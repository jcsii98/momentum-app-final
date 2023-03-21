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
  const changeName = document.getElementById('change-name')
  const form3 = document.getElementById("form-3");
  const element = document.getElementById('cb-form-container');
  console.log(typeof element);
  console.log(typeof form3);
  function swapForm1() {
    const outerContainer = document.getElementById('todo-main-container');
    const element = document.getElementById('cb-form-container');
    outerContainer.replaceChild(form3, element);
    document.getElementById('todo-input').value = '';
  };
  changeName.addEventListener('click', () => {
    mainWidget.style.display = 'none';
    today.classList.add('hidden');
    swapForm1();
  })
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

// Define a function to fetch the quote
async function updateQuote() {
  // Fetch a random quote from the Quotable API
  const response = await fetch("https://api.quotable.io/random");
  const data = await response.json();
  if (response.ok) {
    // Update DOM elements
    quote.textContent = `"${data.content}"`;
    cite.textContent = `- ${data.author}`;
  } else {
    quote.textContent = "An error occured";
    console.log(data);
  }
};

updateQuote();

setInterval(updateQuote, 60000);

// to-do for today



document.addEventListener("DOMContentLoaded", function() {

  const form3 = document.getElementById('form-3');
  form3.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const input = document.getElementById("todo-input");
    const label = input.value;

    const cbFormContainer = document.createElement("div");
    const todoMainContainer = document.getElementById('todo-main-container');
    todoMainContainer.appendChild(cbFormContainer);

    cbFormContainer.id = "cb-form-container";
    cbFormContainer.setAttribute("class", "cb-form-container");

    const checkboxForm = document.createElement("form");
    checkboxForm.id = "checkbox-form";
    cbFormContainer.appendChild(checkboxForm);
    console.log("Appending checkboxForm to cbFormContainer...")

    // checkbox
    const checkbox = document.createElement("input");
    checkbox.id = "checkbox";
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("name", "todo-checkbox");
    checkbox.setAttribute("class", "opacity-0");
    checkboxForm.appendChild(checkbox);
    // checkbox effect
    const checkboxEffect = document.getElementById('checkbox');
    checkboxEffect.addEventListener('change', function() {
      if (this.checked) {
        checkboxLabel.classList.add('line-through');
      } else {
        checkboxLabel.classList.remove('line-through');
      };
    })

    // label
    const checkboxLabel = document.createElement("label");
    checkboxLabel.id = "checkbox-label";
    checkboxForm.appendChild(checkboxLabel);

    // edit button
    const todoEdit = document.createElement("button");
    todoEdit.textContent = "";
    todoEdit.id = "todo-edit";
    todoEdit.setAttribute("class", "opacity-0");
    todoEdit.setAttribute("type", "button");
    checkboxForm.appendChild(todoEdit);
    // edit function
    todoEdit.addEventListener('click', () => {
      todoMainContainer.replaceChild(form3, cbFormContainer);
      today.classList.add("hidden");
    })

    const todoEditPng = document.createElement("img");
    todoEditPng.id = "todo-edit-png";
    todoEditPng.setAttribute("class", "todo-edit-btn")
    todoEditPng.setAttribute("src", "/resources/edit.png");
    todoEdit.appendChild(todoEditPng);

    checkboxLabel.appendChild(document.createTextNode(label));

    todoMainContainer.replaceChild(cbFormContainer, form3); // Replace original form with checkbox form

    today.classList.remove("hidden");
    checkboxForm.setAttribute("class", "checkbox-form");

    // to-do hover effect
    checkboxForm.addEventListener('mouseenter', function() {
      console.log('mouse is over element');
      checkbox.classList.remove('opacity-0');
      todoEdit.classList.remove('opacity-0');
    });
    checkboxForm.addEventListener('mouseleave', function() {
      console.log('mouse is off element');
      checkbox.classList.add('opacity-0');
      todoEdit.classList.add('opacity-0');
    });
  });
});

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
