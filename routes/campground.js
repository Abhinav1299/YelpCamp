
var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");
var middleware=require("../middleware/index.js");



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
router.get("/new",middleware.isloggedin,function(req,res){
    res.render("campgrounds/new");
});


// create route
router.post("/",middleware.isloggedin,function(req,res){           //to add new capground
    var name=req.body.name;
    var image=req.body.image;
    var description=req.body.description;
    var author={
        id: req.user._id,
        username : req.user.username
    }
    var newcampground={name:name,image:image,description:description,author:author};
    //campgrounds.push(newcampground);
    
    Campground.create(newcampground,function(err,newcreate){
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log(newcreate);
            res.redirect("/campgrounds");       //default redirect is get request
        }
    });
                        

});                       


// show route
router.get("/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundcampground){
        if(err || !foundcampground)
        {
            req.flash("err","Campground not found");
            res.redirect("back");
        }
        else
        {
            //console.log(foundcampground);
            res.render("campgrounds/show",{campground:foundcampground});
        }
    });
});


// edit campground route
router.get("/:id/edit",middleware.checkcampgroundownership,function(req,res){
    Campground.findById(req.params.id,function(err,foundcamp)
    {
        res.render("campgrounds/edit",{campground:foundcamp});  
    })        
})


// update campground route
router.put("/:id",middleware.checkcampgroundownership,function(req,res){
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatecamp){
        if(err)
        {
            res.redirect("/campgrounds");
        }
        else
        {
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})


// destroy campground route
router.delete("/:id",middleware.checkcampgroundownership,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.redirect("/campgrounds");
        }
    })
})




module.exports=router;