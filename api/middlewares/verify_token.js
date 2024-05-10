import jwt from 'jsonwebtoken';

function verify_token(req, res, next) {
    if (!req.headers.authorization) {
        res.status(401).json({ error: "Unauthorized" });
        return;
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

export default verify_token;