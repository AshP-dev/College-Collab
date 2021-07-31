const express = require('express');
const router = express.Router();


//@route  POST api/auth
//@desc   Register user
//@access Public  
router.post('/',(req, res) => {
    console.log(req.body);
    res.send('Auth Route')
});

module.exports = router;