import { Router } from 'express';
import users_router from './users.js';

const v1_router = Router();
v1_router.use('/api', users_router);

export default v1_router;