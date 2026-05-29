// ================= FORM =================

const form = document.getElementById("contactForm");


// ================= INPUTS =================

const nameInput = document.getElementById("name");

const emailInput = document.getElementById("email");

const messageInput = document.getElementById("message");


// ================= ERRORS =================

const nameError = document.getElementById("nameError");

const emailError = document.getElementById("emailError");

const messageError = document.getElementById("messageError");


// ================= SUCCESS =================

const successMessage =
document.getElementById("successMessage");


// ================= EMAIL REGEX =================

const emailPattern =
/^[^\s@]+@[^\s@]+\.[^\s@]+$/;


// ================= NAME VALIDATION =================

function validateName(name){

    // only alphabets + spaces

    const namePattern = /^[A-Za-z\s]+$/;

    return namePattern.test(name);
}


// ================= SHOW ERROR =================

function showError(element, message){

    element.textContent = message;
}


// ================= CLEAR ERROR =================

function clearError(element){

    element.textContent = "";
}


// ================= REAL TIME VALIDATION =================


// ---------- NAME ----------

nameInput.addEventListener("input", () => {

    const name = nameInput.value.trim();

    if(name === ""){

        showError(nameError,
        "Name field cannot be empty.");

    }

    else if(name.length < 3){

        showError(nameError,
        "Name must be at least 3 characters.");

    }

    else if(!validateName(name)){

        showError(nameError,
        "Only alphabets are allowed.");

    }

    else{

        clearError(nameError);
    }

});


// ---------- EMAIL ----------

emailInput.addEventListener("input", () => {

    const email = emailInput.value.trim();

    if(email === ""){

        showError(emailError,
        "Email field cannot be empty.");

    }

    else if(!emailPattern.test(email)){

        showError(emailError,
        "Enter a valid email address.");

    }

    else{

        clearError(emailError);
    }

});


// ---------- MESSAGE ----------

messageInput.addEventListener("input", () => {

    const message = messageInput.value.trim();

    if(message === ""){

        showError(messageError,
        "Message field cannot be empty.");

    }

    else if(message.length < 20){

        showError(messageError,
        "Message must contain at least 20 characters.");

    }

    else{

        clearError(messageError);
    }

});


// ================= FORM SUBMIT =================

form.addEventListener("submit", async function(e){

    e.preventDefault();

    // clear old errors

    clearError(nameError);

    clearError(emailError);

    clearError(messageError);

    successMessage.style.display = "none";


    // ================= VALUES =================

    const name = nameInput.value.trim();

    const email = emailInput.value.trim();

    const message = messageInput.value.trim();


    let isValid = true;


    // ================= NAME =================

    if(name === ""){

        showError(nameError,
        "Name field cannot be empty.");

        isValid = false;
    }

    else if(name.length < 3){

        showError(nameError,
        "Name must be at least 3 characters.");

        isValid = false;
    }

    else if(!validateName(name)){

        showError(nameError,
        "Only alphabets are allowed in name.");

        isValid = false;
    }


    // ================= EMAIL =================

    if(email === ""){

        showError(emailError,
        "Email field cannot be empty.");

        isValid = false;
    }

    else if(!emailPattern.test(email)){

        showError(emailError,
        "Enter a valid email address.");

        isValid = false;
    }


    // ================= MESSAGE =================

    if(message === ""){

        showError(messageError,
        "Message field cannot be empty.");

        isValid = false;
    }

    else if(message.length < 20){

        showError(messageError,
        "Message must contain at least 20 characters.");

        isValid = false;
    }


    // ================= SUCCESS =================

   if(isValid){

    const submitBtn =
    document.getElementById(
    "submitBtn"
    );

    submitBtn.disabled =
    true;

    submitBtn.textContent =
    "Sending...";

    try{

           const { error } =
                await supabaseClient
                .from("contact_messages")
                .insert([
                    {
                        full_name: name,
                        email: email,
                        message: message
                    }
                ]);

                if(error){

                    throw error;
                }


            // ================= SUCCESS UI =================

           successMessage.style.display =
"block";

successMessage.textContent =
"Message sent successfully. Our team will contact you soon.";

            console.log({
                name,
                email,
                message
            });


            // reset form

           form.reset();

document
.getElementById("submitBtn")
.disabled = false;

document
.getElementById("submitBtn")
.textContent =
"Send Message";

        }

        catch(error){

           successMessage.style.display =
            "block";

            successMessage.textContent =
            "Failed to send message. Please try again.";

            document
.getElementById("submitBtn")
.disabled = false;

document
.getElementById("submitBtn")
.textContent =
"Send Message";

console.error(
"SUPABASE ERROR:",
error
);

alert(
JSON.stringify(error)
);
        }

    }

});
