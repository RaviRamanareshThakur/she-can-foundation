// =====================================================
// THEME TOGGLE
// =====================================================

const themeButton =
document.querySelector(".theme-toggle");


// ================= LOAD SAVED THEME =================

if(localStorage.getItem("theme") === "dark"){

    document.body.classList.add("dark");

    themeButton.innerHTML = "<span>☀️</span>";

}else{

    themeButton.innerHTML = "<span>🌙</span>";
}


// ================= TOGGLE THEME =================

themeButton.addEventListener("click", () => {

    document.body.classList.toggle("dark");


    // SAVE THEME

    if(document.body.classList.contains("dark")){

        localStorage.setItem("theme", "dark");

       themeButton.innerHTML = "<span>☀️</span>";

    }else{

        localStorage.setItem("theme", "light");

        themeButton.innerHTML = "<span>🌙</span>";
    }

});




// =====================================================
// MOBILE MENU
// =====================================================

const hamburger =
document.querySelector(".hamburger");

const mobileMenu =
document.querySelector(".mobile-menu");


// ================= TOGGLE MENU =================

hamburger.addEventListener("click", () => {

    mobileMenu.classList.toggle("active");

});


// ================= CLOSE MENU ON LINK CLICK =================

const mobileLinks =
document.querySelectorAll(".mobile-menu a");

mobileLinks.forEach(link => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("active");

    });

});




// =====================================================
// ACTIVE NAVBAR (ONLY HOME PAGE)
// =====================================================

if(

    window.location.pathname.includes("index.html")

    ||

    window.location.pathname === "/"

    ||

    window.location.pathname.endsWith("/")

){

    const sections =
    document.querySelectorAll("section[id]");

    const navLinks =
    document.querySelectorAll(".nav-link");


    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const sectionTop =
            section.offsetTop;

            const sectionHeight =
            section.clientHeight;


            if(

                window.scrollY >= sectionTop - 220

                &&

                window.scrollY <
                sectionTop + sectionHeight - 220

            ){

                current =
                section.getAttribute("id");
            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            const href =
            link.getAttribute("href");


            if(

                href === `#${current}`

            ){

                link.classList.add("active");

            }

        });

    });

}

// =====================================================
// ABOUT SLIDER — FINAL PREMIUM VERSION
// =====================================================

(function () {

    const slides =
    document.querySelectorAll(".about-slide");

    const dots =
    document.querySelectorAll(".dot");

    const frame =
    document.querySelector(".about-slider");


    // STOP IF SLIDER NOT FOUND

    if(
        !slides.length ||
        !dots.length ||
        !frame
    ) return;


    let current = 0;

    let timer = null;


    // =====================================================
    // SHOW SLIDE
    // =====================================================

    function goTo(index){

        slides.forEach(slide => {

            slide.classList.remove("active");

        });

        dots.forEach(dot => {

            dot.classList.remove("active");

        });


        current =
        (index + slides.length)
        % slides.length;


        slides[current]
        .classList.add("active");

        dots[current]
        .classList.add("active");
    }


    // =====================================================
    // NEXT SLIDE
    // =====================================================

    function nextSlide(){

        goTo(current + 1);
    }


    // =====================================================
    // AUTO SLIDE
    // =====================================================

    function startAuto(){

        stopAuto();

        timer =
        setInterval(nextSlide, 3000);
    }


    function stopAuto(){

        if(timer){

            clearInterval(timer);
        }
    }


    // START

    startAuto();


    // =====================================================
    // DOT CLICK
    // =====================================================

    dots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            goTo(index);

            startAuto();

        });

    });


    // =====================================================
    // TOUCH / SWIPE
    // =====================================================

    let touchStartX = 0;

    let touchStartY = 0;


    frame.addEventListener(
    "touchstart",
    (e) => {

        touchStartX =
        e.touches[0].clientX;

        touchStartY =
        e.touches[0].clientY;

    }, { passive: true });


    frame.addEventListener(
    "touchend",
    (e) => {

        const dx =
        touchStartX -
        e.changedTouches[0].clientX;

        const dy =
        touchStartY -
        e.changedTouches[0].clientY;


        // ONLY HORIZONTAL SWIPE

        if(

            Math.abs(dx) >
            Math.abs(dy)

            &&

            Math.abs(dx) > 40

        ){

            if(dx > 0){

                goTo(current + 1);

            }else{

                goTo(current - 1);
            }

            startAuto();
        }

    }, { passive: true });


    // =====================================================
    // PAUSE ON HOVER
    // =====================================================

    frame.addEventListener(
    "mouseenter",
    stopAuto
    );

    frame.addEventListener(
    "mouseleave",
    startAuto
    );

})();

// =====================================================
// AUTH BUTTON
// =====================================================

const authBtn =
document.getElementById("authBtn");

const mobileAuthBtn =
document.getElementById("mobileAuthBtn");

const userWelcome =
document.getElementById("userWelcome");

const mobileUserWelcome =
document.getElementById(
"mobileUserWelcome"
);

if(authBtn){

    supabaseClient.auth
    .getSession()
    .then(({ data }) => {

        if(data.session){

            const fullName =
            data.session.user.user_metadata
            ?.full_name || "User";

            if(userWelcome){

    userWelcome.textContent =
    `Welcome, ${fullName}`;
}

if(mobileUserWelcome){

    mobileUserWelcome.style.display =
    "block";

    mobileUserWelcome.textContent =
    `Welcome, ${fullName}`;
}

            authBtn.textContent =
            "Logout";

            authBtn.href = "#";

            if(mobileAuthBtn){

                mobileAuthBtn.textContent =
                "Logout";

                mobileAuthBtn.href = "#";
            }

            const logoutHandler =
            async (e) => {

                e.preventDefault();

                await supabaseClient
                .auth
                .signOut();

                localStorage.removeItem(
                "rememberUser"
                );

               window.location.replace(
"login.html"
);
            };

            authBtn.addEventListener(
                "click",
                logoutHandler
            );

            if(mobileAuthBtn){

                mobileAuthBtn.addEventListener(
                    "click",
                    logoutHandler
                );
            }

        }

    });

}