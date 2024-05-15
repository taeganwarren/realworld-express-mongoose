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
    const { id } = req.user;
    const { title, description, body, tags } = req.body;
    // Create article
    create_article(id, title, description, body, tags)
        .then((response) => {
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
articles_router.get('/articles/:slug', verify_token(false), (req, res) => {
    // Get fields from request
    const { id } = req.user;
    const { slug } = req.params;
    // Get article
    get_article(id, slug)
        .then((response) => {
            if (response['not found error']) {
                res.status(404).json(response);
            } else if (response['validation error']) {
                res.status(422).json(response);
            } else {
                res.status(200).json(response);
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ 'server error': 'Failed to get article. Internal server error.' });
        });
});

// PUT api/articles/:slug
articles_router.put('/articles/:slug', verify_token(true), (req, res) => {

});

// DELETE api/articles/:slug
articles_router.delete('/articles/:slug', verify_token(true), (req, res) => {
    // Get fields from request
    const { id } = req.user;
    const { slug } = req.params;
    // Delete article
    delete_article(id, slug)
        .then((response) => {
            if (response['auth error']) {
                res.status(401).json(response);
            } else if (response['not found error']) {
                res.status(404).json(response);
            } else if (response['validation error']) {
                res.status(422).json(response);
            } else {
                res.status(200).json(response);
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ 'server error': 'Failed to delete article. Internal server error.' });
        });
});

// Exports
export default articles_router;