import { Router } from 'express';
import articles_router from './articles.js';
import comments_router from './comments.js';
import favorites_router from './favorites.js';
import profiles_router from './profiles.js';
import tags_router from './tags.js';
import { users_router, user_router } from './users.js';

const api_router = Router();

api_router.use('/api/articles', articles_router);
api_router.use('/api/comments', comments_router);
api_router.use('/api/favorites', favorites_router);
api_router.use('/api/profiles', profiles_router);
api_router.use('/api/tags', tags_router);
api_router.use('/api/users', users_router);
api_router.use('/api/user', user_router);

export default api_router;