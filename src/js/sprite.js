
$.sprite = function() {//i,s,o
	//this.g = g;
	//this.glitch = g||false;
	this.canvas = $.ctx;
	this.position = {
		x: -100,
		y: -100
	};

	this.o=1;

	this.status = 1;

	this.s = 1; //s;//scale
	this.a = {//anchor
		x: 0,
		y: 0
	};

	this.collectTTW = 0;

	//var   append = 'data:image/png;base64,';
  // 	this.imgs = $.images['title'];;//i;//new Image();
    ///this.imgs.src = append + i;

	this.w = 0;//this.imgs.width*this.s;
	this.h = 0;//this.imgs.height*this.s;

	this.onClick = function(){$.state.bob.tasks.push(new $.task($.mouse.x,$.mouse.y,this));$.mouse.x = 0;$.mouse.y = 0;}
		//default state of onclick
	this.behavior = function(){};
	this.preRender = function(){};
	this.complete = function(){};
	//this.complete = function(){	if(this.status==1){this.status=0;this.collectTTW=0;this.position = {x: -100,y: -100};}}//default state of complete
}

$.sprite.prototype.resize = function(){
	this.w = this.imgs.width*this.s;
	this.h = this.imgs.height*this.s;
	this.canvas = $.ctx;
}


$.sprite.prototype.update = function(i) {
	this.behavior(i);

	//on click
	//if ($.util.rectInRect( {x:$.mouse.x,y:$.mouse.y,h:1,w:1},{x:this.position.x+(this.a.x*this.s),y:this.position.y+(this.a.y*this.s),h:this.h,w:this.w} )){
	if ($.util.rectInRect( {x:$.mouse.x,y:$.mouse.y,h:1,w:1},{x:this.position.x+(this.a.x*this.s),y:this.position.y+(this.a.y*this.s),h:this.h,w:this.w} )){

		this.onClick(i);
	}
}

$.sprite.prototype.render = function() {
	if(this.status){
		this.preRender();
	    this.canvas.save();
		this.canvas.translate(this.position.x,this.position.y);
		this.canvas.scale(this.s, this.s);

		this.canvas.globalAlpha   = this.o;
		this.canvas.drawImage(this.imgs, this.a.x, this.a.y);
		
		/*if(this.glitch){
					$.ctx.drawImage(this.imgs, this.a.x, this.a.y);
			for (var i = 0; i < $.util.randomInRange(1, 5); i++) {
				var x = Math.random() * this.w;
				var y = Math.random() * this.h;
				var spliceWidth = x;
				var spliceHeight = $.util.randomInRange(5, this.h / 3);
				$.ctx.drawImage(this.imgs, 0, y, spliceWidth, spliceHeight, x, y, spliceWidth, spliceHeight);
				$.ctx.drawImage(this.imgs, spliceWidth, y, x, spliceHeight, 0, y, x, spliceHeight);
			}
		}
*/
		//$.ctx.drawImage(this.imgs, (this.position.x/this.s)-this.a.x, (this.position.y/this.s)-this.a.y);
		//$.ctx.drawImage(this.imgs, this.a.x, this.a.y);
	   	this.canvas.restore();

	}
}
