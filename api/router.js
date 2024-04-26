import { Router } from 'express';
import user_router from './users.js';
import article_router from './articles.js';

const api_router = Router();

api_router.use('/api/users', user_router);
api_router.use('/api/articles', article_router);

export default api_router;