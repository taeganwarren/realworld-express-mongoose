function check_required_fields(fields) {
    return (req, res, next) => {
        const errors = [];
        for (const field of fields) {
            if (!req.body[field]) {
                errors.push(`Missing ${field}`);
            } else if (typeof req.body[field] !== 'string') {
                errors.push(`${field} must be a string`);
            }
        }
        if (errors.length > 0) {
            res.status(422).json({ 'input error': errors });
        } else {
            next();
        }
    }
}

function check_optional_fields(fields) {
    return (req, res, next) => {
        const errors = [];
        for (const field of fields) {
            if (req.body[field] && typeof req.body[field] !== 'string') {
                errors.push(`${field} must be a string`);
            }
        }
        if (errors.length > 0) {
            res.status(422).json({ 'input error': errors });
        } else {
            next();
        }
    }
}

export {
    check_required_fields,
    check_optional_fields
};