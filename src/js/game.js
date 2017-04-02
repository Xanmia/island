"use strict";

var $ = {};


$.width = 800;
$.height = 600;
/*
$.colors = {
	black: 'rgba(0, 0, 0, 1)',
	yellow: 'rgba(255, 255, 155, 1)',
	orange: 'rgba(255, 77, 77, 1)',
	pink: 'rgba(255, 128, 255, 1)',
	green: 'rgba(129, 255, 226, 1)',
	blue: 'rgba(94, 0, 244, 1)'
};

*/
$.images={};

$.pause = false;


$.mouse = {
	x:0,
	y:0
}

$.entities = [];
$.state = undefined;
//$.events = [];


$.init = function() {
	//$.canvas0 = document.getElementsByTagName('canvas')[0];
	$.canvas1 = document.getElementsByTagName('canvas')[0];
	$.canvas2 = document.getElementsByTagName('canvas')[1];
	$.canvas3 = document.getElementsByTagName('canvas')[2];
	$.canvas4 = document.getElementsByTagName('canvas')[3];

	//$.canvas = document.getElementsByTagName('canvas')[0];
	$.canvas1.width = $.canvas2.width = $.canvas3.width = $.width;
	$.canvas1.height =  $.canvas2.height = $.canvas3.height = $.height;

	$.canvas4.width = window.innerWidth;
	$.canvas4.height = window.innerHeight;
	//$.wtx = $.canvas0.getContext('2d'); //water canvas
	$.btx = $.canvas1.getContext('2d');
	$.ctx = $.canvas2.getContext('2d');
	$.ftx = $.canvas3.getContext('2d');
	$.ptx = $.canvas4.getContext('2d');

	$.ctx.mozImageSmoothingEnabled = $.ftx.mozImageSmoothingEnabled = false;
	//$.ctx.webkitImageSmoothingEnabled = false;
	$.ctx.msImageSmoothingEnabled = $.ftx.msImageSmoothingEnabled = false;
	$.ctx.imageSmoothingEnabled = $.ftx.imageSmoothingEnabled = false;

//	$.world = new $.world();
//	$.world.render();

	//$.updateDelta();
	$.loadImages();
	
	//$.state = new $.title();

//	$.loop();
};

$.loop = function() {
	if(!$.pause){
		//$.updateDelta();
		$.render();
		$.update();

	}
	//$.util.drawText({x:1,y:1},$.pause.toString(), 20, $.ftx);
	window.requestAnimFrame($.loop);

};

$.update = function() {
	
	$.state.update();
	
	$.canvas1.style.marginLeft =  $.canvas2.style.marginLeft = $.canvas3.style.marginLeft =  Math.max(0,(window.innerWidth/2) - ($.width/2)) + 'px';
	$.canvas1.style.marginTop = $.canvas2.style.marginTop = $.canvas3.style.marginTop =  Math.max(0,(window.innerHeight/2) - ($.height/2)) + 'px';

	//$.canvas2.style.marginTop =  '200px';
	
	
	//for (var i = 0; i < $.entities.length; i++) {
	//	$.entities[i].update(i);
	//}
};

$.render = function() {
	//$.Draw.clear();
	 $.ctx.clearRect(0, 0, $.width, $.height);
	 $.ptx.clearRect(0, 0, $.width, $.height);
	$.state.render();
	for (var i = 0; i < $.entities.length; i++) {
		$.entities[i].render();
	}
};
/*
$.updateDelta = function() {
	var now = Date.now();
	$.dt = (now - $.lt) / (1000 / 60);
	$.lt = now;
	$.elapsed += $.dt;
}
*/
$.mousedown = function(e) {
	$.mouse.x = e.pageX-$.canvas2.offsetLeft;
	$.mouse.y = e.pageY-$.canvas2.offsetTop;
	//$.mouse.x = e.clientX;
	//$.mouse.y = e.clientY;
};

$.mousemove = function(e) {
	if($.mouse.x && $.mouse.y){
		$.mouse.x = e.pageX-$.canvas2.offsetLeft;
		$.mouse.y = e.pageY-$.canvas2.offsetTop;
	}
};



$.loadImages = function () {
    var images = $.data.i, n, i_count = 0;
	var total = Object.keys(images).length;

    var check_done = function (count) {
        if (count >= total) {
       		$.state = new $.title();
			$.loop();
        }
    };

   // var i_count = 0;
	for (n in images) {
		var imageObj = new Image();
        imageObj.onload = function () {
            i_count++;
            check_done(i_count);
        };
        var append = 'data:image/png;base64,';

        imageObj.src = append + images[n];
        $.images[n] = imageObj;
	}
};


$.mouseup = function(e) {
	$.mouse.x = 0;//e.pageX-$.canvas2.offsetLeft;
	$.mouse.y = 0;//e.pageY-$.canvas2.offsetTop;
	//alert($.mouse.x + ' ' + $.mouse.y);
};


$.pauseGame = function(){
	$.pause = true;
}

$.unpauseGame = function(){
	$.pause = false;
	//alert('unpause');

}


window.addEventListener('load', $.init, false);
//window.addEventListener("mousewheel", $.MouseWheel, false);
window.addEventListener('mousedown', $.mousedown);
window.addEventListener('mousemove', $.mousemove);
window.addEventListener('mouseup', $.mouseup);
window.addEventListener('blur', $.pauseGame);
window.addEventListener('focus', $.unpauseGame);
//window.addEventListener('click', $.generateRandomObjects);



