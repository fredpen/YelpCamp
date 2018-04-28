var express = require("express"),
   User = require("../models/user"),
   passport = require("passport"),
   router = express.Router();

// get the register form
router.get("/register", function(req, res) {
   res.render("register")
});

// the register route as a post that handles the form
router.post("/register", function(req, res) {
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
router.get("/login", function(req, res) {
   res.render("login")
});

// the login logic
router.post("/login", passport.authenticate("local", {
   successRedirect: "/campgrounds",
   failureRedirect: "/login"
}), function(req, res) {});

// the logout route
router.get("/logout", function(req, res) {
   req.logout();
   res.redirect("/campgrounds");
});

// the login middleware
function isLoggedIn(req, res, next) {
   if (req.isAuthenticated()) {
      return next();
   }
   res.redirect("/login");
};

module.exports = router;
