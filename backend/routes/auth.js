const express = require('express');
const router = express.Router();
const User = require('../modals/User.js');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser.js");
const mongoose = require("mongoose");



// Route 1:for user create we return tokennt hence we use json web token
const JWT_SECRET = "dsfds$ffdd$sds$";

//we write validation after / no login require for validation
router.post('/createuser', [
    body('name', 'Name must be at least 6 charecter').isLength({ min: 6 }),
    body('email', 'Enter valid email').isEmail(),
    body('pass', 'Enter valid password').isLength({ min: 4 })
], async (req, res) => {
    //If there are error then return bad request and error
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    if (mongoose.connection.readyState === 1) {
        try {
            //check wheather user with same mail exists
            let user = await User.findOne({ email: req.body.email });

            if (user) {
                return res.status(400).json({ error: "Sorry user with same email already exists." });
            }

            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.pass, salt);

            //creating new user
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                pass: secPass,
            });

            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            res.json({ authToken });


        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some error occur.Chek Console");
        }
    } else {
        return res.status(403).send({ "error": "Not connected to database" });
    }

    // .then(user => res.json(user)).catch(err=>res.json({err:"Please enter unique email",message:err.message}));
    // res.json(req.body);

    // const user = User(req.body);
    // user.save().then(()=>{
    //     console.log("Saved")
    // });
});


// Route 2:for login authentication we return tokennt hence we use json web token
router.post('/login', [
    body('email', 'Enter valid email.').isEmail(),
    body('pass', 'Enter password.').exists()//check password exists or not
], async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        console.log("Error 1")
        return res.status(400).json({ error: error.array() });
    }
    if (mongoose.connection.readyState === 1) {

        try {
            //check user exists or not
            const { email, pass } = req.body;
            let user = await User.findOne({ email: email });
            if (!user) {
                console.log("Error 2")
                return res.status(404).json({ error: "Please try again with correct credential." });
            }
            const passwordCompare = await bcrypt.compare(pass, user.pass);
            if (!passwordCompare) {
                console.log("Error 3")
                return res.status(404).json({ error: "Please try again with correct credential." });
            }
            const data = {
                user: {
                    id: user.id
                }
            }

            const authToken = jwt.sign(data, JWT_SECRET);
            res.json({ authToken });

        } catch (error) {
            res.status(500).send("Some error occur.Chek Console");
        }
    } else {
        return res.status(403).send({ "error": "Not connected to database" });
    }
});

//Router 3 : login requred  /api/auth/getuser fetch user data

router.post('/getuser', fetchuser, async (req, res) => {
    if (mongoose.connection.readyState === 1) {
        try {
            // console.log(req.user.id)
            let userId = req.user.id;
            const user = await User.findById(userId).select("-pass");
            res.send(user);
        } catch (error) {
            console.log(error, "error")
            res.status(500).send("Some error occur.Chek Console");
        }
    }else{
        return res.status(403).send({ "error": "Not connected to database" });
    }
})

module.exports = router;