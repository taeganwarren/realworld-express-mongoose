function check_input(fields) {
    return (req, res, next) => {
        const all_fields_are_present = fields.fields.every((field) => {
            if (!req.body.user || !req.body.user[field]) {
                return false;
            }
            return true;
        });
        if (!all_fields_are_present) {
            return res.status(422).json({ errors: { body: ['all fields are required'] } });
        }
        const all_fields_are_string = fields.fields.every((field) => {
            if (typeof req.body.user[field] !== 'string') {
                return false;
            }
            return true;
        });
        if (!all_fields_are_string) {
            return res.status(422).json({ errors: { body: ['all fields must be strings'] } });
        }
        next();
    }
}

export {
    check_input
};