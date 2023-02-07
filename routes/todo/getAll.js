var express = require('express');
var router = express.Router();
const { Todo } = require("../../models");
router.get('/', function (req, res, next) {
    Todo.findAll({
    }).then(items => {
        res.json({ items });
    }).catch(error => {
        res.json({ error });
    })
});
module.exports = router;