'use strict'
var buildings = new Array(); 
var pass = 0; 


var Sun = {
	x: 50, y: 50, radius: 30, color:"orange", sAngle: 0, eAngle: Math.PI*2, clockwise: true
}


var Car = {
	x:0, y:0, width:70, height:40, color:"black"
}

window.onload = function() {
	var timer = setInterval(updating,500);
	function updating(){
	var app = createApp(document.querySelector("canvas"))
	document.getElementById("build").onclick = app.build
	}
	window.onclick = function(e){
		increaseheight(e);
	}
}

function increaseheight(event)
  {
  var xmouse=event.clientX
  var ymouse=event.clientY
	buildings.forEach(function(value){
  	if(xmouse>=value.x && xmouse<=value.x+value.width && ymouse>=value.y && ymouse<=value.y+value.height){
  		if(value.y-20>0){
  		value.y-=20;
  		value.height+=20;
  		}
  	}
  })
  }

var createApp = function(canvas) { 

	var c = canvas.getContext("2d");
	c.clearRect(0, 0, canvas.width, canvas.height);

	// Create the ground
	var floor = canvas.height/2
	var grad = c.createLinearGradient(0,floor,0,canvas.height)
	grad.addColorStop(0, "green")
	grad.addColorStop(1, "black")
	c.fillStyle=grad
	c.fillRect(0, floor, canvas.width, canvas.height)

	// common size for windows
	var windowSpacing = 2, floorSpacing = 3
	var windowHeight = 5, windowWidth = 3

	// colors of buildings
	var blgColors = [ 'red', 'blue', 'gray', 'orange'] 

	//build a building
	var build = function() { 
		var x0 = Math.random()*canvas.width
		var blgWidth = (windowWidth+windowSpacing) * Math.floor(Math.random()*10)
		var blgHeight = Math.random()*canvas.height/2
		c.fillStyle= blgColors[ Math.floor(Math.random()*blgColors.length)]
		c.fillRect(x0, floor - blgHeight, blgWidth, blgHeight)
		buildings.push({x:x0, y:floor-blgHeight, width:blgWidth, height:blgHeight, style:c.fillStyle})
		var lgtColors = ['yellow','black'];
		for (var y = floor - floorSpacing; y > floor - blgHeight; y -= floorSpacing + windowHeight) {
			for (var x = windowSpacing; x < blgWidth - windowWidth; x += windowSpacing + windowWidth) {
				c.fillStyle= lgtColors[Math.floor(Math.random()*2)];
				c.fillRect(x0 + x, y - windowHeight, windowWidth, windowHeight)
			}
		}
	}

	pass+=10;

	c.fillStyle = Sun.color;
	c.beginPath();
	c.arc(Sun.x+pass%canvas.width, Sun.y, Sun.radius, Sun.sAngle, Sun.eAngle, Sun.clockwise); 
	c.closePath();
	c.fill();

	buildings.forEach(function(value){
		c.fillStyle = value.style;
		c.fillRect(value.x, value.y, value.width, value.height)
		var lgtColors = ['yellow','black']
		for (var y = floor - floorSpacing; y > floor - value.height; y -= floorSpacing + windowHeight) {
			for (var x = windowSpacing; x < value.width - windowWidth; x += windowSpacing + windowWidth) {
				c.fillStyle= lgtColors[Math.floor(Math.random()*2)];
				c.fillRect(value.x + x, y - windowHeight, windowWidth, windowHeight)
			}
		}
	})

	Car.y = floor - Car.height;
	c.fillStyle = Car.color;
	c.fillRect(Car.x+pass%canvas.width, Car.y, Car.width, Car.height); 



	return {
		build: build
	}
}


