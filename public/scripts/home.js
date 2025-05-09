t1=document.querySelector("#t1")
t2=document.querySelector("#t2")
t3=document.querySelector("#t3")
t4=document.querySelector("#t4")
t5=document.querySelector("#t5")
t6=document.querySelector("#t6")
im1= document.querySelector("#im1")
im2= document.querySelector("#im2")
im3= document.querySelector("#im3")
im4= document.querySelector("#im4")
im5= document.querySelector("#im5")
im6= document.querySelector("#im6")
// im1= document.querySelector("#im1")

im1.addEventListener("mouseover",()=>{
     t1.style.opacity="1"
})
im1.addEventListener("mouseleave",()=>{
    t1.style.opacity="0"
})

im2.addEventListener("mouseover",()=>{
    t2.style.opacity="1"
})
im2.addEventListener("mouseleave",()=>{
   t2.style.opacity="0"
})

im3.addEventListener("mouseover",()=>{
    t3.style.opacity="1"
})
im3.addEventListener("mouseleave",()=>{
   t3.style.opacity="0"
})

im4.addEventListener("mouseover",()=>{
    t4.style.opacity="1"
})
im4.addEventListener("mouseleave",()=>{
   t4.style.opacity="0"
})

im5.addEventListener("mouseover",()=>{
    t5.style.opacity="1"
})
im5.addEventListener("mouseleave",()=>{
   t5.style.opacity="0"
})


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