var express = require('express');
var router = express.Router();
const { Todo } = require("../../models");
router.delete('/:id', function (req, res, next) {
    Todo.destroy({
        where: {
            id: req.params.id
        }
    }).then(item => {
        res.json({ item });
    }).catch(error => {
        res.json({ error });
    })
});

module.exports = router;