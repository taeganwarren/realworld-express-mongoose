// Imports
import {
    Router 
} from 'express';
import verify_token from '../middlewares/verify_token.js';
import {
    create_user,
    login_user,
    get_user,
    update_user
} from '../controllers/user_controller.js';

// Constants
const users_router = Router();

// POST api/users
users_router.post('/users', (req, res) => {
    // Get fields from request
    if (!req.body.user) {
        res.status(422).json({
            'validation error': 'User object is required.' 
        });
        return;
    }
    const {
        email, username, password 
    } = req.body.user;
    // Create user
    create_user(email, username, password)
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
                'server error': 'Failed to create user. Internal server error.' 
            });
        });
});

// POST api/users/login
users_router.post('/users/login', (req, res) => {
    // Get fields from request
    if (!req.body.user) {
        res.status(422).json({
            'validation error': 'User object is required.' 
        });
        return;
    }
    const {
        email, password 
    } = req.body.user;
    // Login user
    login_user(email, password)
        .then((response) => {
            if (response['validation error']) {
                res.status(422).json(response);
            } else if (response['auth error']) {
                res.status(401).json(response);
            } else {
                res.status(200).json(response);
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                'server error': 'Failed to login. Internal server error.' 
            });
        });
});

// GET api/user
users_router.get('/user', verify_token(true), (req, res) => {
    // Get fields from request
    const {
        id, token 
    } = req.user;
    // Get user
    get_user(id)
        .then((response) => {
            response.user.token = token;
            res.status(200).json(response);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                'server error': 'Failed to get user. Internal server error.' 
            });
        });
});

// PUT api/user
users_router.put('/user', verify_token(true), (req, res) => {
    // Get fields from request
    if (!req.body.user) {
        res.status(422).json({
            'validation error': 'User object is required.' 
        });
        return;
    }
    const {
        id, token 
    } = req.user;
    const {
        email, username, password, bio, image 
    } = req.body.user;
    // Update user
    update_user(id, email, username, password, bio, image)
        .then((response) => {
            if (response['validation error']) {
                res.status(422).json(response);
            } else {
                response.user.token = token;
                res.status(200).json(response);
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                'server error': 'Failed to update user. Internal server error.' 
            });
        });
});

// Exports
export default users_router;