import { Router } from 'express';
import verify_token from '../middlewares/verify_token.js';
import {
    get_profile,
    follow_profile,
    unfollow_profile
} from '../controllers/profile_controller.js';

const users_router = Router();

// TODO: check params (weird chars can break the route and cause errors)
users_router.get('/profiles/:username', verify_token(false), (req, res) => {
    const { id } = req.user;
    const { username } = req.params;
    get_profile(id, username).then((response) => {
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

users_router.post('/profiles/:username/follow', verify_token(true), (req, res) => {
    const { id } = req.user;
    const { username } = req.params;
    follow_profile(id, username).then((response) => {
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

users_router.delete('/profiles/:username/follow', verify_token(true), (req, res) => {
    const { id } = req.user;
    const { username } = req.params;
    unfollow_profile(id, username).then((response) => {
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

export default users_router;