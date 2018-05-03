var express = require("express"),
   Campground = require("../models/campground"),
   middlewareObj = require("../middleware/index"),
   Comments = require("../models/comment"),
   router = express.Router();

// the comment routes
router.get("/campgrounds/:id/comments/new", function(req, res) {
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
router.post("/campgrounds/:id/comments", function(req, res) {
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
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               comment.save();
               campground.comments.push(comment);
               campground.save();
               res.redirect("/campgrounds/" + campground._id);
            }
         });
      }
   });
});

// the comments edit route
router.get("/campgrounds/:id/comments/:comments_id/edit", middlewareObj.isCommentOwner, function(req, res) {
   Comments.findById(req.params.comments_id, function(err, foundcomments) {
      if (err) {
         res.redirect("back");
         console.log(err);
      } else {
         res.render("comments/edit", {
            comments: foundcomments,
            campground_id: req.params.id
         })
      }
   });
});

// the comments update route
router.put("/campgrounds/:id/comments/:comments_id", middlewareObj.isCommentOwner, function(req, res) {
   Comments.findByIdAndUpdate(req.params.comments_id, req.body.comments, function(err, updatedcomments) {
      if (err) {
         res.redirect("back")
      } else {
         res.redirect("/campgrounds/" + req.params.id)
      }
   })
});

// the destroy comments router
router.delete("/campgrounds/:id/comments/:comments_id/delete", middlewareObj.isCommentOwner, function(req, res) {
   Comments.findByIdAndRemove(req.params.comments_id, function(err) {
      if (err) {
         res.redirect("back")
      } else {
         res.redirect("back");
      }
   })

})

module.exports = router;
