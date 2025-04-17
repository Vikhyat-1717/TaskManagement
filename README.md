# Task Management Application

A collaborative task management web application built with React, Redux Toolkit, and Material UI, featuring real-time updates using Firebase.

## Features

- User Authentication (Sign Up, Login, Logout)
- Kanban-style Task Board with Drag & Drop
- Real-time Task Updates
- Task Management (Create, Read, Update, Delete)
- Team Collaboration
- Responsive Design

## Tech Stack

- React.js with TypeScript
- Redux Toolkit for State Management
- Material UI for UI Components
- Firebase for Authentication and Database
- React Router for Navigation
- React Beautiful DnD for Drag & Drop

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Vikhyat-1717/TaskManagement.git
   cd TaskManagement
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a Firebase project and add your configuration in `src/firebase/config.ts`

4. Start the development server:
   ```bash
   npm start
   ```

## Project Structure

```
src/
├── components/         # React components
├── contexts/          # React contexts
├── firebase/          # Firebase configuration
├── services/          # Firebase services
├── store/             # Redux store and slices
├── theme.ts           # Material UI theme
└── App.tsx            # Main application component
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 