
var Campground=require("../models/campground");
var Comment=require("../models/comment");

var middlewareobj={
    checkcampgroundownership : function(req,res,next){        //middleware
        if(req.isAuthenticated())
        {
            Campground.findById(req.params.id,function(err,foundcamp){
                if(err || !foundcamp)
                {
                    req.flash("err","Campground not found");
                    res.redirect("back");
                }
                else
                {
                    if(foundcamp.author.id.equals(req.user._id))            //  (foundcamp.author.id) is a mongoose object while (req.user._id) is a string
                    {
                        next();
                    }                                          
                    else
                    {
                        req.flash("err","you don't have permission to do that..");                        
                        res.redirect("back");
                    }                  
                }
            })        
        }
        else
        {
            req.flash("err","You need to be logged in to do that");
            res.redirect("back");
        }    
    },

    checkcommentownership : function(req,res,next){        //middleware
        if(req.isAuthenticated())
        {
            Comment.findById(req.params.commentid,function(err,foundcomment){
                if(err || !foundcomment)
                {
                    req.flash("err","Comment not found.");
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
                        req.flash("err","You don't have permission to do that");                        
                        res.redirect("back");
                    }                  
                }
            })        
        }
        else
        {
            req.flash("err","You need to be logged in to do that.");            
            res.redirect("back");
        }    
    },

    isloggedin : function(req,res,next){              // middleware
        if(req.isAuthenticated())
        {
            return next();                  
        }
        else
        {
            req.flash("err","You need to be logged in to do that.");                        // this will not display the message here  // message will be displayed in the login form 
            res.redirect("/login");             /// updated a bug
        }
    }
};


module.exports=middlewareobj;