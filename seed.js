var mongoose = require("mongoose"),
   Campground = require("./models/campground"),
   Comments = require("./models/comment");

var data = [{
   name: "Ricardo Gomez Angel",
   image: "/images/p1.jpg",
   description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
}, {
   name: "Joshua Reddekopp",
   image: "/images/p2.jpg",
   description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex "
}, {
   name: "Arash Asghari",
   image: "/images/p4.jpg",
   description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex "
}, {
   name: "Lance Anderson",
   image: "/images/p5.jpg",
   description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex "
}, {
   name: "Adrian Infernus",
   image: "/images/p6.jpg",
   description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex "
}, {
   name: "Hakan Nural",
   image: "/images/p7.jpg",
   description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex "
}]

var data2 = [{
   text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum",
   author: "Allan Smith"
}, {
   text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor ",
   author: "Jane Dow"
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
                  data2.forEach(function(data) {
                     Comments.remove({}, function(err) {
                        Comments.create(data, function(err, comment) {
                           if (err) {
                              console.log(err);
                           } else {
                              campground.comments.push(comment);
                              campground.save();
                           }
                        });
                     })
                  });
               }
            })
         })
      }
   })
};
module.exports = seedDb;
