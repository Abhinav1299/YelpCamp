
var express=require("express"),
    app=express(),
    bodyparser=require("body-parser"),
    mongoose=require("mongoose")
    Campground=require("./models/campground")
    Comment=require("./models/comment")
    seeddb=require("./seeds")
    //Comment=require("./models/comment")


//mongoose.set('useNewUrlParser',true);
//mongoose.set('useFindAndModify',false);
//mongoose.set('useCreateIndex',true);



mongoose.connect("mongodb://localhost:27017/YelpCamp",{useNewUrlParser:true});
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine","ejs");

seeddb();


/*
Campground.create(
    {
        name : "mt. fuji" ,
        image:"https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        description:"this is a huge mountain.No water. has beautiful view."
    },function(err,campground)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log("newly created campground");
            console.log(campground);
        }
    }

);*/




app.get("/",function(req,res){
    res.render("landing");
});

// index route
app.get("/campgrounds",function(req,res){
    
    Campground.find({},function(err,allcampgrounds){
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render("index",{campgrounds:allcampgrounds});
        }
    });
});


// new route
app.get("/campgrounds/new",function(req,res){
    res.render("new");
});


// create route
app.post("/campgrounds",function(req,res){           //to add new capground
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
app.get("/campgrounds/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundcampground){
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log(foundcampground);
            res.render("show",{campground:foundcampground});
        }
    });
});

app.listen(3000,function(){
    console.log("YelpCamp Server has started...");
});