import { Router } from 'express';
import { check_required_fields } from '../middlewares/check_input';
import verify_token from '../middlewares/verify_token';
import {
    create_article,
    get_article,
    update_article,
    delete_article
} from '../controllers/article_controller';

const articles_router = Router();

articles_router.post('/articles', check_required_fields('title', 'description', 'body'), verify_token(true), (req, res) => {
    const { title, description, body, tags } = req.body;
    const { id } = req.user;
    // TODO: check tags
    create_article(id, title, description, body, tags).then((response) => {
        if (response['validation error']) {
            res.status(422).json(response);
        } else {
            res.status(201).json(response);
        }
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({ 'server error': 'Failed to create article. Internal server error.' });
    });
});

articles_router.get('/articles/:slug', (req, res) => {

});

articles_router.put('/articles/:slug', (req, res) => {

});

articles_router.delete('/articles/:slug', (req, res) => {

});

export default articles_router;