# Modern Personal Portfolio

A modern and elegant personal portfolio website built with Node.js, Express.js, and SQL. This single-page application showcases backend development skills with smooth scroll-based animations and a clean grayscale design.

## Features

- Single-page layout with smooth scroll transitions
- Backend skills showcase with animated cards
- Project portfolio with database integration
- Responsive design for all device sizes
- "About Me" section with personal information
- Interactive elements with subtle animations
- Backend API to manage project data

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/personal-portfolio.git
   cd personal-portfolio
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   ```
   cp .env.example .env
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
personal-portfolio/
├── db/                  # Database configuration and models
│   ├── connection.js    # Database connection setup
│   └── models/          # Database models
├── public/              # Static assets
│   ├── css/             # Stylesheets
│   ├── js/              # Client-side JavaScript
│   └── images/          # Images
├── routes/              # Express routes
│   ├── index.js         # Main routes
│   └── api.js           # API routes
├── views/               # EJS templates
│   ├── layouts/         # Layout templates
│   ├── partials/        # Reusable components
│   └── pages/           # Page templates
├── server.js            # Main application entry point
├── .env                 # Environment variables
└── package.json         # Project dependencies
```

## Customization

### Personal Information

Update your personal information in the following files:

- `views/pages/index.ejs`: Update your name, title, and about section
- Add your profile photo to `public/images/profile.jpg`
- Update your contact information in the contact section

### Projects

Projects are stored in the SQLite database. You can add or edit projects directly in the database or by modifying the seed data in `db/connection.js`.

### Styling

The application uses a custom CSS framework with a grayscale color scheme:

- Main styles: `public/css/main.css`
- Animations: `public/css/animations.css`

## Deployment

This application can be deployed to any Node.js hosting service like Heroku, Vercel, or Netlify.

## License

This project is licensed under the MIT License - see the LICENSE file for details.