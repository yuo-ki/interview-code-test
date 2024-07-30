const express = require('express');
//存储数据可以存储在内存，由于题目要求，这里引入文件模块
const fs = require('fs');
const app = express();

// 存储task的本地文件路径
const filePath = './tasks.txt';

// 定义task的数据结构，题目中只给定了due day这一个属性，id用来标识task，自定义属性taskName
class Task {
    constructor(id, taskName, dueDay) {
        this.id = id;
        this.taskName = taskName;
        this.dueDay = dueDay;
    }
}

// 检查用户名和密码
function checkCredentials(username, password) {
    // 考虑时间原因，这里硬编码用户名和密码（明文存储不合适）
    // 其他方式：1.从配置文件或数据库获取 2.JWT 3.单点登录 4.OAuth 5.会话Session
    const validUsername = 'mss_user';
    const validPassword = 'mss_password';
    return username === validUsername && password === validPassword;
}

// 中间件验证用户名和密码
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

// 读task
function readTasks() {
    try {
        //两种读取：异步和同步，选择同步读取方式，原因：请求量少，不会阻塞，异步需要额外工作量保证读取成功
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

// 写tasks
function writeTasks(tasks) {
    const data = tasks.map(task => `${task.id},${task.taskName},${task.dueDay}`).join('\n');
    fs.writeFileSync(filePath, data, 'utf-8');
}

app.use(express.json())
// 添加task
app.post('/tasks', (req, res) => {
    const newTask = new Task(Date.now().toString(), req.body.taskName, req.body.dueDay);
    const tasks = readTasks();
    tasks.push(newTask);
    writeTasks(tasks);
    res.status(201).json(newTask);
});

// 删除task
app.delete('/tasks/:id', (req, res) => {
    const id = req.params.id;
    const tasks = readTasks();
    const updatedTasks = tasks.filter(task => task.id!== id);
    writeTasks(updatedTasks);
    res.status(204).send();
});

// list all tasks by dueDay
app.get('/tasks', (req, res) => {
    const tasks = readTasks();
    tasks.sort((a, b) => a.dueDay.localeCompare(b.dueDay));
    res.status(200).json(tasks);
});

// 修改任务
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

// read task detail
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