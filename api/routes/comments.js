// Imports
import {
    Router 
} from 'express';
import verify_token from '../middlewares/verify_token.js';
import {
    get_comments,
    create_comment,
    delete_comment
} from '../controllers/comment_controller.js';

// Constants
const comments_router = Router();

// GET /api/articles/:slug/comments
comments_router.get('/articles/:slug/comments', verify_token(false), (req, res) => {
    // Get fields from request
    const {
        slug 
    } = req.params;
    const {
        id 
    } = req.user;
    // Get comments
    get_comments(id, slug)
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
                'server error': 'Failed to get comments. Internal server error.' 
            });
        });
});

// POST /api/articles/:slug/comments
comments_router.post('/articles/:slug/comments', verify_token(true), (req, res) => {
    // Get fields from request
    const {
        slug 
    } = req.params;
    const {
        id 
    } = req.user;
    const {
        comment 
    } = req.body;
    // Create comment
    create_comment(id, slug, comment)
        .then((response) => {
            if (response['validation error']) {
                res.status(422).json(response);
            } else if (response['not found error']) {
                res.status(404).json(response);
            } else {
                res.status(201).json(response);
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                'server error': 'Failed to create comment. Internal server error.' 
            });
        });
});

// DELETE /api/articles/:slug/comments/:comment_id
comments_router.delete('/articles/:slug/comments/:comment_id', verify_token(true), (req, res) => {
    // Get fields from request
    const {
        slug, comment_id 
    } = req.params;
    const {
        id 
    } = req.user;
    // Delete comment
    delete_comment(id, slug, comment_id)
        .then((response) => {
            if (response['validation error']) {
                res.status(422).json(response);
            } else if (response['auth error']) {
                res.status(403).json(response);
            } else if (response['not found error']) {
                res.status(404).json(response);
            } else {
                res.status(204).json(response);
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                'server error': 'Failed to delete comment. Internal server error.' 
            });
        });
});

// Export
export default comments_router;