
const wikiQueries = require("../db/queries.wikis.js");


  module.exports = {
    index(req, res, next){

        wikiQueries.getAllWikis((err, wikis) => {

            if(err){
                console.log("This is the error"+ err)
                res.redirect(500, "static/index");
            } else {
                res.render("wikis/index", {wikis});
            }
        })
      }
    };