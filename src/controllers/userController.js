require("dotenv").config();
const userQueries = require("../db/queries.users.js");
const wikiQueries = require("../db/queries.wikis.js");
const passport = require("passport");

const stripe = require("stripe")(process.env.STRIPE_API_KEY);


module.exports = {

    signUp(req, res, next) {
    res.render("users/sign_up");
    },

      create(req, res, next) {
        let newUser = {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          passwordConfirmation: req.body.passwordConfirmation
        };

	if (userQueries.checkEmail(newUser.email)) {
    req.flash("error", err);
		req.flash("notice", "Sign up failed. Email already in use.")
		res.redirect("/users/sign_up");
	} else {

	userQueries.createUser(newUser, (err, user) => {
        if (err) {
          console.log(err);
          req.flash("error", err);
          res.redirect("/users/sign_up");
        } else {
          passport.authenticate("local")(req, res, () => {
            req.flash("notice", "You've signed up!");
            res.redirect("/");
          });
        }
      });
  }
},

    signInForm(req, res, next){
      res.render("users/sign_in");
    },

    signIn(req, res, next){
      passport.authenticate("local")(req, res, function () {
        if(!req.user){
          req.flash("notice", "Sign in failed. Please try again.")
          res.redirect("/users/sign_in");
        } else {
          req.flash("notice", "You've successfully signed in!");
          res.redirect("/");
        }
      })
    },

    signOut(req, res, next){
      req.logout();
      req.flash("notice", "You've successfully signed out!");
      res.redirect("/");
    },

    show(req, res, next) {
      userQueries.getUser(req.params.id, (err, result) => {

          if (err || result === undefined) {

              req.flash("notice", "No user found with that ID.");
              res.redirect("/");
          } else {
     
              res.render("users/show", { result });
          }
      });
  },

  upgradeForm(req, res, next) {
    res.render("users/upgradeForm");
},

upgrade(req, res, next) {
  userQueries.upgradeUser(req.params.id, (err, result) => {
      const amount = 1499;

      stripe.customers
          .create({
              email: req.body.stripeEmail,
              source: req.body.stripeToken
          })
          .then(customer => {
              return stripe.charges.create({
                  amount,
                  description: "Blocipedia premium upgrade",
                  currency: "usd",
                  customer: customer.id
              });
          })
          .then(charge => {
              if (charge) {
                  req.flash(
                      "notice",
                      "Success - You are now a premium member!"
                  );
                  res.redirect("/");
              } else {
                  req.flash("notice", "Error - upgrade unsuccessful");
                  res.redirect("/users/show", { user });
              }
          })
          .catch(err => {
              console.log(err);
          });
  });
},

downgradeForm(req, res, next) {
  res.render("users/downgradeForm");
},

downgrade(req, res, next) {
  userQueries.downgradeUser(req.user.dataValues.id);
  wikiQueries.changeToPublic(req.user.dataValues.id);
  req.flash("notice", "You are no longer a premium user!");
  res.redirect("/");
},

showCollaborators(req, res, next) {
  userQueries.getUserCollaborators(req.user.id, (err, result) => {
    const collaborator = result.collaborator;
    const user = result.user;

      if (err) {
        console.log("There was an error: ", err)
          res.redirect(404, "/");
      } else {
          res.render("users/collaborators", { user, collaborator });
      }
  });
}
};