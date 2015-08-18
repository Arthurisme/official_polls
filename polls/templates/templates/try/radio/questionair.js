//demo code: the code from html1 to html 30 is using for testing.
//demo code will be removed and using a restful function reading directly from backend server written by Py language.

//click times by user on the bottom icon:
var clicks=0;

var html1 =  
    ' <div class="align-txt">Votre médecin vous a-t-il déjà dit que vous souffriez d’un problème cardiaque et que vous ne deviez participer qu’aux activités physiques prescrites et approuvées par un médecin?</div> '
 ;
	var html2 =  
    ' <div class="align-txt">Ressentez-vous une douleur à la poitrine lorsque vous faites de l’activité physique?</div> '
 ;
 
 var html3 =  
    ' <div class="align-txt-middle">Ressentez-vous une douleur à la poitrine lorsque vous faites de l’activité physique?</div>'
 ;
 
 var html4 =  
    '    <div class="align-txt">Éprouvez-vous des problèmes d’équilibre reliés à un étourdissement ou vous arrive-t-il de perdre connaissance?</div> '
 ;
 var html5 =  
    ' <div class="align-txt">Avez-vous des problèmes osseux ou articulaires (par exemple, au dos, au genou ou à la hanche) qui pourraient s’aggraver par une modification de votre niveau de participation à une activité physique?</div>  '
 ;
 var html6 =  
    '<div class="align-txt">Des médicaments vous sont-ils actuellement prescrits pour contrôler votre tension artérielle ou un problème cardiaque (par exemple, des diurétiques)?</div> '
 ;
 var html7 =  
    '<div class="align-txt">Connaissez-vous une autre raison pour laquelle vous ne devriez pas faire de l’activité physique?</div> '
 ;
// align-txt-middle will be using for all text from html1 to..(not done yet);
  var html8 =  
    '<div >    \
  <div class="align-txt-middle">Physiqui exer:</div>   \
<img class="align-image-middle" src="source/img/physique.png" width="116" height="169" alt=""/> </div> '
 ;
 
   var html9 =  
 '<center><div id="physiqueform"  >                \
  <form  action="/cgi-bin/test.cgi" name="myForm" onsubmit="return(validate());">          \
    <table class="table table-bordered" >                                    \
      <tr>                                                                                \
        <td align="right">Age</td>                                                        \
        <td><input style="color:#337ab7" type="text" name="Age" /></td>                                         \
      </tr>                                                                               \
      <tr>                                                                                \
        <td align="right">Genre</td>                                                      \
        <td><select style="color:#337ab7" name="Genre">                                                         \
            <option value="-1" selected>[choose yours]</option>                           \
            <option value="1">Female</option>                                             \
            <option value="2">Male</option>                                               \
          </select></td>                                                                  \
      </tr>                                                                               \
      <tr>                                                                                \
        <td align="right">Poids</td>                                                      \
        <td><input style="color:#337ab7" type="text" name="Poids" /></td>                                       \
      </tr>                                                                               \
      <tr>                                                                                \
        <td align="right">IMC</td>                                                        \
        <td><input style="color:#337ab7" type="text" name="IMC" /></td>                                         \
      </tr>                                                                               \
      <tr>                                                                                \
        <td align="right"></td>                                                           \
        <td><input style="color:#337ab7" type="submit" value="Submit" /></td>                                   \
      </tr>                                                                               \
    </table>                                                                              \
  </form>                                                                                 \
</div></center>'
 ;
 
   var html10 =  
    '<div >    \
  <div class="align-txt-middle">Evaluation cardiovasculaire</div>   \
<img class="align-image-middle" src="source/img/cardiovasculaire.png" width="116" height="169" alt=""/> </div> '
 ;
 
    var html11 =  
    '<div>                                                                                     \
<form action="#" method="post" class="demoForm" id="demoForm">                            \
    <fieldset>                                                                            \
        <legend>Demo: Get Value of Selected</legend>                                      \
    <p>Select a shipping method:</p>                                                      \
    <p>                                                                                   \
        <label><input type="radio" name="ship" value="1" checked /> 1</label> <br>        \
        <label><input type="radio" name="ship" value="2" /> 2</label> <br>                \
        <label><input type="radio" name="ship" value="3" /> 3</label> <br>                \
        <label><input type="radio" name="ship" value="4" /> 4</label> <br>                \
        <label><input type="radio" name="ship" value="5" /> 5</label> <br>                \
    </p>                                                                                  \
    <p><button type="button" name="getVal">Get Value of Selected</button></p>             \
    </fieldset>                                                                           \
</form>                                                                                   \
</div>'
 ;
 
    var html12 =  
    '<div >    \
  <div class="align-txt-middle">Evaluation masculaire</div>   \
<img class="align-image-middle" src="source/img/musculaire.png" width="116" height="169" alt=""/> </div> '
 ;
 
     var html13 =  
    ' <div>\
	 <p>1</p>\
	  <p>2</p>\
	  <p>3</p>\
	  <p>chaise on mur</p>\
	    <p>pictures</p>\
  <p>Click the button to start clock</p>\
  <button  style=" color:red;  background-color:pink"  onclick="startclock()">Start</button>\
  <p>Click the button to stop clock</p>\
  <button  style=" color:red;  background-color:pink"  onclick="stopclock()">Stop</button>\
  <p></p>\
  <input type="text" name="showtime" id="showtime" readonly=readonly style="color:red; width:100px; border:0px;font-size:20px;;" value="00:00:00">\
</div> '
 ;
 
var htmlArray = [html1, html2,  html3, html4, html5, html6, html7,html8,html9,html10,html11,html12,html13 ];


    //Change the contents on the ios (and others later )view's main boby
    //it is using by click either right or left bottom icon. (same as "next")
    //Also it need to be record the right or left bottom icon the user clicked(not done yet)
function changeText() {
	
	clicks++;
	document.getElementById('pageNumber').innerHTML = clicks;
	document.getElementById('textdemo').innerHTML = "Votre médecin vous a-t-il déjà  :Questionair text  " + clicks;
    document.getElementById("textdemo").style.color = "white";
	
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
		document.getElementById('textdemo').innerHTML = htmlArray[clicks-1];

	
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
 