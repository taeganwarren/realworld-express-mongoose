import { Router } from 'express';

const comments_router = Router();

comments_router.get('/:slug/comments', function (req, res) {
    res.send('Get the comments for an article.');
});

comments_router.post('/:slug/comments', function (req, res) {
    res.send('Create a comment for an article.');
});

comments_router.delete('/:slug/comments/:id', function (req, res) {
    res.send('Delete a comment for an article.');
});

export default comments_router;