import { Schema, model, Types } from 'mongoose';

export interface TeamDoc {
  name: string;
  description: string;
  createdAt: Date;
  memberIds: Types.ObjectId[];
}

const teamSchema = new Schema<TeamDoc>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: () => new Date() },
  memberIds: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const Team = model<TeamDoc>('Team', teamSchema);

export default Team;
