// controllers/taskController.js
const { readTasks, writeTasks } = require('../models/taskModel');
const { v4: uuidv4 } = require('uuid');

// Validação básica de tamanho
const validSizes = ['P', 'M', 'G', 'GG', 'EXGG'];

exports.getAllTasks = (req, res) => {
  const tasks = readTasks();
  res.json(tasks);
};

exports.getTaskById = (req, res) => {
  const tasks = readTasks();
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) return res.status(404).json({ message: 'Tarefa não encontrada' });
  res.json(task);
};

exports.createTask = (req, res) => {
  const { title, description, size } = req.body;

  if (!title || !description || !validSizes.includes(size)) {
    return res.status(400).json({ message: 'Dados inválidos' });
  }

  const tasks = readTasks();
  const newTask = {
    id: uuidv4(),
    title,
    description,
    size
  };

  tasks.push(newTask);
  writeTasks(tasks);
  res.status(201).json(newTask);
};

exports.updateTask = (req, res) => {
  const { title, description, size } = req.body;
  const tasks = readTasks();
  const index = tasks.findIndex(t => t.id === req.params.id);

  if (index === -1) return res.status(404).json({ message: 'Tarefa não encontrada' });

  if (title) tasks[index].title = title;
  if (description) tasks[index].description = description;
  if (size && validSizes.includes(size)) tasks[index].size = size;

  writeTasks(tasks);
  res.json(tasks[index]);
};

exports.deleteTask = (req, res) => {
  let tasks = readTasks();
  const index = tasks.findIndex(t => t.id === req.params.id);

  if (index === -1) return res.status(404).json({ message: 'Tarefa não encontrada' });

  const removed = tasks.splice(index, 1);
  writeTasks(tasks);
  res.json({ message: 'Tarefa deletada', deleted: removed[0] });
};
