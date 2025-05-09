const mongoose  = require('mongoose')
const userSchema =mongoose.Schema( {
    
    
    email:String,
    img:String,
    
  
   

});
module.exports=mongoose.model("save",userSchema)