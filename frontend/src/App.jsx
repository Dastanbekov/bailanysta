import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

// Components
import Navbar from './components/layout/Navbar';
import Feed from './pages/Feed';
import Profile from './pages/Profile';
import CreatePost from './pages/CreatePost';
import Notifications from './pages/Notifications';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="app">
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Feed />} />
              <Route path="/profile/:userId" element={<Profile />} />
              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/notifications" element={<Notifications />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
