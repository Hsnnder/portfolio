import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Configure __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database path
const dbPath = path.join(__dirname, '..', 'data', 'portfolio.db');

// Ensure data directory exists
const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// Create database connection
const db = new sqlite3.Database(dbPath);

// Initialize database with tables
export function initializeDatabase() {
  db.serialize(() => {
    // Create projects table
    db.run(`
      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT,
        github_url TEXT,
        live_url TEXT,
        technologies TEXT NOT NULL,
        featured BOOLEAN DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create skills table
    db.run(`
      CREATE TABLE IF NOT EXISTS skills (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        icon TEXT,
        proficiency INTEGER NOT NULL
      )
    `);

    // Check if we need to seed the database
    db.get('SELECT COUNT(*) as count FROM projects', (err, row) => {
      if (err) {
        console.error('Error checking projects count:', err);
        return;
      }
      
      if (row.count === 0) {
        seedDatabase();
      }
    });
  });
}

// Seed the database with initial data
function seedDatabase() {
  // Sample projects
  const projects = [
    {
      title: 'Virtual Adana Museum',
      description: 'A virtual museum experience that showcases Adana\'s cultural heritage through an interactive 3D environment. Built with C++, OpenGL for 3D rendering, and Blender for 3D modeling.',
      image_url: '/images/projects/virtual-museum.png',
      github_url: 'https://github.com/yuemco/virtual-adana-museum-v2-team-8',
      technologies: 'C++,OpenGL,Blender',
      featured: 1
    },
    {
      title: 'File Manager Web Application',
      description: 'A secure file management web application with user authentication, file upload/download capabilities, and role-based access control. Built with Node.js, Express, MongoDB, and modern web technologies.',
      image_url: '/images/projects/file-manager.jpg',
      github_url: 'https://github.com/Hsnnder/file-manager-webapp',
      technologies: 'Node.js,Express,MongoDB,JWT,HTML,CSS,JavaScript',
      featured: 1
    }
  ];

  // Insert sample projects
  const stmt = db.prepare(`
    INSERT INTO projects (title, description, image_url, github_url, technologies, featured)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  projects.forEach(project => {
    stmt.run(
      project.title,
      project.description,
      project.image_url,
      project.github_url,
      project.technologies,
      project.featured
    );
  });

  stmt.finalize();

  // Sample skills
  const skills = [
    { name: 'Node.js', category: 'Backend', icon: 'node', proficiency: 90 },
    { name: 'Express.js', category: 'Backend', icon: 'express', proficiency: 85 },
    { name: 'SQL', category: 'Database', icon: 'database', proficiency: 70 },
    { name: 'JavaScript', category: 'Frontend', icon: 'javascript', proficiency: 90 },
    { name: 'HTML/CSS', category: 'Frontend', icon: 'html', proficiency: 85 },
    { name: 'Git', category: 'Tools', icon: 'git', proficiency: 75 }
  ];

  // Insert sample skills
  const skillStmt = db.prepare(`
    INSERT OR IGNORE INTO skills (name, category, icon, proficiency)
    VALUES (?, ?, ?, ?)
  `);

  skills.forEach(skill => {
    skillStmt.run(
      skill.name,
      skill.category,
      skill.icon,
      skill.proficiency
    );
  });

  skillStmt.finalize();
}

export default db;