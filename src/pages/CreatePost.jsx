import { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  IconButton,
  Chip,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  AddPhotoAlternate,
  AutoFixHigh,
  Close,
} from '@mui/icons-material';

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [hashtags, setHashtags] = useState([]);
  const [currentHashtag, setCurrentHashtag] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleHashtagAdd = (event) => {
    if (event.key === 'Enter' && currentHashtag) {
      event.preventDefault();
      if (!hashtags.includes(currentHashtag)) {
        setHashtags([...hashtags, currentHashtag]);
      }
      setCurrentHashtag('');
    }
  };

  const handleHashtagDelete = (hashtagToDelete) => {
    setHashtags(hashtags.filter((hashtag) => hashtag !== hashtagToDelete));
  };

  const handleAiGenerate = async () => {
    setLoading(true);
    // Simulate AI API call
    setTimeout(() => {
      setAiSuggestion('Here\'s a suggested post: "Just had an amazing day exploring new technologies! The future of web development is incredibly exciting. #coding #webdev #innovation"');
      setLoading(false);
    }, 2000);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle post creation
    console.log({ content, image, hashtags });
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Create New Post
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            sx={{ mb: 2 }}
          />

          {image && (
            <Box sx={{ position: 'relative', mb: 2 }}>
              <img
                src={image}
                alt="Preview"
                style={{
                  width: '100%',
                  maxHeight: 300,
                  objectFit: 'cover',
                  borderRadius: 8,
                }}
              />
              <IconButton
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  bgcolor: 'background.paper',
                }}
                onClick={() => setImage(null)}
              >
                <Close />
              </IconButton>
            </Box>
          )}

          <Box sx={{ mb: 2 }}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="image-upload"
              type="file"
              onChange={handleImageChange}
            />
            <label htmlFor="image-upload">
              <Button
                variant="outlined"
                component="span"
                startIcon={<AddPhotoAlternate />}
              >
                Add Image
              </Button>
            </label>
          </Box>

          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Add hashtags (press Enter)"
              value={currentHashtag}
              onChange={(e) => setCurrentHashtag(e.target.value)}
              onKeyPress={handleHashtagAdd}
            />
            <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {hashtags.map((hashtag) => (
                <Chip
                  key={hashtag}
                  label={hashtag}
                  onDelete={() => handleHashtagDelete(hashtag)}
                />
              ))}
            </Box>
          </Box>

          {aiSuggestion && (
            <Alert
              severity="info"
              sx={{ mb: 2 }}
              action={
                <Button
                  color="inherit"
                  size="small"
                  onClick={() => setContent(aiSuggestion)}
                >
                  Use
                </Button>
              }
            >
              {aiSuggestion}
            </Alert>
          )}

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={!content.trim()}
            >
              Post
            </Button>
            <Button
              variant="outlined"
              startIcon={loading ? <CircularProgress size={20} /> : <AutoFixHigh />}
              onClick={handleAiGenerate}
              disabled={loading}
            >
              AI Suggest
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default CreatePost; 