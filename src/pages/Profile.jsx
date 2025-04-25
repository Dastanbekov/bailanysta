import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Avatar,
  Button,
  Box,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Edit,
  Favorite,
  FavoriteBorder,
  Comment,
  Share,
  Person,
  PhotoLibrary,
  Bookmark,
} from '@mui/icons-material';

const ProfileHeader = ({ user }) => (
  <Paper sx={{ p: 3, mb: 3 }}>
    <Grid container spacing={3} alignItems="center">
      <Grid item>
        <Avatar
          src={user.avatar}
          sx={{ width: 120, height: 120 }}
        >
          {user.name[0]}
        </Avatar>
      </Grid>
      <Grid item xs>
        <Typography variant="h5" gutterBottom>
          {user.name}
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          {user.bio}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Typography variant="body2">
            <strong>{user.posts}</strong> posts
          </Typography>
          <Typography variant="body2">
            <strong>{user.followers}</strong> followers
          </Typography>
          <Typography variant="body2">
            <strong>{user.following}</strong> following
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Edit />}
          sx={{ mr: 1 }}
        >
          Edit Profile
        </Button>
        <Button
          variant="outlined"
          color="primary"
        >
          Share Profile
        </Button>
      </Grid>
    </Grid>
  </Paper>
);

const Post = ({ post }) => (
  <Card sx={{ mb: 2 }}>
    <CardHeader
      avatar={
        <Avatar src={post.author.avatar}>
          {post.author.name[0]}
        </Avatar>
      }
      title={post.author.name}
      subheader={post.timestamp}
    />
    <CardContent>
      <Typography variant="body1" paragraph>
        {post.content}
      </Typography>
      {post.image && (
        <Box
          component="img"
          src={post.image}
          alt="Post"
          sx={{
            width: '100%',
            maxHeight: 400,
            objectFit: 'cover',
            borderRadius: 1,
          }}
        />
      )}
    </CardContent>
    <CardActions disableSpacing>
      <IconButton aria-label="like">
        {post.isLiked ? <Favorite color="error" /> : <FavoriteBorder />}
      </IconButton>
      <Typography variant="body2" color="text.secondary">
        {post.likes}
      </Typography>
      <IconButton aria-label="comment">
        <Comment />
      </IconButton>
      <Typography variant="body2" color="text.secondary">
        {post.comments}
      </Typography>
      <IconButton aria-label="share">
        <Share />
      </IconButton>
    </CardActions>
  </Card>
);

const Profile = () => {
  const { userId } = useParams();
  const [tabValue, setTabValue] = useState(0);

  // Mock user data
  const user = {
    name: 'John Doe',
    avatar: null,
    bio: 'Software Developer | Tech Enthusiast | Coffee Lover',
    posts: 42,
    followers: 1234,
    following: 567,
  };

  // Mock posts data
  const posts = [
    {
      id: 1,
      author: {
        name: 'John Doe',
        avatar: null,
      },
      content: 'Just finished working on an exciting new project!',
      timestamp: '2 hours ago',
      likes: 42,
      comments: 7,
      isLiked: false,
    },
    {
      id: 2,
      author: {
        name: 'John Doe',
        avatar: null,
      },
      content: 'Beautiful sunset today!',
      image: 'https://source.unsplash.com/random/800x600',
      timestamp: '1 day ago',
      likes: 128,
      comments: 23,
      isLiked: true,
    },
  ];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <ProfileHeader user={user} />

      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
        >
          <Tab icon={<PhotoLibrary />} label="Posts" />
          <Tab icon={<Person />} label="About" />
          <Tab icon={<Bookmark />} label="Saved" />
        </Tabs>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          {tabValue === 0 && posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
          {tabValue === 1 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                About
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1" paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Typography>
            </Paper>
          )}
          {tabValue === 2 && (
            <Typography variant="body1" color="text.secondary" align="center">
              No saved posts yet
            </Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile; 