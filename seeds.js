
var mongoose = require("mongoose");
    Campground = require("./models/campground"),
    Comment = require("./models/comment");

var data =[
    {
        name:"cloud's rest",
        image:"https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        description:"blah blah blah"
    },
    {
        name:"desert mesa",
        image:"https://images.unsplash.com/photo-1532339142463-fd0a8979791a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        description:"blah blah blah"
    },
    {
        name:"canyon floor",
        image:"https://images.unsplash.com/photo-1545153996-e01b50d6ec38?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80",
        description:"blah blah blah"
    }

]

function seeddb()
{
    Campground.deleteMany({},function(err){
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log("removed campgrounds");
            data.forEach(function(seed){
                Campground.create(seed,function(err,campground){
                    if(err)
                    {
                        console.log(err);
                    }
                    else
                    {
                        console.log("added a campground");
                        // adding comments
                        Comment.create(
                            {
                                text : "this place is great, but i wish there could be internet",
                                author : "abhinav gupta"
                            },function(err,comment){
                                if(err)
                                {
                                    console.log(err);
                                }
                                else
                                {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("created new comment");
                                }
                                
                            })
                    }
                })
            });            
        }
    });
}    

module.exports=seeddb;
