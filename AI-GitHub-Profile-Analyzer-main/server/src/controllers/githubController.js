import { analyzeGithubProfile } from '../services/githubService.js';
import { parseGithubUsername } from '../utils/parseGithubUsername.js';

export const getGithubProfile = async (req, res, next) => {
  try {
    const username = parseGithubUsername(req.params.username);
    const analysis = await analyzeGithubProfile(username);

    res.json(analysis);
  } catch (error) {
    next(error);
  }
};
