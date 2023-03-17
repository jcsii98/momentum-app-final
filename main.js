const section1 = document.querySelector('#section1');
const section2 = document.querySelector('#section2');
const section3 = document.querySelector('#section3');
const section4 = document.querySelector('#section4');
const section5 = document.querySelector('#section5');
const forms = document.querySelectorAll('form');
const form1 = document.getElementById("form-1");
const form2 = document.getElementById("form-2");
const form3 = document.getElementById("form-3");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");

function showSection1() {
  section2.classList.remove('section-show', 'pointer-events');
  section1.classList.add('section-show', 'pointer-events');
  nameInput.value = "";
}

function showSection2() {
  section1.classList.remove('section-show', 'pointer-events');
  section2.classList.add('section-show', 'pointer-events');
  emailInput.value = "";
}

function showSection3() {
  section2.classList.remove('section-show', 'pointer-events');
  section3.classList.add('section-show', 'pointer-events');
}

function showSection4() {
  section3.classList.remove('section-show', 'pointer-events');
  section4.classList.add('section-show', 'pointer-events');
  const footer = document.getElementById('main-footer');
  footer.classList.remove('hidden');
  const name = document.getElementById("name").value;
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  if (currentHour < 12) {
    document.getElementById("greeting").textContent = `Good morning, ${name}.`;
  } else if (currentHour < 18) {
    document.getElementById("greeting").textContent = `Good afternoon, ${name}.`;
  } else {
    document.getElementById("greeting").textContent = `Good evening, ${name}.`;
  }
}

function showSection5() {
  section5.classList.add('section-show', 'pointer-events');
}


form1.addEventListener("submit", (event) => {
    // prevent refreshing when submitted
    event.preventDefault();

    //hide form1
    section2.classList.add('section-show', 'pointer-events');
    // show form2
    section1.classList.remove('section-show', 'pointer-events');

    // concatenate name into email-greeting 
    
    const name = document.getElementById("name").value;
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
  const response = await fetch('http://worldtimeapi.org/api/ip');
  const data = await response.json();
  return new Date(data.datetime);
}

function displayTime() {
  getCurrentTime().then(time => {
    const formattedTime = formatTime(time);
    const timeEl = document.getElementById('time');
    timeEl.textContent = formattedTime;
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
  const form3 = document.getElementById("form-3");

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
    
    const today = document.getElementById("today");
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
   
// todo widget
const btn4 = document.getElementById('button-4');
const btn5 = document.getElementById('button-5');
const btn6 = document.getElementById('button-6');
const btn7 = document.getElementById('button-7');
const btn8 = document.getElementById('button-8');
const btn9 = document.getElementById('button-9');
const menuBtn = document.getElementById('menu-button');
const input1 = document.getElementById('input-1');
const mainWidget = document.getElementById('main-widget');
const widgetForm = document.getElementById('widget-form');
const todoList = document.getElementById('todo-list');
const menuContainer = document.getElementById('menu-container');

// open todo widget

btn4.addEventListener('click', () =>{
    if (mainWidget.style.display === 'grid') {
        mainWidget.style.display = 'none';
    } else {
        mainWidget.style.display = 'grid';
    }
});

// upon submission
    // add and display list of items
    widgetForm.addEventListener('submit', (event) => {
        event.preventDefault();
        // show list
        todoList.style.display = 'block';
        // add item
        const newItem = document.createElement('li');
        const checkboxWidget = document.createElement('input');
        checkboxWidget.type = 'checkbox';
        newItem.classList.add('editable');
        newItem.innerText = input1.value;
        newItem.prepend(checkboxWidget);
        todoList.appendChild(newItem); 
        input1.value = '';
        
        checkboxWidget.addEventListener('change', function () {
          if (this.checked) {
            newItem.classList.add('completed');
          } else {
            newItem.classList.remove('completed');
          }
        })
        // hide form
        widgetForm.style.display = 'none';
        const widgetHeader = document.getElementById('widget-header');
        widgetHeader.style.display = 'none';
    })

// menu button
    // open menu
    menuBtn.addEventListener('click', () =>{
        if (menuContainer.style.display === 'flex') {
            menuContainer.style.display = 'none';
        } else {
            menuContainer.style.display = 'flex';
        }
    });

    // add more todos -- button 7
    btn7.addEventListener('click', () => {
        // hide list
        todoList.style.display = 'none';

        // show form
        widgetForm.style.display = 'flex';
        const widgetHeader = document.getElementById('widget-header');
        widgetHeader.style.display = 'block';
    })

    // make list items editable
    document.addEventListener('DOMContentLoaded', () => {
        
        btn8.addEventListener('click', () => {
            const listItems = document.querySelectorAll('.editable');
            listItems.forEach((item) => {
                item.contentEditable = !item.isContentEditable;
                 if (item.contentEditable) {
        console.log('List item is now editable')};
            });
        });
    });


// background 

  const backgrounds = [
        "/resources/maciek-sulkowski-VtQ7UGevG-I-unsplash.jpg",
        "/resources/mark-stuckey-Sk5htsyTsig-unsplash.jpg",
        "/resources/sajad-nori-suuKCJBdQ_Q-unsplash.jpg",
      ];
      const slideTime = 60000;
      let i = 0;

      function changeBackground() {
        const transitionTime = 0;
        document.body.style.transition = `background-image ${transitionTime}ms ease-in-out`;
        document.body.style.backgroundImage = "url(" + backgrounds[i] + ")";
        if (i < backgrounds.length - 1) {
          i++;
        } else {
          i = 0;
        }
        setTimeout(changeBackground, slideTime);
      }

      window.onload = changeBackground;