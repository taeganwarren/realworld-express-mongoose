import jwt from 'jsonwebtoken';

function check_input_required(required_fields) {
    return (req, res, next) => {
        const user = req.body.user || {};
        const keys = Object.keys(user);
        const errors = [];
        if (keys.length !== required_fields.fields.length) {
            errors.push('Invalid number of fields');
        }
        required_fields.fields.forEach((field) => {
            if (!keys.includes(field)) {
                errors.push(`Missing field: ${field}`);
            }
        });
        Object.keys(user).forEach((key) => {
            if (!required_fields.fields.includes(key)) {
                errors.push(`Invalid field: ${key}`);
            } else if (typeof user[key] !== 'string') {
                errors.push(`Field must be a string: ${key}`);
            }
        });
        if (errors.length > 0) {
            return res.status(422).json({ errors: { body: errors } });
        }
        next();
    }
}

function check_input_optional(optional_fields) {
    return (req, res, next) => {
        const user = req.body.user || undefined;
        const errors = [];
        if (req.body.user === undefined) {
            errors.body.push(['Must include at least one field to update']);
        } else {
            Object.keys(user).forEach((key) => {
                if (!optional_fields.fields.includes(key)) {
                    errors.push(`Invalid field: ${key}`);
                } else if (typeof user[key] !== 'string') {
                    errors.push(`Field must be a string: ${key}`);
                }
            });
        }
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
    try {
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET_KEY);
        req.current_user = decoded.user;
        req.current_user.token = token;
        next();
    } catch (err) {
        return res.status(401).json({ errors: { body: ['Invalid token'] } });
    }
}

export {
    check_input_required,
    check_input_optional,
    verify_token
};