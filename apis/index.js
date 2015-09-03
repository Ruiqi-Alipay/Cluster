var router = require('express').Router();

router.get('/rws/directory', require('./rws-directory-list'));

module.exports = router;