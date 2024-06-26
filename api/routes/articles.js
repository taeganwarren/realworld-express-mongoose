// Imports
import {
    Router 
} from 'express';
import verify_token from '../middlewares/verify_token.js';
import {
    get_feed,
    get_articles,
    create_article,
    get_article,
    update_article,
    delete_article
} from '../controllers/article_controller.js';

// Constants
const articles_router = Router();

// GET /api/articles/feed
articles_router.get('/articles/feed', verify_token(true), (req, res) => {
    // Get fields from request
    const {
        id 
    } = req.user;
    // Optional filters
    const options = {
        offset: req.query.offset,
        limit: req.query.limit
    };
    // Get feed
    get_feed(id, options)
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                'server error': 'Failed to get feed. Internal server error.' 
            });
        });
});

// GET /api/articles
articles_router.get('/articles', verify_token(false), (req, res) => {
    // Get fields from request
    const {
        id 
    } = req.user;
    // Optional filters
    const options = {
        tag: req.query.tag,
        author: req.query.author,
        favorited: req.query.favorited,
        offset: req.query.offset,
        limit: req.query.limit
    };
    // Get articles
    get_articles(id, options)
        .then((response) => {
            if (response['validation error']) {
                res.status(422).json(response);
            } else {
                res.status(200).json(response);
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                'server error': 'Failed to get articles. Internal server error.' 
            });
        });
});

// POST api/articles
articles_router.post('/articles', verify_token(true), (req, res) => {
    // Get fields from request
    const {
        id 
    } = req.user;
    if (!req.body.article) {
        res.status(422).json({
            'validation error': 'Article object is required.' 
        });
        return;
    }
    const {
        title, description, body, tag_list 
    } = req.body.article;
    // Create article
    create_article(id, title, description, body, tag_list)
        .then((response) => {
            if (response['validation error']) {
                res.status(422).json(response);
            } else {
                res.status(201).json(response);
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                'server error': 'Failed to create article. Internal server error.' 
            });
        });
});

// GET api/articles/:slug
articles_router.get('/articles/:slug', verify_token(false), (req, res) => {
    // Get fields from request
    const {
        id 
    } = req.user;
    const {
        slug 
    } = req.params;
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
            res.status(500).json({
                'server error': 'Failed to get article. Internal server error.' 
            });
        });
});

// PUT api/articles/:slug
articles_router.put('/articles/:slug', verify_token(true), (req, res) => {
    // Get fields from request
    const {
        id 
    } = req.user;
    const {
        slug 
    } = req.params;
    if (!req.body.article) {
        res.status(422).json({
            'validation error': 'Article object is required.' 
        });
        return;
    }
    const {
        title, description, body, tag_list 
    } = req.body.article;
    // Update article
    update_article(id, slug, title, description, body, tag_list)
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
            res.status(500).json({
                'server error': 'Failed to update article. Internal server error.' 
            });
        });
});

// DELETE api/articles/:slug
articles_router.delete('/articles/:slug', verify_token(true), (req, res) => {
    // Get fields from request
    const {
        id 
    } = req.user;
    const {
        slug 
    } = req.params;
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
            res.status(500).json({
                'server error': 'Failed to delete article. Internal server error.' 
            });
        });
});

// Exports
export default articles_router;