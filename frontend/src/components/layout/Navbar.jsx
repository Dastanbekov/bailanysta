import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Box,
} from '@mui/material';
import {
  Brightness4,
  Brightness7,
  Notifications,
  Search,
} from '@mui/icons-material';

const Navbar = ({ darkMode, setDarkMode }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsAnchor, setNotificationsAnchor] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotifications = (event) => {
    setNotificationsAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchor(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          SocialApp
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            color="inherit"
            component={RouterLink}
            to="/search"
          >
            <Search />
          </IconButton>

          <IconButton
            color="inherit"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>

          <IconButton
            color="inherit"
            onClick={handleNotifications}
          >
            <Badge badgeContent={4} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          <IconButton
            onClick={handleMenu}
            size="small"
          >
            <Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              component={RouterLink}
              to="/profile/me"
              onClick={handleClose}
            >
              Profile
            </MenuItem>
            <MenuItem
              component={RouterLink}
              to="/create-post"
              onClick={handleClose}
            >
              Create Post
            </MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>

          <Menu
            anchorEl={notificationsAnchor}
            open={Boolean(notificationsAnchor)}
            onClose={handleNotificationsClose}
          >
            <MenuItem onClick={handleNotificationsClose}>
              New like on your post
            </MenuItem>
            <MenuItem onClick={handleNotificationsClose}>
              New comment on your post
            </MenuItem>
            <MenuItem onClick={handleNotificationsClose}>
              Someone followed you
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 