const CustomError = require("./custom-error.js"); // Use require to import CustomError

class NotAuthorizedError extends CustomError { 
    statusCode = 401;

    constructor() {
        super('Not Authorized');
        Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }

    serializeErrors() {
        return [{ message: 'Not authorized' }];
    }
}

// Export the NotAuthorizedError class using CommonJS syntax
module.exports = NotAuthorizedError;
