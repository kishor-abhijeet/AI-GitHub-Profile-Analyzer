import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  timeout: 20000
});

export const analyzeGithubProfile = async (query) => {
  const { data } = await api.get(`/api/github/${encodeURIComponent(query)}`);
  return data;
};
