const CustomError = require("./custom-error.js"); 
// Use require to import customerror


class DataConnectionError extends CustomError {
    statusCode = 500;
    reason = 'Error connecting to database';

    constructor() {
        super('database timed out');
        Object.setPrototypeOf(this, DataConnectionError.prototype);
    }

    serializeErrors() {
        return [{ message: this.reason }];
    }
}

// Export the DataConnectionError class using CommonJS syntax
module.exports = DataConnectionError;
