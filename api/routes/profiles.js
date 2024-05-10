import { Router } from 'express';
import {
    get_profile,
    follow_profile,
    unfollow_profile
} from '../controllers/profile_controller.js';
import verify_token_optional from '../middlewares/verify_token_optional.js';
import verify_token from '../middlewares/verify_token.js';

const profiles_router = Router();

profiles_router.get('/profiles/:username', verify_token_optional, (req, res) => {
    const { username } = req.params;
    get_profile(req.user.id, username).then((response) => {
        if (response.error) {
            res.status(404).json(response);
        } else {
            res.status(200).json(response);
        }
    })
    .catch((error) => {
        res.status(500).json(error);
    });
});

profiles_router.post('/profiles/:username/follow', verify_token, (req, res) => {
    const { username } = req.params;
    const { id } = req.user;
    follow_profile(id, username).then((response) => {
        res.status(200).json(response);
    })
    .catch((error) => {
        res.status(500).json(error);
    });
});

profiles_router.delete('/profiles/:username/follow', verify_token, (req, res) => {
    const { username } = req.params;
    const { id } = req.user;
    unfollow_profile(id, username).then((response) => {
        res.status(200).json(response);
    })
    .catch((error) => {
        res.status(500).json(error);
    });
});

export default profiles_router;