const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');
const config = require("config");
const { check, validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../../models/User');

//@route  GET api/auth
//@desc   Test Route 
//@access Public  

router.get('/', auth, async(req, res) => {
    
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 

    }
});

//@route  POST api/auth
//@desc   Authenticate user and get token
//@access Public
router.post(
    "/",
    [
      check("email", "A valid email is required!").isEmail(),
      check("password","Please enter a password").exists()
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()}); //json makes sure that the error msgs in check are displayed
        // status(400)-> there is a problem with the request
        // status(200)-> there is no problem with the request
      }
  
      
      const { email,password } = req.body;
      
      try{
          // Check is the user exists already
  
          let user = await User.findOne({ email });

          if (!user) {
              return res.status(400).json({ errors: [{ msg: 'Invalid user or password!'}]});
          };
          
          const isMatch = await bcrypt.compare(password, user.password);

          if(!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid user or password!'}]});
          }

          // Return jsonwebtoken -> Allows the user to be logged in right away in the front end
  
          const payload = {
            user: {
              id: user.id 
            }
          }
  
          jwt.sign(
            payload, 
            config.get('jwtSecret'),
            {expiresIn: 360000},      // time in seconds 
            (err, token) =>{          // callback
              if(err) throw err;
              res.json({ token });
            }); 
  
          // res.send("User Registered");
  
      }catch(err){
          console.error(err.message);
          res.status(500).send('Server Error') 
          //status(500) is a custom error 
      }
    }
  );

module.exports = router;