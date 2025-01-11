// Require the CustomError class from the custom-error.js file
const { CustomError } = require("./custom-error.js");

// Define the NotFoundError class extending CustomError
class NotFoundError extends CustomError {
    statusCode = 404;

    constructor() {
        super('route not found');
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeErrors() {
        return [{ message: 'Not found' }];
    }
}

// Export the NotFoundError class
module.exports = NotFoundError;
