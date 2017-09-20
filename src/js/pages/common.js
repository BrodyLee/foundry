/* Globals */
var RESIZE_TIMEOUT;
var RESIZE_TIMEOUT_INTERVAL = 300;
/* end Globals */

$(document).ready(function () {

    /* Viewport resize event functions */
    setBannerTopTopOffset();
    $(window).on("resize", function () {
        /* Timeout to call functions only once */
        clearTimeout(RESIZE_TIMEOUT);
        RESIZE_TIMEOUT = setTimeout(function () {
            setBannerTopTopOffset();
        }, RESIZE_TIMEOUT_INTERVAL);
    });
    /* end Viewport resize event functions */

});

function setBannerTopTopOffset() {
    var bBannerTop = $("#bBannerTop");
    var siteHeader = $("#siteHeader");
     ($(window).width() <= 1180) ?
        bBannerTop.css("margin-top", siteHeader.height() + "px") :
        bBannerTop.removeAttr("style");
}