// Imports
import {
    Router 
} from 'express';
import verify_token from '../middlewares/verify_token.js';
import {
    favorite_article,
    unfavorite_article
} from '../controllers/favorites_controller.js';

// Constants
const favorites_router = Router();

// POST /api/articles/:slug/favorite
favorites_router.post('/articles/:slug/favorite', verify_token(true), (req, res) => {
    // Get fields from request
    const {
        id 
    } = req.user;
    const {
        slug 
    } = req.params;
    // Favorite article
    favorite_article(id, slug)
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
                'server error': 'Failed to favorite article. Internal server error.' 
            });
        });
});

// DELETE /api/articles/:slug/favorite
favorites_router.delete('/articles/:slug/favorite', verify_token(true), (req, res) => {
    // Get fields from request
    const {
        id 
    } = req.user;
    const {
        slug 
    } = req.params;
    // Unfavorite article
    unfavorite_article(id, slug)
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
                'server error': 'Failed to unfavorite article. Internal server error.' 
            });
        });
});

// Exports
export default favorites_router;