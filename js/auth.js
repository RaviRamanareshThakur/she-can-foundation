// =====================================================
// TAB SWITCHING
// =====================================================

const loginTab =
document.getElementById("loginTab");

const signupTab =
document.getElementById("signupTab");

const loginForm =
document.getElementById("loginForm");

const signupForm =
document.getElementById("signupForm");

const successMessage =
document.getElementById("successMessage");


// =====================================================
// SESSION CHECK
// =====================================================

(async () => {

    const {
        data: { session }
    } = await supabaseClient.auth.getSession();

    if(session){

    window.location.replace(
    "index.html"
    );
}

})();

loginForm.style.display = "block";

signupForm.style.display = "none";


// ================= LOGIN TAB =================

loginTab.onclick = () => {

    loginTab.classList.add("active");

    signupTab.classList.remove("active");

    loginForm.classList.add("active-form");

    signupForm.classList.remove("active-form");

    loginForm.style.display = "block";

    signupForm.style.display = "none";

    hideSuccess();

};


// ================= SIGNUP TAB =================

signupTab.onclick = () => {

    signupTab.classList.add("active");

    loginTab.classList.remove("active");

    signupForm.classList.add("active-form");

    loginForm.classList.remove("active-form");

    signupForm.style.display = "block";

    loginForm.style.display = "none";

    hideSuccess();

};


// =====================================================
// PASSWORD TOGGLE
// =====================================================

const passwordToggles =
document.querySelectorAll(".toggle-password");

passwordToggles.forEach(toggle => {

    toggle.addEventListener("click", () => {

        const input =
        toggle.parentElement.querySelector("input");

        if(input.type === "password"){

            input.type = "text";

            toggle.classList.remove("fa-eye");

            toggle.classList.add("fa-eye-slash");

        }else{

            input.type = "password";

            toggle.classList.remove("fa-eye-slash");

            toggle.classList.add("fa-eye");
        }

    });

});


// =====================================================
// HELPERS
// =====================================================

const emailPattern =
/^[^\s@]+@[^\s@]+\.[^\s@]+$/;


function showError(id, message){

    document.getElementById(id)
    .textContent = message;
}


function clearError(id){

    document.getElementById(id)
    .textContent = "";
}


function clearAllErrors(){

    document
    .querySelectorAll(".error")
    .forEach(error => {

        error.textContent = "";

    });
}


function showSuccess(message){

    successMessage.style.display =
    "block";

    successMessage.textContent =
    message;
}


function hideSuccess(){

    successMessage.style.display =
    "none";

    successMessage.textContent = "";
}


// =====================================================
// LOGIN FORM
// =====================================================

loginForm.addEventListener(
"submit",
async function(e){

    e.preventDefault();

    clearAllErrors();

    hideSuccess();

    const email =
    document
    .getElementById("loginEmail")
    .value
    .trim();

   const password =
document
.getElementById("loginPassword")
.value
.trim();

const loginButton =
loginForm.querySelector(".auth-btn");

let isValid = true;


    // ================= EMAIL =================

    if(email === ""){

        showError(
        "loginEmailError",
        "Email is required."
        );

        isValid = false;
    }

    else if(
        !emailPattern.test(email)
    ){

        showError(
        "loginEmailError",
        "Enter a valid email."
        );

        isValid = false;
    }


    // ================= PASSWORD =================

    if(password === ""){

        showError(
        "loginPasswordError",
        "Password is required."
        );

        isValid = false;
    }

    else if(password.length < 6){

        showError(
        "loginPasswordError",
        "Minimum 6 characters required."
        );

        isValid = false;
    }


    if(!isValid) return;

loginButton.classList.add("loading");

loginButton.textContent =
"Signing In...";

try{

        const { data, error } =
await supabaseClient.auth
.signInWithPassword({

    email,
    password

});

if(error){

    throw error;
}


        console.log({

            email,
            password

        });


        loginButton.classList.remove("loading");

loginButton.textContent =
"Sign In";

showSuccess(
"Welcome back! Login successful."
);

if(
    document.getElementById("rememberMe").checked
){

    localStorage.setItem(
        "rememberUser",
        "true"
    );

}else{

    localStorage.removeItem(
        "rememberUser"
    );
}

loginForm.reset();

setTimeout(() => {

   window.location.replace(
"index.html"
);

}, 1000);


    }

    catch(error){

    loginButton.classList.remove("loading");

    loginButton.textContent =
    "Sign In";

    if(
    error.message
    .toLowerCase()
    .includes("invalid login")
){

    showError(
    "loginPasswordError",
    "Invalid email or password."
    );

}else{

    showError(
    "loginPasswordError",
    error.message
    );
}

    console.error(error);
}

});


// =====================================================
// SIGNUP FORM
// =====================================================

