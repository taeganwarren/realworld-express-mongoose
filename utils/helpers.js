function format_errors(err) {
    const validation_errors = { errors: { body: [] } };
    for (const error in err.errors) {
        validation_errors.errors.body.push(err.errors[error].message);
    }
    return validation_errors;
}

export {
    format_errors
};