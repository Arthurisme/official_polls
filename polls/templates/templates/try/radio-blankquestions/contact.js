/*
   New Perspectives on JavaScript, 2nd Edition
   Tutorial 5
   Tutorial Case

   Author:   
   Date:     

   Filename: contact.js



   Functions List:
   startForm()
      Sets up and initializes the form2 Web form.

   checkForm2()
      Checks the form to ensure that all required fields have been
      entered by the user.

   checkZipRE()
      Checks that a proper zip code has been entered by the user
      with regular expressions

   checkZip()
      Checks that a proper zip code has been entered by the user

   isNonNumeric()
      Returns a Boolean value indicating whether a text string 
      contains non-numeric characters


*/
window.onload = startForm;

function todayTxt() {
   var Today = new Date();
   return Today.getMonth() + 1 + "-" + Today.getDate() + "-" + Today.getFullYear();
}

function startForm() {
	
 

document.forms[0].onsubmit = checkForm2;

}

function checkForm2() {
if (document.forms[0].fname.value.length == 0)
{alert("You must enter a first name");
return false;} 
else return true;
}

