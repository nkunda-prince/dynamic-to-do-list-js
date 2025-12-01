// Ensure the script runs only after the HTML document has fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // Select important DOM elements
    const addButton = document.getElementById('add-task-btn');   
    const taskInput = document.getElementById('task-input');     
    const taskList = document.getElementById('task-list');       

    // Function to add a new task
    function addTask() {

        // Retrieve and trim the task text
        const taskText = taskInput.value.trim();

        // Check if task is empty
        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }

        // Create the li element
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create the remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";

        // Add class using classList.add (REQUIRED)
        removeBtn.classList.add('remove-btn');

        // Assign onclick event to remove the li
        removeBtn.onclick = function () {
            taskList.removeChild(li);
        };

        // Append remove button to li and li to task list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear input field
        taskInput.value = "";
    }

    // Add event listener for button click
    addButton.addEventListener('click', addTask);

    // Add event listener for Enter key
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

});
