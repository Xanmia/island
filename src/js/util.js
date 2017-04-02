"use strict";

$.util = {};

window.requestAnimFrame = (function(){
    return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function( callback ){
        window.setTimeout(callback, 1000 / 60);
    };
})();

$.util.roundToWhole = function (value){
  return Math.round(value);
}

$.util.randomInRange= function (min, max) {
    return Math.random() * ( max - min ) + min;
};
/*
$.util.pickRandomFromObject = function (obj) {
    var keys = Object.keys(obj)
    return obj[keys[ keys.length * Math.random() << 0]];
};
*/

$.util.popChat = function(_x, _y, _text) {
  var textEl = document.createElement('div');
  textEl.classList.add('note');
  textEl.classList.add('ani'); // could add animation option for diff behavior.

  var current = 0;
  setLocation(_text[current].length);
  textEl.innerText =  _text[current];
  //textEl.appendChild($.images['log']);
 // textEl.innerText += " more crap";
 // textEl.innerHtml = "<img src='" + $.images['tree'].src + "' />";

  textEl.addEventListener("animationend", AnimationEnded, false);

  document.body.appendChild(textEl);

  function setLocation(textLength){
	  var x = textLength<20?(textLength*10)/4:50; //100 is max width of box, 10 is text size
	  var y = 10+Math.ceil(textLength*.1)*7; //100 is max width of box, 10 is text size
	  textEl.style.left = ((window.innerWidth/2) - ($.width/2)) + (_x - x) + "px";
	  textEl.style.top = ((window.innerHeight/2) - ($.height/2)) + (_y - y) + "px";
  }

  function AnimationEnded() {
    if (current < _text.length - 1) {
      current++;
	  setLocation(_text[current].length);
      textEl.innerText = _text[current];;
      textEl.classList.remove('ani');
      void textEl.offsetWidth;
      textEl.classList.add('ani');
    } else {
      document.body.removeChild(textEl);
    }
  }
}

$.util.pointToPoint = function(p1,p2){
	var cDir = Math.atan2((p1.x - p2.x), (p1.y - p2.y) );

	return { x: Math.sin( (Math.PI) + cDir), y: Math.cos( (Math.PI) + cDir) } //* (this.velocity*$.dt);
	//this.position.y += Math.cos( (Math.PI) + cDir); //* (this.velocity*$.dt);
}

$.util.rectInRect = function( r1, r2 ) {
	return !( r2.x > r1.x + r1.w ||
	r2.x + r2.w < r1.x ||
	r2.y > r1.y + r1.h ||
	r2.y + r2.h < r1.y );
};

/*
$.util.RectOnTopRect = function(x1,y1,width1,height1,x2,y2,width2,height2)
{
	if(x1 >= x2-width1 && x1 <= x2 + width2 &&
	   y1 >= y2 && y1 <= y2+height1)
	{
		return true;
	}
}

$.util.pointInRect = function( px, py, rx, ry, rw, rh ) {
	return ( px >= rx && px <= rx + rw &&
		     py >= ry && py <= ry + rh );
};
*/

$.util.RectInArc = function( ax, ay, ar, rx, ry, rw, rh ) {
	return !( ax + ar <= rx || ax - ar >= rx + rw || ay + ar <= ry || ay - ar >= ry + rh );
};



