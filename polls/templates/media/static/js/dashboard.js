/*
 Dashboard (Patient Profile)
 Created 5/5/2015
 */

$(document).ready(function () {

    /* GLOBAL VARIABLES ===================================================== */
    var scale = "week";
    // french
    var NO_DATA_MSG = "0 données";
    var STEPS_TO_BOLT_MULTIPLIER = 1/7;
    var MIN_TO_BOLT_MULTIPLIER = 22;
    var CURRENT_DATE = new Date();
    var DEFAULT_STEPS = 5000;
    var DEFAULT_ACTIV_BOLTS = Math.round(DEFAULT_STEPS * STEPS_TO_BOLT_MULTIPLIER);
    var DEFAULT_MIN = 20;
    var DEFAULT_GAMES_BOLTS = Math.round(DEFAULT_MIN * MIN_TO_BOLT_MULTIPLIER);

    /* colors */
    var tabColor1 = $("#today-tab .sub-content-container").css("border-left-color"),
        tabColor2 = $("#dashboard-tab .sub-content-container").css("border-left-color"),
        tabColor3 = $("#objectives-tab .sub-content-container").css("border-left-color"),
        lightNeutralColor = $(".top-nav").css("border-bottom-color"),
        backgroundColor = $("body").css("background-color"),
        greyGBColor = "rgb(109,110,113)";

    var activTotalData = {
        datesString: [],
        dates: [],
        values: [],
        bolts: [],
        today: 0,
        todayBolts: 0
    };

    var gamesTotalData = {
        datesString: [],
        dates: [],
        values: [],
        bolts: [],
        today: 0,
        todayBolts: 0
    };


    var programData = {
        datesString: [],
        dates: [],
        labels: [],
        activValues: [],
        activBolts: [],
        gamesValues: [],
        gamesBolts: [],
        walk: [],
        walkBolts: [],
        fast: [],
        fastBolts: [],
        run: [],
        runBolts: [],
        stairs: [],
        stairsBolts: [],
        abs: [],
        absBolts: [],
        piano: [],
        pianoBolts: [],
        squat: [],
        squatBolts: [],
        dance: [],
        danceBolts: [],
        battle: [],
        battleBolts: []
    };

    var objectivesData = {
        activ: [],
        activBolts: [],
        activToday: 0,
        activTodayBolts: 0,
        games: [],
        gamesBolts: [],
        gamesToday: 0,
        gamesTodayBolts: 0,
        walk: [],
        walkBolts: [],
        walkToday: 0,
        walkTodayBolts: 0,
        fast: [],
        fastBolts: [],
        fastToday: 0,
        fastTodayBolts: 0,
        run: [],
        runBolts: [],
        runToday: 0,
        runTodayBolts: 0,
        stairs: [],
        stairsBolts: [],
        stairsToday: 0,
        stairsTodayBolts: 0,
        abs: [],
        absBolts: [],
        absToday: 0,
        absTodayBolts: 0,
        piano: [],
        pianoBolts: [],
        pianoToday: 0,
        pianoTodayBolts: 0,
        squat: [],
        squatBolts: [],
        squatToday: 0,
        squatTodayBolts: 0,
        dance: [],
        danceBolts: [],
        danceToday: 0,
        danceTodayBolts: 0,
        battle: [],
        battleBolts: [],
        battleToday: 0,
        battleTodayBolts: 0
    };

    var loadTab1, loadTab2, loadTab3;

    /* FUNCTONS ============================================================= */

    // Hides and displays content on page based on tab clicked
    $.fn.switchTabs = function (targetID) {
        $(this).click(function () {
            if (!$(this).hasClass("selected")) {
                $(this).closest("#category-group-container").find(".selected").removeClass("selected");
                $(this).addClass("selected");
                $show = $(targetID);
                $show.closest(".main-content-container").find(".tab-container").addClass("hidden");
                $show.removeClass("hidden");
                if ($(this).hasClass("unclicked")){
                    $(this).removeClass("unclicked");
                    if (targetID == "#dashboard-tab") {
                        loadTab2();
                    }
                    else if (targetID == "#objectives-tab") {
                        loadTab3();
                    }  
                } 
            }
        });
    };

    /*  Draws radial progession chart in container
        Uses circle-progress js library
        fraction = achieved/target
        color1 & color2 form gradient 
        if hasCheckmark = true, insert checkmark when fraction >= 1 */
    $.fn.insertRadialChart = function (achieved, target, color1, color2, hasCheckmark) {
        var widget = this;
        var element = widget.find(".radial-chart");
        var numer = achieved; 
        var denom = target;
        var decimal, percent;
        if (achieved.isNaN || target.isNaN) {
            numer = 0;
            denom = 0;
            decimal = 0;
            percent = 0;
        }
        else if (target == 0) {
            decimal = 1;
            percent = 100;
        }
        else if (achieved > target) {
            decimal = 1;
            percent = achieved / target * 100;
        }
        else {
            decimal = achieved / target;
            percent = decimal * 100;
        }
        // percent should be presented as integer
        percent = Math.round(percent);
        // draw chart
        element.circleProgress({
            value: decimal,
            size: 250,
            thickness: 35,
            lineCap: "round",
            emptyFill: lightNeutralColor,
            fill: {
                gradient: [color1, color2]
            }
        });
        // place percentage as string on page
        widget.find("#percent").text(percent + "%");
        // if desired, show checkmark instead of percentage if percent >= 100
        if (hasCheckmark){
            if(percent >= 100){
                element.find(".icon").removeClass("hidden");
            }
            else{
                element.find(".value").removeClass("hidden");
            }
        }
        // if desired, fraction is inserted in page
        if (widget.find('.fraction').length != 0){
            widget.find('.fraction').find('.numerator').text(parseInt(numer));
            widget.find('.fraction').find('.denominator').text(parseInt(denom));
        }
    };


    /* LINE CHART ====================================================================================== */

    $.fn.insertLineChart = function (labels, target, achieved, scale, color1, color2) {
        //html elements
        var container = this;
        var chartCanvas;
        var canvasID = container.find("canvas").attr("id");
        //buttons
        var left = container.find(".left");
        var right = container.find(".right");

        // default display window is 0
        // shift to left  -> -1
        // shift to right -> +1
        var displayWindow = 0;

        // number of data to display at a time 
        var daysToDisplay;
        var rawDataCount = labels.length;
        // start index of raw data currently displayed
        var startIndex;
        // end index of raw data currently displayed
        var endIndex;

        var labelsToDisplay = [];
        var dataToDisplay1 = [];
        var dataToDisplay2 = [];

        var chartData
        var lineChart;

        // set number of elements to display based on scale selected
        if (scale == "week") {
            daysToDisplay = 7;
        }
        else if (scale == "month") {
            daysToDisplay = 30;
        }
        else if (scale == "year") {
            daysToDisplay = 365;
        }

        // draw/redraw chart with new data after change in display window
        function updateChart() {
            chartCanvas = container.find("canvas")[0].getContext("2d");
            //alert(container.closest(".widget-container").attr("id"));
            // if all raw data cannot be displayed simultaneously
            if (rawDataCount > daysToDisplay) {
                var i = 0;
                // if start of raw data not reached
                if (rawDataCount - daysToDisplay * (displayWindow + 1) > 0) {
                    startIndex = rawDataCount - daysToDisplay * (displayWindow + 1);
                    endIndex = rawDataCount - daysToDisplay * displayWindow;
                }
                // start of raw data reached
                else {
                    startIndex = 0;
                    endIndex = daysToDisplay;
                }
                // load portion of raw data into display window data
                for (var j = startIndex; j < endIndex; j++) {
                    labelsToDisplay [i] = labels [j];
                    dataToDisplay1 [i] = achieved [j];
                    dataToDisplay2 [i] = target [j];
                    i++;
                }
                // if graph has more than one display window, enable buttons
                if (startIndex != 0) {
                    left.removeClass("disabled");
                }
                if (endIndex != rawDataCount) {
                    right.removeClass("disabled");
                }
            }
            // all raw data can be displayed simultaneously
            else if (rawDataCount <= daysToDisplay) {
                labelsToDisplay = labels;
                dataToDisplay1 = achieved;
                dataToDisplay2 = target;
                startIndex = 0;
                endIndex = rawDataCount;
            }
            // configure chart
            var chartData = {
                labels: labelsToDisplay,
                datasets: [
                    {   
                        label: "Objectif",
                        fillColor: "rgba(0,0,0,0)",
                        strokeColor: color1,
                        pointColor: color1,
                        pointStrokeColor: color1,
                        pointHighlightFill: color1,
                        pointHighlightStroke: color1,
                        pointDotRadius: 10,
                        pointDotStrokeWidth: 5,
                        datasetStrokeWidth: 5,
                        data: dataToDisplay1    
                    },
                    {
                        label: "Bolts obtenus",
                        fillColor: "rgba(0,0,0,0)",
                        strokeColor: color2,
                        pointColor: color2,
                        pointStrokeColor: color2,
                        pointHighlightFill: color2,
                        pointHighlightStroke: color2,
                        pointDotRadius: 10,
                        pointDotStrokeWidth: 5,
                        datasetStrokeWidth: 5,
                        data: dataToDisplay2
                    }
                ]
            };
            // draw chart on page
            lineChart = new Chart(chartCanvas).Line(chartData, {
                bezierCurve: false,
                responsive: true,
                maintainAspectRatio: true,
                animation: true,
                tooltipFillColor: "rgba(0,0,0,0.8)",
                maintainAspectRatio: true,
                showTooltips: true,
                multiTooltipTemplate: "<%= datasetLabel %> - <%= value %>"
            });
        };

        // initialize chart
        updateChart();

        var $variablex = this;

        // update chart's display window based on button click and reload
        left.on('click', function (event) {
            //alert(container.closest(".widget-container").attr("id"));
            if (startIndex != 0) {
                left.removeClass("disabled");
                displayWindow = displayWindow + 1;
                updateChart();
                // to reload chart, remove and reinsert canvas
                container.find("canvas").remove();
                container.append('<canvas id="' + canvasID + '"></canvas>');
                updateChart();
                if (startIndex == 0) {
                    left.addClass("disabled");
                }
            }
            if (endIndex != rawDataCount) {
                right.removeClass("disabled");
            }
        });
        right.on('click', function (event) {
            //alert(container.closest(".widget-container").attr("id"));
            if (endIndex != rawDataCount) {
                right.removeClass("disabled");
                displayWindow = displayWindow - 1;
                updateChart();
                // to reload chart, remove and reinsert canvas
                container.find("canvas").remove();
                container.append('<canvas id="' + canvasID + '"></canvas>');
                updateChart();
                if (endIndex == rawDataCount) {
                    right.addClass("disabled");
                }
            }
            if (startIndex != 0) {
                left.removeClass("disabled");
            }
        });
    };

    /*  formats raw date and values data from database into two arrays used in charts
        sumSameDay is boolean: if true, values which occur on same dates are accumulated and summed
    */
    $.fn.formatData = function (dataObj, sumSameDay) {
        var sourceDates = dataObj.datesString;
        var sourceValues = dataObj.values;

        var outputDates = [];
        var outputValues = [];

        // format raw date data into array
        // format raw values data into array
        if (dataObj.dataType == "weight") {
            sourceDates = sourceDates.slice(1, sourceDates.length - 2);
            sourceDates = sourceDates.replace('datetime.date(', '');
            sourceDates = sourceDates.split("), datetime.date(");

            sourceValues = sourceValues.slice(1, sourceValues.length - 1);
            sourceValues = sourceValues.replace('Decimal(&#39;', '');
            sourceValues = sourceValues.replace(/\&\#39;\)/g, '');
            sourceValues = String(sourceValues).split(", Decimal(&#39;");
        }
        else {
            sourceDates = sourceDates.slice(1, sourceDates.length - 1);
            sourceDates = sourceDates.replace(/, datetime.datetime\(/g, '');
            sourceDates = sourceDates.replace(/datetime.datetime\(/g, '');
            sourceDates = sourceDates.split(", tzinfo=&lt;UTC&gt;)");

            sourceValues = sourceValues.slice(1, sourceValues.length - 1);
        }

        //check if array is empty
        if (/\S/.test(sourceValues)) {
            sourceValues = String(sourceValues).split(",");
            // produce array of dates formatted "year-month-day"
            // produce corresponding array of values for each date
            var year, month, day, hour, min, sec;
            for (var i = 0; i < sourceValues.length; i++) {
                //console.log("\n one by one dates:" + sourceDates [i]);
                sourceDates [i] = sourceDates[i].split(",");
                year = parseInt(sourceDates[i][0]);
                month = parseInt(sourceDates[i][1] - 1); 
                day = parseInt(sourceDates[i][2]);
                // if hour is defined
                if (!(typeof sourceDates[i][3] === 'undefined')){
                    hour = parseInt(sourceDates[i][3]);
                    // if minutes is defined
                    if (!(typeof sourceDates[i][4] === 'undefined')){
                        min = parseInt(sourceDates[i][4]);
                        // if seconds is defined
                        if (!(typeof sourceDates[i][5] === 'undefined')){
                            sec = parseInt(sourceDates[i][5]);
                        }
                        // if seconds is not defined
                        else{
                            sec = 0;
                        }
                    }
                    // if minutes is not defined
                    else{
                        min = 0;
                        sec = 0;
                    }
                }
                // if hour is not defined
                else {
                    hour = 0;
                    min = 0;
                    sec = 0;
                }
                outputDates [i] = new Date(Date.UTC(year,month,day,hour,min,sec)).toDateString();
                dataObj.dates [i] = new Date(Date.UTC(year,month,day,hour,min,sec));
                if (dataObj.dataType == "weight") {
                    outputValues [i] = parseFloat(sourceValues[i]);
                }
                else {
                    outputValues [i] = parseInt(sourceValues[i]);
                }
            }
            //console.log("\n DATES!!!!!!!!!!!!!!: " + outputDates);
            // sum values with same corresponding dates
            if (sumSameDay) {
                for (var i = 1; i < outputValues.length; i++) {
                    if (outputDates[i - 1] == outputDates[i]) {
                        outputDates.splice(i, 1);
                        dataObj.dates.splice(i, 1);
                        outputValues[i - 1] = outputValues[i - 1] + outputValues[i];
                        outputValues.splice(i, 1);
                        i--;
                    }
                }
            }
        }
        else {
            outputDates [0] = NO_DATA_MSG;
            outputValues [0] = 0;
        }

        // calculate today's stats
        var findTodayIndex = outputDates.indexOf(CURRENT_DATE.toDateString());
        if (findTodayIndex != -1) {
            dataObj.today = outputValues[findTodayIndex];
        }
        else {
            dataObj.today = 0;
        }

        dataObj.datesString = outputDates;
        dataObj.values = outputValues;
    };

    /*  Obtain totals for today's Activities and today's Games 
        In respective values and in Bolts
    */
    $.fn.sumToday = function () {
        var gamesTotalToday = pianoData.today +
            absData.today +
            squatData.today +
            danceData.today +
            battleData.today;
        var activTotalToday = stepsData.today;

        gamesTotalData.today = gamesTotalToday;
        gamesTotalData.todayBolts = Math.round(gamesTotalToday * MIN_TO_BOLT_MULTIPLIER);
        activTotalData.today = activTotalToday;
        activTotalData.todayBolts = Math.round(activTotalToday * STEPS_TO_BOLT_MULTIPLIER);
    };

    /*
    Takes programs from database and creates Program and Objectives objects
    */
    $.fn.formatPrograms = function () {
        // check that program is not empty
        if (!(program_walk.length === 0)){
            // split date into [month, day, year] array format
            program_startDate = program_startDate.replace(',', '');
            program_startDate = program_startDate.split(" ");
            var yeah, month, day;
            var date, tempDate;
            for (var i = 0; i < program_walk.length; i++) {
                // set first program date to start date
                if(i == 0){
                    // turn date [month, day, year] array into JS date object
                    year = parseInt(program_startDate [2]);
                    day = parseInt(program_startDate [1]);
                    month = program_startDate [0];
                    if (month == "Jan."){
                        month = 0;
                    }
                    else if (month == "Feb."){
                        month = 1;
                    }
                    else if (month == "March"){
                        month = 2;
                    }
                    else if (month == "April"){
                        month = 3;
                    }
                    else if (month == "May"){
                        month = 4;
                    }
                    else if (month == "June"){
                        month = 5;
                    }
                    else if (month == "July"){
                        month = 6;
                    }
                    else if (month == "Aug."){
                        month = 7;
                    }
                    else if (month == "Sept."){
                        month = 8;
                    }
                    else if (month == "Oct."){
                        month = 9;
                    }
                    else if (month == "Nov."){
                        month = 10;
                    }
                    else if (month == "Dec."){
                        month = 11;
                    }
                    date = new Date(year, month, day);
                    programData.dates[i] =  new Date(year, month, day);
                }
                else {
                    // subsequent dates of program are incremented onto start date
                    tempDate = new Date();
                    tempDate.setDate(date.getDate() + 1);
                    programData.dates[i] = tempDate;
                    date = tempDate;
                }
                // copy other program data into Program object
                programData.datesString [i] = programData.dates[i].toDateString();
                // Create labels for graph
                programData.labels[i] = "Jour " + String(i+1); // French
                // Combine activities
                programData.activValues [i] = program_walk[i]
                                              + program_fastWalk[i]  
                                              + program_running[i]
                                              + program_stairs[i];                                            
                programData.activBolts[i] = Math.round(program_walk[i] * STEPS_TO_BOLT_MULTIPLIER);
                // Combine games
                programData.gamesValues[i] = program_absZapper[i]
                                             + program_pianoSteps[i]   
                                             + program_squatMe[i]  
                                             + program_justDance[i]
                                             + program_battleRun[i];
                programData.gamesBolts[i] = Math.round(programData.gamesValues[i] * MIN_TO_BOLT_MULTIPLIER);
                // Individual activities in bolts
                programData.walkBolts[i] = Math.round(program_walk[i] * STEPS_TO_BOLT_MULTIPLIER);
                programData.fastBolts[i] = Math.round(program_fastWalk[i] * STEPS_TO_BOLT_MULTIPLIER);
                programData.runBolts[i] = Math.round(program_running[i] * STEPS_TO_BOLT_MULTIPLIER);
                programData.stairsBolts[i] = Math.round(program_stairs[i] * STEPS_TO_BOLT_MULTIPLIER);
                // Individual games in bolts
                programData.absBolts[i] = Math.round(program_absZapper[i] * MIN_TO_BOLT_MULTIPLIER);
                programData.pianoBolts[i] = Math.round(program_pianoSteps[i] * MIN_TO_BOLT_MULTIPLIER);
                programData.squatBolts[i] = Math.round(program_squatMe[i] * MIN_TO_BOLT_MULTIPLIER);
                programData.danceBolts[i] = Math.round(program_justDance[i] * MIN_TO_BOLT_MULTIPLIER);
                programData.battleBolts[i] = Math.round(program_battleRun[i] * MIN_TO_BOLT_MULTIPLIER);
            }
            // Create Objectives object by associating a Program value for each day of data available
            for (var i = 0; i < activTotalData.values.length; i++){
                var findActivIndex = programData.datesString.indexOf(activTotalData.datesString[i]);
                // if day of data is part of program, use program data as objective for that day
                if (findActivIndex != -1){
                    objectivesData.activ [i] = programData.activValues [findActivIndex];
                    objectivesData.activBolts [i] = programData.activBolts [findActivIndex];
                    objectivesData.walk [i] = programData.activValues [findActivIndex];

                }
                // if day of data is not part of program, use default values for that day
                else {
                    objectivesData.activ [i] = DEFAULT_STEPS;
                    objectivesData.activBolts [i] = DEFAULT_ACTIV_BOLTS;
                }
            }
            // do the same for games
            for (var i = 0; i < gamesTotalData.values.length; i++){
                var findGamesIndex = programData.datesString.indexOf(gamesTotalData.datesString[i]);
                if (findGamesIndex != -1){
                    objectivesData.games [i] = programData.gamesValues [findGamesIndex];
                    objectivesData.gamesBolts [i] = programData.gamesBolts [findGamesIndex];
                }
                else {
                    objectivesData.games [i] = DEFAULT_MIN;
                    objectivesData.gamesBolts [i] = DEFAULT_GAMES_BOLTS;
                }
            }
            // set today's objectives
            var todayIndex = programData.datesString.indexOf(CURRENT_DATE.toDateString());
            // if today's date is part of days with data
            if (todayIndex != -1){
                objectivesData.activToday = programData.activValues [todayIndex];
                objectivesData.activTodayBolts = programData.activBolts [todayIndex];
                objectivesData.gamesToday = programData.gamesValues [todayIndex];
                objectivesData.gamesTodayBolts = programData.gamesBolts [todayIndex];
            }
            // if today's date is not part of days with data, use default values
            else {
                objectivesData.activToday = DEFAULT_STEPS;
                objectivesData.activTodayBolts = DEFAULT_ACTIV_BOLTS;
                objectivesData.gamesToday = DEFAULT_MIN;
                objectivesData.gamesTodayBolts = DEFAULT_GAMES_BOLTS;
            }
        }
        // if program is empty, fill objectives with default values
        else {

            // create default weekly program
            programData.labels = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]; // French
            for (var i = 0; i < programData.labels.length; i++){
                programData.activValues [i] = DEFAULT_STEPS;
                programData.activBolts[i] = DEFAULT_ACTIV_BOLTS;
                programData.gamesValues[i] = DEFAULT_MIN;
                programData.gamesBolts[i] = DEFAULT_GAMES_BOLTS;
            }

            for (var i = 0; i < activTotalData.datesString.length; i++) {
                objectivesData.activ [i] = DEFAULT_STEPS;
                objectivesData.activBolts [i] = Math.round(DEFAULT_STEPS * STEPS_TO_BOLT_MULTIPLIER);
            }
            objectivesData.activToday =  DEFAULT_STEPS;
            objectivesData.activTodayBolts = Math.round(DEFAULT_STEPS * STEPS_TO_BOLT_MULTIPLIER);

            for (var i = 0; i < gamesTotalData.datesString.length; i++) {
                objectivesData.games [i] = DEFAULT_MIN;
                objectivesData.gamesBolts [i] = Math.round(DEFAULT_MIN * MIN_TO_BOLT_MULTIPLIER);
            }
            objectivesData.gamesToday = DEFAULT_MIN;
            objectivesData.gamesTodayBolts = Math.round(DEFAULT_MIN * MIN_TO_BOLT_MULTIPLIER);
        }
    };

    /*  Merge data sets for each individual game date & values
        into 1 data set for all games combined
        values from same dates are accumulated and summed
    */
    $.fn.mergeIntoGames = function () {
        var j = 0;
        var k = 0;
        var l = 0;
        var m = 0;
        var n = 0;
        var x = 0;
        currentIndex
        var currentDate;
        var currentValue;
        var currentIndex;

        gamesTotalData.datesString[0] = NO_DATA_MSG;
        gamesTotalData.values[0] = 0;

        while (!(
        j != pianoData.values.length - 1 &&
        k != absData.values.length - 1 &&
        l != squatData.values.length - 1 &&
        m != danceData.values.length - 1 &&
        n != battleData.values.length - 1)) {

            currentDate = undefined;
            currentIndex = "not set";

            if (j < pianoData.values.length) {
                currentDate = pianoData.dates[j];
                currentValue = pianoData.values[j];
                currentIndex = "j";
            }
            if (k < absData.values.length) {
                if (absData.dates[k] < currentDate || currentDate == undefined) {
                    currentDate = absData.dates[k];
                    currentValue = absData.values[k];
                    currentIndex = "k";
                }
            }
            if (l < squatData.values.length) {
                if (squatData.dates[l] < currentDate || currentDate == undefined) {
                    currentDate = squatData.dates[l];
                    currentValue = squatData.values[l];
                    currentIndex = "l";
                }
            }
            if (m < danceData.values.length) {
                if (danceData.dates[m] < currentDate || currentDate == undefined) {
                    currentDate = danceData.dates[m];
                    currentValue = danceData.values[m];
                    currentIndex = "m";
                }
            }
            if (n < battleData.values.length) {
                if (battleData.dates[n] < currentDate || currentDate == undefined) {
                    currentDate = battleData.dates[n];
                    currentValue = battleData.values[n];
                    currentIndex = "n";
                }
            }

            if (!(currentDate === undefined)) {
                gamesTotalData.dates[x] = currentDate;
                gamesTotalData.datesString[x] = currentDate.toDateString();
                gamesTotalData.values[x] = currentValue;
                gamesTotalData.bolts[x] = Math.round(currentValue * MIN_TO_BOLT_MULTIPLIER);
                x++
            }

            //alert (currentIndex);
            if (currentIndex == "j") {
                j++;
            }
            else if (currentIndex == "k") {
                k++;
            }
            else if (currentIndex == "l") {
                l++;
            }
            else if (currentIndex == "m") {
                m++;
            }
            else if (currentIndex == "n") {
                n++;
            }
        }

        for (var i = 1; i < gamesTotalData.values.length; i++) {
            if (gamesTotalData.datesString[i - 1] == gamesTotalData.datesString[i]) {
                gamesTotalData.datesString.splice(i, 1);
                gamesTotalData.dates.splice(i, 1);
                gamesTotalData.values[i - 1] = gamesTotalData.values[i - 1] + gamesTotalData.values[i];
                gamesTotalData.values.splice(i, 1);
                i--;
            }
        }
    };

    /*  Merge data sets for each individual activity date & values
        into 1 data set for all activities combined
        values from same dates are accumulated and summed
    */
    $.fn.mergeIntoActiv = function () {
        // For now only 1 activity (steps), so just copy data over
        activTotalData.dates = stepsData.dates;
        activTotalData.datesString = stepsData.datesString;
        activTotalData.values = stepsData.values;
        for (var i = 0; i < stepsData.values.length; i++){
            activTotalData.bolts[i] = Math.round(stepsData.values [i] * STEPS_TO_BOLT_MULTIPLIER);
        }
    };

    /* CALL FUNCTIONS  ====================================================================================================== */

    /* define variables */
    $.fn.formatData(stepsData, true);
    $.fn.formatData(weightData, false);
    $.fn.formatData(pianoData, true);
    $.fn.formatData(absData, true);
    $.fn.formatData(squatData, true);
    $.fn.formatData(danceData, true);
    $.fn.formatData(battleData, true);

    // console.log("\n STEPS -- formatted dates: " + stepsData.datesString + " -- real dates: " + stepsData.dates + " -- formatted values: " + stepsData.values);
    // console.log("\n WEIGHT -- formatted dates: " + weightData.datesString + " -- real dates: " + weightData.dates + " -- formatted values: " + weightData.values);
    // console.log("\n PIANO -- formatted dates: " + pianoData.datesString + " -- real dates: " + pianoData.dates + " -- formatted values: " + pianoData.values);
    // console.log("\n ABS -- formatted dates: " + absData.datesString + " -- real dates: " + absData.dates + " -- formatted values: " + absData.values);
    // console.log("\n SQUAT -- formatted dates: " + squatData.datesString + " -- real dates: " + squatData.dates + " -- formatted values: " + squatData.values);
    // console.log("\n DANCE -- formatted dates: " + danceData.datesString + " -- real dates: " + danceData.dates + " -- formatted values: " + danceData.values);
    // console.log("\n BATTLE -- formatted dates: " + battleData.datesString + " -- real dates: " + battleData.dates + " -- formatted values: " + battleData.values);

    $.fn.sumToday();
    $.fn.mergeIntoGames();
    $.fn.mergeIntoActiv ();
    $.fn.formatPrograms();

    // console.log("\n PROGRAM -- programData.dates: " + programData.dates);
    // console.log("\n PROGRAM -- programData.datesString: " + programData.datesString);
    // console.log("\n PROGRAM -- programData.labels: " + programData.labels);
    // console.log("\n PROGRAM -- programData.activValues: " + programData.activValues);
    // console.log("\n PROGRAM -- programData.activBolts: " + programData.activBolts);
    // console.log("\n PROGRAM -- programData.gamesValues: " + programData.gamesValues);
    // console.log("\n PROGRAM -- programData.gamesBolts: " + programData.gamesBolts);

    // console.log("\n OBJ -- objectivesData.activ: " + objectivesData.activ);
    // console.log("\n OBJ -- objectivesData.activBolts: " + objectivesData.activBolts);
    // console.log("\n OBJ -- objectivesData.games: " + objectivesData.games);
    // console.log("\n OBJ -- objectivesData.gamesBolts: " + objectivesData.gamesBolts);
    // console.log("\n OBJ -- objectivesData.activToday: " + objectivesData.activToday);
    // console.log("\n OBJ -- objectivesData.activTodayBolts: " + objectivesData.activTodayBolts);
    // console.log("\n OBJ -- objectivesData.gamesToday: " + objectivesData.gamesToday);
    // console.log("\n OBJ -- objectivesData.gamesTodayBolts: " + objectivesData.gamesTodayBolts);


    var activProgData = {
        labels: programData.labels,
        datasets: [
            {
                //French
                label: "nombre de pas",
                fillColor: lightNeutralColor,
                highlightFill: tabColor3,
                barShowStroke : false,
                barValueSpacing : 25,
                data: programData.activValues
            }
        ]
    };

    var gamesProgData = {
        labels: programData.labels,
        datasets: [
            {
                //French
                label: "nombre de pas",
                fillColor: lightNeutralColor,
                highlightFill: tabColor3,
                barShowStroke : false,
                barValueSpacing : 25,
                data: programData.gamesValues
            }
        ]
    };

    $("#category-group-container #today-category").switchTabs("#today-tab");
    $("#category-group-container #dashboard-category").switchTabs("#dashboard-tab");
    $("#category-group-container #objectives-category").switchTabs("#objectives-tab");

    /* Today Tab -------------------------------------------------------------- */

    loadTab1 = function () {
        $('#activ-today-prog-widget').insertRadialChart(activTotalData.today, objectivesData.activToday, "rgb(50,173,237)", "rgb(49,48,144)", true);
        $('#games-today-prog-widget').insertRadialChart(gamesTotalData.today, objectivesData.gamesToday, "rgb(50,173,237)", "rgb(49,48,144)", true);
        
        if (/\S/.test(tip)){
            $("#tip-widget .body-text").addTextToPage(tip);
        }
        else {
            // french
            $("#tip-widget .body-text").addTextToPage("Un professionnel de santé prépare présentement des conseils personnalisés pour vous!");
        }
    }
    loadTab1 ();



    /* Stats Tab -------------------------------------------------------------- */
    loadTab2 = function () {
        // activ section
        $("#bolt-prog-widget #number").addTextToPage(activTotalData.todayBolts);
        $('#bolt-prog-widget').insertRadialChart(activTotalData.todayBolts, objectivesData.activTodayBolts, "rgb(50,173,237)", "rgb(49,48,144)", false);
        $('#activ-summary-widget .chart-container').insertLineChart(activTotalData.datesString, activTotalData.bolts, objectivesData.activBolts, scale, greyGBColor, tabColor2);

        // games section
        $("#games-prog-widget #number").addTextToPage(gamesTotalData.todayBolts);
        $('#games-prog-widget').insertRadialChart(gamesTotalData.todayBolts, objectivesData.gamesTodayBolts, "rgb(50,173,237)", "rgb(49,48,144)", false);
        $('#games-summary-widget .chart-container').insertLineChart(gamesTotalData.datesString, gamesTotalData.bolts, objectivesData.gamesBolts, scale, greyGBColor, tabColor2);

        // health section
        $("#weight-prog-widget .value").addTextToPage(weightData.values[weightData.values.length - 1] + " kg");
        $('#weight-summary-widget .chart-container').insertLineChart(weightData.datesString, weightData.values, weightData.values, scale, greyGBColor, tabColor2);
    }

    /* Objectives Tab --------------------------------------------------------- */
    loadTab3 = function () {
        var activProgChartCont = $("#objectives-summary-chart")[0].getContext("2d");
        var activProgChart = new Chart(activProgChartCont).Bar(activProgData, {
                    responsive: true,
                    maintainAspectRatio: true
        });

        var gamesProgChartCont = $("#games-obj-widget .line-chart")[0].getContext("2d");
        var gamesProgChart = new Chart(gamesProgChartCont).Bar(gamesProgData, {
                    responsive: true,
                    maintainAspectRatio: true
        });

        var todayIndex = programData.datesString.indexOf(CURRENT_DATE.toDateString());
        if (todayIndex != -1){
            activProgChart.datasets[0].bars[todayIndex].fillColor = tabColor3;
            activProgChart.update();
            gamesProgChart.datasets[0].bars[todayIndex].fillColor = tabColor3;
            gamesProgChart.update();
        }

        //french
        else if (programData.labels[0] == "Lundi"){
            var dayIndex = (CURRENT_DATE.getDay() - 1);
            if (dayIndex == -1){
                dayIndex = dayIndex + 7;
            }
            activProgChart.datasets[0].bars[dayIndex].fillColor = tabColor3;
            activProgChart.update();
            gamesProgChart.datasets[0].bars[dayIndex].fillColor = tabColor3;
            gamesProgChart.update();
            $("#program-summary-container").addClass("hidden");
        }

        var progNameDisplay = program_name.split(" ");
        if (/\S/.test(progNameDisplay[1])){
            $("#program-name-widget .body-text span").addTextToPage(progNameDisplay[1]);
        }

        var progDateDisplay = String(program_startDate).replace(" ", ",");
        progDateDisplay = progDateDisplay.replace(/\s/g, '');
        progDateDisplay = progDateDisplay.split(",");
        if (/\S/.test(progDateDisplay[1])){
            $("#program-date-widget .body-text .day").addTextToPage(progDateDisplay[1]);
        }
        if (/\S/.test(progDateDisplay[2])){
            $("#program-date-widget .body-text .year").addTextToPage(progDateDisplay[2]);
        }
        if (/\S/.test(progDateDisplay[0])){
            var month = progDateDisplay[0];
            if (month == "Jan."){
                month = "Janvier";
            }
            else if (month == "Feb."){
                month = "Février";
            }
            else if (month == "March"){
                month = "Mars";
            }
            else if (month == "April"){
                month = "Avril";
            }
            else if (month == "May"){
                month = "Mai";
            }
            else if (month == "June"){
                month = "Juin";
            }
            else if (month == "July"){
                month = "Juillet";
            }
            else if (month == "Aug."){
                month = "Août";
            }
            else if (month == "Sept."){
                month = "Septembre";
            }
            else if (month == "Oct."){
                month = "Octobre";
            }
            else if (month == "Nov."){
                month = "Novembre";
            }
            else if (month == "Dec."){
                month = "Décembre";
            }
            $("#program-date-widget .body-text .month").addTextToPage(month);
        }

        if (program_walk.length >= 0){
            $("#program-duration-widget .body-text .days").addTextToPage(program_walk.length);
        }
    } 
});