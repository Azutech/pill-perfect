import express, { Application, Request, Response} from 'express'
import dotenv from 'dotenv';
import { StatusCodes } from 'http-status-codes';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import cors from 'cors';



dotenv.config();

const corsOptions = {
	origin: '*', // Replace with your website's domain or '*' for any origin
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify the HTTP methods you want to allow
	credentials: true, // Allow cookies and credentials to be sent with the request
};

const server: Application = express()
server.use(cors(corsOptions));
server.use(cookieParser());
server.use(express.json());
server.use(helmet())


server.get('/', (req: Request, res: Response) => {
	res.status(StatusCodes.OK).json(
		{message: 'Welcome To PillPerfect 💊💊 '}
	);
});

server.get('*', (req: Request, res: Response) => {
	res.status(StatusCodes.NOT_FOUND).json({ message: 'route not found 🔎' });
});


export default server