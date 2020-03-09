require("dotenv").config();

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const bcrypt = require("bcrypt");
const sgMail = require("@sendgrid/mail");
const jwt = require('jsonwebtoken');
// const token =require('../config/jwt');


// const crypto = require("crypto");
// Load User model
const User = require("../models/User");
const passwordResetToken = require("../models/resettoken");
const {
  forwardAuthenticated
} = require("../config/auth");
sgMail.setApiKey(
  "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"
);
// Login Page
router.get("/login", forwardAuthenticated, (req, res) => res.render("login"));

// Register Page
router.get("/register", forwardAuthenticated, (req, res) =>
  res.render("register")
);
router.get("/reset-password", (req, res) => {
  res.render("reset");
});

router.post("/register", async (req, res) => {

  const user = new User({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email
  });
  // if (
  //   User.findOne({
  //     email: req.body.email
  //   }).then(user => {
  //     res.sendStatus(400)
  //     // res.redirect("/users/register");
  //   })
  // )
    
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) throw err;
        user.password = hash;
        user
          .save()
          .then(user => {
            // req.flash("success_msg", "You are now registered and can log in");
            res.redirect("/users/login");
          })
          .catch(err => console.log(err));
      });
    });
});


router.post("/reset-password", async (req, res) => {
  const obj = await User.findOne({
      email: req.body.email
  });

  console.log(`This is Model ${obj._id}`)
  const id =obj._id;
  const secret = `${User.password}-${User.date}`;
  const token = jwt.sign({
    id
  }, secret, {
    expiresIn: 3600 // 1 hour
  })


  const user = await User.findOne({
    email: req.body.email
  });


  sgMail
    .send({
      to: "olufemiobafunmiso@gmail.com",
      from: "Anonymous@example.com",
      subject: "Password reset",
      html: "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
        "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
        `http://localhost:3000/users/validate-password/${id}/${token}`

    })

    .then(data => res.send("check email"))
    
    .catch(error => console.log("Exception caught: ", error));
  //  sgMail.send(msg);
});


router.get("/validate-password/:id/:token", async (req, res) => {
  res.render("newpassword");
});


router.post("/validate-password/:id/:token", async (req,res)=>{
  const id = req.params.id
  const { newPassword } = req.body



  User.findOne({ _id: id })
  .then(user=>{
  // const secret = `${User.password}-${User.date}`;
  // const payload = jwt.decode(token, secret)
    bcrypt.genSalt(10, function(err, salt) {
      if (err) return
      bcrypt.hash(newPassword, salt, function(err, hash) {
        if (err) return
        User.findOneAndUpdate({ _id: id }, { password: hash })
          .then(() => res.status(202).json("Password changed accepted"))
          
          .catch(err => res.status(500).json(err))
      })
    })
  })

})
            

module.exports = router;