import validator from "validator";

const ERROR_MESSAGES = {
    "email": "email must be a valid email address",
    "username": "username must be between 4 and 20 characters and contain only alphanumeric characters",
    "password": "password must be between 4 and 50 characters and contain only ASCII characters"
};

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

function validate_new_user(body) {
    const errors = { "errors": { "body": [] } };
    if (!body.user) {
        errors.errors.body.push(ERROR_MESSAGES.email, ERROR_MESSAGES.username, ERROR_MESSAGES.password);
    } else {
        validate_field(body.user.email, validator.isEmail, ERROR_MESSAGES.email, errors);
        validate_field(body.user.username, (username) => username.length >= 4 && username.length <= 20 && validator.isAlphanumeric(username), ERROR_MESSAGES.username, errors);
        validate_field(body.user.password, (password) => password.length >= 10 && password.length <= 100 && validator.isAscii(password), ERROR_MESSAGES.password, errors);
    }
    return errors;
}

export {
    validate_new_user
};