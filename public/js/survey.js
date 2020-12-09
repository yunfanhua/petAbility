const count = parseInt(window.location.pathname.split('/')[2])
let chosen = false;
$(document).on("click", ".choice-button", function() {
    $(".choice-button").removeClass("active");
    $(this).addClass("active");
    chosen = true;
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
    if (!chosen) {
        alert("please make a choice");
        return
    }
    let newCount = count+1
    let url = "/survey/" + newCount;
    if (newCount === 6) {
        url = "/survey/result"
    }
    console.log(url);
    chosen = false;
    window.location.replace(url);
});
