// =====================================================
// ROUTE PROTECTION
// =====================================================

(async () => {

    const {
        data: { session }
    } = await supabaseClient
    .auth
    .getSession();

    if(!session){

        window.location.replace(
            "login.html"
        );

        return;
    }

})();