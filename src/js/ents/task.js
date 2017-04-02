
$.task = function(x,y,obj) {//dropped p,img,act
	this.x = x;
	this.y = y;
	this.w = 1;
	this.h = 1;
	this.obj = obj || {collectTTW:0,imgs:undefined,complete:function complete(){}};
	
	
	this.position = {
		x: -100,
		y: 0
	};

	
	this.p = $.state.bob.tasks;//p;
	
	this.size = 30;
	
	this.complete = function(i){
		this.obj.complete();
		this.p.splice(i,1);//remove from task list
	}
	
	this.update = function(i) {	
	//onclick in the task box, it should cancel the task
		if ($.util.rectInRect( {x:$.mouse.x,y:$.mouse.y,h:1,w:1},{x:(this.position.x),y:(this.position.y),h:this.size*2,w:this.size*2} )){
			this.p.splice(i,1);

			$.mouse.x = 0;
			$.mouse.y = 0;
		}
	}

	this.render = function() {
	
	    $.ftx.save();
		$.ftx.translate(this.position.x, this.position.y);
		$.ftx.scale(2, 2);
		$.ftx.fillStyle = 'rgba(200, 200, 200, .91)';
		$.ftx.fillRect(0, 0, this.size, this.size);
		if(this.obj.imgs!=undefined){$.ftx.drawImage(this.obj.imgs, (this.size/2)-(this.obj.imgs.width/2), (this.size/2)-(this.obj.imgs.height/2));}
		$.util.drawText({x:1,y:1},'x', 1, $.ftx);//////////text draw example
	   	$.ftx.restore();

	}
}




