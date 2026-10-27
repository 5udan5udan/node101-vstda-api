const express = require('express');
const morgan = require('morgan');

const app = express();

//parse JSON request bodies for POST
app.use(express.json());

let todoItems = [
    {
        todoItemId: 0,
        name: 'an item',
        priority: 3,
        completed: false
    },
    {
        todoItemId: 1,
        name: 'another item',
        priority: 2,
        completed: false
    },
    {
        todoItemId: 2,
        name: 'a done item',
        priority: 1,
        completed: true
    }
];

//GET for status message from server
app.get('/', (req, res) => {
    res.status(200).json({status: 'ok'});
});

//GET to read all todo items from list
app.get('/api/TodoItems', (req, res) => {
    res.status(200).json(todoItems);
});

//GET to read single todo item from list
app.get('/api/TodoItems/:number', (req, res) => {
    const id = Number(req.params.number);
    const item = todoItems.find(todo => todo.todoItemId === id);
    if (!item) {
        return res.status(404).json({error: 'Item not found'});
    }
    res.status(200).json(item);
});

//POST to add item and return a copy of it
app.post('/api/TodoItems', (req, res) => {
    const newItem = req.body;
    todoItems.push(newItem);
    res.status(201).json(newItem);
});

//DELETE to remove item and return a copy of it
app.delete('/api/TodoItems/:number', (req,res) => {
    const id = Number(req.params.number);
    const index = todoItems.findIndex(todo => todo.todoItemId === id);
    if (index === -1) {
        return res.status(404).json({error: 'Item not found'});
    }
    const [deletedItem] = todoItems.splice(index, 1);
    res.status(200).json(deletedItem);
});

module.exports = app;
