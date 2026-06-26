import connectDb, { mongoUri } from '../db.ts';
import Activity from '../models/Activity.ts';
import LeaderboardEntry from '../models/LeaderboardEntry.ts';
import Team from '../models/Team.ts';
import User from '../models/User.ts';
import Workout from '../models/Workout.ts';

// Seed the octofit_db database with test data

const runSeed = async () => {
  console.log('Connecting to MongoDB at', mongoUri);
  await connectDb();

  console.log('Clearing previous seed data...');
  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({})
  ]);

  console.log('Creating teams...');
  const teamA = await Team.create({
    name: 'Ocean Runners',
    description: 'A coastal squad focused on endurance training and team relay events.',
    memberIds: []
  });

  const teamB = await Team.create({
    name: 'Mountain Climbers',
    description: 'A high-altitude group focused on strength and trail performance.',
    memberIds: []
  });

  console.log('Creating users...');
  const [ava, luca, mia, noah] = await User.create([
    {
      name: 'Ava Octane',
      email: 'ava.octane@example.com',
      role: 'member',
      joinedAt: new Date('2026-01-14T08:30:00Z'),
      team: teamA._id
    },
    {
      name: 'Luca Sprint',
      email: 'luca.sprint@example.com',
      role: 'coach',
      joinedAt: new Date('2025-11-22T14:00:00Z'),
      team: teamA._id
    },
    {
      name: 'Mia Flex',
      email: 'mia.flex@example.com',
      role: 'member',
      joinedAt: new Date('2026-02-02T10:15:00Z'),
      team: teamB._id
    },
    {
      name: 'Noah Pace',
      email: 'noah.pace@example.com',
      role: 'member',
      joinedAt: new Date('2026-03-05T09:45:00Z'),
      team: teamB._id
    }
  ]);

  teamA.memberIds.push(ava._id, luca._id);
  teamB.memberIds.push(mia._id, noah._id);

  await Promise.all([teamA.save(), teamB.save()]);

  console.log('Creating workouts...');
  await Workout.create([
    {
      title: 'Full Body Blast',
      level: 'intermediate',
      durationMinutes: 45,
      focus: 'strength and conditioning'
    },
    {
      title: 'Cardio Charge',
      level: 'beginner',
      durationMinutes: 30,
      focus: 'aerobic endurance'
    },
    {
      title: 'Trail Power Circuit',
      level: 'advanced',
      durationMinutes: 55,
      focus: 'legs and agility'
    }
  ]);

  console.log('Creating activities...');
  await Activity.create([
    {
      user: ava._id,
      type: 'running',
      durationMinutes: 42,
      calories: 420,
      completedAt: new Date('2026-06-20T07:15:00Z')
    },
    {
      user: luca._id,
      type: 'cycling',
      durationMinutes: 65,
      calories: 620,
      completedAt: new Date('2026-06-19T16:00:00Z')
    },
    {
      user: mia._id,
      type: 'strength',
      durationMinutes: 50,
      calories: 510,
      completedAt: new Date('2026-06-21T18:20:00Z')
    },
    {
      user: noah._id,
      type: 'yoga',
      durationMinutes: 35,
      calories: 200,
      completedAt: new Date('2026-06-21T08:00:00Z')
    }
  ]);

  console.log('Creating leaderboard entries...');
  await LeaderboardEntry.create([
    { rank: 1, user: ava._id, score: 1540, weeklyPoints: 320 },
    { rank: 2, user: luca._id, score: 1380, weeklyPoints: 280 },
    { rank: 3, user: mia._id, score: 1290, weeklyPoints: 260 }
  ]);

  console.log('Seed complete. Verifying counts...');
  const [userCount, teamCount, workoutCount, activityCount, leaderboardCount] = await Promise.all([
    User.countDocuments(),
    Team.countDocuments(),
    Workout.countDocuments(),
    Activity.countDocuments(),
    LeaderboardEntry.countDocuments()
  ]);

  console.log(`Users: ${userCount}, Teams: ${teamCount}, Workouts: ${workoutCount}, Activities: ${activityCount}, Leaderboard entries: ${leaderboardCount}`);

  console.log('Seed the octofit_db database with test data - completed successfully.');
  process.exit(0);
};

runSeed().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
