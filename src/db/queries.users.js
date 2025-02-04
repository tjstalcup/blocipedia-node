require("dotenv").config();
const User = require("./models").User;
const bcrypt = require("bcryptjs");

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {

  createUser(newUser, callback) {
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(newUser.password, salt);
    return User.create({
      name: newUser.name,
      email: newUser.email,
      password: hashedPassword
    })
      .then(user => {
	     const msg = {
        to: newUser.email,
        from: "cmbenson88@gmail.com",
        subject: "Welcome to Blocipedia",
        text: "Create, collaborate, and share wikis anytime!",
        html: "<strong>Start creating wikis today!</strong>"
        };
        sgMail.send(msg);
        callback(null, user);
      })
      .catch(err => {
        callback(err);
      });
  },

  getUser(id, callback) {
    return User.findOne({
        where: {
            id: id
        }
    })
        .then(user => {
            callback(null, user);
        })
        .catch(err => {
            callback(err);
        });
},

upgradeUser(id, callback) {
  User.findByPk(id)
      .then(user => {
          user.update({
              role: "premium"
          });
          callback(null, user);
      })
      .catch(err => {
          callback(err);
      });
},

downgradeUser(id, callback) {
  User.findByPk(id)
      .then(user => {
          user.update({
              role: "standard"
          });
          callback(null, user);
      })
      .catch(err => {
          callback(err);
      });
},

  checkEmail(email) {
    User.findOne({
      where: {email: email},

    }).then(data => {

	if (data === null) {
		return false;
	} else {
		return true;
	}
   })
}
   
};