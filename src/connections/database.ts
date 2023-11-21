import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
import { logger } from '../middlewares/logger';

dotenv.config();

mongoose.set('debug', false);
export const connectionParams = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};
const uri = process.env.DATABASE_URI!;

export const database = async () => {
	await mongoose
		.connect(uri, connectionParams as ConnectOptions)
		.then(() => {
			logger.info('Connected to Pill Perfect Database');
		})
		.catch((err) => {
			logger.error(`Error connecting to the database. n${err}`);
			process.exit(1);
		});
};

export default database;