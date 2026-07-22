import axios from 'axios';

const githubClient = axios.create({
  baseURL: 'https://api.github.com',
  timeout: 12000,
  headers: {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {})
  }
});

export default githubClient;
