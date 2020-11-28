const count = parseInt(window.location.pathname.split('/')[2])
$(document).on("click", ".choice-button", function() {
    $(".choice-button").removeClass("active");
    $(this).addClass("active");
});

$(document).on("click", "#back-button", function() {
    let newCount = count-1
    if (newCount === 0) {
        newCount = 1
    }
    let url = "/survey/" + newCount;
    console.log(url);
    window.location.replace(url);
});

$(document).on("click", "#next-button", function() {
    let newCount = count+1
    let url = "/survey/" + newCount;
    if (newCount === 6) {
        url = "/home"
    }
    console.log(url);
    window.location.replace(url);
});
