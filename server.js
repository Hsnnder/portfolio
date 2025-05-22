import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import indexRouter from './routes/index.js';
import apiRouter from './routes/api.js';
import { initializeDatabase } from './db/connection.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Verify environment variables
console.log('Environment variables loaded:', {
  EMAIL_USER: process.env.EMAIL_USER ? 'Set' : 'Not set',
  EMAIL_PASS: process.env.EMAIL_PASS ? 'Set' : 'Not set'
});

const app = express();
const port = process.env.PORT || 3000;

// Initialize database
initializeDatabase();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', indexRouter);
app.use('/api', apiRouter);

app.get('/', (req, res) => {
  // Verileri kontrol etmek için console.log ekleyin
  console.log('Skills:', skills);
  res.render('index', { 
    skills: skills,
    categories: categories 
  });
});
 
// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('pages/error', {
    title: 'Server Error',
    error: 'An unexpected error occurred.'
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});