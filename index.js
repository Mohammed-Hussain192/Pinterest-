const express = require('express')
const path = require('path')
const axios = require("axios");
const cors = require("cors");
const moment = require("moment");
const connection = require("./config/db")
const usermodel = require("./models/usermodel")
const postmodel  = require("./models/postmodel")
const savemodel = require("./models/savemodel")
const nodemailer = require('nodemailer')
const expressSession=require("express-session")
const flash = require("connect-flash");
var cookieParser = require('cookie-parser')

const app = express()
app.use(cookieParser())
app.use(expressSession({
    resave:false,
    saveUninitialized:false,
    secret:"dddddd"
})
)

const transporter = nodemailer.createTransport({
    secure:true,
    host: "smtp.gmail.com",
    port: 465,
    auth: {
     user: "pintrest.official.clone@gmail.com",
        pass: "dkthreoarncvvswr"
    }
  
  })


app.use(flash())

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

const PEXELS_API_KEY = "oaOwekKY4STFrUGW7buvw58Q3qj7Q1ky5dBZ0tOjNOOG99QR3psZiU8y ";
const GOOGLE_API_KEY = "AIzaSyCGqDXyMUXBIkTIda9tFncAnj7HOsVnT1U";
const SEARCH_ENGINE_ID = "e482665e0b1a843ab"; 



// middelware
function loginmiddelware(req,res,next){
    if(!req.cookies.email || req.cookies.email==0){
        let suc= req.flash("error","please Log in for further use")
        res.redirect("/login/user")
        
    }
    else{
        next()
    }
}

app.get("/",function(req,res){
    res.cookie("email"," " )
    console.log(req.cookies.email)
    res.render("index")
})






app.get("/login/user",function(req,res){
    let suc=req.flash("error")
    res.render("login",{suc})
})

app.get("/forgetpass",function(req,res){
    res.render("forgetpass")
})
app.post("/forget/pass",async function(req,res){
    let {email} = req.body
    let checkmail=await usermodel.findOne({email: email,})  
    if(checkmail){
        let suc= req.flash("error","Password is sent to your email id")
        res.redirect("/login/user")
        const info = await transporter.sendMail({
            from: '"Pinterest Clone" <pintrest.official.clone@gmail.com>',
            to: checkmail.email,
            subject: "Password Reset Request",     
            text: `
            Hello ${checkmail.fullname},
            your password is ${checkmail.password}
            If you did not request this, please ignore this email.  
            thank you for using our service!
            ` ,
        })
        console.log("Message sent: %s", info.messageId);
    }
    else{
    
        let suc= req.flash("error","Email Not Found! Create a new account")
        res.redirect("/register/user")
    }
    console.log("checkmail",checkmail)  
})



app.post("/save",(req,res)=>{
    const {img} = req.body
    console.log(img)
    res.render("save",{img})

})

app.post("/save/image/data",(req,res)=>{
    const {img} = req.body
    if(!img||img.length==0){
        let suc= req.flash("error","Something went wrong")
        res.redirect("/home")
    }
    else{
        let save = savemodel.create({
            email:req.cookies.email,
            img:img,
        })
        let suc= req.flash("error","saved successfully")
        res.redirect("/home")
        
    }
})

app.get("/register/user",function(req,res){
    let suc=req.flash("error")
    res.render("register",{suc})
})

app.get("/home", loginmiddelware, async (req, res) => {
    let suc = req.flash("error");
    console.log("User Email:", req.cookies.email);

    try {
        const response = await axios.get("https://api.unsplash.com/photos", {
            params: {
                client_id: "Hnj_QguxPjNhDh_7N7IZMFk37znPPQ-xomz5fQEMI2o",
                per_page: 50,
                random:true // Fetch 30 images
                
            },
        });

        // Modify response structure to match expected format
        const modifiedResponse = {
            data: response.data.map(photo => ({
                url: photo.urls.regular, // Extract image URL
                photographer: photo.user.name, // Photographer name
            })),
        };

        res.render("home", { images: modifiedResponse.data, suc }); // Keeps original structure
        console.log("Custom Format:", moment().format("dddd, MMMM Do YYYY"));
    } catch (error) {
        console.error("Error fetching images:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to fetch images", details: error.response?.data || error.message });
    }
});


// app.get("/home", loginmiddelware, async (req, res) => {
//     let suc=req.flash("error")
//     console.log("User Email:", req.cookies.email);

//     try {
//         const response = await axios.get("https://pixabay.com/api/", {
//             params: {
//                 key:'49461288-bfacd282aa310385e16e1b424',
//                 q: "",  // You can change the query
//                 per_page: 30,        // Fetch 30 images
//                 image_type: "photo",
//                 order: "popular" // Ensure only photos are returned
//             },
//         });

