import { Schema, model } from 'mongoose';

export interface WorkoutDoc {
  title: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  durationMinutes: number;
  focus: string;
  createdAt: Date;
}

const workoutSchema = new Schema<WorkoutDoc>({
  title: { type: String, required: true },
  level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
  durationMinutes: { type: Number, required: true },
  focus: { type: String, required: true },
  createdAt: { type: Date, default: () => new Date() }
});

const Workout = model<WorkoutDoc>('Workout', workoutSchema);

export default Workout;
