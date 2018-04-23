var mongoose = require("mongoose"),
   Campground = require("./models/campground"),
   Comments = require("./models/comment");

var data = [{
   name: "Golden prick Park, Abuja",
   image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScywb_dWxB6Ft-OPvyAtx-QOTJ2TliWfjRpqGkju0D_9_UDqkT",
   description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
}, {
   name: "Olumk Rock, Abeokuta",
   image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEjFcGe0CI0jRDFfyO4Il2b--70jPrGW8XwMh9Q90PE8tg7i-E",
   description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse"
}, {
   name: "Erin Ijesa Waterfall, Ijesa",
   image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0Pi_HUUj23OvY4mVTT3evZHnM0m4s0v23ZnL7lWZfN1Z4pSnsxg",
   description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex "
}]


function seedDb() {
   // remove all camps
   Campground.remove({}, function(err) {
      if (err) {
         console.log(err);
      } else {
         console.log("camp has been removed");
         // add camps
         data.forEach(function(seed) {
            Campground.create(seed, function(err, campground) {
               if (err) {
                  console.log(err);
               } else {
                  console.log("camp created");
                  // create commentsSchema
                  Comments.create({
                     text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor ",
                     author: "Jane Dow"
                  }, function(err, comment) {
                     if (err) {
                        console.log(err);
                     } else {
                        console.log(comment);
                        campground.comments.push(comment);
                        campground.save();
                     }
                  })
               }
            })
         })
      }
   })
}
module.exports = seedDb;
