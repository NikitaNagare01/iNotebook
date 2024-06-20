const express = require('express');
const router = express.Router();
const User=require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')

//   ROUTER 1 :-- variable for jwt sign -for returning the token ---
const JWT_SECRET='she is a good girl'

//-- Create a user using : Post "/api/auth/createuser". No login required
router.post('/createuser', [
    body('name','Enter a valid name').isLength({min:3}),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must be atleast 5 characters').isLength({min:5}),
], async(req,res)=>{
    let success=false;

    //---If there are errors, return bad request and the errors
    const erros=validationResult(req);
    if(!erros.isEmpty()){
        return res.status(400).json({success, erros:erros.array()});
    }

    try{

   
        //--- Check whether the user with this email exists already
        let user=await User.findOne({email:req.body.email});
        if(user){
            return res.status(400).json({success, error:"sorry a user with this email already exists"})
        }


        //--- Securing the password by creating bcryptjs hash ----
        const salt=await bcrypt.genSalt(10);
        const securepass = await bcrypt.hash(req.body.password, salt);



        //--- Creating a new USER-----
        user= await User.create({
            name:req.body.name,
            password:securepass,
            email:req.body.email,
        })


        // ---- JWT SIGN : RETURNING THE TOKEN TO THE USER AFTER CREATING A USER ---------
        const data={
            user:{
                id:user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET)
        success=true;
        res.json({success,authtoken})
        // res.json({"success": "user successfully created"})
    
    }catch(error){
        console.log(error.message);
        res.status(500).send("some error occured");
    }
    // .then(user=>res.json(user))
    // .catch(err=>{console.log(err)
    //     res.json({error:'please enter a unique value for email', message:err.message})
    // });
   
    // const user =User(req.body); 
    // user.save();
    // res.send(req.body);
})


//  ROUTER 2 : --- AUTHENTICATE A USER USING :POST "/api/auth/login".  login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password','Password cannot be blank').exists(),
], async(req, res)=>{
    let success=false;

    //If there are errors, return bad request and errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success:success, errors:errors.array()});
    }

    const {email, password}=req.body;

    try{

        // finding the user in database
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success:success, error : "Please try to login with correct credentials"});
        }

        //--- Comparing the user from database and entered user
        const passwordcompare = await bcrypt.compare(password, user.password);
        if(!passwordcompare){
            return res.status(400).json({success:success, error:"Please try to login with correct credentials"});
        }

        // --- After successful authetication let return the token to the logined user
        const data={
            user:{
                id:user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success=true;
        res.json({success:success, authtoken});
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})


//  ROUTER 3 : Ger loggedin user details using : POST "api/auth/getuser". login required

router.post('/getuser', fetchuser, async(req, res)=>{
    try{
        userid = req.user.id;
        const user = await User.findById(userid).select("-password");
        res.send(user);

    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

module.exports = router