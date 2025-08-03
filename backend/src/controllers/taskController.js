const { readTasks, writeTasks } = require('../models/taskModel');
const { v4: uuidv4 } = require('uuid');

const validSizes = ['P', 'M', 'G', 'GG', 'EXGG'];
const validColumns = ['refinamento', 'todo', 'doing', 'test', 'done'];

const apiResponse = (data, message = '', success = true) => ({
  data,
  message,
  success
});

exports.getAllTasks = (req, res) => {
  try {
    const tasks = readTasks();
    res.json(apiResponse(tasks, 'Tasks carregadas com sucesso'));
  } catch (error) {
    res.status(500).json(apiResponse(null, 'Erro ao carregar tasks', false));
  }
};

exports.getTaskById = (req, res) => {
  try {
    const tasks = readTasks();
    const task = tasks.find(t => t.id === req.params.id);
    
    if (!task) {
      return res.status(404).json(apiResponse(null, 'Tarefa não encontrada', false));
    }
    
    res.json(apiResponse(task, 'Task encontrada'));
  } catch (error) {
    res.status(500).json(apiResponse(null, 'Erro ao buscar task', false));
  }
};

exports.createTask = (req, res) => {
  try {
    const { title, description, size, column = 'todo' } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json(apiResponse(null, 'Título é obrigatório', false));
    }
    
    if (!validSizes.includes(size)) {
      return res.status(400).json(apiResponse(null, 'Tamanho inválido', false));
    }
    
    if (!validColumns.includes(column)) {
      return res.status(400).json(apiResponse(null, 'Coluna inválida', false));
    }

    const tasks = readTasks();
    const now = new Date().toISOString();
    
    const newTask = {
      id: uuidv4(),
      title: title.trim(),
      description: description?.trim() || '',
      size,
      column,
      createdAt: now,
      updatedAt: now
    };

    tasks.push(newTask);
    writeTasks(tasks);
    
    res.status(201).json(apiResponse(newTask, 'Task criada com sucesso'));
  } catch (error) {
    console.error('Erro ao criar task:', error);
    res.status(500).json(apiResponse(null, 'Erro interno do servidor', false));
  }
};

exports.updateTask = (req, res) => {
  try {
    const { title, description, size, column } = req.body;
    const tasks = readTasks();
    const index = tasks.findIndex(t => t.id === req.params.id);

    if (index === -1) {
      return res.status(404).json(apiResponse(null, 'Tarefa não encontrada', false));
    }

    if (size && !validSizes.includes(size)) {
      return res.status(400).json(apiResponse(null, 'Tamanho inválido', false));
    }
    
    if (column && !validColumns.includes(column)) {
      return res.status(400).json(apiResponse(null, 'Coluna inválida', false));
    }

    const updatedTask = { ...tasks[index] };
    
    if (title !== undefined) updatedTask.title = title.trim();
    if (description !== undefined) updatedTask.description = description.trim();
    if (size !== undefined) updatedTask.size = size;
    if (column !== undefined) updatedTask.column = column;
    updatedTask.updatedAt = new Date().toISOString();

    tasks[index] = updatedTask;
    writeTasks(tasks);
    
    res.json(apiResponse(updatedTask, 'Task atualizada com sucesso'));
  } catch (error) {
    console.error('Erro ao atualizar task:', error);
    res.status(500).json(apiResponse(null, 'Erro interno do servidor', false));
  }
};

exports.deleteTask = (req, res) => {
  try {
    let tasks = readTasks();
    const index = tasks.findIndex(t => t.id === req.params.id);

    if (index === -1) {
      return res.status(404).json(apiResponse(null, 'Tarefa não encontrada', false));
    }

    const deletedTask = tasks.splice(index, 1)[0];
    writeTasks(tasks);
    
    res.json(apiResponse(deletedTask, 'Task deletada com sucesso'));
  } catch (error) {
    console.error('Erro ao deletar task:', error);
    res.status(500).json(apiResponse(null, 'Erro interno do servidor', false));
  }
};

exports.moveTask = (req, res) => {
  try {
    const { column } = req.body;
    const taskId = req.params.id;
    
    if (!validColumns.includes(column)) {
      return res.status(400).json(apiResponse(null, 'Coluna inválida', false));
    }
    
    const tasks = readTasks();
    const index = tasks.findIndex(t => t.id === taskId);
    
    if (index === -1) {
      return res.status(404).json(apiResponse(null, 'Tarefa não encontrada', false));
    }
    
    tasks[index].column = column;
    tasks[index].updatedAt = new Date().toISOString();
    
    writeTasks(tasks);
    
    res.json(apiResponse(tasks[index], 'Task movida com sucesso'));
  } catch (error) {
    console.error('Erro ao mover task:', error);
    res.status(500).json(apiResponse(null, 'Erro interno do servidor', false));
  }
};