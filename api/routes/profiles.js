// Imports
import { Router } from 'express';
import verify_token from '../middlewares/verify_token.js';
import {
    get_profile,
    follow_profile,
    unfollow_profile
} from '../controllers/profile_controller.js';

// Constants
const users_router = Router();

// GET api/profiles/:username
users_router.get('/profiles/:username', verify_token(false), (req, res) => {
    // Get fields from request
    const { id } = req.user;
    const { username } = req.params;
    // Get profile
    get_profile(id, username)
        .then((response) => {
            if (response['validation error']) {
                res.status(421).json(response);
            } else if (response['not found error']) {
                res.status(404).json(response);
            } else {
                res.status(200).json(response);
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ 'server error': 'Failed to get profile. Internal server error.' });
        });
});

// POST api/profiles/:username/follow
users_router.post('/profiles/:username/follow', verify_token(true), (req, res) => {
    // Get fields from request
    const { id } = req.user;
    const { username } = req.params;
    // Follow profile
    follow_profile(id, username)
        .then((response) => {
            if (response['validation error']) {
                res.status(421).json(response);
            } else if (response['not found error']) {
                res.status(404).json(response);
            } else {
                res.status(200).json(response);
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ 'server error': 'Failed to follow user. Internal server error.' });
        });
});

// DELETE api/profiles/:username/follow
users_router.delete('/profiles/:username/follow', verify_token(true), (req, res) => {
    // Get fields from request
    const { id } = req.user;
    const { username } = req.params;
    // Unfollow profile
    unfollow_profile(id, username)
        .then((response) => {
            if (response['validation error']) {
                res.status(421).json(response);
            } else if (response['not found error']) {
                res.status(404).json(response);
            } else {
                res.status(200).json(response);
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ 'server error': 'Failed to follow user. Internal server error.' });
        });
});

// Exports
export default users_router;