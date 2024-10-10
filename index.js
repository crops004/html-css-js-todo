const textarea = document.querySelector('textarea')
const addBtn = document.getElementById('addBtn')
const todoContainer = document.querySelector('.todoContainer')

let todoList = [];

function initialLoad() {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
        try {
            todoList = JSON.parse(storedTodos).todoList || [];
        } catch (e) {
            console.error('Error parsing localStorage data:', e);
            todoList = [];
        }
    }
    updateUI();
}

initialLoad()

function addTodo(){
    const todo = textarea.value
    if (!todo) { return }

    console.log('Added todo: ', todo)
    todoList.push(todo)
    textarea.value = '' // resets to empty
    updateUI()
}


function deleteTodo (index) {
    todoList = todoList.filter((element, elementIndex) => index !== elementIndex);
    updateUI()
}

function editTodo (index) {
    const newTodo = prompt('Edit todo', todoList[index])
    if (!newTodo) { return }

    console.log('Edited todo: ', todoList[index], ' to ', newTodo)
    todoList[index] = newTodo
    updateUI()
}

function updateUI() {
    let newInnerHTML = ''

    todoList.forEach((todoElement, todoIndex) => {
        newInnerHTML += `<div class="todo">
                <p>${todoElement}</p>
                <div class="btnContainer">
                    <button class="iconBtn" onclick="editTodo(${todoIndex})"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button class="iconBtn" onclick="deleteTodo(${todoIndex})"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
            `
    }
    )

    todoContainer.innerHTML = newInnerHTML

    // Save to local storage
    localStorage.setItem('todos', JSON.stringify({ todoList }));
}

addBtn.addEventListener('click', addTodo);