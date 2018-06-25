/* ------------------- google-charts ------------------- */

/*

google.charts.load('current', {'packages': ['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {



    /!* ------------------- Charts------------------- *!/

    var jsonData = '{"cols": [{"id":"","label":"Token", "type":"string"},{"id":"","label":"Value", "type":"number"}],"rows": [{"c":[{"v":"Miners2"},{"v":3}]},{"c":[{"v":"Presale2"},{"v":1}]},{"c":[{"v":"Crowdsale2"},{"v":1}]},{"c":[{"v":"Developers2"},{"v":1}]},{"c":[{"v":"Bounty campaign2"},{"v":2}]},{"c":[{"v":"Partnership2"},{"v":2}]}]}]';

    var jsonData2 = '[{"cols": [{"id":"","label":"Token", "type":"string"},{"id":"","label":"Value", "type":"number"}],"rows": [{"c":[{"v":"Miners"},{"v":3}]},{"c":[{"v":"Presale"},{"v":1}]},{"c":[{"v":"Crowdsale"},{"v":1}]},{"c":[{"v":"Developers"},{"v":1}]},{"c":[{"v":"Bounty campaign"},{"v":2}]},{"c":[{"v":"Partnership"},{"v":2}]}]},{"cols": [{"id":"","label":"Token", "type":"string"},{"id":"","label":"Value", "type":"number"}],"rows": [{"c":[{"v":"Miners2"},{"v":3}]},{"c":[{"v":"Presale2"},{"v":1}]},{"c":[{"v":"Crowdsale2"},{"v":1}]},{"c":[{"v":"Developers2"},{"v":1}]},{"c":[{"v":"Bounty campaign2"},{"v":2}]},{"c":[{"v":"Partnership2"},{"v":2}]}]}]';
    var jsonDataParse = JSON.parse(jsonData);
    var jsonDataParse2 = JSON.parse(jsonData2);

    var chartGraph = document.querySelectorAll('[data-it-donutchart]');
    var chartCardList = document.querySelectorAll('[data-it-cardchart]');



    var options = {
        height: 160,
        chartArea: {left: 0, top: 10, width: '160', height: '140', fontSize: 0},
        pieHole: 0.7,
       // legend: {position: 'right', textStyle: {color: '#4F4F4F', fontSize: 16}, alignment: "center", maxLines: 3},
        legend: 'none',
        // colors: ["#4F4F4F", "#5C61DB", "#3EC7C6", "#EB5757", "#F2C94C", "#F2994A"],
        pieSliceText: "none"

    };

    var optionsCard = {
        height: 78,
        chartArea: {left: 0, top: 10, width: '58', height: '58'},
        pieHole: 0.7,
        legend: "none",
        colors: ["#3EC7C6"]
    };

    for (var i = 0; i < jsonDataParse.length; i++) {

        var data = new google.visualization.DataTable(jsonDataParse[i]);
        var chartItem = chartGraph[i];
        var chart = new google.visualization.PieChart(chartItem);
        chart.draw(data, options);

        var dataCard = new google.visualization.DataTable(jsonDataParse2[i]);
        var chartCardItem = chartCardList[i];
        var chartCard = new google.visualization.PieChart(chartCardItem);
        chartCard.draw(dataCard, optionsCard);

    }

}*/

/* ------------------- Charts------------------- */

