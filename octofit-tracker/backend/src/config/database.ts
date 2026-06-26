import mongoose from 'mongoose';

const databaseName = 'octofit_db';
const mongoUri = process.env.MONGODB_URI ?? `mongodb://localhost:27017/${databaseName}`;

const connectDb = () => mongoose.connect(mongoUri);

export default connectDb;
export { mongoUri, databaseName };
