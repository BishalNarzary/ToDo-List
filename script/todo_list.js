let todoList=JSON.parse(localStorage.getItem('todoList')) || [];

renderTodoList();

function renderTodoList(){
  let todoListHTML='';

  todoList.forEach((todoObject, index)=>{
    //const task=todoObject.task;
    //const dueDate=todoObject.dueDate;

    const {task, dueDate}=todoObject;
    const todoHTML=`
      <div>${task}</div>
      <div>${dueDate}</div>
      <button class="js-delete-todo-button delete-todo-button">Delete</button>
    `;
    todoListHTML+=todoHTML;
  });

  document.querySelector('.js-todo-list')
    .innerHTML=todoListHTML;

  document.querySelectorAll('.js-delete-todo-button')
    .forEach((deleteButton, index)=>{
      deleteButton.addEventListener('click', ()=>{
        todoList.splice(index, 1);
        renderTodoList();
        localStorage.removeItem('todoList');
        localStorage.setItem('todoList', JSON.stringify(todoList));
      });
    });
}

document.querySelector('.js-task-input')
  .addEventListener('keydown', (event)=>{
    if (event.key==='Enter'){
      addToDo();
    }
  })

document.querySelector('.js-due-date-input')
  .addEventListener('keydown', (event)=>{
    if (event.key==='Enter'){
      addToDo();
    }
  })

document.querySelector('.js-add-todo-button')
  .addEventListener('click', ()=>{
    addToDo();
  });

function addToDo(){
  const taskInputElement=document.querySelector('.js-task-input');
  const task=taskInputElement.value;

  const dateInputElement=document.querySelector('.js-due-date-input');
  const dueDate=dateInputElement.value;

  todoList.push({
    //task: task,
    //dueDate: dueDate

    task,
    dueDate
  });

  taskInputElement.value='';
  dateInputElement.value='';

  renderTodoList();

  localStorage.setItem('todoList', JSON.stringify(todoList));
}