import { Schema, model } from 'mongoose';

const leaderboardEntrySchema = new Schema({
  rank: { type: Number, required: true, unique: true },
  userName: { type: String, required: true },
  points: { type: Number, required: true },
  streak: { type: Number, required: true },
});

export default model('LeaderboardEntry', leaderboardEntrySchema);
