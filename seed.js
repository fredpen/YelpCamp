var mongoose = require("mongoose"),
   Campground = require("./models/campground"),
   Comments = require("./models/comment");

var data = [{
   name: "race",
   image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScywb_dWxB6Ft-OPvyAtx-QOTJ2TliWfjRpqGkju0D_9_UDqkT",
   description: "nice place of leisure"
}, {
   name: "lovren",
   image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEjFcGe0CI0jRDFfyO4Il2b--70jPrGW8XwMh9Q90PE8tg7i-E",
   description: "nice place of leisure"
}, {
   name: "batista",
   image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0Pi_HUUj23OvY4mVTT3evZHnM0m4s0v23ZnL7lWZfN1Z4pSnsxg",
   description: "nice place of leisure"
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
                     text: "oh, i love this place lots of great stuffs here",
                     author: "malik damisa"
                  }, function(err, comment) {
                     if (err) {
                        console.log(err);
                     } else {
                        console.log("comment created");
                        campground.comments.push(comment);
                        campground.save();
                        console.log("comments is pushed");
                     }
                  })
               }
            })
         })
      }
   })
}
module.exports = seedDb;
