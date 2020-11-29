$(function() {
    const startButton = $('#primary-button');
    const skipButton = $('#skip-button')
    startButton.click((e) => {
        e.preventDefault();
        window.location.href= '/survey/1';
    });
    skipButton.click((e) => {
        e.preventDefault();
        window.location.href= '/skip';
    });
});