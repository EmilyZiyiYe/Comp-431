window.onload = function(){
	var idx1 = 0;
	var idx2 = 0;
	var idx3 = 0;
	var idx4 = 0;
	var idx5 = 0;
	var idx6 = 0;

	var images1 = ["https://entertainment.inquirer.net/files/2015/10/Screen-Shot-2015-10-01-at-7.06.35-PM.png", 'http://www.allkpop.com/upload/2015/10/af_org/got7-jb-jackson_1444840346_af_org.jpg', 'https://secure.static.tumblr.com/749997fb20fe739e4a3f754dbff275a8/yqy7eoi/T3nns98do/tumblr_static_tumblr_static__640.jpg']
	var images2 = ["https://pbs.twimg.com/media/CgdaO1GXIAA6Pd8.jpg","https://s-media-cache-ak0.pinimg.com/236x/74/67/c1/7467c184b8a115e785d5bbe8045fefea.jpg","http://www.allkpop.com/upload/2016/02/af_org/got7-jackson_1455816146_af_org.jpg"]
	var images3 = ["https://s-media-cache-ak0.pinimg.com/236x/74/67/c1/7467c184b8a115e785d5bbe8045fefea.jpg","https://secure.polyvoreimg.com/cgi/img-thing/size/l/tid/110872328.jpg","http://i.imgur.com/LxgCE19.jpg"]
	var images4 = ["http://images.kpopstarz.com/data/images/full/323160/got7s-jackson.jpg","http://www.allkpop.com/upload/2016/09/af_org/got7-jackson_1472742983_af_org.jpg","http://images6.fanpop.com/image/photos/36600000/Jackson-GOT7-image-jackson-got7-36639724-500-500.jpg"]
	var images5 = ["http://data.whicdn.com/images/186378484/original.jpg","http://data.whicdn.com/images/215414640/large.jpg","http://images6.fanpop.com/image/photos/37200000/-Jackson-jackson-got7-37275251-1280-853.jpg"]
	var images6 = ["http://data.whicdn.com/images/193503674/large.jpg","http://pm1.narvii.com/6065/24fcc1f2975f7548024ddf53cd4d94ba8688121e_hq.jpg","http://images6.fanpop.com/image/photos/39500000/tumblr-o5dhu39EZX1v8pdpso3-1280-jackson-got7-39511126-282-500.jpg"]
	
	
	var img1 = document.getElementById("img1");
	var img2 = document.getElementById("img2");
	var img3 = document.getElementById("img3");
	var img4 = document.getElementById("img4");
	var img5 = document.getElementById("img5");
	var img6 = document.getElementById("img6");
	
	var timer1 = setInterval(function(){
		img1.src = images1[idx1++ % images1.length]
	},random_interval("interval1"));
	var timer2 = setInterval(function(){
		img2.src = images2[idx2++ % images2.length]
	},random_interval("interval2"));
	var timer3 = setInterval(function(){
		img3.src = images3[idx3++ % images3.length]
	},random_interval("interval3"));
	var timer4 = setInterval(function(){
		img4.src = images4[idx4++ % images4.length]
	},random_interval("interval4"));
	var timer5 = setInterval(function(){
		img5.src = images5[idx5++ % images5.length]
	},random_interval("interval5"));
	var timer6 = setInterval(function(){
		img6.src = images6[idx6++ % images6.length]
	},random_interval("interval6"));
	
	document.getElementById("btn_img1").onclick = function() {button_response("btn_img1","1")};
	document.getElementById("btn_img2").onclick = function() {button_response("btn_img2","2")};
	document.getElementById("btn_img3").onclick = function() {button_response("btn_img3","3")};
	document.getElementById("btn_img4").onclick = function() {button_response("btn_img4","4")};
	document.getElementById("btn_img5").onclick = function() {button_response("btn_img5","5")};
	document.getElementById("btn_img6").onclick = function() {button_response("btn_img6","6")};

	
	function button_response(button, button_num){
		var operation = document.getElementById(button).innerHTML;

		if(operation=="stop"){
			if(button_num==1) clearInterval(timer1);
			else if(button_num==2) clearInterval(timer2);
			else if(button_num==3) clearInterval(timer3);
			else if(button_num==4) clearInterval(timer4);
			else if(button_num==5) clearInterval(timer5);
			else if(button_num==6) clearInterval(timer6);
			document.getElementById(button).innerHTML = "start";
		}
		else if(operation=="start"){
			if(button_num==1) timer1 = setInterval(function(){
				img1.src = images1[idx1++ % images1.length]
			},random_interval("interval1"));

			else if(button_num==2) timer2 = setInterval(function(){
				img2.src = images2[idx2++ % images2.length]
			},random_interval("interval2"));

			else if(button_num==3) timer3 = setInterval(function(){
				img3.src = images3[idx3++ % images3.length]
			},random_interval("interval3"));

			else if(button_num==4) timer4 = setInterval(function(){
				img4.src = images4[idx4++ % images4.length]
			},random_interval("interval4"));

			else if(button_num==5) timer5 = setInterval(function(){
				img5.src = images5[idx5++ % images5.length]
			},random_interval("interval5"));

			else if(button_num==6) timer6 = setInterval(function(){
				img6.src = images6[idx6++ % images6.length]
			},random_interval("interval6"));

			document.getElementById(button).innerHTML = "stop";
		}

	}


	document.getElementById("to_profile").onclick = function(){
		location.href="profile.html";
	}
}
function random_interval(text){
	var time = Math.floor(Math.random()*5+1)*1000;
	document.getElementById(text).innerHTML = time/1000 + " seconds";
	return time;
}
