
var express=require("express"),
    app=express(),
    bodyparser=require("body-parser"),
    mongoose=require("mongoose"),
    Campground=require("./models/campground"),
    Comment=require("./models/comment"),
    seeddb=require("./seeds"),
    passport=require("passport"),
    localstrategy=require("passport-local"),
    User = require("./models/user"),
    expresssession=require("express-session")

var commentroutes=require("./routes/comments");
var campgroundroutes=require("./routes/campground");    
var indexroutes=require("./routes/index");







//mongoose.set('useNewUrlParser',true);
//mongoose.set('useFindAndModify',false);
//mongoose.set('useCreateIndex',true);



mongoose.connect("mongodb://localhost:27017/YelpCamp",{useNewUrlParser:true});
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));         // used for css file detection
app.set("view engine","ejs");

//seeddb();             //seeding the database
//Campground.deleteMany({},function(req,res){});
//Comment.deleteMany({},function(req,res){});
//User.deleteMany({},function(req,res){});

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



// express-session configuration
app.use(expresssession({
    secret : "my name is abhinav gupta",
    resave : false,
    saveUninitialized : false
}));


// passport configuration
app.use(passport.initialize());
app.use(passport.session());


// passport-local configuration
passport.use(new localstrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

      
app.use(function(req,res,next){                     // we want to make (req.user) available for all routes,so creating a middleware that is attached to all routes is the solution
    res.locals.currentuser=req.user;                // whatever we put inside res.locals, is available for all tempelates
    next();                                         // current user is an object containing username and _id and not the password
}); 

app.use("/",indexroutes);                       // order is important
app.use("/campgrounds",campgroundroutes);
app.use("/campgrounds/:id/comments",commentroutes);







app.listen(3000,function(){
    console.log("YelpCamp Server has started...");
});