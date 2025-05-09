const mongoose  = require('mongoose')
const userSchema =mongoose.Schema( {
   
    email:{
        type:String,
       unique:false,
    },
    img:String,
    
    tittle:String,
    desc:String,
    cate:String,
    
  
   

});
module.exports=mongoose.model("post",userSchema)