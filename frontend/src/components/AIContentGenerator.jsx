import React, { useState } from 'react';
import { generateContent } from '../api/aiService';

function AIContentGenerator({ onContentGenerated }) {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleGenerateContent = async (e) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      setError('Пожалуйста, введите запрос для генерации контента');
      return;
    }
    
    try {
      setIsGenerating(true);
      setError('');
      
      const generatedContent = await generateContent(prompt);
      
      // Pass the generated content to the parent component
      if (onContentGenerated) {
        onContentGenerated(generatedContent);
      }
      
      // Clear the prompt after successful generation
      setPrompt('');
      
    } catch (error) {
      setError(error.message || 'Произошла ошибка при генерации контента');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="ai-generator">
      <div className="ai-generator-header">
        <h3 className="section-heading">
          <i className="fas fa-robot"></i> AI-помощник
        </h3>
      </div>
      
      <form onSubmit={handleGenerateContent}>
        <div className="ai-prompt-container">
          <input
            type="text"
            value={prompt}
            onChange={handlePromptChange}
            placeholder="О чем вы хотите написать? (например: 'цитата о жизни', 'интересная история')"
            disabled={isGenerating}
            className="ai-prompt-input"
          />
          
          <button 
            type="submit" 
            className="ai-generate-btn"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              <i className="fas fa-magic"></i>
            )}
            <span>{isGenerating ? 'Генерация...' : 'Создать'}</span>
          </button>
        </div>
        
        {error && (
          <div className="ai-error-message">
            <i className="fas fa-exclamation-circle"></i> {error}
          </div>
        )}
        
        <div className="ai-suggestions">
          <span className="suggestion-label">Попробуйте:</span>
          <button 
            type="button" 
            className="ai-suggestion" 
            onClick={() => setPrompt('Мотивационная цитата')}
            disabled={isGenerating}
          >
            Мотивационная цитата
          </button>
          <button 
            type="button" 
            className="ai-suggestion" 
            onClick={() => setPrompt('Новости дня')}
            disabled={isGenerating}
          >
            Новости дня
          </button>
          <button 
            type="button" 
            className="ai-suggestion" 
            onClick={() => setPrompt('Интересная история')}
            disabled={isGenerating}
          >
            Интересная история
          </button>
        </div>
      </form>
    </div>
  );
}

export default AIContentGenerator; 