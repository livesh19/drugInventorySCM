const jwt = require('jsonwebtoken');

const currentUser = (req, res, next) => {
    if (!req.cookies.token) {
        return next();
    }

    try {
        const payload = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        req.currentUser = payload;
    } catch (err) {
        console.log(err);
    }

    next();
};

// Export the currentUser function using CommonJS syntax
module.exports = currentUser;

// Uncomment and change the authorizeRole function if needed
// const authorizeRole = (role) => {
//     return (req, res, next) => { 
//         // if (req.currentUser.)
//     }
// };
// module.exports.authorizeRole = authorizeRole; // Export if used
