const express = require('express');
const app = express();

// 定义task的数据结构，题目中只给定了due day这一个属性，id用来标识task，自定义属性taskName
class Task {
    constructor(id, taskName, dueDay) {
        this.id = id;
        this.taskName = taskName;
        this.dueDay = dueDay;
    }
}