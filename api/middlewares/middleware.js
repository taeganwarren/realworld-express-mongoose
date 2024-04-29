function check_input(fields) {
    return (req, res, next) => {
        fields.fields.forEach((field) => {
            if (!req.body.user || !req.body.user[field]) {
                return res.status(422).json({ "errors": { "body": ["all fields are required"] } });
            }
        });
        fields.fields.forEach((field) => {
            if (typeof req.body.user[field] !== 'string') {
                return res.status(422).json({ "errors": { "body": ["all fields must be strings"] } });
            }
        });
        next();
    }
}

export {
    check_input
};