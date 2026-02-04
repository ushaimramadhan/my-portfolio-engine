const express = require('express');
const router = express.Router();
const ProjectController = require('../controllers/projectController');
const verifyToken = require('../middleware/authMiddleware');

router.get('/', ProjectController.index); // GET http://localhost:5000/api/projects
router.post('/', verifyToken, ProjectController.store); // POST http://localhost:5000/api/projects

module.exports = router;