//         // Modify response structure to match expected format
//         const modifiedResponse = {
//             data: response.data.hits.map(photo => ({
//                 url: photo.webformatURL, // Extract image URLs
//                 photographer: photo.user, // Photographer name
//             })),
//         };

//         res.render("home", { images: modifiedResponse.data,suc }); // Keeps original structure
//         console.log("Custom Format:", moment().format("dddd, MMMM Do YYYY"));
//     } catch (error) {
//         console.error("Error fetching images:", error.response?.data || error.message);
//         res.status(500).json({ error: "Failed to fetch images", details: error.response?.data || error.message });
//     }
// });







app.post("/generate-image", loginmiddelware, async (req, res) => {
    try {
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required" });
        }

        let allImages = [];

        for (let start = 1; start <= 51; start += 10) { 
            const response = await axios.get("https://www.googleapis.com/customsearch/v1", {
                params: {
                    key: GOOGLE_API_KEY,
                    cx: SEARCH_ENGINE_ID,
                    searchType: "image",
                    q: prompt,
                    num: 10,
                    start: start,
                },
            });

            if (response.data.items && response.data.items.length > 0) {
                allImages = allImages.concat(response.data.items);
            }
        }

        if (allImages.length === 0) {
            return res.status(404).json({ error: "No images found for the given prompt" });
        }

        res.render("image2", { images: allImages });
    } catch (error) {
        console.error(error); // helpful to debug
        res.status(500).json({ error: "Failed to generate images" });
    }
});

app.get("/nature/image",loginmiddelware, async (req, res) => {
    try {
        
        
        
        const response = await axios.get("https://www.googleapis.com/customsearch/v1", {
            params: {
                key: GOOGLE_API_KEY,
                cx: SEARCH_ENGINE_ID,
                searchType: "image",
                q:"nature",
                num: 10,
            },
        });

        if (!response.data.items || response.data.items.length === 0) {
            return res.status(404).json({ error: "No images found for the given prompt" });
        }

       res.render("genrateimages", { images: response.data.items });
    } catch (error) {
        res.status(500).json({ error: "Failed to generate image" });
    }
})

app.get("/animal/image",loginmiddelware, async (req, res) => {
    try {
        
        

        const response = await axios.get("https://www.googleapis.com/customsearch/v1", {
            params: {
                key: GOOGLE_API_KEY,
                cx: SEARCH_ENGINE_ID,
                searchType: "image",
                q:"animal",
                num: 10,
            },
        });

        if (!response.data.items || response.data.items.length === 0) {
            return res.status(404).json({ error: "No images found for the given prompt" });
        }

       res.render("genrateimages", { images: response.data.items });
    } catch (error) {
        res.status(500).json({ error: "Failed to generate image" });
    }
})

app.get("/anime/image",loginmiddelware, async (req, res) => {
    try {
        
        

        const response = await axios.get("https://www.googleapis.com/customsearch/v1", {
            params: {
                key: GOOGLE_API_KEY,
                cx: SEARCH_ENGINE_ID,
                searchType: "image",
                q:"anime",
                num: 10,
            },
        });

        if (!response.data.items || response.data.items.length === 0) {
            return res.status(404).json({ error: "No images found for the given prompt" });
        }

       res.render("genrateimages", { images: response.data.items });
    } catch (error) {
        res.status(500).json({ error: "Failed to generate image" });
    }
})

app.get("/Ai-generated/image",loginmiddelware, async (req, res) => {
    try {
        
        

        const response = await axios.get("https://www.googleapis.com/customsearch/v1", {
            params: {
                key: GOOGLE_API_KEY,
                cx: SEARCH_ENGINE_ID,
                searchType: "image",
                q:"Ai generated",
                num: 10,
            },
        });

        if (!response.data.items || response.data.items.length === 0) {
            return res.status(404).json({ error: "No images found for the given prompt" });
        }

       res.render("genrateimages", { images: response.data.items });
    } catch (error) {
        res.status(500).json({ error: "Failed to generate image" });
    }
})




app.get("/explore",loginmiddelware,function(req,res){
    // console.log("Custom Format:", moment().format("dddd, MMMM Do YYYY, "))
    const date= moment().format("dddd, MMMM Do YYYY, ")
    console.log(date)
    res.render("explore",{date})
    
})





