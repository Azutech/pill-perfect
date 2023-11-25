import { Router } from 'express';
import { auth } from './auth';
import {user} from './user'

export const routes: Router = Router();

routes.use('/auth', auth);
routes.use('/user', user);

