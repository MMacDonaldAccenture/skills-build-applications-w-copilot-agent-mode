import { Router } from 'express';
import { getApiBaseUrl } from './config.js';
import User from './models/User.js';
import Team from './models/Team.js';
import Activity from './models/Activity.js';
import LeaderboardEntry from './models/LeaderboardEntry.js';
import Workout from './models/Workout.js';

const router = Router();

router.get('/api/users', async (_req, res) => {
  const users = await User.find({}).lean();
  res.json({ baseUrl: getApiBaseUrl(), data: users });
});

router.get('/api/teams', async (_req, res) => {
  const teams = await Team.find({}).lean();
  res.json({ baseUrl: getApiBaseUrl(), data: teams });
});

router.get('/api/activities', async (_req, res) => {
  const activities = await Activity.find({}).lean();
  res.json({ baseUrl: getApiBaseUrl(), data: activities });
});

router.get('/api/leaderboard', async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find({}).sort({ rank: 1 }).lean();
  res.json({ baseUrl: getApiBaseUrl(), data: leaderboard });
});

router.get('/api/workouts', async (_req, res) => {
  const workouts = await Workout.find({}).lean();
  res.json({ baseUrl: getApiBaseUrl(), data: workouts });
});

export default router;
