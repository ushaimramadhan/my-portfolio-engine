const express = require('express');
const router = express.Router();
const ProjectController = require('../controllers/projectController');

router.get('/', ProjectController.index); // GET http://localhost:5000/api/projects
router.post('/', ProjectController.store); // POST http://localhost:5000/api/projects

module.exports = router;