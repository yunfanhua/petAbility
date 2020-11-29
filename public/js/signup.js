$(function() {
    const signUpButton = $('#primary-button');
    signUpButton.click((e) => {
        e.preventDefault();
        window.location.href= '/welcome';
    });
});