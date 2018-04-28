// create the data object
var mongoose = require("mongoose");
var commentsSchema = new mongoose.Schema({
   text: String,
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref : "User"
      },
      username: String
   }

});
// set the Object into a varaiable we can use
module.exports = mongoose.model("Comments", commentsSchema);
