
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

//mongoose.set('useNewUrlParser',true);
//mongoose.set('useFindAndModify',false);
//mongoose.set('useCreateIndex',true);



mongoose.connect("mongodb://localhost:27017/YelpCamp",{useNewUrlParser:true});
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));         // used for css file detection
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

// main page route
app.get("/",function(req,res){
    res.render("landing");
});

// index route
app.get("/campgrounds",function(req,res){               //  (req.user)  contains the inforation about the loggedin user
    
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
app.get("/campgrounds/new",function(req,res){
    res.render("campgrounds/new");
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
            //console.log(foundcampground);
            res.render("campgrounds/show",{campground:foundcampground});
        }
    });
});

// ================================
//      comment routes here
// ================================



// new route
app.get("/campgrounds/:id/comments/new",isloggedin,function(req,res){
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
app.post("/campgrounds/:id/comments",isloggedin,function(req,res){
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


// =============================
//    Authentication Routes
// =============================


// show register form
app.get("/register",function(req,res){
    res.render("register");
})

//handel signup logic
app.post("/register",function(req,res){
    User.register(new User({username:req.body.username}),req.body.password,function(err,user){      //register function provided by passport-local-mongoose to user schema
        if(err)
        {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/campgrounds");
        })
    });                                                         
});


// show login form
app.get("/login",function(req,res){
    res.render("login");
});

// handeling login logic
app.post("/login",passport.authenticate("local",                    // using middelware passport.authenticate()
    {
        successRedirect:"/campgrounds",
        failureRedirect:"/login"
    }),function(req,res){

});

// logout route
app.get("/logout",function(req,res){
    req.logout();
    res.redirect("/campgrounds");
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


app.listen(3000,function(){
    console.log("YelpCamp Server has started...");
});