import { Router } from 'express';
import {
    get_profile,
    follow_profile,
    unfollow_profile
} from '../controllers/profile_controller.js';

const profiles_router = Router();

profiles_router.get('/profiles/:username', (req, res) => {
    res.status(200).send(get_profile());
});

profiles_router.post('/profiles/:username/follow', (req, res) => {
    res.status(200).send(follow_profile());
});

profiles_router.delete('/profiles/:username/follow', (req, res) => {
    res.status(200).send(unfollow_profile());
});

export default profiles_router;