const db = require('../config/db');

const ProjectModel = {
  getAllProjects: async () => {
    const result = await db.query('SELECT * FROM projects ORDER BY created_at DESC');
    return result.rows;
  },

  createProject: async (data) => {
    const { title, description, image_url, tech_stack, repository_link, demo_link } = data;

    // Query Insert dengan "Returning *" agar dapat data yang baru dibuat
    const query = `
      INSERT INTO projects (title, description, image_url, tech_stack, repository_link, demo_link)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;

    const values = [title, description, image_url, tech_stack, repository_link, demo_link];
    const result = await db.query(query, values);
    return result.rows[0];
  }
};

module.exports = ProjectModel;