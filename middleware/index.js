
var Campground=require("../models/campground");
var Comment=require("../models/comment");

var middlewareobj={
    checkcampgroundownership : function(req,res,next){        //middleware
        if(req.isAuthenticated())
        {
            Campground.findById(req.params.id,function(err,foundcamp){
                if(err)
                {
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
                        res.redirect("back");
                    }                  
                }
            })        
        }
        else
        {
            res.redirect("back");
        }    
    },

    checkcommentownership : function(req,res,next){        //middleware
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
    },

    isloggedin : function(req,res,next){              // middleware
        if(req.isAuthenticated())
        {
            return next();                  
        }
        else
        {
            res.render("login");
        }
    }
};


module.exports=middlewareobj;