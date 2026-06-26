import { Schema, model, Types } from 'mongoose';

export interface LeaderboardEntryDoc {
  rank: number;
  user: Types.ObjectId;
  score: number;
  weeklyPoints: number;
}

const leaderboardEntrySchema = new Schema<LeaderboardEntryDoc>({
  rank: { type: Number, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true },
  weeklyPoints: { type: Number, required: true }
});

const LeaderboardEntry = model<LeaderboardEntryDoc>('LeaderboardEntry', leaderboardEntrySchema);

export default LeaderboardEntry;
