var express = require("express"),
   mongoose = require("mongoose"),
   bodyParser = require("body-parser"),
   passport = require("passport"),
   localStrategy = require("passport-local"),
   passportLocalMongoose = require("passport-local-mongoose"),
   expressSession = require("express-session"),
   Campground = require("./models/campground"),
   seedDb = require("./seed"),
   User = require("./models/user"),
   Comments = require("./models/comment"),
   app = express();

mongoose.connect("mongodb://localhost/fred-camp-v7")
app.use(bodyParser.urlencoded({
   extended: true
}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

// prepopulate our database with data
// seedDb();
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
            campground: allcamps
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
app.get("/campgrounds/new", function(req, res) {
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
app.get("/campgrounds/:id/comments/new", function(req, res) {
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
app.post("/campgrounds/:id/comments", function(req, res) {
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


app.listen(4000, function() {
   console.log("Yelp camp server is running");
});
