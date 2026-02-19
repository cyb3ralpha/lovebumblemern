const { validationResult } = require("express-validator");

/* =====================================================
   VALIDATION MIDDLEWARE
   - Checks request for validation errors
===================================================== */
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Send formatted errors to client
    return res.status(400).json({
      message: "Validation failed",
      errors: errors.array().map((err) => ({
        field: err.param,
        message: err.msg,
      })),
    });
  }

  next();
};

module.exports = {
  validateRequest,
};
