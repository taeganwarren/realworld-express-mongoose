// Imports
import {
    Router 
} from 'express';
import users_router from './users.js';
import profiles_router from './profiles.js';
import articles_router from './articles.js';

// Constants
const v1_router = Router();

// Routes
v1_router.use('/api', users_router);
v1_router.use('/api', profiles_router);
v1_router.use('/api', articles_router);

// Exports
export default v1_router;