app.post("/create/user", async function(req, res) {
    try {
        let { name, email, password, dob } = req.body;
        let find = await usermodel.findOne({ email: email });

        if (find) {
            console.log("Email already in use");
            req.flash("error", "Email already in use");
            return res.redirect("/login/user");
        }

        let user = await usermodel.create({
            fullname: name,
            email: email,
            password: password,
            date: dob
        });

        res.cookie("email", user.email);
        console.log(user.email);

        // Sending email before redirecting
        const info = await transporter.sendMail({
            from: '"Pinterest Clone" <pintrest.official.clone@gmail.com>',
            to: user.email,
            subject: "Welcome to Pinterest Clone!",
            text: `
          Hi ${user.fullname},
          
          Welcome to Pinterest Clone! We're excited to have you join us.
          
          Here, you can discover new ideas, save your favorites, and get inspired by creativity from around the world.
          
          If you need any help, feel free to reach out—we're here for you.
          
          Thanks for being part of our community!
          
          Best regards,  
          The Pinterest Clone Team
          `
          });
        

        console.log("Message sent: %s", info.messageId);

        res.redirect("/home"); // Redirect after email is sent
    } catch (error) {
        console.error("Error creating user or sending email:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/delete/saved/image",function(req,res){
    let{Image} = req.body
    console.log(Image)
    res.render("deletesave",{Image})
})



app.post("/delete/image/data",async function(req,res){
    let{image}=req.body
    let delete1 = await savemodel.deleteOne({
        email:req.cookies.email,
        img:image,
    })
    if(delete1){
        req.flash("error", "Removed Succesfully");
            return res.redirect("/profile");
    }
})
app.post("/delete/post/image", async function(req, res) {
    try {
        const { image } = req.body;
        
        // First check if the image exists
        const existingPost = await postmodel.findOne({
            email: req.cookies.email,
            img: image
        });

        if (!existingPost) {
            req.flash("error", "Image not found");
            return res.redirect("/profile");
        }

        // Delete the image
        const deleteResult = await postmodel.deleteOne({
            email: req.cookies.email,
            img: image
        });

        if (deleteResult.deletedCount > 0) {
            req.flash("success", "Image removed successfully");
        } else {
            req.flash("error", "Failed to remove image");
        }
        
        return res.redirect("/profile");
    } catch (error) {
        console.error("Error deleting image:", error);
        req.flash("error", "An error occurred while deleting the image");
        return res.redirect("/profile");
    }
});
app.post("/login/user/data",async function(req,res){
    let{email,password}=req.body
    let checkmail=await usermodel.findOne({email: email,})
    if(checkmail){
        
            if(checkmail.password==password){
                
                res.cookie("email",checkmail.email)
                let suc= req.flash("logined","welcome back!")
                res.redirect("/home")
                
            }else{
                let suc= req.flash("error","Email or Password is Wrong")
                res.redirect("/register/user")
            }
        
       
    }else{
        let suc= req.flash("error","Email Not Found! Create a new account")
        res.redirect("/register/user")
    }

    
})
app.get("/setting",function(req,res){
    res.render("setting")
})

app.get("/addpin",loginmiddelware,function(req,res){
    let suc=req.flash("error")
    res.render("addpin",{suc})
})

app.get("/update/user",loginmiddelware,function(req,res){
    res.render("update")


})
app.post("/create/post",async function(req,res){
    const  {img,tittle,desc,cate}= req.body
    if(!img||!tittle||!desc||!cate||img.length==0||tittle.length==0||desc.length==0||cate.length==0)
    {
        let suc= req.flash("error","please fill all feilds")
        res.redirect("/addpin")
    }
    else{
        let post = await postmodel.create({
            email:req.cookies.email,
            img:img,
            tittle:tittle,
            desc:desc,
            cate:cate
        })
        let suc= req.flash("error","Your Pin is Added")
        res.redirect("/addpin")
    }
    console.log(img,tittle,desc,cate)
})


app.get("/profile",async (req,res)=>{
     
    const user= await usermodel.findOne({
        email:req.cookies.email
    })
    const posts= await postmodel.find({
        email:req.cookies.email
    })
    const saves= await savemodel.find({
        email:req.cookies.email
    })
    let suc=req.flash("error")
    res.render("profile",{user,posts,saves,suc})
})


app.get("/edit/image/", async function(req,res){
    console.log(req.query.image)
    let posty = await postmodel.findOne({
        img:req.query.image
    })
    
    res.render("updateimg",{posty})


})
app.post("/update/img/data", async function(req,res){
    let data = {dimg,uimg,tittle,desc} = req.body
    console.log(data)
    const update = await postmodel.updateOne(
        {img:dimg},
        {
            $set:{
                email:req.cookies.email,
                img:uimg,
                tittle:tittle,
                desc:desc
            }
        }
    )
    if(update)
    {   let suc= req.flash("error","Updated Successfully")
        res.redirect("/profile")
        console.log("updated")
    }

})
app.listen(4000,function(){
    console.log(4000)
}) 