google.charts.load('current', {'packages': ['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

    var chartGraph = document.querySelectorAll('[data-it-chart]');
    var chartWraps = document.querySelectorAll('[data-it-chart-wrap]');

    var options = {
        'width': 230,
        'height': 230,
        chartArea: {left: 15, top: 15, width: '200', height: '200', fontSize: 0},
        pieHole: 0.5,
        legend: 'none',
        pieSliceTextStyle: {color: '#ffffff', fontSize: 12},
        tooltip: {trigger: 'selection', isHtml: true, text: 'percentage'},
        colors: ["#4F4F4F", "#5C61DB", "#3EC7C6", "#EB5757", "#F2C94C", "#F2994A"]
    };

    for (var i = 0; i < chartGraph.length; i++) {

        var jsonDataParse = JSON.parse(chartGraph[i].getAttribute("data-it-chart"));
        var data = new google.visualization.DataTable(jsonDataParse);
        var chartItem = chartGraph[i];
        var chart = new google.visualization.PieChart(chartItem);

        chart.draw(data, options);

        var chartItemList = chartWraps[i].querySelector('[data-it-chart-list]');

        var chartItemValue = jsonDataParse["rows"];

        for (var cnt = 0; cnt < chartItemValue.length; cnt++) {
            chartItemList.innerHTML += '<li class="it-chart__item">' + jsonDataParse["rows"][cnt]["c"][0]["v"] + ' </li>';
        }

    }

}

/*

{
    "cols"
:
    [{"id": "", "label": "Token", "type": "string"}, {"id": "", "label": "Value", "type": "number"}],


    "rows"
:
    [
    {"c": [{"v": "Miners2"}, {"v": 3}]},


     {"c": [{"v": "Presale2"},  {"v": 1}]},
       {"c": [{"v": "Crowdsale2"},  {"v": 1}]},
       {"c": [{"v": "Developers2"},
         {"v": 1}]}, {"c": [{"v": "Bounty campaign2"},
          {"v": 2}]}, {"c": [{"v": "Partnership2"},
           {"v": 2}]}]
}

*/

/* ------------------- show-prompt-new  ------------------- */

var tokenList = document.querySelector("[data-token-list]");

tokenList.addEventListener("click", showPormpt, false);

var promptButtons = document.querySelectorAll("[data-prompt-button]");
var promptWrap = document.querySelector("[data-token-wrap]");

function createPrompt() {
    var promptPopup = document.createElement("span");
    promptWrap.prepend(promptPopup);
    promptPopup.classList.add("it-token__details-prompt");
}

function showPormpt(e) {
    var target = e.target;

    if (!document.querySelector(".it-token__details-prompt")) {
        createPrompt();
    }

    for (var i = 0; i < promptButtons.length; i++) {
        var promptButton = promptButtons[i];


        if (target != promptButton ) {

            if (promptButton.classList.contains("active")) {
                console.log(1);
                promptButton.classList.remove("active");

                if(document.querySelectorAll(".it-token__details-prompt").length) {

                    promptWrap.removeChild(document.querySelector(".it-token__details-prompt"));
                }

            }



        } else {

            target.classList.toggle("active");
            document.body.removeEventListener("click", documentClosePromtPopup, false);
        }

        if (promptButton.classList.contains("active")) {
            document.body.addEventListener("click", documentClosePromtPopup, false);
        }

    }

}

function documentClosePromtPopup(event) {

    if (!event.target.hasAttribute("data-prompt-button") && !document.querySelector("[data-prompt-button]").classList.contains("active")) {



            document.querySelector("[data-prompt-button].active").classList.remove("active");




        // document.querySelector("[data-token-promt].active").classList.remove("active");
        document.body.removeEventListener("click", documentClosePromtPopup, false);
    }
}



/* ------------------- show-half-button  ------------------- */
//
// var halfHideAllHeight = 30 + "px";
//
// var halfHideObgect = document.querySelectorAll("[data-token-list]");
//
// for (var i = 0; i < halfHideObgect.length; i++) {
//     var halfHeightObgect = halfHideObgect[i];
//     halfHeightObgect.style.height = halfHideAllHeight;
//
//     var halfHideObgectHeightAll = halfHeightObgect.clientHeight;
// }
//
// var showLinkBlockHide = document.querySelector("[data-token-hide]");
// showLinkBlockHide.style.height = halfHideObgectHeightAll - halfHideAllHeight;


function cutText() {
    $("[data-show-more-item]").succinct({
        size: 333
    });
}


cutText();




var showHalfButton = document.querySelector("[data-show-more-half]");

showHalfButton.addEventListener("click", showMoreHalfBlock, false);

function showMoreHalfBlock(e) {
    e.preventDefault();
    this.classList.toggle("active");

    var showHalfText = this.getAttribute("data-show-more-half");
    var showHalfInner = this.querySelector("[data-show-more-half-text]");
    var showHalfInnerText = showHalfInner.innerHTML;

    showHalfInner.innerHTML = showHalfText;
    this.setAttribute("data-show-more-half", showHalfInnerText);

    var showLink = this.getAttribute("data-show-more-blocks");


    var showLinkBlock = $("[data-show-more-item='" + showLink + "']");


    $("[data-show-more-item]").succinct({
        size: 633
    });



}

