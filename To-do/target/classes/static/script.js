const apiUrl = "http://localhost:8080/tasks"; // ✅ Ensure the URL is correct

// ✅ Fetch and display tasks from backend
async function fetchTasks() {
    const response = await fetch(apiUrl);
    const tasks = await response.json();
    
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; // Clear previous tasks

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${task.title} - ${task.description} 
            <button onclick="deleteTask(${task.id})">❌</button>
        `;
        taskList.appendChild(li);
    });
}

// ✅ Add a new task to backend
async function addTask() {
    const title = document.getElementById("taskTitle").value;
    const description = document.getElementById("taskDescription").value;

    if (title === "" || description === "") {
        alert("Please enter task details");
        return;
    }

    const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, completed: false })
    });

    if (response.ok) {
        fetchTasks(); // Refresh tasks
        document.getElementById("taskTitle").value = "";
        document.getElementById("taskDescription").value = "";
    }
}

// ✅ Delete a task from backend
async function deleteTask(id) {
    await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    fetchTasks(); // Refresh tasks
}

// ✅ Load tasks on page load
window.onload = fetchTasks;
