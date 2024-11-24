let form = document.getElementById("form");
let taskInput = document.getElementById("taskInput");
let tasksUl = document.getElementById("tasksUl");

let today = new Date();
let data = new Date()

let dateString = today.toLocaleTimeString(); 
let dateControl = data.getDay()
document.getElementById("currentDate").textContent = dateString;
document.getElementById("data").textContent = dateControl

let todos = JSON.parse(localStorage.getItem("todos"));

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let currentTime = new Date().toLocaleTimeString(); 
  let newTask = {
    ...{ id: todos.length + 1, task: taskInput.value, time: currentTime }
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
    taskTitle.classList.add("taskTitle")
    let taskTime = document.createElement("p");
    taskTime.textContent = `Today at ${task.time}`; 
    taskTime.classList.add("taskTime")
    taskContentDiv.appendChild(taskTitle);
    taskContentDiv.appendChild(taskTime);
    let iconDiv = document.createElement("div");
    let circleIcon = document.createElement("img");
    circleIcon.src = "./images/akar-icons_circle.png"; 
    iconDiv.appendChild(circleIcon);
    let deleteIcon = document.createElement("img");
    deleteIcon.src = "./images/Vector.png"; 
    iconDiv.appendChild(deleteIcon)
    deleteIcon.addEventListener("click", () => {
      deleteTask(task.id); 
    });

    noteDiv.appendChild(taskContentDiv);
    noteDiv.appendChild(iconDiv);
    // noteDiv.appendChild(deleteIcon); 
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

