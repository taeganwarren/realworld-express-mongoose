// Imports
import jwt from 'jsonwebtoken';

// Verify token
function verify_token(required) {
    return (req, res, next) => {
        // Add user to request
        req.user = {
            id: undefined,
            token: undefined
        };
        // Verify token
        if (req.headers.authorization || req.headers.Authorization) {
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

// Exports
export default verify_token;