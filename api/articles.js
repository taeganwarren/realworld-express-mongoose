import { Router } from 'express';

const article_router = Router();

article_router.post('/', function (req, res) {
    res.send('Create article');
});

article_router.get('/', function (req, res) {
    res.send('Read article');
});

article_router.put('/', function (req, res) {
    res.send('Edit article');
});

article_router.delete('/', function (req, res) {
    res.send('Delete article');
});

export default article_router;