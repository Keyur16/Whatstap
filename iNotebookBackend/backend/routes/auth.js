const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');


const JWT_SECRET = 'KeyurisAgoodb$oy'



//ROUTE 1: Create a user using POST "/api/auth/createuser"  No login required
router.post('/createuser',[
  body('email','enter valid email').isEmail(),
  body('name','enter valid name').isLength({ min: 3 }),
  body('password','enter valid password').isLength({ min: 5 }),
] ,async (req,res)=>{

  success= false;
    
    //if there are errors send bad request and error response
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    
    
    try {          
      
      //check whether a user with this email already exists
      let user = await User.findOne({email: req.body.email})
      if (user){
        return res.status(400).json({ success, error: 'Sorry a user with this email already exists'})
      }

      //Salting and hashing
      const salt = await bcrypt.genSalt(10);
      const secpass = await bcrypt.hash(req.body.password,salt);
      //create a new user
      user = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: secpass,
        });
        
        const data={
          user: {
            id: user.id
          }
        }
        const authtoken = jwt.sign(data,JWT_SECRET);
        success = true
        res.json({success, authtoken})

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }  


    
    

})


//ROUTE 2: Create a user login using POST "/api/auth/login"  No login required
router.post('/login',[
  body('email','enter valid email').isEmail(),
  body('password','password cannot be blank').exists()
],async (req,res)=>{

  let success = false;
    
  //if there are errors send bad request and error response
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }
  
  const {email,password} = req.body;

  try {
    
    let user = await User.findOne({email});

    if(!user){
      success =  false
      return res.status(400).json({success, error: 'Please login using valid credentials'});
    }

    const passwordCompare = await bcrypt.compare(password,user.password);
    if(!passwordCompare){
      success= false
      return res.status(400).json({success, error: 'Please login using valid credentials'});
    }

    const data={
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data,JWT_SECRET);
    success = true;
    res.json({success, authtoken})

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }





})

//ROUTE 3: Get loggedin User details using POST "/api/auth/getuser"  Login required
router.post('/getuser',fetchuser,async (req,res)=>{
  try {

    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user);

  } catch (error) {

    console.error(error.message);
    res.status(500).send("Internal server error");

  }

})


module.exports = router

