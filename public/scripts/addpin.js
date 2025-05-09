const imgurl= document.querySelector("#imgurl")
const imgad= document.querySelector("#imgad")

imgurl.addEventListener("change",()=>{
    imgad.src=imgurl.value
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