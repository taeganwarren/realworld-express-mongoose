import { Router } from 'express';
import {
    check_input_required,
    check_input_optional,
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

users_router.post('/users', check_input_required({ fields: ['username', 'email', 'password'] }), (req, res) => {
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

users_router.post('/users/login', check_input_required({ fields: ['email', 'password'] }), (req, res) => {
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
    get_user(req.current_user)
        .then((existing_user) => {
            return res.status(200).json(existing_user);
        })
        .catch((err) => {
            if (ENV === 'development') console.log(err);
            return res.status(500).json({ errors: { body: ['Internal server error'] } });
        });
});

users_router.put('/user', verify_token, check_input_optional({ fields: ['email', 'username', 'password', 'bio', 'image'] }), (req, res) => {
    update_user(req.current_user, req.body.user)
        .then((updated_user) => {
            if (updated_user.errors) {
                return res.status(422).json(updated_user);
            }
            return res.status(200).json(updated_user);
        })
        .catch((err) => {
            if (ENV === 'development') console.log(err);
            return res.status(500).json({ errors: { body: ['Internal server error'] } });
        });
});

export default users_router;