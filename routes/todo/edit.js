var express = require("express");
var router = express.Router();
const { Todo } = require("../../models");
router.post("/", function(req, res, next) {
  Todo.update(
    {
      text: req.body.text,
    },
    { where: { id: req.body.id } }
  )
    .then(item => {
      Todo.findOne({
        where: {
          id: req.body.id
        }
      }).then(item => {
        res.json({ item });
      });
    })
    .catch(error => {
      res.json({ error });
    });
});

module.exports = router;
