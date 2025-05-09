


gsap.to(".suc",{
    y:-1000,
    duration:4.5,
    
   
    
   
    delay:6
})
gsap.from(".suc",{
    y:-1000,
    duration:4.5,
    
   
    
   
    delay:0.3
})
function animateLoader() {
    gsap.fromTo(".logo", 
        { scale: 0, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 1, ease: "power2.out" }
    );
    
    gsap.fromTo(".text", 
        { opacity: 0, x: -20 }, 
        { opacity: 1, x: 0, duration: 1, delay: 0.5, ease: "power2.out" }
    );
}

animateLoader();
window.addEventListener("load", function() {
    setTimeout(() => {
        gsap.to(".loader-container", { opacity: 0, duration: 0.5, onComplete: () => {
            document.querySelector(".loader-container").style.display = "none";
        }});
    }, 2000); // Loader duration before hiding
});


let pass = document.querySelector("#pass")
pass.addEventListener("mouseover",()=>{
         pass.type="text"
    })

    pass.addEventListener("mouseout",()=>{
        pass.type="password"
   })

 let clci = document.querySelector(".funct")
 clci.addEventListener("click",()=>{
    clci.style.backgroundColor="black"
 })





 