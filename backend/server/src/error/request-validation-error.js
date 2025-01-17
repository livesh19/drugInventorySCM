const { CustomError } = require('./custom-error.js'); // Use require to import CustomError
const { ValidationError } = require('express-validator'); // Use require to import ValidationError

class RequestValidationError extends CustomError {
    statusCode = 400;

    constructor(errors) {
        super('Invalid request parameters');
        this.errors = errors; // Store the errors for serialization
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeErrors() {
        return this.errors.map((err) => {
            return { message: err.msg, field: err.param };
        });
    }
}

// Export the RequestValidationError class using CommonJS syntax
module.exports = RequestValidationError;
