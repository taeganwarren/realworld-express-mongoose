// Imports
import { Router } from 'express';
import verify_token from '../middlewares/verify_token.js';
import {
    create_article,
    get_article,
    update_article,
    delete_article
} from '../controllers/article_controller.js';

// Constants
const articles_router = Router();

// POST api/articles
articles_router.post('/articles', verify_token(true), (req, res) => {
    // Get fields from request
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

// GET api/articles/:slug
articles_router.get('/articles/:slug', (req, res) => {

});

// PUT api/articles/:slug
articles_router.put('/articles/:slug', (req, res) => {

});

// DELETE api/articles/:slug
articles_router.delete('/articles/:slug', (req, res) => {

});

// Exports
export default articles_router;