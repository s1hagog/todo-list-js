//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const displayMsg = document.querySelector('.form-message');
const filterOption = document.querySelector('.filter-todo');

//Event Listener

todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', updateTodo);
filterOption.addEventListener('click', filterTodo);
document.addEventListener('DOMContentLoaded', onloadFunc);

//Functions

function addTodo(e) {
    e.preventDefault();

    //Clear Display Message
    displayMsg.innerText = ' ';

    if (todoInput.value) {
        //Todo div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        //Create li
        const newTodo = document.createElement('li');
        newTodo.innerText = todoInput.value;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        //Check mark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = `<i class="fas fa-check"></i>`;
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);

        //Check trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);

        //Append to list
        todoList.appendChild(todoDiv);

        //Add to local storage
        saveLocalTodos(todoInput.value);

        //Clear Input
        todoInput.value = '';
    } else {
        //Display Error message
        displayMsg.innerText =
            'Oooh... Somebody forgot to enter the task in the input!';
        displayMsg.classList.add('fail');
    }
}

function updateTodo(e) {
    const target = e.target;

    //Delete todo
    if (target.classList.contains('trash-btn')) {
        target.parentNode.classList.add('fall');

        //Option one to wait
        // setTimeout(function () {
        //     target.parentNode.remove();
        // }, 500);

        //OPtion two to wait
        target.parentNode.addEventListener('transitionend', function () {
            this.remove();
        });

        //Delete from local storage;
        removeLocalTodos(target.parentNode);
    } else if (target.classList.contains('complete-btn')) {
        target.parentNode.classList.toggle('completed');
        changeIcons(target);
    } else {
        console.log('Clicked somewhere else');
    }
}

function changeIcons(el) {
    //change class
    el.classList.toggle('remove-complete');

    //change icon
    if (el.classList.contains('remove-complete')) {
        el.innerHTML = `<i class="fas fa-times"></i>`;
    } else {
        el.innerHTML = `<i class="fas fa-check"></i>`;
    }
}

function filterTodo(e) {
    const todos = todoList.children;

    for (todo of todos) {
        switch (e.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    }
}

function saveLocalTodos(todo) {
    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    for (todo of todos) {
        //Todo div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        //Create li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        //Check mark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = `<i class="fas fa-check"></i>`;
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);

        //Check trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);

        //Append to list
        todoList.appendChild(todoDiv);
    }
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    filter = todo.children[0].innerText;
    todos.splice(todos.indexOf(filter), 1);

    console.log(todos);
    //set back array
    localStorage.setItem('todos', JSON.stringify(todos));
}

function onloadFunc() {
    getTodos();
}
