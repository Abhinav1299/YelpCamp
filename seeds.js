
var mongoose = require("mongoose");
    Campground = require("./models/campground"),
    Comment = require("./models/comment");

var data =[
    {
        name:"cloud's rest",
        image:"https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        description:"Severe Tropical Cyclone Raja was a tropical cyclone that holds the 24-hour rainfall record of 674.9 mm (26.57 in) for the French Overseas Territory of Wallis and Futuna. The system was first noted by the Fiji Meteorological Service (FMS) as a weak tropical disturbance northeast of Tokelau in mid-December 1986. The system developed further as it moved southwest over the next few days, and it was classified as Tropical Cyclone Raja on 23 December. The newly renovated named system slowed and unexpectedly recurved southeast towards the French territory of Wallis and Futuna on 24 December. Over the next two days, Raja interacted with what would become Severe Tropical Cyclone Sally and executed a tight loop, passing within 55 km (35 mi) of Futuna. The system peaked as a Category 3 severe tropical cyclone on 28 December, with estimated 10-minute sustained winds of 150 km/h (90 mph). "
    },
    {
        name:"desert mesa",
        image:"https://images.unsplash.com/photo-1532339142463-fd0a8979791a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        description:"Severe Tropical Cyclone Raja was a tropical cyclone that holds the 24-hour rainfall record of 674.9 mm (26.57 in) for the French Overseas Territory of Wallis and Futuna. The system was first noted by the Fiji Meteorological Service (FMS) as a weak tropical disturbance northeast of Tokelau in mid-December 1986. The system developed further as it moved southwest over the next few days, and it was classified as Tropical Cyclone Raja on 23 December. The newly renovated named system slowed and unexpectedly recurved southeast towards the French territory of Wallis and Futuna on 24 December. Over the next two days, Raja interacted with what would become Severe Tropical Cyclone Sally and executed a tight loop, passing within 55 km (35 mi) of Futuna. The system peaked as a Category 3 severe tropical cyclone on 28 December, with estimated 10-minute sustained winds of 150 km/h (90 mph). "
    },
    {
        name:"canyon floor",
        image:"https://images.unsplash.com/photo-1545153996-e01b50d6ec38?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80",
        description:"Severe Tropical Cyclone Raja was a tropical cyclone that holds the 24-hour rainfall record of 674.9 mm (26.57 in) for the French Overseas Territory of Wallis and Futuna. The system was first noted by the Fiji Meteorological Service (FMS) as a weak tropical disturbance northeast of Tokelau in mid-December 1986. The system developed further as it moved southwest over the next few days, and it was classified as Tropical Cyclone Raja on 23 December. The newly renovated named system slowed and unexpectedly recurved southeast towards the French territory of Wallis and Futuna on 24 December. Over the next two days, Raja interacted with what would become Severe Tropical Cyclone Sally and executed a tight loop, passing within 55 km (35 mi) of Futuna. The system peaked as a Category 3 severe tropical cyclone on 28 December, with estimated 10-minute sustained winds of 150 km/h (90 mph). "
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
