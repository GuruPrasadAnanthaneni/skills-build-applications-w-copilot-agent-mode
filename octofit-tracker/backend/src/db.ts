import mongoose from 'mongoose';

export const mongoUri = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit_db';

const connectDb = () => mongoose.connect(mongoUri);

export default connectDb;
