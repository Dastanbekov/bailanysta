# Bailanysta

Bailanysta is a social media platform developed using React for the frontend and Django Rest Framework for the backend API. The application enables users to create accounts, publish posts, view and interact with other users' content.

Vidio example - 

https://github.com/user-attachments/assets/b674a118-7f3a-4523-bc1f-3fa82dd83ff2

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
- React
- CSS
- Axios for API requests
- React Router for navigation

### Backend
- Django Rest Framework
- JWT Authentication
- RESTful API architecture
- Gemini API 

## Installation and Setup

### Prerequisites
- Node.js and npm
- Python 3.8+

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

4. Create the .env file at the backend root directory and add GEMINI_API_KEY='yourApi'

5. Run migrations
```
python manage.py migrate
```

6. Start the server locally
```
python manage.py runserver 0.0.0.0:8000 
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

1. **Development**: 
   - Backend: Created Django models, serializers, and views for users, posts, and comments
   - Frontend: Built React components for all UI elements, implemented context for global state management

2. **Integration**: Connected frontend and backend through API calls with proper error handling.

## Known Issues

- search functionality is not yet implemented
- Subscription system for following other users is not implemented
- Notifications feature is not implemented
- Bug with comments
- styles bug at the auth page

## Why This Tech Stack

- **React**: Chosen for its component-based architecture, which enables efficient UI development and state management.
- **Django Rest Framework**: Selected for its robustness, built-in authentication, and serialization capabilities that streamline API development.
