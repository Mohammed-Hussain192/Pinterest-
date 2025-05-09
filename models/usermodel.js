const mongoose  = require('mongoose')
const userSchema =mongoose.Schema( {
    fullname:{
        type:String,
       
    },
    email:{
        type:String,
       unique:false,
    },
    
    password:String,
    date:String,
    
  
   

});
module.exports=mongoose.model("peron",userSchema)