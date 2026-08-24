const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createTask, getTasksByProject, updateTaskStatus, deleteTask } = require('../controllers/taskController');

router.post('/', auth, createTask);
router.get('/project/:projectId', auth, getTasksByProject);
router.patch('/:id', auth, updateTaskStatus);
router.delete('/:id', auth, deleteTask);

module.exports = router;