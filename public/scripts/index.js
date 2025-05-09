
    // Your existing animations
    gsap.from(".s1", {
        x: -1000,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: '.s1',
            markers: false,
            start: "top 20%",
            end: "top 5%",
            scrub: 2
        }
    });

    gsap.from(".imgcontainer div", {
        y: -100,
        opacity: 0,
        duration: 0.5,
        delay: 2,
        stagger: 0.2
    });

    gsap.from(".s2", {
        x: 1000,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: '.s2',
            markers: false,
            start: "top 20%",
            end: "top 5%",
            scrub: 2
        }
    });

    // Cursor animation (existing)
    var main = document.querySelector(".container");
    var cursor = document.querySelector(".cursor");
    var cursor2 = document.querySelector(".cursor2");
    var cursor3 = document.querySelector(".cursor3");
    var cursor4 = document.querySelector(".cursor4");
    var cursor5 = document.querySelector(".cursor5");
    var cursor6 = document.querySelector(".cursor6");
    var cursor7 = document.querySelector(".cursor7");

    main.addEventListener("mousemove", function(e) {
        gsap.to(cursor, {
            x: e.x,
            y: e.y,
            duration: 1,
        });
        gsap.to(cursor2, {
            delay: 0.1,
            x: e.x,
            y: e.y,
            duration: 1,
        });
        gsap.to(cursor3, {
            delay: 0.2,
            x: e.x,
            y: e.y,
            duration: 1,
        });
        gsap.to(cursor4, {
            delay: 0.3,
            x: e.x,
            y: e.y,
            duration: 1,
        });
        gsap.to(cursor5, {
            delay: 0.4,
            x: e.x,
            y: e.y,
            duration: 1,
        });
        gsap.to(cursor6, {
            delay: 0.5,
            x: e.x,
            y: e.y,
            duration: 1,
        });
        gsap.to(cursor7, {
            delay: 0.6,
            x: e.x,
            y: e.y,
            duration: 1,
        });
    });

    // Additional animations for nav items
    gsap.from(".nav a", {
        y: -20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        delay: 2.5
    });

    // Animation for the Pinterest logo in nav
    gsap.from(".pinn", {
        scale: 0,
        rotation: 360,
        duration: 1,
        delay: 2
    });

    // Animation for buttons
    gsap.from(".btn", {
        scale: 0,
        duration: 0.5,
        stagger: 0.2,
        scrollTrigger: {
            trigger: ".btn",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });

    // Pulse animation for buttons on hover
    document.querySelectorAll(".btn").forEach(btn => {
        btn.addEventListener("mouseenter", () => {
            gsap.to(btn, {
                scale: 1.05,
                duration: 0.3,
                yoyo: true,
                repeat: 1
            });
        });
    });

    // Additional image hover animations
    document.querySelectorAll(".limg img").forEach(img => {
        img.addEventListener("mouseenter", () => {
            gsap.to(img, {
                scale: 1.05,
                duration: 0.3,
                boxShadow: "0 10px 20px rgba(0,0,0,0.2)"
            });
        });
        img.addEventListener("mouseleave", () => {
            gsap.to(img, {
                scale: 1,
                duration: 0.3,
                boxShadow: "none"
            });
        });
    });

    // Floating animation for the midcc text
    gsap.to(".midcc", {
        y: 10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    // Animation for form inputs
    gsap.from("input", {
        x: -50,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
            trigger: "form",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });

    // Animation for the welcome text in form
    gsap.from(".wel", {
        y: -30,
        opacity: 0,
        duration: 0.5,
        delay: 0.5
    });

    // Animation for the "Find new ideas" text
    gsap.from(".fn", {
        x: 30,
        opacity: 0,
        duration: 0.5,
        delay: 0.7
    });

    // Background color animation for sections on scroll
    gsap.to(".second", {
        backgroundColor: "#ffd700",
        scrollTrigger: {
            trigger: ".second",
            start: "top center",
            end: "bottom center",
            scrub: true
        }
    });

    gsap.to(".third", {
        backgroundColor: "#7fffd4",
        scrollTrigger: {
            trigger: ".third",
            start: "top center",
            end: "bottom center",
            scrub: true
        }
    });

    // Your existing loader animation
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
            gsap.to(".loader-container", { 
                opacity: 0, 
                duration: 0.5, 
                onComplete: () => {
                    document.querySelector(".loader-container").style.display = "none";
                }
            });
        }, 2000);
    });

    // Your existing animations
    gsap.from("#th1", {
        y: 100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: '#th1',
            markers: false,
            start: "top 20%",
            end: "top 5%",
            scrub: 2
        }
    });

    gsap.from(".th2", {
        y: -100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: '.th2',
            markers: false,
            start: "top 20%",
            end: "top 5%",
            scrub: 2
        }
    });

    // New animation for the full-width image in fourth section
    gsap.from(".full img", {
        scale: 1.2,
        duration: 1,
        scrollTrigger: {
            trigger: ".fourth",
            start: "top bottom",
            end: "top center",
            scrub: true
        }
    });

    // Animation for the info2 in fifth section
    gsap.from(".info2", {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
            trigger: ".fifth",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });
