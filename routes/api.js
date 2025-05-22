import express from 'express';
import { getAllProjects, getProjectById } from '../db/models/project.js';
import { getAllSkills, getSkillsByCategory } from '../db/models/skill.js';
import { sendContactEmail } from '../utils/mailer.js';

const router = express.Router();

// API route for projects
router.get('/projects', async (req, res) => {
  try {
    const projects = await getAllProjects();
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// API route for a single project
router.get('/projects/:id', async (req, res) => {
  try {
    const project = await getProjectById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json(project);
  } catch (error) {
    console.error(`Error fetching project ${req.params.id}:`, error);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// API route for skills
router.get('/skills', async (req, res) => {
  try {
    const { category } = req.query;
    
    let skills;
    if (category) {
      skills = await getSkillsByCategory(category);
    } else {
      skills = await getAllSkills();
    }
    
    res.json(skills);
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).json({ error: 'Failed to fetch skills' });
  }
});

// Contact form endpoint
router.post('/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validasyon
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: 'Tüm alanları doldurunuz.'
      });
    }

    // Email gönder
    await sendContactEmail({ name, email, subject, message });

    return res.json({
      success: true,
      message: 'Mesajınız başarıyla gönderildi.'
    });
  } catch (error) {
    console.error('Contact form hatası:', error);
    return res.status(500).json({
      success: false,
      error: 'Mesaj gönderilemedi: ' + error.message
    });
  }
});

export default router;