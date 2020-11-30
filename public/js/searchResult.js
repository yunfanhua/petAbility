$(function() {
    const skipButton = $('#skip-button');
    skipButton.click((e) => {
        e.preventDefault();
        console.log('back');
        window.location.href= '/searchresult';
    });

});