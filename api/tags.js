import { Router } from 'express';

const tags_router = Router();

tags_router.get('/tags', function (req, res) {
    res.send('Get tags');
});

export default tags_router;