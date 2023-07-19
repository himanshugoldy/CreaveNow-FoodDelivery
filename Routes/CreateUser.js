const express = require('express')
const router = express.Router()
const User = require('../models/User');
const {body,validationResult} = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const jwtSecret = 'secret123';
router.post("/createuser",

    body('email').isEmail(),
    body('name').isLength({min: 5}),
    body('password','Password too Small').isLength({min: 5}),


async (req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const salt = await bcrypt.genSalt(10);
    let securePassword = await bcrypt.hash(req.body.password,salt);

    try {
        await User.create({
            name:req.body.name,
            email:req.body.email,
            password:securePassword,
            location:req.body.location,
        })
    console.log(securePassword);
    res.json({success:true});
    } catch (error) {
        console.log(error);
        res.json({success:false});
    }
})


router.post('/login',


[body('email').isEmail(),
body('name').isLength({min: 5}),
body('password','Password too Small').isLength({min: 5})],

async (req,res)=>{

    const {email,password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message:'User not found!'});
        }

        const pwdCompare = await bcrypt.compare(password,user.password);

        if(!pwdCompare){
            return res.status(401).json({message:'Incorrect Password!'});
        }

        const data = {
            user:{
                id:user.id
            }
        }
        const authToken = jwt.sign(data,jwtSecret);
        return res.status(200).json({message:'Login Successful',authToken:authToken});
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }

})



module.exports = router;