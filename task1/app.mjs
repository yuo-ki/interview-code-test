import express from 'express';
//Store data can be stored in memory. Due to requirements of the question, the file module is introduced here. 
import fs from 'fs';
const app = express();

// The local file path to store tasks  
const filePath = './tasks.txt';

// Define data structure of task. In the question, only the due day attribute is given. 
// The new "id" field uniquely identifies task, and the new field "taskName" is added.   
class Task {
    constructor(id, taskName, dueDay) {
        this.id = id;
        this.taskName = taskName;
        this.dueDay = dueDay;
    }
}

// Check the username and password  
function checkCredentials(username, password) {
    // Considering time, the username and password are hardcoded here. It is not appropriate to store password in plaintext. 
    // Other methods: 1. Obtain from configuration files or databases 2. JWT 3. Single sign-on 4. OAuth 5. Session 
    const validUsername = 'mss_user';
    const validPassword = 'mss_password';
    return username === validUsername && password === validPassword;
}

// Use middleware to verify username and password  
app.use((req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const base64Credentials = authHeader.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
        const [username, password] = credentials.split(':');
        if (checkCredentials(username, password)) {
            next();
        } else {
            res.status(401).send('Unauthorized');
        }
    } else {
        res.status(401).send('Unauthorized');
    }
});

// Read task
function readTasks() {
    try {
        // Two reading methods: asynchronous and synchronous. 
        // Choose synchronous reading method here. 
        // Reason: The number of requests is small and it won't cause blocking. Asynchronous reading requires additional efforts to ensure successful reading. 
        const data = fs.readFileSync(filePath, 'utf-8');
        const lines = data.split('\n');
        const tasks = [];
        for (let line of lines) {
            if (line.trim() !== '') {
                const [id, taskName, dueDay] = line.split(',');
                tasks.push(new Task(id, taskName, dueDay));
            }
        }
        return tasks;
    } catch (err) {
        return [];
    }
}

// Write tasks
function writeTasks(tasks) {
    const data = tasks.map(task => `${task.id},${task.taskName},${task.dueDay}`).join('\n');
    fs.writeFileSync(filePath, data, 'utf-8');
}

app.use(express.json())
// Add task
app.post('/tasks', (req, res) => {
    const newTask = new Task(Date.now().toString(), req.body.taskName, req.body.dueDay);
    const tasks = readTasks();
    tasks.push(newTask);
    writeTasks(tasks);
    res.status(201).json(newTask);
});

// Delete task
app.delete('/tasks/:id', (req, res) => {
    const id = req.params.id;
    const tasks = readTasks();
    const updatedTasks = tasks.filter(task => task.id !== id);
    writeTasks(updatedTasks);
    res.status(204).send();
});

// List all tasks by dueDay
app.get('/tasks', (req, res) => {
    const tasks = readTasks();
    tasks.sort((a, b) => a.dueDay.localeCompare(b.dueDay));
    res.status(200).json(tasks);
});

// Update task
app.put('/tasks/:id', (req, res) => {
    const id = req.params.id;
    const tasks = readTasks();
    const taskToModify = tasks.find(task => task.id === id);
    if (taskToModify) {
        taskToModify.taskName = req.body.taskName || taskToModify.taskName;
        taskToModify.dueDay = req.body.dueDay || taskToModify.dueDay;
        writeTasks(tasks);
        res.status(200).json(taskToModify);
    } else {
        res.status(404).send('Task not found');
    }
});

// Read task detail
app.get('/tasks/:id', (req, res) => {
    const id = req.params.id;
    const tasks = readTasks();
    const task = tasks.find(task => task.id === id);
    if (task) {
        res.status(200).json(task);
    } else {
        res.status(404).send('Task not found');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});