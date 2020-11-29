$(function() {
    const searchButton = $('#primary-button');
    searchButton.click((e) => {
        e.preventDefault();
        console.log('search!!!!!!');
        window.location.href= '/searchresult';
    });

});