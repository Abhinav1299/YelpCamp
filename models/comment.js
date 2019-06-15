

var mongoose=require("mongoose");
var commentschema= new mongoose.Schema({
    text:String,
    author:{
        id:{
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        },
        username:String
    }
});

module.exports=mongoose.model("Comment",commentschema);  // name of the model =Comment