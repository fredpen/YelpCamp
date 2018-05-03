var middlewareObj = {},
   Campground = require("../models/campground"),
   Comments = require("../models/comment")


middlewareObj.isLoggedIn = function isLoggedIn(req, res, next) {
   if (req.isAuthenticated()) {
      return next();
   }
   res.redirect("/login");
};

middlewareObj.isCampgroundOwner = function isCampgroundOwner(req, res, next) {
   if (req.isAuthenticated()) {
      Campground.findById(req.params.id, function(err, foundcamp) {
         if (err) {
            res.redirect("/campgrounds")
         } else {
            if (foundcamp.author.id.equals(req.user._id)) {
               next();
            } else {
               res.redirect("back");
            }
         }
      })
   } else {
      res.redirect("back");
   }
};

middlewareObj.isCommentOwner = function isCommentOwner(req, res, next) {
   if (req.isAuthenticated()) {
      Comments.findById(req.params.comments_id, function(err, foundComments) {
         if (err) {
            res.redirect("back")
         } else {
            if (req.user._id.equals(foundComments.author.id)) {
               next();
            } else {
               res.redirect("back")
            }
         }
      })
   } else {
      res.redirect("/login")
   }
};

module.exports = middlewareObj;
