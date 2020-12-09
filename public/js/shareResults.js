let chosen = false;
$(document).on("click", ".choice-button", function() {
    $(".choice-button").removeClass("active");
    $(this).addClass("active");
    chosen = true;
});

$(document).on("click", "#next-button", function() {
    if (!chosen) {
        alert("please make a choice");
        return
    }
    chosen = false;
    window.location.replace("/share/contact");
});
