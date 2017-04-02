
$.btn = function(g, x,y,i,act,v) {
	this.g = g;
	this.x = x;
	this.y = y;

	this.size = 25;
	this.scale = 2;

   	this.imgs = i; // new Image();

	this.value = v||function(){return 0;};

	this.action = act||function(){};
}

$.btn.prototype.update = function(i) {	
	if ($.util.rectInRect( {x:$.mouse.x,y:$.mouse.y,h:1,w:1},{x:(this.x),y:(this.y),h:this.size*2,w:this.size*2} )){
		this.action();//use action if button is up
		//drag if button is down
	//	$.mouse.x = 0;
	//	$.mouse.y = 0;
	}
}

$.btn.prototype.render = function() {
    $.ftx.save();
	$.ftx.translate(this.x,this.y);
	$.ftx.scale(this.scale, this.scale);
		//if(this.value()==this.g.bob.tool){
		//	$.ftx.fillStyle = 'rgba(190, 70, 0, .81)';
		//	$.ftx.fillRect(-2, -2, this.size+4, this.size+4);
	//	}

	
	$.ftx.fillStyle = 'rgba(200, 200, 200, .91)';
	$.ftx.fillRect(0, 0, this.size, this.size);
		
	if(this.imgs!=undefined){$.ftx.drawImage(this.imgs, (this.size/2)-(this.imgs.width/2), (this.size/2)-(this.imgs.height/2));}
	$.util.drawText({x:1,y:1},this.value().toString(), 1, $.ftx);//////////text draw example
   	$.ftx.restore();

}