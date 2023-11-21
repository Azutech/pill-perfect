import http from 'http';
import dotenv from 'dotenv';
import database from './connections/database';
import server from './server';
import debug from 'debug';
import { logger } from './middlewares/logger';

dotenv.config();

import { PORT } from './utils/config';

const httpServer = http.createServer(server);
const debugLog: debug.IDebugger = debug('server');

const app = async () => {
	try {
		database().catch((err) => console.error(err));
		httpServer.listen(PORT, () => {
			logger.info(
				`Pill Perfect is listening at http://localhost:${PORT} 🚀🚀`,
			);
		});
	} catch (err) {
		console.error(err);
	}
};

app();

export default httpServer;