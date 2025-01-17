const { CustomError } = require("../error/custom-error.js");

 const ErrorHandler = (err, req, res, next) => {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).send({errors: err.serializeErrors() })
    }

    res.status(400)
        .send({
        errors: [{message: 'something went wrong'}]
    })
}
module.exports= ErrorHandler;a