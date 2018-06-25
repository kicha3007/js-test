// var articleMoreWrap = $("[data-it-article-more-wrap]");
// console.log(articleMoreWrap.length);
// if (articleMoreWrap.length) {
//     var articleMoreWrapPadTop = articleMoreWrap.css("paddingTop").substring(0, 2);
//
//
// }

if ($("[data-main-sidebar]").length) {

    $("[data-main-sidebar]", "[data-it-article-more-wrap]").stick_in_parent({
        offset_top: 100
    });

}