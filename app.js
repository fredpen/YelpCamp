var express = require("express"),
   app = express(),
   mongoose = require("mongoose"),
   passport = require("passport"),
   seedDb = require("./seed"),
   User = require("./models/user"),
   bodyParser = require("body-parser"),
   Comments = require("./models/comment"),
   passport = require("passport"),
   localStrategy = require("passport-local"),
   expressSession = require("express-session"),
   Campground = require("./models/campground"),
   passportLocalMongoose = require("passport-local-mongoose");


mongoose.connect("mongodb://localhost/fred-camp-v7")
app.use(bodyParser.urlencoded({
   extended: true
}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

app.use(function(req, res, next) {
   res.locals.activeUser = req.user;
   next();
})
// prepopulate our database with data
// seedDb();

// =================================================
// passport configuration
app.use(expressSession({
   secret: "og",
   resave: false,
   saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// =====================================================
// the homepage route
app.get("/", function(req, res) {
   res.render("landing");
});
// the campgrounds
app.get("/campgrounds", function(req, res) {
   Campground.find({}, function(err, allcamps) {
      if (err) {
         console.log(err);
      } else {
         res.render("campgrounds/index", {
            campground: allcamps,
            activeUser: req.user
         });
      };
   });
});

// the post route to creating the campgrounds
app.post("/campgrounds", function(req, res) {
   var name = req.body.name;
   var image = req.body.image;
   var description = req.body.description;
   var newCampground = {
      name: name,
      image: image,
      description: description
   };
   Campground.create(newCampground, function(err, newcamp) {
      if (err) {
         console.log(err);
      } else {
         res.redirect("/campgrounds");
      }
   });
});

// new show the form to add new camps
app.get("/campgrounds/new", isLoggedIn, function(req, res) {
   res.render("campgrounds/new");
});

// the route that shows or give details about a specific camp
app.get("/campgrounds/:id", function(req, res) {
   Campground.findById(
      req.params.id).populate("comments").exec(function(err, camp) {
      if (err) {
         console.log(err);
      } else {
         res.render("campgrounds/show", {
            campground: camp
         })
      }
   })
});

// the comment routes
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
   Campground.findById(
      req.params.id,
      function(err, camp) {
         if (err) {
            console.log(err);
         } else {
            res.render("comments/new", {
               campground: camp
            })
         }
      })
});

// the post route for the comment
app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res) {
   // find the Campground using
   Campground.findById(req.params.id, function(err, campground) {
      if (err) {
         console.log(err);
         res.redirect("/campgrounds")
      } else {
         Comments.create(req.body.comment, function(err, comment) {
            if (err) {
               console.log(err);
            } else {
               campground.comments.push(comment);
               campground.save();
               res.redirect("/campgrounds/" + campground._id);
            }
         });
      }
   });
});
// ==============================
// the auth routes
// the resgister routes
app.get("/register", function(req, res) {
   res.render("register")
});

// the register route as a post that handles the form
app.post("/register", function(req, res) {
   var newUser = new User({
      username: req.body.username
   });
   User.register(newUser, req.body.password, function(err, user) {
      if (err) {
         console.log(err);
         return res.redirect("/register");
      }
      passport.authenticate("local")(req, res, function() {
         res.redirect("/campgrounds")
      });
   });
});

// the log in routes
app.get("/login", function(req, res) {
   res.render("login")
});
// the login logic
app.post("/login", passport.authenticate("local", {
   successRedirect: "/campgrounds",
   failureRedirect: "/login"
}), function(req, res) {});

// the logout route
app.get("/logout", function(req, res) {
   req.logout();
   res.redirect("/campgrounds")
});

// the login middleware
function isLoggedIn(req, res, next) {
   if (req.isAuthenticated()) {
      return next();
   }
   res.redirect("/login")
}




app.listen(4000, function() {
   console.log("Yelp camp server is running");
});
