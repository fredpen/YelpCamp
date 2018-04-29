// create the data object
var mongoose = require("mongoose");
var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
   comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comments"
   }],
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   }
});
// set the Object into a varaiable we can use
module.exports = mongoose.model("Campground", campgroundSchema);
