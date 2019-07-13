    
module.exports = {
    
<<<<<<< HEAD
    validateUsers(req, res, next) {
      if (req.method === "POST") {
        req
        .checkBody("email", "must be valid").isEmail()

        req
          .checkBody("email").custom(email => {
              if(alreadyhaveEmail(email)) {
                  throw new Error("Email is already registered")
              }
          }),

        req
          .checkBody("password", "must be at least 6 characters in length")
          .isLength({ min: 6 });
        req
          .checkBody("passwordConfirmation", "must match password provided")
          .optional()
          .matches(req.body.password);
      }
=======
  validateUsers(req, res, next) {
    if (req.method === "POST") {
      req.checkBody("email", "must be valid").isEmail();
      req
        .checkBody("password", "must be at least 6 characters in length")
        .isLength({ min: 6 });
      req
        .checkBody("passwordConfirmation", "must match password provided")
        .optional()
        .matches(req.body.password);
	}
>>>>>>> 0cc975e6ee6e762b38e315cbf36a0149b984dff8

    const errors = req.validationErrors();

    if (errors) {
      req.flash("error", errors);
      return res.redirect(req.headers.referer);
    } else {
      return next();
    }
  }
};