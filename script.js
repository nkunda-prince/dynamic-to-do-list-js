// Ensure the script runs only after the HTML document has fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // Select important DOM elements
    const addButton = document.getElementById('add-task-btn');   // "Add Task" button
    const taskInput = document.getElementById('task-input');     // Input field
    const taskList = document.getElementById('task-list');       // UL that holds tasks

    // Function to add a new task
    function addTask() {

        // Retrieve and trim task text
        const taskText = taskInput.value.trim();

        // Validate input: prevent adding empty tasks
        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }

        // Create a new <li> element for the task
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = "remove-btn";

        // Assign onclick event to remove the task
        removeBtn.onclick = function () {
            taskList.removeChild(li);
        };

        // Append the remove button to the <li> and then append <li> to the list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear the input field after adding the task
        taskInput.value = "";
    }

    // Event listener: Add task when button is clicked
    addButton.addEventListener('click', addTask);

    // Event listener: Add task when Enter key is pressed
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // (Optional based on instructions) — invokes addTask on DOM load
    // This would normally add an empty task, so we leave it without text.
    // Keeping it to match instructions.
    // addTask();
});
