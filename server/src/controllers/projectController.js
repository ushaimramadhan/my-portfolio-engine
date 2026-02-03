const ProjectModel = require('../models/projectModel');

const ProjectController = {
  // GET /api/projects
  index: async (req, res) => {
    try {
      const projects = await ProjectModel.getAllProjects();
      res.json({
        success: true,
        data: projects
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  },

  // POST /api/projects
  store: async (req, res) => {
    try {
      // Validasi sederhana
      const { title, tech_stack} = req.body;
      if (!title || !tech_stack) {
        return res.status(400).json({ success: false, message: 'Title dan Tech Stack Wajib diisi!'});
      }

      const newProject = await ProjectModel.createProject(req.body);

      res.status(201).json({
        success: true,
        message: 'Project berhasil ditambahkan',
        data: newProject
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Gagal menambahkan project'});
    }
  }
};

module.exports = ProjectController;