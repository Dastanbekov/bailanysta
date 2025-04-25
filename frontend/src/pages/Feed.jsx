import { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  IconButton,
  Avatar,
  Skeleton,
  Box,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  Comment,
  Share,
  Search,
} from '@mui/icons-material';

const PostSkeleton = () => (
  <Card sx={{ mb: 2 }}>
    <CardHeader
      avatar={<Skeleton variant="circular" width={40} height={40} />}
      title={<Skeleton width="60%" />}
      subheader={<Skeleton width="40%" />}
    />
    <CardContent>
      <Skeleton variant="rectangular" height={200} />
      <Skeleton width="80%" sx={{ mt: 2 }} />
      <Skeleton width="60%" />
    </CardContent>
    <CardActions>
      <Skeleton width={100} />
    </CardActions>
  </Card>
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

const Feed = () => {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for demonstration
  const posts = [
    {
      id: 1,
      author: {
        name: 'John Doe',
        avatar: null,
      },
      content: 'This is a sample post with some interesting content!',
      timestamp: '2 hours ago',
      likes: 42,
      comments: 7,
      isLiked: false,
    },
    {
      id: 2,
      author: {
        name: 'Jane Smith',
        avatar: null,
      },
      content: 'Another interesting post about something amazing!',
      image: 'https://source.unsplash.com/random/800x600',
      timestamp: '5 hours ago',
      likes: 128,
      comments: 23,
      isLiked: true,
    },
  ];

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          {loading ? (
            <>
              <PostSkeleton />
              <PostSkeleton />
              <PostSkeleton />
            </>
          ) : (
            posts.map((post) => <Post key={post.id} post={post} />)
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Feed; 