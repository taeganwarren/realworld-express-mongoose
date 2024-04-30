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

export {
    check_input
};