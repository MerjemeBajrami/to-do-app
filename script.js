// Storing in variables some of the elements that we're going to use
const form = document.querySelector("#new-task-form");
const input = document.querySelector("#new-task-input");
const allTasks = document.querySelector("#tasks");
let myTasks = [];

if (localStorage.getItem('myTasks')) {
    myTasks = JSON.parse(localStorage.getItem('myTasks'))
}

// Showing all items by using the 
if (myTasks.length !== 0) {
    for (let i = 0; i < myTasks.length; i++) {
        showTask(myTasks[i]);
    }
}
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Creating an object to store the newly created task's values
    const task = { value: input.value, done: false };

    if (!input.value) {
        alert("Please write a task before submiting");
        return;
    }

    // Pushing the newly created task into array myTasks
    myTasks.push(task)

    showTask(task)

    // Storing task in local storage
    localStorage.setItem('myTasks', JSON.stringify(myTasks))
});

function showTask(task) {
    const taskContainer = document.createElement('div');
    taskContainer.classList.add('task');

    const taskContent = document.createElement('div');
    taskContent.classList.add('content');

    const taskInput = document.createElement('input');
    taskInput.classList.add('text');
    taskInput.type = 'text';
    taskInput.value = task.value;
    taskInput.setAttribute('readonly', 'readonly');

    const btnContainer = document.createElement('div');
    btnContainer.classList.add('actions');

    const btnEdit = document.createElement('button');
    btnEdit.classList.add('edit');
    btnEdit.innerText = 'Edit';
    btnEdit.value = task.done;

    const btnDone = document.createElement('button');
    btnDone.classList.add('done');
    btnDone.innerText = 'Done';

    const btnDelete = document.createElement('button');
    btnDelete.classList.add('delete');
    btnDelete.innerText = 'Delete';

    taskContainer.appendChild(taskContent);
    taskContent.appendChild(taskInput);
    taskContainer.appendChild(btnContainer);
    btnContainer.appendChild(btnEdit);
    btnContainer.appendChild(btnDone);
    btnContainer.appendChild(btnDelete);
    allTasks.insertAdjacentElement('afterbegin', taskContainer);

    input.value = '';

    btnEdit.addEventListener('click', () => {
        if (btnEdit.innerText.toLowerCase() == "edit") {
            btnEdit.innerText = "Save";
            taskInput.removeAttribute("readonly");
            taskInput.focus();
        } else {
            task.value = taskInput.value;
            btnEdit.innerText = "Edit";
            taskInput.setAttribute("readonly", "readonly");
            // Updating local storage
            localStorage.setItem("myTasks", JSON.stringify(myTasks))
        }
    });
    btnDone.addEventListener('click', () => {
        if (btnDone.innerHTML.toLowerCase() === "done") {
            // Switching done property from false to true
            task.done = true;
            taskInput.classList.add("checked");
            btnDone.innerHTML = "Undo";
        } else {
            // Switching done property from true to false
            task.done = false;
            taskInput.classList.remove("checked");
            btnDone.innerHTML = "Done";
        }
        // Updating local storage
        localStorage.setItem("myTasks", JSON.stringify(myTasks))
    });
    // Displaying done and undone tasks
    if (task.done) {
        taskInput.classList.add("checked");
        btnDone.innerHTML = "Undo";
    }
    else {
        taskInput.classList.remove("checked");
        btnDone.innerHTML = "Done";
    }

    btnDelete.addEventListener('click', () => {
        allTasks.removeChild(taskContainer);
        // Updating myTasks array, by excluding the current task with filter method
        myTasks = myTasks.filter(t => t !== task);
        // Updating local storage 
        localStorage.setItem("myTasks", JSON.stringify(myTasks))
    });
}