//demo code: the code from html1 to html 30 is using for testing.
//demo code will be removed and using a restful function reading directly from backend server written by Py language.

//click times by user on the bottom icon:
var clicks=0;

var html1 =  "pages/1.html";
var html2 =  "pages/2.html";
var html3 =  "pages/3.html";
var html4 =  "pages/4.html";
var html5 =  "pages/5.html";
var html6 =  "pages/6.html";
var html7 =  "pages/7.html";
var html8 =  "pages/8.html";
var html9 =  "pages/9.html";
var html10 =  "pages/10.html";
var html11 =  "pages/11.html";
var html12 =  "pages/12.html";
var html13 =  "pages/13.html";
var html14 =  "pages/14.html";
var html15 =  "pages/15.html";
var html16 =  "pages/16.html";
var html17 =  "pages/17.html";
var html18 =  "pages/18.html";


 
var htmlArray = [html1, html2,  html3, html4, html5, html6, html7,html8,html9,html10,html11,html12,html13,html14,html15 ];


    //Change the contents on the ios (and others later )view's main boby
    //it is using by click either right or left bottom icon. (same as "next")
    //Also it need to be record the right or left bottom icon the user clicked(not done yet)
function changeText() {
	
	clicks++;
	document.getElementById('pageNumber').innerHTML = clicks;
	document.getElementById('questions-main-body').innerHTML = "Votre médecin vous a-t-il déjà  :Questionair text  " + clicks;
    document.getElementById("questions-main-body").style.color = "white";
	
}
 


function changeBlock() {
//var div = document.createElement('div');
    //div.setAttribute('class', 'post block bc2');
    //div.innerHTML = html;
    //document.getElementById('textdemo').appendChild(div);
	//change the page number on the top:
	clicks++;
	document.getElementById('pageNumber').innerHTML = clicks;
	//change the block in the middle of body:
	//document.getElementById('textdemo').innerHTML = html2;
	  //htmlArray[3]=html3;
		//document.getElementById('textdemo').innerHTML = htmlArray[clicks-1];
		$("#questions-main-body").load(htmlArray[clicks-1]);

	
}

//show time and stop time
//when stop button clicked: stopclock(), the time will be record(not done yet)

    var se, m = 0,h = 0, s = 0;
	
    function second() {
		
        if (s > 0 && (s % 60) == 0) { m += 1; s = 0; }
        if (m > 0 && (m % 60) == 0) { h += 1; m =0; }
        t =(h <= 9 ? "0" + h : h) + ":" + (m <= 9 ? "0" + m : m) + ":" + (s <= 9 ? "0" + s : s); 
        document.getElementById("showtime").value = t;
        s += 1;
    }
	function startclock() { se = setInterval("second()", 1000); }
	
     //$(document).ready(function startclock() { se = setInterval("second()", 1000); });
    function pauseclock() { clearInterval(se); }//暂停
    function stopclock() { clearInterval(se); m = h = s = 0; }//停止
	
	//Block and style 3rd for ios 
	//function for radio selecting:
	//

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-39542975-1', 'dyn-web.com');
ga('send', 'pageview');



// to remove from global namespace
    (function() {

        function getRadioVal(form, name) {
            var val;
            var radios = form.elements[name];

            for (var i=0, len=radios.length; i<len; i++) {
                if ( radios[i].checked ) {
                    val = radios[i].value;
                    break;
                }
            }
            return val;
        }


        document.forms['demoForm'].elements['getVal'].onclick = function() {
            alert( 'The selected radio button\'s value is: ' + getRadioVal(this.form, 'ship') );
        };


        // disable submission of all forms on this page
        for (var i=0, len=document.forms.length; i<len; i++) {
            document.forms[i].onsubmit = function() { return false; };
        }

    }());
