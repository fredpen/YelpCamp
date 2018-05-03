var express = require("express"),
   Campground = require("../models/campground"),
   middlewareObj = require("../middleware/index"),
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
router.post("/campgrounds", middlewareObj.isLoggedIn, function(req, res) {
   var name = req.body.name;
   var image = req.body.image;
   var description = req.body.description;
   var author = {
      id: req.user._id,
      username: req.user.username
   }
   var newCampground = {
      name: name,
      image: image,
      description: description,
      author: author
   };

   Campground.create(newCampground, function(err, newcamp) {
      if (err) {
         console.log(err);
      } else {
         res.redirect("/campgrounds");
         console.log(newcamp);
      }
   });
});

// new show the form to add new camps
router.get("/campgrounds/new", middlewareObj.isLoggedIn, function(req, res) {
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

// the campground edit route
router.get("/campgrounds/:id/edit", middlewareObj.isLoggedIn, middlewareObj.isCampgroundOwner, function(req, res) {
   Campground.findById(req.params.id, function(err, foundcamp) {
      res.render("../views/campgrounds/edit", {
         campground: foundcamp
      })
   });
});

// the campground edit post router
router.put("/campgrounds/:id", middlewareObj.isLoggedIn, middlewareObj.isCampgroundOwner, function(req, res) {
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, foundcamp) {
      if (err) {
         console.log(err);
         res.redirect("back");
      } else {
         res.redirect("/campgrounds/" + req.params.id);
      }
   });
});

// the delete route
router.delete("/campgrounds/:id/delete", middlewareObj.isLoggedIn, middlewareObj.isCampgroundOwner, function(req, res) {
   Campground.findByIdAndRemove(req.params.id, function(err) {
      if (err) {
         res.redirect("/campgrounds")
      } else {
         res.redirect("/campgrounds")
      }
   });
});

module.exports = router;
