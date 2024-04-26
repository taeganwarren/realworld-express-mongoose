import { Router } from 'express';

const profiles_router = Router();

profiles_router.get('/:username', function (req, res) {
    res.send('Get a profile');
});

profiles_router.post('/:username/follow', function (req, res) {
    res.send('Follow a user');
});

profiles_router.delete('/:username/follow', function (req, res) {
    res.send('Unfollow a user');
});

export default profiles_router;