import db from '../connection.js';

// Get all projects
export function getAllProjects() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM projects ORDER BY featured DESC, created_at DESC', (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      
      // Parse technologies string into array
      const projects = rows.map(project => ({
        ...project,
        technologies: project.technologies.split(',')
      }));
      
      resolve(projects);
    });
  });
}

// Get featured projects
export function getFeaturedProjects() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM projects WHERE featured = 1 ORDER BY created_at DESC', (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      
      // Parse technologies string into array
      const projects = rows.map(project => ({
        ...project,
        technologies: project.technologies.split(',')
      }));
      
      resolve(projects);
    });
  });
}

// Get project by ID
export function getProjectById(id) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM projects WHERE id = ?', [id], (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      
      if (!row) {
        resolve(null);
        return;
      }
      
      // Parse technologies string into array
      const project = {
        ...row,
        technologies: row.technologies.split(',')
      };
      
      resolve(project);
    });
  });
}