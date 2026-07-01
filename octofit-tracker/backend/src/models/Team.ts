import { Schema, model } from 'mongoose';

const teamSchema = new Schema({
  name: { type: String, required: true, unique: true },
  sport: { type: String, required: true },
  members: { type: [String], default: [] },
  captain: { type: String, required: true },
  focus: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model('Team', teamSchema);
