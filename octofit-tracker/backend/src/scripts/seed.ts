import User from '../models/User.js';
import Team from '../models/Team.js';
import Activity from '../models/Activity.js';
import LeaderboardEntry from '../models/LeaderboardEntry.js';
import Workout from '../models/Workout.js';
import { connectToDatabase } from '../config/database.js';

// Seed the octofit_db database with test data
async function main() {
  await connectToDatabase();

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.insertMany([
    {
      name: 'Ava Martinez',
      email: 'ava@example.com',
      age: 29,
      fitnessGoal: 'Marathon prep',
      location: 'Seattle',
    },
    {
      name: 'Noah Chen',
      email: 'noah@example.com',
      age: 34,
      fitnessGoal: 'Strength gain',
      location: 'Austin',
    },
    {
      name: 'Mina Patel',
      email: 'mina@example.com',
      age: 27,
      fitnessGoal: 'Flexibility',
      location: 'Denver',
    },
  ]);

  await Team.insertMany([
    {
      name: 'Momentum',
      sport: 'Running',
      members: users.slice(0, 2).map((user) => user.name),
      captain: users[0].name,
      focus: 'Weekly endurance challenges',
    },
    {
      name: 'Velocity',
      sport: 'CrossFit',
      members: [users[2].name],
      captain: users[2].name,
      focus: 'High-intensity training',
    },
  ]);

  await Activity.insertMany([
    {
      userName: users[0].name,
      type: 'Run',
      durationMinutes: 38,
      caloriesBurned: 420,
    },
    {
      userName: users[1].name,
      type: 'Cycling',
      durationMinutes: 56,
      caloriesBurned: 610,
    },
    {
      userName: users[2].name,
      type: 'Yoga',
      durationMinutes: 30,
      caloriesBurned: 180,
    },
  ]);

  await LeaderboardEntry.insertMany([
    { rank: 1, userName: users[0].name, points: 980, streak: 7 },
    { rank: 2, userName: users[1].name, points: 945, streak: 5 },
    { rank: 3, userName: users[2].name, points: 910, streak: 4 },
  ]);

  await Workout.insertMany([
    {
      title: 'HIIT Cardio',
      description: 'Fast intervals to raise your heart rate.',
      durationMinutes: 25,
      difficulty: 'Intermediate',
      focusArea: 'Cardio',
    },
    {
      title: 'Core Strength',
      description: 'A steady circuit focused on abs and posture.',
      durationMinutes: 20,
      difficulty: 'Beginner',
      focusArea: 'Core',
    },
    {
      title: 'Recovery Flow',
      description: 'Gentle mobility and stretching for recovery.',
      durationMinutes: 18,
      difficulty: 'Beginner',
      focusArea: 'Mobility',
    },
  ]);

  console.log('Seeded octofit_db with test data');
  process.exit(0);
}

main().catch((error) => {
  console.error('Seeding failed', error);
  process.exit(1);
});
