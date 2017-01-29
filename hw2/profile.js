
var validstr = "";  
var updatestr = "Update Infomation:\n";  
var validflag = true; 
var updateflag = false; 

var namepattern = /^[A-Za-z][A-Za-z0-9]*$/;
var emailpattern = /\S+@\S+\.\S+/;
var phonepattern = /^([0-9]{3})+\-+([0-9]{3})+\-+([0-9]{4})$/;
var zipcodepattern = /^(([0-9]{5})|([0-9]{5})+\-+([0-9]{4}))$/;

window.onload = function(){
document.getElementById("submit").onclick = function(){

	document.getElementById("to_main").onclick = function(){
	location.href="main.html";
	}

	var inputdisplayname = document.getElementById("id_displayName").value;
	var inputemail = document.getElementById("id_emailAddress").value;
	var inputphone = document.getElementById("id_phoneNumber").value;
	var inputzipcode = document.getElementById("id_zipcode").value;
	var inputpassword = document.getElementById("id_password").value;
	var inputpasswordconfirm = document.getElementById("id_passwordConfirmation").value;

	var displayname = document.getElementById("textDisplayName").innerHTML;
	var email = document.getElementById("textEmailAddress").innerHTML;
	var phone = document.getElementById("textPhoneNumber").innerHTML;
	var zipcode = document.getElementById("textZipcode").innerHTML;

	var namepattern = /^[A-Za-z][A-Za-z0-9]*$/;
	var emailpattern = /\S+@\S+\.\S+/;
	var phonepattern = /^([0-9]{3})+\-+([0-9]{3})+\-+([0-9]{4})$/;
	var zipcodepattern = /^(([0-9]{5})|([0-9]{5})+\-+([0-9]{4}))$/;

	checkvalid(namepattern, inputdisplayname, "Display Name");
	checkvalid(emailpattern, inputemail, "Email Address");
	checkvalid(phonepattern, inputphone, "Phone Number");
	checkvalid(zipcodepattern, inputzipcode, "Zipcode");
	if(inputpassword!=inputpasswordconfirm){
		validflag = false;
		validstr += "Passwords don't match."
	}

	if(!validflag){

		validflag = true;
		console.log("here");
		alert(validstr);
		validstr = "";
	}
	else{
		checkupdate(displayname, inputdisplayname, "Display Name");
		checkupdate(email, inputemail, "Email Address");
		checkupdate(phone, inputphone, "Phone Number");
		checkupdate(zipcode, inputzipcode, "Zipcode");
		
		if(updateflag){
		alert(updatestr);
		changetext(displayname, inputdisplayname, "textDisplayName");
		changetext(email, inputemail, "textEmailAddress");
		changetext(phone, inputphone, "textPhoneNumber");
		changetext(zipcode, inputzipcode, "textZipcode");
		updateflag = false;
		updatestr = "Update Infomation:\n";
		}
	}

	clearinput("id_displayName");
	clearinput("id_emailAddress");
	clearinput("id_phoneNumber");
	clearinput("id_zipcode");
	clearinput("id_password");
	clearinput("id_passwordConfirmation");
	}


document.getElementById("to_main").onclick = function(){
	location.href="main.html";
	}
}	


function checkvalid(regx, str, field){
	if(!regx.test(str)&&str!=""){
		validstr += field+" is invalid. ";
		validflag = false;
	}  
}


function checkupdate(currentstr, inputstr, field){
	if(currentstr!=inputstr&&inputstr!=""){
		updateflag = true;
		updatestr += field+" is changed from "+currentstr+" to " + inputstr+".";
	}
}


function changetext(currentstr, inputstr, id){
	if(currentstr!=inputstr&&inputstr!=""){
		document.getElementById(id).innerHTML = inputstr;
	}
}

function clearinput(id){
	document.getElementById(id).value = "";
}