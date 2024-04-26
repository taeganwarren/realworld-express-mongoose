import { Router } from 'express';

const articles_router = Router();

articles_router.get('/feed', function (req, res) {
    res.send('Get most recent articles from users you follow.');
});

articles_router.get('/', function (req, res) {
    res.send('Get most recent articles globally.');
});

articles_router.post('/', function (req, res) {
    res.send('Create an article.');
});

articles_router.get('/:slug', function (req, res) {
    res.send('Get an article.');
});

articles_router.put('/:slug', function (req, res) {
    res.send('Update an article.');
});

articles_router.get('/:slug', function (req, res) {
    res.send('Delete an article.');
});

export default articles_router;