$(document).ready(()=> {
    let pageName = window.location.pathname.split('/')[1];
    $('.navigation-footer a').removeClass('active');
    $(`.navigation-footer a[href='${pageName}']`).addClass('active');
});