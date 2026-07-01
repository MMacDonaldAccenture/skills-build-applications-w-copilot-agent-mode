import { Schema, model } from 'mongoose';

const activitySchema = new Schema({
  userName: { type: String, required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  caloriesBurned: { type: Number, required: true },
  completedAt: { type: Date, default: Date.now },
});

export default model('Activity', activitySchema);
