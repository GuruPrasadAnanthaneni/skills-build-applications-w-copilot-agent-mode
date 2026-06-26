import { Schema, model, Types } from 'mongoose';

export interface UserDoc {
  name: string;
  email: string;
  role: 'member' | 'coach' | 'admin';
  joinedAt: Date;
  team?: Types.ObjectId;
}

const userSchema = new Schema<UserDoc>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['member', 'coach', 'admin'], default: 'member' },
  joinedAt: { type: Date, default: () => new Date() },
  team: { type: Schema.Types.ObjectId, ref: 'Team' }
});

const User = model<UserDoc>('User', userSchema);

export default User;
