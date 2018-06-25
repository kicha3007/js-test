

$(function () {


    /* ------------------- filter-options ------------------- */

    var filterWrap = $("[data-filter-wrap]");
    var filterItem = $("[data-filter-item]");

    filterItem.on("click", function () {
        var $this = $(this);
        filterWrap.toggleClass("active");

        if ($("[data-filter-item].active").length > 1) {
            $this.closest(filterWrap).find("[data-filter-item]").removeClass("active");
            $this.addClass("active");
        } else {
            $this.closest("[data-filter-wrap]").find("[data-filter-item]").addClass("active");
        }
    });

    /* ------------------- show-more-btn ------------------- */

    var hideBtn = $("[data-hide-btn]");

    hideBtn.on("click", function (e) {

        var $this = $(this);

        $this.toggleClass("active");

        var hideBtnCloseText = $this.data("hideBtn");
        var hideBtnCloseTextToButton = $this.children("[data-hide-btn-text]").text();

        $this.children("[data-hide-btn-text]").text(hideBtnCloseText);
        $this.data("hideBtn", hideBtnCloseTextToButton);

        $this.closest("[data-hide-wrap]").find("[data-hide-half]").toggleClass("it-hide");

    });

    /* ------------------- show-more ------------------- */

    var showMoreButtonText = $("[data-show-more-button]");

    showMoreButtonText.on("click", function (e) {
        e.preventDefault();

        var $this = $(this);

        var showMoreButtonCloseText = $this.data("showMoreButton");
        var showMoreButtonCloseTextToButton = $this.children("[data-show-more-text]").text();

        $this.children("[data-show-more-text]").text(showMoreButtonCloseText);
        $this.data("showMoreButton", showMoreButtonCloseTextToButton);

        var showMoreButtonValue = $this.attr("href");
        var showMoreText = $(showMoreButtonValue);
        showMoreText.toggleClass("it-hidden");
        $this.toggleClass("active");

    });

    /* ------------------- scroll to nav item ------------------- */

    var $scrollNav = $("[data-scroll-nav]");

    if ($scrollNav) {

        $scrollNav.on("click", function (e) {
            e.preventDefault();
            var $scrollNavLinkValue = $(this).attr("href");
            var $scrollNavItem = $($scrollNavLinkValue);
            var $scrollNavItemPosition = $scrollNavItem.offset().top;
            $("html, body").animate({
                scrollTop: $scrollNavItemPosition
            }, 500)

        });

    }

    /* ------------------- Fixed nav and sidebar and steps ------------------- */

    var mainHeader = $("[data-main-header]"),
        topHeader = $("[data-top-header]"),
        topHeaderH = topHeader.outerHeight(),
        navOther = $("[data-nav-other]"),
        navOtherH = navOther.outerHeight(),
        mainSidebar = $("[data-main-sidebar]");

    // var articleMoreWrap = $("[data-it-article-more-wrap]");


    window.onscroll = function () {
        var documentScroll = window.pageYOffset || document.documentElement.scrollTop;
        if (documentScroll > topHeaderH) {
            navOther.addClass("it--fixed");
            topHeader.css("marginBottom", navOtherH + "px");
            // mainSidebar.addClass("it--fixed");
            // mainSidebar.css("top", navOtherH + 40 + "px")
        } else {
            navOther.removeClass("it--fixed");
            topHeader.css("marginBottom", "0");
        }

    };

    $("[data-main-sidebar]").stick_in_parent({
        offset_top: navOtherH + 40
    });

    /* ------------------- hide-scroll ------------------- */

    // var scrollParent = document.querySelector('[data-scroll-hide-wrap]');
    //
    //
    //
    // var scrollChild = document.querySelector('[data-scroll-hide]');
    // var scrollChildP = +scrollChild.offsetHeight - scrollChild.clientHeight;
    //
    // if (scrollChildP) {
    //     scrollParent.style.height = scrollParent.clientHeight - scrollChildP + "px";
    // }

    /* ------------------- dropdown-menu  ------------------- */

    var $trigger = $('[data-trigger]');
    var $nav = $('[data-it-nav]');

    function showMobileMenu() {
        $trigger.toggleClass('active');
        mainHeader.toggleClass("it-header--bg");

        if ($("div").is("#it-body--bg-shadow")) {
            $("#it-body--bg-shadow").remove();

        } else {
            $("body").prepend("<div id=\"it-body--bg-shadow\"></div>");

        }

        $nav.slideToggle(600, function () {
            if ($(this).css("display") === "none") {
                $(this).removeAttr("style");
            }
        });

        $("#it-body--bg-shadow").on("click", showMobileMenu);

    }

    $trigger.on("click", showMobileMenu);

    /* ------------------- perfect-scrollbar  ------------------- */

    var perfectScrollContainers = document.querySelectorAll('[data-scroll-hide-wrap]');
    if (perfectScrollContainers) {

        for (var i = 0; i < perfectScrollContainers.length; i++) {
            new PerfectScrollbar(perfectScrollContainers[i], {
                maxScrollbarLength: 50,
                wheelPropagation: true,
                suppressScrollY: true
                // useBothWheelAxes: true

            });

        }

    }

    /* ------------------- carousel-new ------------------- */

    $('[data-owl-carousel]').each(function () {
        var $this = $(this);
        var itemsCount = $this.data("owlItems");
        var itemsCountPad = $this.data("owlItemsPad");
        var itemsCountMobile = $this.data("owlItemsMobile");
        var itemsMargin = $this.data("owlItemsMargin");
        var itemsMarginMobile = $this.data("owlItemsMarginMobile");
        var itemsDots = $this.data("owlItemsDots");
        var itemsLoop = $this.data("owlItemsLoop");
        var itemsNav = $this.data("owlItemsNav");
        var itemsAutoplay = $this.data("owlItemsAutoplay");
        var itemsAutoplayTimeout = $this.data("owlItemsAutoplayTimeout");
        var itemsAutoplayHoverPause = $this.data("owlItemsAutoplayHoverPause");

        $this.owlCarousel({
            items: (itemsCount ? itemsCount : 1),
            margin: (itemsMargin ? itemsMargin : 40),
            nav: (itemsNav ? itemsNav : true),
            loop: (itemsLoop ? itemsLoop : false),
            autoplay: (itemsAutoplay ? itemsAutoplay : false),
            autoplayTimeout: (itemsAutoplayTimeout ? itemsAutoplayTimeout : 3000),
            autoplayHoverPause: (itemsAutoplayHoverPause ? itemsAutoplayHoverPause : true),
            dots: (itemsDots ? itemsDots : true),
            responsive: {
                0: {
                    margin: (itemsMarginMobile ? itemsMarginMobile : 20),
                    items: itemsCountMobile ? itemsCountMobile : 1
                },
                600: {
                    items: itemsCountPad ? itemsCountPad : (itemsCount ? itemsCount : 1)
                },
                1000: {
                    items: itemsCount ? itemsCount : 1
                }
            }
        });
    });



    /* ------------------- masonry ------------------- */

    $('[data-masonry-wrap]').masonry({
        itemSelector: '.it-guides__item',
        columnWidth: '.it-guides__item',
        gutter: 30,
        percentPosition: true
    });

});



