
const express = require('express')
const router = express.Router();

router.get('/new', (req, res) => {
  res.render("posts-new", {})
})

router.post("/new", (req, res) => {
  console.log(req.body);
})

module.exports = router
