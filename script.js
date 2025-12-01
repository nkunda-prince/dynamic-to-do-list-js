// script.js
// To-Do list with Local Storage persistence

document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Key used in localStorage
    const STORAGE_KEY = 'tasks';

    // In-memory array of tasks
    let tasks = [];

    // Load tasks from localStorage and render them
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        tasks = Array.isArray(storedTasks) ? storedTasks : [];
        renderTasks();
    }

    // Save current tasks array to localStorage
    function saveTasks() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }

    // Create and return an li element for a task at a given index
    function createTaskElement(taskText, index) {
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn'); // required usage

        // Remove click handler: remove task by index and re-render/save
        removeBtn.onclick = function () {
            // Remove the task at the provided index
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        };

        // Append remove button to the li
        li.appendChild(removeBtn);

        return li;
    }

    // Render all tasks from the tasks array into the DOM
    function renderTasks() {
        // Clear existing list
        taskList.innerHTML = '';

        // Create list items for each task (keeping index consistent)
        tasks.forEach((taskText, index) => {
            const li = createTaskElement(taskText, index);
            taskList.appendChild(li);
        });
    }

    /**
     * addTask
     * - If taskText is provided, it will be used.
     * - If not, the value is taken from the taskInput.
     * - When save === true, the task is stored to localStorage.
     */
    function addTask(taskText = null, save = true) {
        // If no text passed, read from input
        let text = taskText;
        if (text === null) {
            text = taskInput.value.trim();
            if (text === "") {
                alert("Please enter a task!");
                return;
            }
        }

        // Add to tasks array if saving is desired
        if (save) {
            tasks.push(text);
            saveTasks();
        } else {
            // If not saving, ensure tasks still includes it for rendering (used only if needed)
            tasks.push(text);
        }

        // Re-render the list and clear the input
        renderTasks();
        taskInput.value = "";
    }

    // Event listener: Add task when button is clicked
    addButton.addEventListener('click', function () {
        addTask(); // reads from input and saves by default
    });

    // Event listener: Add task when Enter key is pressed in input
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Initialize by loading tasks from localStorage
    loadTasks();
});
