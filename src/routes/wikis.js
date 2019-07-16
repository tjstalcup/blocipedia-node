
    
const express = require("express");
const router = express.Router();

const wikiController = require("../controllers/wikiController");
const helper = require("../auth/helpers");
const validation = require("./validation");

router.get("/wikis", wikiController.index);
router.get("/wikis/new", wikiController.new);
router.get("/wikis/:id", wikiController.show);
router.post("/wikis/create", validation.validateWiki, wikiController.create);
router.post("/wikis/:id/destroy", wikiController.destroy);

module.exports = router;