const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const config = require("config");
const { check, validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');

const User = require('../../models/User');

//@route  POST api/users
//@desc   Test route
//@access Public
router.post(
  "/",
  [
    check("name", "Name is required!").not().isEmpty(),
    check("email", "A valid email is required!").isEmail(),
    check("password","Please enter a password with 6 or more characters").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()}); //json makes sure that the error msgs in check are displayed
      // status(400)-> there is a problem with the request
      // status(200)-> there is no problem with the request
    }

    
    const { name,email,password } = req.body;
    
    try{
        // Check is the user exists already

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ errors: [ { msg: 'User already exists!'}]});
        }
        
        // Get user's gravatar

        const avatar = gravatar.url(email, {
            s: '200', // image size
            r: 'pg',  // image rating
            d: 'mm'   // default image
        });

        user = new User ({
            name,
            email,
            avatar,
            password
        });

        // Encrypt password

        const salt = await bcrypt.genSalt(10); 
        //salt = hashing mechanism 
        // Here, 10 = the number of rounds; more rounds -> more secure -> more time consuming to process
        user.password = await bcrypt.hash(password, salt);

        await user.save();

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
        res.status(500).send('Server Error') //status(500) is a custom error 
    }

    
  }
);

module.exports = router;
