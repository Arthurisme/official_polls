/*
Scripts for the leaderboard page
Created 7/30/2015
*/

$(document).ready(function () {

    // Make table sortable + sort based on 3rd column (bolts)
    $(".lead-table").tablesorter({sortList: [[2,1]]});

    // Adds numerical rank to 1st column to table based on bolts
    $.fn.addRank = function () {
        var column = $(this).find('tbody tr');
        var rank = 0;
        var previous;
        column.each(function() {
            if (rank == 0 || previous != parseInt($(this).find("td:last-child").text())){
                rank++;
            }
            previous = parseInt($(this).find("td:last-child").text());
            $(this).find("td:first-child").text(rank);
        });
    };
    $("#lead-today .lead-table").addRank();
    $("#lead-week .lead-table").addRank();
    $("#lead-month .lead-table").addRank();
    // update table sorting based on rank
    $(".lead-table").trigger("update");

    // Animates header icon on page load
    $(".header-container .icon-container").animate({
        width: "100px",
        height: "100px",
    }, 800 );

    // Hides and displays content on page based on tab clicked
    // Buttons which initiate tab swtiching need to be siblings
    // Content of tabs need to be siblings
    $.fn.switchTabs = function (buttonID, targetID) {
        container = $('#leaderboard-controls');
        targetContainer = $('#leaderboard-content');
        $(buttonID).click(function () {
            if (!$(buttonID).hasClass("active")) {
                // make the selected button have an "active" class
                container.find(".active").removeClass("active");
                $(buttonID).addClass("active");
                // show the content linked with button
                targetContainer.find(".active").fadeOut( "fast", function() {
                    targetContainer.find(".active").addClass("hidden");
                    targetContainer.css(".active")
                    targetContainer.find(".active").removeClass("active");
                    $(targetID).removeClass("hidden");
                    $(targetID).fadeIn( "fast", function() {
                        $(targetID).addClass("active");
                    });
                });

            }
        });
    };
    $.fn.switchTabs('#today', '#lead-today');
    $.fn.switchTabs('#week', '#lead-week');
    $.fn.switchTabs('#month', '#lead-month');


    // Makes sure that the 3 table views are sorted by the same column as the other 2
    $('.lead-table th').click(function () {
        if($(this).closest('.table-responsive').hasClass('active')){
            var column = $(this).index() + 1;
            $('.table-responsive.hidden .lead-table th:nth-child('+column+')').click();
        }
    });

    // Adds spaces (french numbering)between every 3 digits in numbers
//    $.fn.digits = function(){
//        return this.each(function(){
//            $(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, " ") );
//        })
//    }
//    $(".lead-table tr td:not(:nth-child(2))").digits();

});
