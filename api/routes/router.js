import { Router } from 'express';
import users_router from './users.js';
import profiles_router from './profiles.js';

const v1_router = Router();
v1_router.use('/api', users_router);
v1_router.use('/api', profiles_router);

export default v1_router;