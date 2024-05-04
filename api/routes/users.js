import { Router } from 'express';
import {
    check_input,
    verify_token
} from '../middlewares/middleware.js';
import {
    create_user,
    login_user,
    get_user,
    update_user
} from '../controllers/user_controller.js';

const ENV = process.env.NODE_ENV;
const users_router = Router();

users_router.post('/users', check_input({ fields: ['username', 'email', 'password'] }), (req, res) => {
    create_user(req.body.user.email, req.body.user.username, req.body.user.password)
        .then((new_user) => {
            if (new_user.errors) {
                return res.status(422).json(new_user);
            }
            return res.status(201).json(new_user);
        })
        .catch((err) => {
            if (ENV === 'development') console.log(err);
            return res.status(500).json({ errors: { body: ['Internal server error'] } });
        });
});

users_router.post('/users/login', check_input({ fields: ['email', 'password'] }), (req, res) => {
    login_user(req.body.user.email, req.body.user.password)
        .then((existing_user) => {
            if (existing_user.errors) {
                return res.status(422).json(existing_user);
            }
            return res.status(200).json(existing_user);
        })
        .catch((err) => {
            if (ENV === 'development') console.log(err);
            return res.status(500).json({ errors: { body: ['Internal server error'] } });
        });
});

users_router.get('/user', verify_token, (req, res) => {
    get_user(req.body.user)
        .then((user) => {
            if (user.errors) {
                if (user.errors.body[0] === 'User not found') return res.status(404).json(user);
                if (user.errors.body[0] === 'Internal server error') return res.status(500).json(user);
            }
            return res.status(200).json(user);
        })
        .catch((err) => {
            if (ENV === 'development') console.log(err);
            return res.status(500).json({ errors: { body: ['Internal server error'] } });
        });
});

users_router.put('/user', (req, res) => {
    update_user();
});

export default users_router;