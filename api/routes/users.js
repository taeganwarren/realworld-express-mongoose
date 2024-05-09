import { Router } from 'express';
import {
    create_user,
    login_user,
    get_user,
    update_user
} from '../controllers/user_controller.js';
import verify_token from '../middlewares/verify_token.js';

const users_router = Router();

users_router.post('/users', (req, res) => {
    const { email, username, password } = req.body;
    create_user(email, username, password).then((response) => {
        res.status(201).send(response);
    })
    .catch((error) => {
        res.status(500).send(error);
    });
});

users_router.post('/users/login', (req, res) => {
    const { email, password } = req.body;
    login_user(email, password).then((response) => {
        if (response.error) {
            res.status(401).send(response);
        } else {
            res.status(200).send(response);
        }
    })
    .catch((error) => {
        res.status(500).send(error);
    });
});

users_router.get('/user', verify_token, (req, res) => {
    const { id, token } = req.user;
    get_user(id).then((response) => {
        response.token = token;
        res.status(200).send(response);
    })
    .catch((error) => {
        res.status(500).send(error);
    });
});

users_router.put('/user', verify_token, (req, res) => {
    const { id, token } = req.user;
    const { email, username, password, bio, image } = req.body;
    update_user(id, email, username, password, bio, image).then((response) => {
        response.token = token;
        res.status(200).send(response);
    })
    .catch((error) => {
        res.status(500).send(error);
    });
});

export default users_router;