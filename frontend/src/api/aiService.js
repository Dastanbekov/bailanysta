// Simulated AI service
// In a real application, this would connect to a backend API that integrates with OpenAI, etc.

// Simulated delay for AI response
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// AI service integration with Gemini API
import api from '../api';

/**
 * Generate AI content based on a prompt
 * @param {string} prompt - User's prompt for content generation
 * @returns {Promise<string>} Generated content
 */
export const generateContent = async (prompt) => {
  try {
    const response = await api.post('/api/gemini/', {
      prompt: prompt
    });
    
    return response.data.response;
    
  } catch (error) {
    console.error('Error generating AI content:', error);
    throw new Error('Не удалось сгенерировать контент. Пожалуйста, попробуйте позже.');
  }
}; 