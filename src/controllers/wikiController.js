
const wikiQueries = require("../db/queries.wikis.js");
const Authorizer = require("../policies/application");


  module.exports = {
    index(req, res, next){

        wikiQueries.getAllWikis((err, wikis) => {

            if(err){
                res.redirect(500, "static/index");
            } else {
                res.render("wikis/index", {wikis});
            }
        })
      },
      new(req, res, next){
        res.render("wikis/new");
      },

      create(req, res, next) {
        console.log("Creating wiki");
        let newWiki = {
          title: req.body.title,
          body: req.body.body,
          private: false,
          userId: req.user.id
        };
          wikiQueries.addWiki(newWiki, (err, wiki) => {
            if (err) {
              console.log("This is the error"+err)
              res.redirect(500, "wikis/new");
            } else {
              console.log("Wiki Created");
              res.redirect(303, `/wikis/${wiki.id}`);
            }
          });
      },
    
      show(req, res, next) {
        wikiQueries.getWiki(req.params.id, (err, wiki) => {
          if (err || wiki == null) {
            res.redirect(404, "/");
          } else {
            res.render("wikis/show", { wiki });
          }
        });
      },

      destroy(req, res, next){
        wikiQueries.deleteWiki(req.params.id, (err, wiki) => {
          if(err){
            res.redirect(500, `/wikis/${wiki.id}`)
          } else {
            res.redirect(303, "/wikis")
          }
        });
      }
    };