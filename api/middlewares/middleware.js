import jwt from 'jsonwebtoken';

// TODO: Allow fields to be optional or make a separate function for optional fields
function check_input(required_fields) {
    return (req, res, next) => {
        const user = req.body.user || {};
        const keys = Object.keys(user);
        const errors = [];
        if (required_fields.fields.length !== keys.length) {
            errors.push('Invalid number of fields');
        }
        required_fields.fields.forEach((field) => {
            if (!keys.includes(field)) {
                errors.push(`Missing field: ${field}`);
            } else if (typeof user[field] !== 'string') {
                errors.push(`Field must be a string: ${field}`);
            }
        });
        if (errors.length > 0) {
            return res.status(422).json({ errors: { body: errors } });
        }
        next();
    }
}

function verify_token(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ errors: { body: ['Invalid token'] } });
    }
    jwt.verify(token.split(' ')[1], process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ errors: { body: ['Invalid token'] } });
        }
        req.body.user = decoded.user;
        req.body.user.token = token;
    });
    next();
}

export {
    check_input,
    verify_token
};