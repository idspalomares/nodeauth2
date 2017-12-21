var express = require('express');
var router = express.Router();

router.get('/', app.oauth.authorise(), function(req, res, next) {
	res.json({ message: 'weeeee' });
});


module.exports = router;