let form = document.getElementById("form");
let taskInput = document.getElementById("taskInput");
let tasksUl = document.getElementById("tasksUl");

let currentDate = document.getElementById("currentDate");

let days = document.getElementById("days");

function updateTime() {
  let now = new Date();
  let day = now.getDate();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let weekday = new Date().toDateString();

  days.textContent = weekday;
  currentDate.textContent = ` ${hour} : ${minute}`;
}

setInterval(updateTime, 1000);

let todos = JSON.parse(localStorage.getItem("todos")) || [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let currentTime = new Date().toLocaleTimeString();
  let newTask = {
    ...{ id: todos.length + 1, task: taskInput.value.trim(), time: currentTime, completed: false },
  };
  todos.push(newTask);

  localStorage.setItem("todos", JSON.stringify(todos));
  createHtmlContent(todos);
  taskInput.value = "";
});

function createHtmlContent(tasks) {
  tasksUl.innerHTML = "";
  tasks.forEach((task) => {
    let noteDiv = document.createElement("div");
    noteDiv.classList.add("Note_hit");
    let taskContentDiv = document.createElement("div");
    let taskTitle = document.createElement("h1");
    taskTitle.textContent = task.task;
    taskTitle.classList.add("taskTitle");
    let taskTime = document.createElement("p");
    taskTime.textContent = `Today at ${task.time}`;
    taskTime.classList.add("taskTime");
    taskContentDiv.appendChild(taskTitle);
    taskContentDiv.appendChild(taskTime);
    let iconDiv = document.createElement("div");
    iconDiv.classList.add("iconediv")
    let deleteIcon = document.createElement("img");
    deleteIcon.src = "./images/Vector.png";
    iconDiv.appendChild(deleteIcon);
    let checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.classList.add("check_input")
  iconDiv.appendChild(checkbox);
  checkbox.checked = task.completed; 
if (task.completed) {
  taskTitle.classList.add("completed"); 
}
checkbox.addEventListener("change", () => {
  task.completed = checkbox.checked; 
  localStorage.setItem("todos", JSON.stringify(todos)); 

  if (checkbox.checked) {
    taskTitle.classList.add("completed"); 
  } else {
    taskTitle.classList.remove("completed"); 
  }
});

  
    deleteIcon.addEventListener("click", () => {
      deleteTask(task.id);
    });

    noteDiv.appendChild(taskContentDiv);
    noteDiv.appendChild(iconDiv);
    tasksUl.appendChild(noteDiv);
  });
}


function deleteTask(taskId) {
  todos = todos.filter((task) => task.id !== taskId);
  localStorage.setItem("todos", JSON.stringify(todos));

  createHtmlContent(todos);
}
if (todos.length > 0) {
  createHtmlContent(todos);
}

