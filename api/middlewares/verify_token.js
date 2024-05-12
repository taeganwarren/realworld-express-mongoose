import jwt from 'jsonwebtoken';

function verify_token(required) {
    return (req, res, next) => {
        req.user = {
            id: undefined,
            token: undefined
        };
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
                if (error) {
                    res.status(401).json({ 'auth error': 'Failed to authenticate token' });
                } else {
                    req.user.id = user.id;
                    req.user.token = token;
                    next();
                }
            });
        } else {
            if (required) {
                res.status(401).json({ 'auth error': 'No token provided' });
            } else {
                next();
            }
        }
    };
}

export default verify_token;