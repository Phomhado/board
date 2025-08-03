const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// CRUD básico
router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

router.put('/:id/move', taskController.moveTask);

module.exports = router;