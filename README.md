# Bailanysta

Bailanysta is a social media platform developed using React for the frontend and Django Rest Framework for the backend API. The application enables users to create accounts, publish posts, view and interact with other users' content.

## Features

- User authentication (registration, login, logout)
- User profiles
- Post creation, viewing, and deletion
- Comments on posts
- Light and dark theme support
- Content generation with AI assistance
- Loading states with skeleton screens
- Responsive design for different screen sizes

## Tech Stack

### Frontend
- React (with hooks and context API)
- CSS for styling (custom variables for theming)
- Axios for API requests
- React Router for navigation

### Backend
- Django Rest Framework
- PostgreSQL database
- JWT Authentication
- RESTful API architecture

## Installation and Setup

### Prerequisites
- Node.js and npm
- Python 3.8+
- PostgreSQL

### Backend Setup
1. Clone the repository
```
git clone https://github.com/yourusername/bailanysta.git
cd bailanysta/backend
```

2. Create and activate a virtual environment
```
python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate
```

3. Install dependencies
```
pip install -r requirements.txt
```

4. Configure database in settings.py

5. Run migrations
```
python manage.py migrate
```

6. Start the server
```
python manage.py runserver
```

### Frontend Setup
1. Navigate to the frontend directory
```
cd ../frontend
```

2. Install dependencies
```
npm install
```

3. Start the development server
```
npm run dev
```

## Design and Development Process

The development process followed an iterative approach:

1. **Planning and Requirements Analysis**: Defined the core features and user flows.

2. **Architecture Design**: Established a clear separation between frontend and backend through a RESTful API.

3. **UI/UX Design**: Created a clean, responsive interface with consistent styling and component patterns.

4. **Development**: 
   - Backend: Created Django models, serializers, and views for users, posts, and comments
   - Frontend: Built React components for all UI elements, implemented context for global state management

5. **Integration**: Connected frontend and backend through API calls with proper error handling.

6. **Testing and Refinement**: Tested all features and resolved bugs.

## Unique Approaches

- **Theme Implementation**: Used CSS variables for theming, allowing for seamless switching between light and dark modes with persistent user preference.
- **AI Content Generation**: Integrated an AI service to help users generate post content.
- **Optimistic UI Updates**: Implemented immediate UI updates before server confirmation for a responsive user experience.

## Tradeoffs

- **Simple Authentication**: Used JWT tokens for authentication instead of more complex OAuth solutions to simplify implementation.
- **Minimal Dependencies**: Opted to use fewer libraries to maintain control over the codebase but requiring more custom code.
- **Frontend Rendering**: Chose client-side rendering for better user experience at the cost of initial load performance.

## Known Issues

- User search functionality is not yet implemented
- Subscription system for following other users is planned but not implemented
- Notifications feature is in development
- Mobile responsiveness could be improved for some components

## Why This Tech Stack

- **React**: Chosen for its component-based architecture, which enables efficient UI development and state management.
- **Django Rest Framework**: Selected for its robustness, built-in authentication, and serialization capabilities that streamline API development.
## Future Improvements

- Implement user search functionality
- Add subscription system for following other users
- Develop a notification system for new comments or interactions
- Enhance mobile responsiveness
- Add image upload capabilities for posts and user profiles
