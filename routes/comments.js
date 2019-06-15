
var express=require("express");
var router=express.Router({mergeParams:true});              // merge the params from campground to comments
var Campground=require("../models/campground");
var Comment=require("../models/comment");


// ================================
//      comment routes here
// ================================



// new route
router.get("/new",isloggedin,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render("comments/new",{campground:campground});
        }
    })
})


//create route
router.post("/",isloggedin,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err)
        {
            console.log(err);
            res.redirect("/campgrounds");
        }
        else
        {
            Comment.create(req.body.comment,function(err,comment){
                if(err)
                {
                    console.log(err);
                }
                else
                {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/"+campground._id);
                }
            })            
        }
    })
});

function isloggedin(req,res,next){              // middleware
    if(req.isAuthenticated())
    {
        return next();                  
    }
    else
    {
        res.render("login");
    }
}


module.exports=router;