import { Router } from 'express';
import { getGithubProfile } from '../controllers/githubController.js';

const router = Router();

router.get('/:username(*)', getGithubProfile);

export default router;
