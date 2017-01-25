

window.onload = function() {
	var clickbutton = document.getElementById("clickbutton");
	var divtext = document.getElementsByClassName("game_win");
	divtext[0].style.display = "none";

	clickbutton.onclick = function() { 
		if(clickbutton.innerHTML == "Play Again"){
			clickbutton.innerHTML = "Click Me";
			divtext[0].style.display = "none";
		}else{
			divtext[0].style.display = "inline-block";
			clickbutton.innerHTML = "Play Again";
		}
	}
	clickbutton.onmouseover = function(e){
		if (clickbutton.innerHTML == "Click Me"){
			if (!e.shiftKey){
				clickbutton.style.position = "absolute";
				var width = clickbutton.offsetWidth;
				var height = clickbutton.offsetHeight;
				clickbutton.style.left = Math.floor(Math.random()*(window.innerWidth - width)) + "px";
				clickbutton.style.top = Math.floor(Math.random()*(window.innerHeight - height)) + "px";
			}
		}
	}
}
	


