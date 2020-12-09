$(function() {
    const skipButton = $('#backBtn');
    skipButton.click((e) => {
        e.preventDefault();
        console.log('back');
        window.location.href= '/searchresult';
    });
});
