import { Router } from 'express';
import {userdashboard, allUsers} from '../controllers/user';

export const user: Router = Router();

user.get('/dashboard/:id', userdashboard)
user.get('/users', allUsers)