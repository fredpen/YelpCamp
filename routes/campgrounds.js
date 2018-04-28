var express = require("express"),
   Campground = require("../models/campground"),
   router = express.Router();

// the homepage route
router.get("/", function(req, res) {
   res.render("landing");
});

// the campgrounds
router.get("/campgrounds", function(req, res) {
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
router.post("/campgrounds", isLoggedIn, function(req, res) {
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
router.get("/campgrounds/new", isLoggedIn, function(req, res) {
   res.render("campgrounds/new");
});

// the route that shows or give details about a specific camp
router.get("/campgrounds/:id", function(req, res) {
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

// the login middleware
function isLoggedIn(req, res, next) {
   if (req.isAuthenticated()) {
      return next();
   }
   res.redirect("/login");
};

module.exports = router;
