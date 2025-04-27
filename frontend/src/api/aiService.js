// Simulated AI service
// In a real application, this would connect to a backend API that integrates with OpenAI, etc.

// Simulated delay for AI response
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Generate AI content based on a prompt
 * @param {string} prompt - User's prompt for content generation
 * @returns {Promise<string>} Generated content
 */
export const generateContent = async (prompt) => {
  try {
    // Simulate API call delay
    await delay(1500);
    
    // In a real implementation, this would be a call to a backend service
    // that communicates with OpenAI or another AI service
    // Example: const response = await axios.post('/api/ai/generate', { prompt });
    
    // For demo purposes, we'll return pre-defined responses based on keywords
    let response;
    
    if (prompt.toLowerCase().includes('привет') || prompt.toLowerCase().includes('здравствуйте')) {
      response = "Привет! Как я могу помочь вам сегодня с созданием контента для вашего поста?";
    } 
    else if (prompt.toLowerCase().includes('новост')) {
      response = "🌍 **Последние новости дня**\n\nВ мире технологий сегодня произошло несколько важных событий. Крупные компании представили новые продукты, которые могут изменить будущее. Разработчики сообщают о значительном прогрессе в области искусственного интеллекта. Эксперты прогнозируют, что эти инновации окажут существенное влияние на нашу повседневную жизнь в ближайшие годы.";
    }
    else if (prompt.toLowerCase().includes('цитат')) {
      response = "\"Самая большая слава в жизни заключается не в том, чтобы никогда не падать, а в том, чтобы подниматься каждый раз, когда мы падаем.\" - Нельсон Мандела";
    }
    else if (prompt.toLowerCase().includes('история') || prompt.toLowerCase().includes('рассказ')) {
      response = "Однажды в небольшом городке жил изобретатель, который создавал удивительные вещи. Его последнее изобретение — устройство, позволяющее людям видеть мир глазами других. Когда он впервые испытал его, он был поражен тем, насколько по-разному люди воспринимают одни и те же вещи. Это изменило его навсегда. Он понял, что понимание перспективы других людей — ключ к настоящей мудрости.";
    }
    else if (prompt.toLowerCase().includes('мотивац')) {
      response = "✨ **Ежедневная мотивация**\n\nНикогда не поздно начать что-то новое. Каждый день — это новая возможность сделать шаг к своей мечте. Не сравнивайте свой путь с путями других людей; у каждого свой темп и своя дорога. Верьте в себя, даже когда никто другой не верит. Ваша решимость и настойчивость — вот что действительно имеет значение.";
    }
    else {
      response = "Вот интересный контент на тему «" + prompt + "»:\n\nСуществует множество увлекательных аспектов этой темы, которые можно исследовать. Начиная с базовых концепций и заканчивая глубоким погружением в детали, эта область знаний привлекает внимание многих людей. Интересно, как разные перспективы могут открыть новые грани понимания и вдохновить на творческие идеи. Надеюсь, это помогает в создании вашего поста!";
    }
    
    return response;
    
  } catch (error) {
    console.error('Error generating AI content:', error);
    throw new Error('Не удалось сгенерировать контент. Пожалуйста, попробуйте позже.');
  }
}; 