/*
 Entire portal site
 Created 24/5/2015
 */

$(document).ready(function () {

	/* OLD FUNCTIONS  =============================================================================================================== */
	// Written by Jeffrey
	// Allows side navigation bar to know which page should be highlighted
	function highlight_def(){
	    // Get current html name
	    var path = window.location.pathname;
	    //console.log(path)
	    // get the length html location e.g. /patient-list/
	    var end = location.pathname.length -1
	    // slice off the two "/" at front and back
	    var page = location.pathname.slice(1,end);

	    console.log(page)
	    //console.log(path.indexOf("register_device"))

	    // NAV bar add element for Staff Patient page and register new device for that patient
	    if(path.indexOf("staff_patient_profile") >= 1 || path.indexOf("register_device") >= 1){
	        // Create element
	        var cur_patient_tag = document.createElement("LI")
	        var reg_new_device_tag = document.createElement("LI")
	        // Set id
	        cur_patient_tag.setAttribute("id", "staff_patient_profile/"+patient_id)
	        reg_new_device_tag.setAttribute("id", "register_device/"+patient_id)

	        // Create Link
	        var link = document.createElement("a")
	        var link2 = document.createElement("a")

	        link.href = "/staff_patient_profile/"+patient_id+"/"
	        link.innerHTML = "Patient - "+patient_name

	        link2.href = "/register_device/"+patient_id+"/"
	        link2.innerHTML = "Enregistrer un nouvel appareil"

	        //link those link to element
	        cur_patient_tag.appendChild(link)
	        reg_new_device_tag.appendChild(link2)
	        var nav_ele = document.getElementById("side-nav")
	        var reg_patient = document.getElementById("register")
	        //Place it
	        nav_ele.insertBefore(cur_patient_tag, reg_patient)
	        nav_ele.insertBefore(reg_new_device_tag, reg_patient)
	    }
	    // located the element within nav bar
	    var compare_id = document.getElementById(page)
	    // put a active class name on it to enable better CSS
	    compare_id.className = "active"
	}

	
	/* FUNCTION DEFINITONS  ======================================================================================================== */

	// For smaller screen sizes, nav menu is toggled visible/hidden
	// Function called on button ID/class; targetID is menu container ID/class
	$.fn.toggleMenu = function (targetID) {
		$menu = $(targetID);
        $(this).click(function () {
        	if ($(this).hasClass("active")){
        		$(this).removeClass("active");
        		$menu.removeClass("active");
        	}
        	else {
        		$(this).addClass("active");
        		$menu.addClass("active");
        	}
        });
    };

    // On click of button, page scrolls down to a target element
    // Function called on button
    $.fn.goToSection = function (targetID) {
        $(this).click(function () {
            $destination = $(document.body).find(targetID);
            // parameters:
            // compensate target y-coord by 35px to account for top nav-bar
            // animation speed: 500 ms 
            $('html, body').animate({
                scrollTop: ($destination.offset().top - 35)
            }, 500);
        });
    };


    // For features that are not yet implement, but have been inserted as placeholders
    // Places a "Coming Soon" overlay on targetClass element
    $.fn.comingSoon = function (targetClass) {
        var $target = $(targetClass);
        $target.append('<div class="coming-soon-overlay"><div id="vertical-adjust"></div><div id="text">&#192; Venir</div></div>');
    };

    // Places text on html page
    // Function called on target HTML element
    $.fn.addTextToPage = function (text) {
        $(this).text(text);
    };

    /* CALL FUNCTIONS  ============================================================================================================ */

    highlight_def();
    
    $('#expand-menu-button #menu-icon').toggleMenu(".top-nav .nav-items");

    $.fn.comingSoon('.coming-soon');
});
