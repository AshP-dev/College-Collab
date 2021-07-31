const express = require('express');
const router = express.Router();


//@route  GET api/profile
//@desc   Test route
//@access Public  
router.post('/',(req, res) => {
    console.log(req.body);
    res.send('Profile Route')
});

module.exports = router;