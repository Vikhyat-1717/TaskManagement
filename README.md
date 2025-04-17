# Task Manager

A modern task management application with 3D task cards and drag-and-drop functionality.

## Features

- 3D task cards with smooth animations
- Drag and drop task management
- Beautiful starry background
- Responsive design
- Task status tracking (To Do, In Progress, Done)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd task-manager
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

### Building for Production

```bash
npm run build
```

The build files will be created in the `build` directory.

## Deployment

The application can be deployed to any static hosting service. Here are some options:

### Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

### Netlify

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Deploy:
```bash
netlify deploy
```

### GitHub Pages

1. Add homepage to package.json:
```json
"homepage": "https://<username>.github.io/<repo-name>"
```

2. Install gh-pages:
```bash
npm install --save gh-pages
```

3. Add deploy script to package.json:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

4. Deploy:
```bash
npm run deploy
```

## Technologies Used

- React
- TypeScript
- Three.js
- Material-UI
- Framer Motion
- React Beautiful DnD
