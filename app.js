// todo widget
  // declare buttons
const btn1 = document.getElementById('app-button-1');
const btn2 = document.getElementById('app-button-2');
const btn3 = document.getElementById('app-button-3');
const btn4 = document.getElementById('app-button-4');
const newTodoBtn = document.getElementById('new-todo');
const menuBtn = document.getElementById('app-menu-button');
const dropMenuButtons = document.querySelectorAll('.dropmenu-button');


const mainWidget = document.getElementById('main-widget');
const todoList = document.getElementById('todo-list');

const widgetBody1 = document.getElementById('widget-body-1');
const widgetBody2 = document.getElementById('widget-body-2');
const widgetFormContainer = document.getElementById('widget-form-container');
let items = JSON.parse(localStorage.getItem('items')) || [];
let checkboxStates = JSON.parse(localStorage.getItem('checkboxStates')) || [];

window.onload = function() {
    mainWidget.style.display = 'none';
}
function openCloseWidget() {
    console.log('openCloseWidget called');
    console.log('mainWidget.style.display:', mainWidget.style.display);
    
    if (mainWidget.style.display === 'flex') {
        console.log('mainWidget is closing');
        mainWidget.style.display = 'none';
    } else {
        if (items.length === 0) {
            console.log('array is empty');
            newTodoBtn.style.display = 'block';
            widgetBody1.style.display = 'flex';
            widgetBody2.style.display = 'none';
            mainWidget.style.display = 'flex';
            
        } else {
            displayListItems();
            widgetBody2.style.display = 'flex';
            widgetBody1.style.display = 'none';
            mainWidget.style.display = 'flex';
    }}}

btn1.addEventListener('click', () => {
    openCloseWidget();
})

const widgetForm = document.getElementById('widget-form');
const input1 = document.getElementById('input-1');

function showWidgetForm () {
    widgetBody2.style.display = 'flex';
    input1.focus();
}
newTodoBtn.addEventListener('click', () => {
    showWidgetForm();
    newTodoBtn.style.display = 'none';
})

// submit todo

// submit todo
widgetForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const value = input1.value.trim();
  if (value) {
    addItem(value);
    input1.value = '';
    displayListItems();
  }
});


// reset list 
function resetItems() {
  console.log('resetItems function called');
  localStorage.removeItem('items');
  items = [];
  todoList.innerHTML = '';
  newTodoBtn.style.display = 'block';
  widgetBody1.style.display = 'flex';
  widgetBody2.style.display = 'none';
}
const appMenuBtn = document.getElementById('app-menu-button');
appMenuBtn.addEventListener('click', (resetItems));

// display todo
function addItem(text) {
  const newItem = {
    name: text,
    completed: false // add completed property to the new item object
  };
  items.push(newItem);
  localStorage.setItem('items', JSON.stringify(items));
}
function displayListItems() {
  let items = JSON.parse(localStorage.getItem('items')) || [];
  widgetBody1.style.display = 'none';
  todoList.innerHTML = '';

  for (let i = 0; i < items.length; i++) {
    const name = items[i].name.trim();
    if (name !== '') {
      const listItem = document.createElement('li');
      listItem.setAttribute('class', 'list-item');
      const listText = document.createElement('div');
      listText.textContent = name;
      listText.setAttribute('id', `text-${i}`);
      listText.setAttribute('class', 'list-text');
      // add the completed class to the listText element if the checkbox is checked
      if (items[i].completed) {
        listText.classList.add('completed');
      }
      listText.setAttribute('contenteditable', false);
      listItem.appendChild(listText);

      const checkbox = document.createElement('input');
      checkbox.setAttribute('type', 'checkbox');
      checkbox.setAttribute('id', `checkbox-${i}`);
      checkbox.setAttribute('class', 'list-checkbox');
      checkbox.checked = items[i].completed;
      listItem.insertBefore(checkbox, listItem.firstChild);

      const editBtn = document.createElement('button');
      editBtn.setAttribute('type', 'button');
      editBtn.setAttribute('id', `button-${i}`);
      editBtn.setAttribute('class', 'list-button opacity-0');
      listItem.appendChild(editBtn);
      const editImg = document.createElement('img');
      editImg.setAttribute('src', 'resources/edit.png');
      editImg.setAttribute('class', 'edit-img');
      editBtn.appendChild(editImg);

      listItem.addEventListener('mouseenter', () => {
        editBtn.classList.remove('opacity-0');
      });
      listItem.addEventListener('mouseleave', () => {
        editBtn.classList.add('opacity-0');
      });

      editBtn.addEventListener('click', () => {
        const textElem = editBtn.previousSibling;
        textElem.contentEditable = true;
        textElem.focus();
        console.log('button click');
      });

      listText.addEventListener('input', () => {
        const trimmedName = listText.textContent.trim();
        if (trimmedName === '') {
          items.splice(i, 1);
          console.log('list item removed from array');
          console.log(items);
          listItem.remove();
          localStorage.setItem('items', JSON.stringify(items));
        } else {
          items[i].name = trimmedName;
          localStorage.setItem('items', JSON.stringify(items));
        }
      });

      checkbox.addEventListener('change', function() {
        items[i].completed = checkbox.checked;
        localStorage.setItem('items', JSON.stringify(items));
        // add the completed class to the listText element if the checkbox is checked
        if (checkbox.checked) {
          listText.classList.add('completed');
        } else {
          listText.classList.remove('completed');
        }
      });

      todoList.appendChild(listItem);
    }
  }
}


