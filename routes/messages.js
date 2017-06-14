var uuid = require('uuid/v4');
var express = require('express');
var router = express.Router();

var messages = [];


// get all messages
router.get('/', function(req, res, next) {
    res.jsonp(messages);
});



// delete a message
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;

    messages = messages.filter(function(item) {
        return item.id !== id
    });

    res.jsonp(messages);
});


// insert a message
router.post('/', function(req, res, next) {
    var data = req.body;
    data.date = new Date();
    data.id = uuid();

    messages.unshift(data);

    res.jsonp(messages);
});

module.exports = router;
