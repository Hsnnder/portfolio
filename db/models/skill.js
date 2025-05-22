import db from '../connection.js';

// Get all skills
export function getAllSkills() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM skills ORDER BY category, proficiency DESC', (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(rows);
    });
  });
}

// Get skills by category
export function getSkillsByCategory(category) {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM skills WHERE category = ? ORDER BY proficiency DESC', [category], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(rows);
    });
  });
}

// Get skill categories
export function getSkillCategories() {
  return new Promise((resolve, reject) => {
    db.all('SELECT DISTINCT category FROM skills ORDER BY category', (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(rows.map(row => row.category));
    });
  });
}