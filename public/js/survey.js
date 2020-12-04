const count = parseInt(window.location.pathname.split('/')[2])
$(document).on("click", ".choice-button", function() {
    $(".choice-button").removeClass("active");
    $(this).addClass("active");
});

$(document).on("click", "#back-button", function() {
    let newCount = count-1
    if (newCount === 0) {
        window.location.replace("/skip");
        return;
    }
    let url = "/survey/" + newCount;
    console.log(url);
    window.location.replace(url);
});

$(document).on("click", "#next-button", function() {
    let newCount = count+1
    let url = "/survey/" + newCount;
    if (newCount === 6) {
        url = "/survey/result"
    }
    console.log(url);
    window.location.replace(url);
});
