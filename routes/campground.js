
var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");

// index route
router.get("/",function(req,res){               //  (req.user)  contains the inforation about the loggedin user
    
    Campground.find({},function(err,allcampgrounds){
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render("campgrounds/index",{campgrounds:allcampgrounds});
        }
    });
});


// new route
router.get("/new",function(req,res){
    res.render("campgrounds/new");
});


// create route
router.post("/",function(req,res){           //to add new capground
    var name=req.body.name;
    var image=req.body.image;
    var description=req.body.description;
    var newcampground={name:name,image:image,description:description};
    //campgrounds.push(newcampground);
    Campground.create(newcampground,function(err,newcreate){
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.redirect("/campgrounds");       //default redirect is get request
        }
    });
                        

});                       


// show route
router.get("/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundcampground){
        if(err)
        {
            console.log(err);
        }
        else
        {
            //console.log(foundcampground);
            res.render("campgrounds/show",{campground:foundcampground});
        }
    });
});

module.exports=router;