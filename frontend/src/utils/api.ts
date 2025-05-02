import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

const api = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  },
});

export const generateCompletion = async (prompt: string) => {
  try {
    const response = await api.post('/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating completion:', error);
    throw error;
  }
};

export const generateImage = async (prompt: string) => {
  try {
    const response = await api.post('/images/generations', {
      prompt,
      n: 1,
      size: '512x512',
    });
    return response.data.data[0].url;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
}; 