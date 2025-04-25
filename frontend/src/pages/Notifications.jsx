import { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  Divider,
  Box,
  Tabs,
  Tab,
  Button,
} from '@mui/material';
import {
  Favorite,
  Comment,
  PersonAdd,
  MoreVert,
} from '@mui/icons-material';

const NotificationItem = ({ notification }) => {
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'like':
        return <Favorite color="error" />;
      case 'comment':
        return <Comment color="primary" />;
      case 'follow':
        return <PersonAdd color="success" />;
      default:
        return null;
    }
  };

  const getNotificationText = (notification) => {
    switch (notification.type) {
      case 'like':
        return `${notification.user} liked your post`;
      case 'comment':
        return `${notification.user} commented on your post`;
      case 'follow':
        return `${notification.user} started following you`;
      default:
        return '';
    }
  };

  return (
    <>
      <ListItem
        alignItems="flex-start"
        secondaryAction={
          <IconButton edge="end" aria-label="more">
            <MoreVert />
          </IconButton>
        }
      >
        <ListItemAvatar>
          <Avatar src={notification.userAvatar}>
            {notification.user[0]}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={getNotificationText(notification)}
          secondary={
            <Typography
              component="span"
              variant="body2"
              color="text.primary"
            >
              {notification.content}
            </Typography>
          }
        />
        <Box sx={{ ml: 2 }}>
          {getNotificationIcon(notification.type)}
        </Box>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

const Notifications = () => {
  const [tabValue, setTabValue] = useState(0);

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      type: 'like',
      user: 'John Doe',
      userAvatar: null,
      content: 'Your post about React was amazing!',
      timestamp: '2 hours ago',
    },
    {
      id: 2,
      type: 'comment',
      user: 'Jane Smith',
      userAvatar: null,
      content: 'Great insights on web development!',
      timestamp: '5 hours ago',
    },
    {
      id: 3,
      type: 'follow',
      user: 'Mike Johnson',
      userAvatar: null,
      content: '',
      timestamp: '1 day ago',
    },
  ];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (tabValue === 0) return true;
    return notification.type === ['all', 'likes', 'comments', 'follows'][tabValue];
  });

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
        >
          <Tab label="All" />
          <Tab label="Likes" />
          <Tab label="Comments" />
          <Tab label="Follows" />
        </Tabs>
      </Paper>

      <Paper>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            ))
          ) : (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body1" color="text.secondary">
                No notifications yet
              </Typography>
            </Box>
          )}
        </List>
      </Paper>

      {filteredNotifications.length > 0 && (
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Button variant="outlined" color="primary">
            Mark all as read
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Notifications; 