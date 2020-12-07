let login = true;

$(document).ready(()=>{
    $('#sign-up-link').click(()=>{
        if (login) {
            $('#account-message').text("Already have an account? ");
            $('#sign-up-link').html("Log In");
            $('#login-button').html("Sign Up");
            $('#login-form').attr('action', '/welcome')
        } else {
            $('#account-message').text("Don't have an account? ");
            $('#sign-up-link').html("Sign Up");
            $('#login-button').html("Log In");
            $('#login-form').attr('action', '/home')
        }
        login = !login;
    });

    // $('#login-form').click((e)=>{
    //     if (login) {
    //         window.location.href="/home";
    //     } else {
    //         window.location.href="/welcome";
    //     }
    // })
})