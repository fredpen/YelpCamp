var express = require("express"),
   Campground = require("../models/campground"),
   Comments = require("../models/comment"),
   router = express.Router();

// the comment routes
router.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
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
router.post("/campgrounds/:id/comments", isLoggedIn, function(req, res) {
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

// the login middleware
function isLoggedIn(req, res, next) {
   if (req.isAuthenticated()) {
      return next();
   }
   res.redirect("/login");
};

module.exports = router;
