import { Schema, model, Types } from 'mongoose';

export interface ActivityDoc {
  user: Types.ObjectId;
  type: string;
  durationMinutes: number;
  calories: number;
  completedAt: Date;
}

const activitySchema = new Schema<ActivityDoc>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  calories: { type: Number, required: true },
  completedAt: { type: Date, default: () => new Date() }
});

const Activity = model<ActivityDoc>('Activity', activitySchema);

export default Activity;