signupForm.addEventListener(
"submit",
async function(e){

    e.preventDefault();

    clearAllErrors();

    hideSuccess();

    const name =
    document
    .getElementById("signupName")
    .value
    .trim();

    const email =
    document
    .getElementById("signupEmail")
    .value
    .trim();

    const password =
    document
    .getElementById("signupPassword")
    .value
    .trim();

    const confirmPassword =
    document
    .getElementById("confirmPassword")
    .value
    .trim();

    const signupButton =
    signupForm.querySelector(".auth-btn");

    let isValid = true;


    // ================= NAME =================

    if(name === ""){

        showError(
        "signupNameError",
        "Full name is required."
        );

        isValid = false;
    }

    else if(name.length < 3){

        showError(
        "signupNameError",
        "Minimum 3 characters required."
        );

        isValid = false;
    }


    // ================= EMAIL =================

    if(email === ""){

        showError(
        "signupEmailError",
        "Email is required."
        );

        isValid = false;
    }

    else if(
        !emailPattern.test(email)
    ){

        showError(
        "signupEmailError",
        "Enter a valid email."
        );

        isValid = false;
    }


    // ================= PASSWORD =================

    if(password === ""){

        showError(
        "signupPasswordError",
        "Password is required."
        );

        isValid = false;
    }

    else if(password.length < 6){

        showError(
        "signupPasswordError",
        "Password must be at least 6 characters."
        );

        isValid = false;
    }


    // ================= CONFIRM =================

    if(confirmPassword === ""){

        showError(
        "confirmPasswordError",
        "Please confirm password."
        );

        isValid = false;
    }

    else if(
        password !== confirmPassword
    ){

        showError(
        "confirmPasswordError",
        "Passwords do not match."
        );

        isValid = false;
    }



   if(!isValid) return;

signupButton.classList.add("loading");

signupButton.textContent =
"Creating Account...";

try{

        const { data, error } =
            await supabaseClient.auth.signUp({

                email,
                password,

                options: {

    emailRedirectTo:
    "http://127.0.0.1:5500/login.html",

    data: {

        full_name: name

    }

}

            });

            if(error){

                throw error;
            }


                    console.log({

                        name,
                        email,
                        password
        });


        signupButton.classList.remove("loading");

signupButton.textContent =
"Create Account";

showSuccess(
"Account created successfully. You can now sign in."
);

            signupForm.reset();

           setTimeout(() => {

                signupForm.reset();

            }, 1000);

    }

    catch(error){

    signupButton.classList.remove("loading");

    signupButton.textContent =
    "Create Account";

    showError(
    "signupEmailError",
    error.message
    );

    console.error(error);
}

});


// =====================================================
// REAL TIME EMAIL VALIDATION
// =====================================================

document
.getElementById("loginEmail")
.addEventListener("input", function(){

    const value =
    this.value.trim();

    if(
        value !== "" &&
        !emailPattern.test(value)
    ){

        showError(
        "loginEmailError",
        "Invalid email format."
        );

    }else{

        clearError(
        "loginEmailError"
        );
    }

});


document
.getElementById("signupEmail")
.addEventListener("input", function(){

    const value =
    this.value.trim();

    if(
        value !== "" &&
        !emailPattern.test(value)
    ){

        showError(
        "signupEmailError",
        "Invalid email format."
        );

    }else{

        clearError(
        "signupEmailError"
        );
    }

});


// =====================================================
// PASSWORD MATCH CHECK
// =====================================================

document
.getElementById("confirmPassword")
.addEventListener("input", function(){

    const password =
    document
    .getElementById("signupPassword")
    .value;

    const confirm =
    this.value;

    if(
        confirm !== "" &&
        password !== confirm
    ){

        showError(
        "confirmPasswordError",
        "Passwords do not match."
        );

    }else{

        clearError(
        "confirmPasswordError"
        );
    }

});

// =====================================================
// FORGOT PASSWORD
// =====================================================

const forgotPasswordLink =
document.getElementById(
    "forgotPasswordLink"
);

if(forgotPasswordLink){

    forgotPasswordLink
    .addEventListener(
    "click",
    async function(e){

        e.preventDefault();

       const email =
            document
            .getElementById("loginEmail")
            .value
            .trim();

            clearError(
            "loginEmailError"
            );

            if(!email){

                showError(
                "loginEmailError",
                "Enter your email first, then click Forgot Password."
                );

                return;
            }

            if(!emailPattern.test(email)){

                showError(
                "loginEmailError",
                "Please enter a valid email address."
                );

                return;
            }

        try{

            const { error } =
            await supabaseClient
            .auth
            .resetPasswordForEmail(
                email,
                {
                   redirectTo:
"https://shecancommunity.netlify.app/reset-password.html"
                }
            );

            if(error){

                throw error;
            }

            showSuccess(
            "Password reset email sent successfully."
            );

        }

        catch(error){

            showError(
            "loginEmailError",
            error.message
            );

            console.error(error);
        }

    });

}