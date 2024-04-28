import validator from "validator";

const VALIDATION_RULES = {
    "email": {
        "validate": (email) => validator.isEmail(email),
        "error": "email must be a valid email address"
    },
    "username": {
        "validate": (username) => username.length >= 4 && username.length <= 20 && validator.isAlphanumeric(username),
        "error": "username must be between 4 and 20 characters and contain only alphanumeric characters"
    },
    "password": {
        "validate": (password) => password.length >= 10 && password.length <= 100 && validator.isAscii(password),
        "error": "password must be between 4 and 50 characters and contain only ASCII characters"
    }
};

function validate_user_input(fields) {
    return (req, res, next) => {
        const errors = { "errors": { "body": [] } };
        if (!req.body.user) {
            fields.fields.forEach(field => errors.errors.body.push(VALIDATION_RULES[field].error));
        } else {
            fields.fields.forEach(field => {
                const validation_rule = VALIDATION_RULES[field];
                validate_field(req.body.user[field], validation_rule.validate, validation_rule.error, errors);
            });
        }
        if (errors.errors.body.length > 0) {
            return res.status(422).json(errors);
        } else {
            next();
        }
    }
}

function validate_field(value, validate_func, error_msg, errors) {
    try {
        if (value) {
            const str_value = value + '';
            if (!validate_func(str_value)) {
                errors.errors.body.push(error_msg);
            }
        } else {
            errors.errors.body.push(error_msg);
        }
    } catch (err) {
        errors.errors.body.push(`An error occurred while validating the input: ${err.message}`);
    }
}

export default validate_user_input;