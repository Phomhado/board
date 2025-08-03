const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/tasks.json');

function readTasks() {
  if (!fs.existsSync(filePath)) {
    const initialData = [];
    writeTasks(initialData);
    return initialData;
  }
  
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    const tasks = JSON.parse(data);
    
    const migratedTasks = tasks.map(task => ({
      ...task,
      column: task.column || 'todo', // Default para todo
      createdAt: task.createdAt || new Date().toISOString(),
      updatedAt: task.updatedAt || new Date().toISOString()
    }));
    
    if (migratedTasks.some(task => !tasks.find(t => t.id === task.id && t.column))) {
      writeTasks(migratedTasks);
    }
    
    return migratedTasks;
  } catch (error) {
    console.error('Erro ao ler tasks:', error);
    return [];
  }
}

function writeTasks(tasks) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
  } catch (error) {
    console.error('Erro ao escrever tasks:', error);
  }
}

module.exports = { readTasks, writeTasks };