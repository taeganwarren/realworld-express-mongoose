import { Router } from 'express';
import articles_router from './articles.js';
import comments_router from './comments.js';
import favorites_router from './favorites.js';
import profiles_router from './profiles.js';
import tags_router from './tags.js';
import users_router from './users.js';

const v1_router = Router();

v1_router.use('/api/articles', articles_router);
v1_router.use('/api/comments', comments_router);
v1_router.use('/api/favorites', favorites_router);
v1_router.use('/api/profiles', profiles_router);
v1_router.use('/api/tags', tags_router);
v1_router.use('/api', users_router);

export default v1_router;