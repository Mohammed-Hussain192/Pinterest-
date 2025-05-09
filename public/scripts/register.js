


gsap.to(".suc",{
    y:-1000,
    duration:1,
    
   
    
   
    delay:3
})
gsap.from(".suc",{
    y:-1000,
    duration:1,
    
   
    
   
    delay:0.3
})

let pass = document.querySelector("#pass")
pass.addEventListener("mouseover",()=>{
         pass.type="text"
    })

    pass.addEventListener("mouseout",()=>{
        pass.type="password"
   })

 
