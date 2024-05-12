import jwt from 'jsonwebtoken';

// TODO: change optional to required for better readability
function verify_token(optional) {
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
            if (optional) {
                next();
            } else {
                res.status(401).json({ 'auth error': 'No token provided' });
            }
        }
    };
}

export default verify_token;