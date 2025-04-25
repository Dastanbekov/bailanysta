# Social Media Web Application

A modern social media web application built with React and Material-UI, featuring a clean and intuitive user interface.

## Features

- 📱 Responsive design that works on all devices
- 🌓 Dark/Light theme support with persistent user preference
- 📝 Create and edit posts with image upload
- 🤖 AI-powered content suggestions
- 🔍 Search functionality for posts and users
- 💬 Real-time notifications for likes, comments, and follows
- 👥 User profiles with customizable information
- ❤️ Like and comment on posts
- 🔖 Save posts for later
- #️⃣ Hashtag support for better content organization

## Tech Stack

- React 18
- Material-UI (MUI)
- React Router
- Framer Motion (for animations)
- React Query (for data fetching)
- Axios (for HTTP requests)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/social-media-app.git
cd social-media-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   └── Navbar.jsx
│   ├── post/
│   ├── profile/
│   └── common/
├── pages/
│   ├── Feed.jsx
│   ├── Profile.jsx
│   ├── CreatePost.jsx
│   └── Notifications.jsx
├── assets/
├── App.jsx
└── main.jsx
```

## Deployment

The application can be easily deployed to various platforms:

### Vercel
1. Push your code to GitHub
2. Import your repository to Vercel
3. Vercel will automatically deploy your application

### Netlify
1. Push your code to GitHub
2. Import your repository to Netlify
3. Set the build command to `npm run build`
4. Set the publish directory to `dist`

### GitHub Pages
1. Add `"homepage": "https://yourusername.github.io/repo-name"` to package.json
2. Run `npm run build`
3. Run `npm run deploy`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
