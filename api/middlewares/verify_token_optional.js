import jwt from 'jsonwebtoken';

function verify_token_optional(req, res, next) {
    if (!req.headers.authorization) {
        req.user = { id: undefined };
        next();
    } else {
        const token = req.headers.authorization.split(' ')[1];
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = {
                id: decoded.id,
                token: token
            }
            next();
        } catch (error) {
            res.status(401).json(error);
        }
    }
}

export default verify_token_optional;