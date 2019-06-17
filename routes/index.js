

var express=require("express");
var router=express.Router();
var passport=require("passport");
var User=require("../models/user");

// main page route
router.get("/",function(req,res){
    res.render("landing");
});


// =============================
//    Authentication Routes
// =============================


// show register form
router.get("/register",function(req,res){
    res.render("register");
})

//handel signup logic
router.post("/register",function(req,res){
    User.register(new User({username:req.body.username}),req.body.password,function(err,user){      //register function provided by passport-local-mongoose to user schema
        if(err)
        {
            req.flash("err",err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req,res,function(){
            req.flash("success","Welcome to YelpCamp "+user.username);
            res.redirect("/campgrounds");
        })
    });                                                         
});


// show login form
router.get("/login",function(req,res){
    res.render("login");
});

// handeling login logic
router.post("/login",passport.authenticate("local",                    // using middelware passport.authenticate()
    {
        successRedirect:"/campgrounds",
        failureRedirect:"/login"
    }),function(req,res){

});

// logout route
router.get("/logout",function(req,res){
    req.logout();
    req.flash("success","Logged you out");
    res.redirect("/campgrounds");
});



module.exports=router;
