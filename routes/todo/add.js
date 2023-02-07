var express = require('express');
var router = express.Router();
const { Todo } = require("../../models");
router.post('/', function (req, res, next) {
    Todo.create({
        text: req.body.text,
        userId: req.body.userId
    }).then(item => {
        res.json({ item });
    }).catch(error => {
        res.json({ error });
    })
});

module.exports = router;