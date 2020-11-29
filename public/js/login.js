$(function() {
    const logInButton = $('#primary-button');
    logInButton.click((e) => {
        e.preventDefault();
        window.location.href= '/home';
    });
});