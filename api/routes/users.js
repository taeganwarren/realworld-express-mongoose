import { Router } from 'express';
import {
    create_user,
    login_user,
    get_user,
    update_user
} from '../controllers/user_controller.js';
import verify_token from '../middlewares/verify_token.js';
import { check_required_fields, check_optional_fields } from '../middlewares/check_input.js';

const users_router = Router();

users_router.post('/users', check_required_fields(['email', 'username', 'password']), (req, res) => {
    const { email, username, password } = req.body;
    create_user(email, username, password).then((response) => {
        if (response.error) {
            res.status(422).json(response);
        } else {
            res.status(201).json(response);
        }
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({ error: 'Failed to create user. Internal server error.' });
    });
});

users_router.post('/users/login', check_required_fields(['email', 'password']), (req, res) => {
    const { email, password } = req.body;
    login_user(email, password).then((response) => {
        if (response['validation error']) {
            res.status(422).json(response);
        } else if (response['unauthorized error']) {
            res.status(401).json(response);
        } else {
            res.status(200).json(response);
        }
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({ error: 'Failed to login. Internal server error.' });
    });
});

users_router.get('/user', verify_token(false), (req, res) => {
    const { id, token } = req.user;
    get_user(id).then((response) => {
        response.token = token;
        res.status(200).json(response);
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({ error: 'Failed to get user. Internal server error.' });
    });
});

users_router.put('/user', verify_token(false), check_optional_fields(['email', 'username', 'password', 'bio', 'image']), (req, res) => {
    const { id, token } = req.user;
    const { email, username, password, bio, image } = req.body;
    update_user(id, email, username, password, bio, image).then((response) => {
        if (response.error) {
            res.status(422).json(response);
        } else {
            response.token = token;
            res.status(200).json(response);
        }
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({ error: 'Failed to update user. Internal server error.' });
    });
});

export default users_router;