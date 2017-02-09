"use strict";
// initialize parameters for the game

var Carrot = {location: 0};
var Stone = {location: 0};
var Bunny = {height: 270};

//initial speed when you start the game
var basespeed = 12; 
var speed = basespeed;

//the timers of the game that defined later in the code
var time;
var score_time;

var score = 0;
var life = 0;
var life_count = 0;
//carrots to collect for an extra life
var carrots_to_go = 0;
//total carrots collected in the game
var collected_carrots = 0;
var level = 0;

//to set cookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

//to get cookie
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}



window.onload = function() {
	//if cookie has previous highest records, disply them
	if (getCookie("score") != "" || getCookie("carrot") != ""){
		document.getElementById("most_carrots").innerHTML = getCookie("carrot");
		document.getElementById("best_score").innerHTML = getCookie("score");
	}
	//hide the warning for life decreasement
	document.getElementById("warning").style = "display : none";
	document.getElementById("restart").onclick = function(){
		//hide the (re)start button
		document.getElementById("restart").style = "display : none "
		//reset parameters and start game
		initial();
		start();
	}

}

function start(){
	//score adds one as one second increases in the game
	score_time = setInterval(timing, 1000)
	function timing(){ 
		score += 1
		document.getElementById("time_used").innerHTML = score;
	}

	//the canvas is redrawn every 20 milliseconds for updating
	time = setInterval(updating,20);
	function updating(){
		rolling(document.querySelector("canvas"));
 	}

 	//the bunny "jumps" to a height for half second when mouse is clicked
 	window.onmousedown = function(){
 		Bunny.height = 100
 		setTimeout(function(){Bunny.height = 270},500)
 	}
 	

 }

// initialize all the parameters of the game
function initial(){
	Stone.location = 2000 + Math.floor(Math.random()*1000);
	Carrot.location = 5000 + Math.floor(Math.random()*1000);
	score = 0;
	life_count = 0;
	life = 0
	carrots_to_go = 5;
	collected_carrots = 0;
	level = 0;
	document.getElementById("carrots_to_go").innerHTML = carrots_to_go;
	document.getElementById("level").innerHTML = level;
	document.getElementById("life_left").innerHTML = life;
	document.getElementById("time_used").innerHTML = score;
	document.getElementById("total_carrots").innerHTML = collected_carrots;
	speed = basespeed;
}


function rolling(canvas){
	//draw grounds
	var c = canvas.getContext("2d");
	c.clearRect(0, 0, canvas.width, canvas.height);

	var floor = 400;
	var grad = c.createLinearGradient(0,floor,0,canvas.height)
	grad.addColorStop(0, "green")
	grad.addColorStop(1, "black")
	c.fillStyle=grad
	c.fillRect(0, floor, canvas.width, canvas.height);

	//create the image object to use
	var Images = ["carrot.png", "bunny.png", "stone.png"];
	var carrot_img = new Image();
	var stone_img = new Image();
	var bunny_img = new Image();
	carrot_img.src = Images[0]
	stone_img.src = Images[2]
	bunny_img.src = Images[1]

	//draw the bunny
	c.drawImage(bunny_img, 300, Bunny.height, 150, 150);

	//decide the level of difficulty of the game
	level = Math.floor(score / 20);
	speed = basespeed + level * 3;
	document.getElementById("level").innerHTML = level;

	//if stone goes out of the left boundary, relocate it to the far right
	if(Stone.location<=-60){
		var distance = Math.floor(Math.random()*1000)
		Stone.location = canvas.width + distance;
	}
	// move the stone a little bit forward
	else{
		Stone.location = Stone.location-speed
		c.drawImage(stone_img, Stone.location, floor-60, 60, 60);
	}

	//if carrot goes out of the left boundary, relocate it to the far right
	if(Carrot.location<=-60){
		var distance = 1000 + Math.floor(Math.random()*1000)
		Carrot.location = canvas.width+distance;
	}
	// move the carrot a little bit forward
	else{
		Carrot.location = Carrot.location-speed
		c.drawImage(carrot_img, Carrot.location, 100, 80, 80);
	}
	check(canvas)
}


function check(canvas){
 	var c = canvas.getContext("2d");
 	//the situation of bunny collides the rock
 	if (Bunny.height == 270 && Stone.location < 420 && Stone.location > 290){
 		if (life != 0){
 			//use one life
 			life -= 1;
 			life_count -= 5;
			//relocate the stone
 			var distance = 3200 + Math.floor(Math.random()*1000);
 			Stone.location = distance;
			//update the life counts
 			document.getElementById("life_left").innerHTML = life;
			//show the warning of the decrease of life for a second
 			document.getElementById("warning").style.display='';
 			setTimeout(function(){
 				document.getElementById("warning").style="display : none ";
 			 }, 1000)
 		}
 		//if there's no extra life, end the game
 		else{
  			setTimeout("alert('Game Over!')", 40);
 			//stop the game
			clearInterval(time);
			clearInterval(score_time);
			//show the restart button
			document.getElementById("restart").style = "";
			document.getElementById("restart").innerHTML = "Restart";
			//get the cookie of the metrics
			var best_score = getCookie("score");
			var most_carrots = getCookie("carrot");
			if (best_score == "" || most_carrots == "") {
				//update the cookie with the current values of score and amount of carrots
				setCookie("score", score ,365);
				setCookie("carrot", collected_carrots,365);
				document.getElementById("most_carrots").innerHTML = collected_carrots;
				document.getElementById("best_score").innerHTML = score;
			}
			else{
				if (score > best_score){
				//update the cookie with the current score
				setCookie("score", score ,365);
					setCookie("score", score ,365);
					document.getElementById("best_score").innerHTML = score;
				}
				if (collected_carrots > most_carrots){
				//update the cookie with the carrots amount 
				setCookie("score", score ,365);
					setCookie("carrot", collected_carrots,365);
					document.getElementById("most_carrots").innerHTML = collected_carrots;
				}
			}
		}
	}
	// if bunny hit the carrot
 	if (Bunny.height == 100 && Carrot.location < 400 && Carrot.location > 270){
 		//update the carrot collected, the amount of extra lives, etc.
 		collected_carrots += 1;
 		life_count += 1;
 		life = Math.floor(life_count/5);
 		carrots_to_go = 5 - (life_count - life * 5);
 		//relocate the carrot to the far right side
 		var distance = 2200 + Math.floor(Math.random()*1000);
 		Carrot.location = distance;
 		//dispaly those parameter in the browser 
 		document.getElementById("total_carrots").innerHTML = collected_carrots;
 		document.getElementById("life_left").innerHTML = life;
 		document.getElementById("carrots_to_go").innerHTML = carrots_to_go;

 	}

 }







