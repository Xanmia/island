
$.rum = function(g) {
	this.g = g;
	this.a ={x:-4,y:-8};
	this.collectTTW = 50;
	while(!this.g.onland(this.position)){
		this.position = {
			x: $.util.randomInRange(0,$.width),
			y: $.util.randomInRange(0,$.height)
		};
	}
	this.imgs = $.images['rum'];
	this.resize();
}

$.rum.prototype = new $.sprite();

$.rum.prototype.complete = function(){
	if(this.status==1){
		this.status=0;
		this.collectTTW=0;
		this.position = {x: -100,y: -100};
		$.state.bob.rum+=1;
	}
} 