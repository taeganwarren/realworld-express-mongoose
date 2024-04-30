import { Router } from 'express';

const favorites_router = Router();

favorites_router.post('/:slug/favorite', function (req, res) {
    res.send('Favorite an article.');
});

favorites_router.delete('/:slug/favorite', function (req, res) {
    res.send('Unfavorite an article.');
});

export default favorites_router;