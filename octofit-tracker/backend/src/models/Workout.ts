import { Schema, model } from 'mongoose';

const workoutSchema = new Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  difficulty: { type: String, required: true },
  focusArea: { type: String, required: true },
});

export default model('Workout', workoutSchema);
