// Formats mongoose validation errors into a more readable format
function format_validation_errors(errors) {
    let formatted_errors = [];
    for (const error in errors) {
        formatted_errors.push(errors[error].message);
    }
    return formatted_errors;
}

// Exports
export {
    format_validation_errors
}