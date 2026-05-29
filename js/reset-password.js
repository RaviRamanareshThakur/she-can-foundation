// =====================================================
// RESET PASSWORD
// =====================================================

const resetBtn =
document.getElementById(
    "resetBtn"
);

const resetMessage =
document.getElementById(
    "resetMessage"
);

resetBtn.addEventListener(
"click",
async () => {

    const password =
    document
    .getElementById(
    "newPassword"
    )
    .value
    .trim();

    if(password.length < 6){

        resetMessage.textContent =
        "Password must be at least 6 characters.";

        return;
    }

    resetBtn.disabled = true;

    resetBtn.textContent =
    "Updating...";

    const { error } =
    await supabaseClient.auth
    .updateUser({

        password: password

    });

    if(error){

        resetMessage.textContent =
        error.message;

        resetBtn.disabled = false;

        resetBtn.textContent =
        "Update Password";

        return;
    }

    resetMessage.textContent =
    "Password updated successfully. Redirecting to login...";

    setTimeout(() => {

        window.location.href =
        "login.html";

    }, 2000);

});