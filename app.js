var express = require("express"),
   app = express(),
   flash = require("connect-flash"),
   mongoose = require("mongoose"),
   passport = require("passport"),
   seedDb = require("./seed"),
   User = require("./models/user"),
   bodyParser = require("body-parser"),
   Comments = require("./models/comment"),
   passport = require("passport"),
   methodOverride = require("method-override"),
   localStrategy = require("passport-local"),
   expressSession = require("express-session"),
   Campground = require("./models/campground"),
   passportLocalMongoose = require("passport-local-mongoose");

var commentRoutes = require("./routes/comments"),
   campgroundRoutes = require("./routes/campgrounds"),
   indexRoutes = require("./routes/index");


mongoose.connect("mongodb://localhost/fred-camp-v7")
app.use(bodyParser.urlencoded({
   extended: true
}));
app.use(flash());
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

// prepopulate our database with data
// seedDb();

// passport configuration
app.use(expressSession({
   secret: "og",
   resave: false,
   saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error")
   res.locals.success = req.flash("success")
   res.locals.info = req.flash("info")
   next();
});

app.use(commentRoutes);
app.use(indexRoutes);
app.use(campgroundRoutes);

app.listen(4000, function() {
   console.log("Yelp camp server is running");
});
