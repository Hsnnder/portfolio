import express from 'express';
import { getAllProjects, getFeaturedProjects } from '../db/models/project.js';
import { getAllSkills, getSkillCategories } from '../db/models/skill.js';

const router = express.Router();

// Home page route
router.get('/', async (req, res) => {
  try {
    const projects = await getFeaturedProjects();
    const skills = await getAllSkills();
    const categories = await getSkillCategories();
    
    res.render('layouts/main', {
      title: 'Önder Kabadayı - Backend Developer',
      page: 'index',
      projects,
      skills,
      categories
    });
  } catch (error) {
    console.error('Error fetching data for homepage:', error);
    res.status(500).render('layouts/main', {
      title: 'Server Error',
      page: 'error',
      error: 'Failed to load homepage data.'
    });
  }
});

// About page route - can be a separate page or part of the single page
router.get('/about', (req, res) => {
  res.render('layouts/main', {
    title: 'About Me - Your Name',
    page: 'about'
  });
});

// Projects page route - can be a separate page or part of the single page
router.get('/projects', async (req, res) => {
  try {
    const projects = await getAllProjects();
    
    res.render('layouts/main', {
      title: 'My Projects - Your Name',
      page: 'projects',
      projects
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).render('layouts/main', {
      title: 'Server Error',
      page: 'error',
      error: 'Failed to load projects data.'
    });
  }
});

export default router;