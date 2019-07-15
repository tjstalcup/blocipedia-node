
    
const express = require("express");
const router = express.Router();
const validation = require("./validation");

const wikiController = require("../controllers/wikiController");

router.get("/wikis", wikiController.index);


module.exports = router;