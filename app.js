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
}
newTodoBtn.addEventListener('click', () => {
    showWidgetForm();
    newTodoBtn.style.display = 'none';
})

// submit todo

widgetForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const value = input1.value.trim();
    if (value) {
        items.push(value);
        localStorage.setItem('items', JSON.stringify(items));
        input1.value ='';
        console.log(items);
    }
    displayListItems();
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
function displayListItems () {
    widgetBody1.style.display = 'none';
    // clear list before displaying updated list
    todoList.innerHTML = '';

    // create list item for each stored item
    for (let i = 0; i < items.length; i++) {
        const listItem = document.createElement('li');
        listItem.setAttribute('class', 'list-item');
        const listText = document.createElement('div');
        listText.textContent = items[i];
        listText.setAttribute('id', `text-${i}`);
        listText.setAttribute('class', 'list-text');
        listText.setAttribute('contenteditable', false);
        listItem.appendChild(listText);

        // checkbox for each
        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('id', `checkbox-${i}`);
        checkbox.setAttribute('class', 'list-checkbox');
        listItem.insertBefore(checkbox, listItem.firstChild);

        // edit btn for each
        const editBtn = document.createElement('button');
        editBtn.setAttribute('type', 'button');
        editBtn.setAttribute('id', `button-${i}`);
        editBtn.setAttribute('class', 'list-button opacity-0');
        listItem.appendChild(editBtn);
            // edit img
            const editImg = document.createElement('img');
            editImg.setAttribute('src', 'resources/edit.png');
            editImg.setAttribute('class', 'edit-img');
            editBtn.appendChild(editImg);

        // add event listener to each list item
        listItem.addEventListener('mouseenter', () => {
            editBtn.classList.remove('opacity-0');
        });
        listItem.addEventListener('mouseleave', () => {
            editBtn.classList.add('opacity-0');
        });
        // add event listener to each edit button
        editBtn.addEventListener('click', () => {
            const textElem = editBtn.previousSibling;
            textElem.contentEditable = true;
            textElem.focus();
            console.log('button click');
        });

        // add event listener to each list text
        listText.addEventListener('input', () => {
        if (listText.textContent.trim() === '') {
        listItem.remove();
        items.splice(i, 1);
        } else {
        items[i] = listText.textContent.trim();
        }
        });

        // add event listener to each checkbox
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                listText.classList.add('line-through');
            } else {
                listText.classList.remove('line-through');
            }
        });

        todoList.appendChild(listItem);
    }
}

