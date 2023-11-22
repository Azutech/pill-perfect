import { Router } from 'express';
import { registration , setRole, password} from '../controllers/Auth';

export const auth: Router = Router();

auth.post('/registration', registration);
auth.post('/setRole/:id', setRole);
auth.post('/password/:id', password);
