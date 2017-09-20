$(document).ready(function () {

    if ($("#bLargeBannerSlider").length) {
        $("#bLargeBannerSlider").slick({
            autoplay: true,
            fade: true
        });
    }

    if ($("#bAnnouncementsSlider").length) {
        var bAnnouncementsSlider = $("#bAnnouncementsSlider");
        bAnnouncementsSlider.slick({
            autoplay: true
        });
        bAnnouncementsSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
            $("#bAnnouncementsSliderNavigation a").removeClass("m-active").filter($("#bAnnouncementsSliderNavigation a").eq(nextSlide)).addClass("m-active");
        });
        $("#bAnnouncementsSliderNavigation a").on("click", function (e) {
            e.preventDefault();
            bAnnouncementsSlider.slick("slickGoTo", $(this).index());
            $("#bAnnouncementsSliderNavigation a").removeClass("m-active").filter($(this)).addClass("m-active");
        });
    }
});