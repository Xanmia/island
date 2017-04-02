$.notifications = function() {
	//$.width-125,$.height-19
	this.position = {
		x: $.width-125,
		y: $.height-19
	};

	
	//this.g = g;
	
	
	//this.w = 30;
	this.h = 19;//equals task.size * scale
	
	this.list = [];
	
	this.update = function(t) {
	//	this.list = t;
		var i = this.list.length;
		while (i--){
			this.list[i].position.x = this.position.x;
			this.list[i].position.y = this.position.y -(this.h*((this.list.length-1)-i));
			this.list[i].update(i);
		}
	}

	this.render = function() {
		var i = this.list.length;
		while (i--){
			this.list[i].render();
		}

	}
}


$.notification = function(txt) {//dropped p,img,act
	this.w = 60;
	this.h = 7;
	//this.obj = txt; //obj || {collectTTW:0,imgs:undefined,complete:function complete(){}};
	this.ttl = 600;
    this.tick = 0;
	
	this.position = {
		x: 0,
		y: 0
	};

	
	this.p = $.state.notifyList.list; //$.state.bob.tasks;//p;
	
	this.size = 30;
	
	this.complete = function(i){
	//	this.obj.complete();
		//this.p.splice(i,1);//remove from task list
	}
	
	this.update = function(i) {	
        this.tick++;
	//onclick in the task box, it should cancel the task
		if (this.tick>this.ttl){
			this.p.splice(i,1);

		//	$.mouse.x = 0;
		//	$.mouse.y = 0;
		}
	}

	this.render = function() {
	
	    $.ftx.save();
		$.ftx.translate(this.position.x, this.position.y);
		$.ftx.scale(2, 2);
        $.ftx.globalAlpha =  (this.ttl-this.tick)/this.ttl;
		$.ftx.fillStyle = 'rgba(200, 200, 200, .91)';
		$.ftx.fillRect(0, 0, this.w, this.h);
		//if(this.obj.imgs!=undefined){$.ftx.drawImage(this.obj.imgs, (this.size/2)-(this.obj.imgs.width/2), (this.size/2)-(this.obj.imgs.height/2));}
		$.util.drawText({x:1,y:1},txt, 1, $.ftx);//////////text draw example
	   	$.ftx.restore();

	}
}



