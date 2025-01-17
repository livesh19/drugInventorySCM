const NotAuthorizedError = require("../error/not-authorized-error.js");

const requireAuth = (req, res, next) => {
    if (!req.currentUser) {
        throw new NotAuthorizedError();
    }
    next();
};

// Export the requireAuth function using CommonJS syntax
module.exports = requireAuth;