//via https://github.com/PaulBGD/PixelFont/blob/master/script.js
$.util.letters = {
        'A': [
            [, 1],
            [1, , 1],
            [1, , 1],
            [1, 1, 1],
            [1, , 1]
        ],
        'B': [
            [1, 1],
            [1, , 1],
            [1, 1, 1],
            [1, , 1],
            [1, 1]
        ],
        'C': [
            [1, 1, 1],
            [1],
            [1],
            [1],
            [1, 1, 1]
        ],
        'D': [
            [1, 1],
            [1, , 1],
            [1, , 1],
            [1, , 1],
            [1, 1]
        ],
        'E': [
            [1, 1, 1],
            [1],
            [1, 1, 1],
            [1],
            [1, 1, 1]
        ],
        'F': [
            [1, 1, 1],
            [1],
            [1, 1],
            [1],
            [1]
        ],
        'G': [
            [, 1, 1],
            [1],
            [1, , 1, 1],
            [1, , , 1],
            [, 1, 1]
        ],
        'H': [
            [1, , 1],
            [1, , 1],
            [1, 1, 1],
            [1, , 1],
            [1, , 1]
        ],
        'I': [
            [1, 1, 1],
            [, 1],
            [, 1],
            [, 1],
            [1, 1, 1]
        ],
        'J': [
            [1, 1, 1],
            [, , 1],
            [, , 1],
            [1, , 1],
            [1, 1, 1]
        ],
        'K': [
            [1, , , 1],
            [1, , 1],
            [1, 1],
            [1, , 1],
            [1, , , 1]
        ],
        'L': [
            [1],
            [1],
            [1],
            [1],
            [1, 1, 1]
        ],
        'M': [
            [1, 1, 1, 1, 1],
            [1, , 1, , 1],
            [1, , 1, , 1],
            [1, , , , 1],
            [1, , , , 1]
        ],
        'N': [
            [1, , , 1],
            [1, 1, , 1],
            [1, , 1, 1],
            [1, , , 1],
            [1, , , 1]
        ],
        'O': [
            [1, 1, 1],
            [1, , 1],
            [1, , 1],
            [1, , 1],
            [1, 1, 1]
        ],
        'P': [
            [1, 1, 1],
            [1, , 1],
            [1, 1, 1],
            [1],
            [1]
        ],
        'Q': [
            [0, 1, 1],
            [1, , , 1],
            [1, , , 1],
            [1, , 1, 1],
            [1, 1, 1, 1]
        ],
        'R': [
            [1, 1],
            [1, , 1],
            [1, , 1],
            [1, 1],
            [1, , 1]
        ],
        'S': [
            [1, 1, 1],
            [1],
            [1, 1, 1],
            [, , 1],
            [1, 1, 1]
        ],
        'T': [
            [1, 1, 1],
            [, 1],
            [, 1],
            [, 1],
            [, 1]
        ],
        'U': [
            [1, , 1],
            [1, , 1],
            [1, , 1],
            [1, , 1],
            [1, 1, 1]
        ],
        'V': [
            [1, , , , 1],
            [1, , , , 1],
            [, 1, , 1],
            [, 1, , 1],
            [, , 1]
        ],
        'W': [
            [1, , , , 1],
            [1, , , , 1],
            [1, , , , 1],
            [1, , 1, , 1],
            [1, 1, 1, 1, 1]
        ],
        'X': [
            [1, , , , 1],
            [, 1, , 1],
            [, , 1],
            [, 1, , 1],
            [1, , , , 1]
        ],
        'Y': [
            [1, , 1],
            [1, , 1],
            [, 1],
            [, 1],
            [, 1]
        ],
        'Z': [
            [1, 1, 1, 1, 1],
            [, , , 1],
            [, , 1],
            [, 1],
            [1, 1, 1, 1, 1]
        ],
		'1': [
				 [  , ,  1,  , 0 ],
				 [  , 1, 1,  , 0 ],
				 [  ,  , 1,  , 0 ],
				 [  ,  , 1,  , 0 ],
				 [ 1, 1, 1, 1, 1 ]
				 ],
			'2': [
				 [ 1, 1, 1, 1, 0 ],
				 [  ,  ,  ,  , 1 ],
				 [  , 1, 1, 1, 0 ],
				 [ 1,  ,  ,  , 0 ],
				 [ 1, 1, 1, 1, 1 ]
				 ],
			'3': [
				 [ 1, 1, 1, 1, 0 ],
				 [  ,  ,  ,  , 1 ],
				 [  , 1, 1, 1, 1 ],
				 [  ,  ,  ,  , 1 ],
				 [ 1, 1, 1, 1, 0 ]
				 ],
			'4': [
				 [ 1,  ,  , 1, 0 ],
				 [ 1,  ,  , 1, 0 ],
				 [ 1, 1, 1, 1, 1 ],
				 [  ,  ,  , 1, 0 ],
				 [  ,  ,  , 1, 0 ]
				 ],
			'5': [
				 [ 1, 1, 1, 1, 1 ],
				 [ 1,  ,  ,  , 0 ],
				 [ 1, 1, 1, 1, 0 ],
				 [  ,  ,  ,  , 1 ],
				 [ 1, 1, 1, 1, 0 ]
				 ],
			'6': [
				 [  , 1, 1, 1, 0 ],
				 [ 1,  ,  ,  , 0 ],
				 [ 1, 1, 1, 1, 0 ],
				 [ 1,  ,  ,  , 1 ],
				 [  , 1, 1, 1, 0 ]
				 ],
			'7': [
				 [ 1, 1, 1, 1, 1 ],
				 [  ,  ,  ,  , 1 ],
				 [  ,  ,  , 1, 0 ],
				 [  ,  , 1,  , 0 ],
				 [  ,  , 1,  , 0 ]
				 ],
			'8': [
				 [  , 1, 1, 1, 0 ],
				 [ 1,  ,  ,  , 1 ],
				 [  , 1, 1, 1, 0 ],
				 [ 1,  ,  ,  , 1 ],
				 [  , 1, 1, 1, 0 ]
				 ],
			'9': [
				 [  , 1, 1, 1, 0 ],
				 [ 1,  ,  ,  , 1 ],
				 [  , 1, 1, 1, 1 ],
				 [  ,  ,  ,  , 1 ],
				 [  , 1, 1, 1, 0 ]
				 ],
			'0': [
				 [  , 1, 1, 1, 0 ],
				 [ 1,  ,  ,  , 1 ],
				 [ 1,  ,  ,  , 1 ],
				 [ 1,  ,  ,  , 1 ],
				 [  , 1, 1, 1, 0 ]
				 ],
            '+': [
				 [  , , , ,  ],
				 [ ,  , 1,  ,  ],
				 [ , 1, 1, 1,  ],
				 [ ,  , 1,  ,  ],
				 [  , , , ,  ]
				 ],
        ' ': [
            [, ,],
            [, ,],
            [, ,],
            [, ,],
            [, ,]
        ]
    };


  $.util.drawText = function(p, string, size, context) {
        //context.clearRect(0, 0, $.width, $.height);
/*		var s = size+10;
		context.fillStyle = 'black';
		context.font = s.toString() + "px Arial";
		context.fillText(string,p.x,p.y);
*/
        var needed = [];
        string = string.toUpperCase(); // because I only did uppercase letters
        for (var i = 0; i < string.length; i++) {
            var letter = $.util.letters[string.charAt(i)];
            if (letter) { // because there's letters I didn't do
                needed.push(letter);
            }
        }

        context.fillStyle = 'black';
        var currX = p.x;
        for (i = 0; i < needed.length; i++) {
            letter = needed[i];
            var currY = p.y;
            var addX = 0;
            for (var y = 0; y < letter.length; y++) {
                var row = letter[y];
                for (var x = 0; x < row.length; x++) {
                    if (row[x]) {
                        context.fillRect(currX + x * size, currY, size, size);
                    }
                }
                addX = Math.max(addX, row.length * size);
                currY += size;
            }
            currX += size + addX;
        }
		
		
    }
