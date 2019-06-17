
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
                    comment.author.username=req.user.username;
                    comment.author.id=req.user._id;
                    comment.save();
                    console.log(comment);
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/"+campground._id);
                }
            })            
        }
    })
});

//edit route
router.get("/:commentid/edit",checkcommentownership,function(req,res){
    Comment.findById(req.params.commentid,function(err,found){
        if(err)
        {
            res.redirect("back");
        }
        else
        {
            res.render("comments/edit",{campground_id:req.params.id,comment:found});        // refer to topmost comment
        }
    })
})


//update route
router.put("/:commentid",checkcommentownership,function(req,res){
    Comment.findByIdAndUpdate(req.params.commentid,req.body.comment,function(err,updatecomment){
        if(err)
        {
            res.redirect("back");
        }
        else
        {
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
})


//destroy route
router.delete("/:commentid",checkcommentownership,function(req,res){
    Comment.findByIdAndRemove(req.params.commentid,function(err){
        if(err)
        {
            res.redirect("back");
        }
        else
        {
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
})

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

function checkcommentownership(req,res,next){        //middleware
    if(req.isAuthenticated())
    {
        Comment.findById(req.params.commentid,function(err,foundcomment){
            if(err)
            {
                res.redirect("back");
            }
            else
            {
                if(foundcomment.author.id.equals(req.user._id))            //  (foundcomment.author.id) is a mongoose object while (req.user._id) is a string
                {
                    next();
                }                                          
                else
                {
                    res.redirect("back");
                }                  
            }
        })        
    }
    else
    {
        res.redirect("back");
    }    
}


module.exports=router;