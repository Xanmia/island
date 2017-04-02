
$.animal = function(g) {
	
	this.position = {
		x: 200,
		y: 200
	};
	
	this.status = 1;
	this.s =$.util.randomInRange(.7,2.5);
	this.velocity = $.util.randomInRange(.05,.2);;
	this.g = g;
	
//	this.s = s;//scale
//	this.a = a;//anchor
	
	while(g.i.onland(this.position)){
		this.position = {
			x: $.util.randomInRange(0,$.width),
			y: $.util.randomInRange(0,$.height)
		};
	}
	
	this.to = {x:200,y:200};
	
	while(g.i.onland(this.to)){
		this.to = {
			x: $.util.randomInRange(this.position.x-50,this.position.x+50),
			y: $.util.randomInRange(this.position.y-50,this.position.y+50)
		};
	}

	var   append = 'data:image/png;base64,';
   	this.imgs = new Image();
    this.imgs.src = append + $.data.i.fish;
	//this.shadow = new Image();
	//if(si){
	  
	//    this.shadow.src = append + si;
//	}

	
	this.w = 10;//this.imgs.width*s;
	this.h = 10;//this.imgs.height*s;

	
}

$.animal.prototype.update = function() {

		var dx = this.position.x - this.to.x,
			dy = this.position.y - this.to.y;
		var currentDir = Math.atan2( dx, dy );

		this.position.x += Math.sin( (Math.PI) + currentDir) * (this.velocity);
		this.position.y += Math.cos( (Math.PI) + currentDir) * (this.velocity);
		
		
		
		if ($.util.rectInRect({x:this.to.x, y:this.to.y, w:5,h:5}, {x:this.position.x, y:this.position.y, w:5,h:5})){
				this.to = {x:200,y:200};
				while(this.g.i.onland(this.to)){
					this.to = {
						x: $.util.randomInRange(this.position.x-50,this.position.x+50),
						y: $.util.randomInRange(this.position.y-50,this.position.y+50)
					};
				}
		}

	
}

$.animal.prototype.render = function() {
	
	if(this.status){
	    $.ctx.save();

		$.ctx.globalAlpha   = this.velocity+.1;
	var dx = this.position.x - this.to.x,
		dy = this.position.y - this.to.y;
	var currentDir = Math.atan2( dy, dx );
	$.ctx.translate(this.position.x,this.position.y);
	$.ctx.scale(this.s, this.s);
	$.ctx.rotate((currentDir));
       // $.ctx.shadowColor = "#000000";
       // $.ctx.shadowBlur = 2;
       // $.ctx.shadowOffsetX = 0;
       // $.ctx.shadowOffsetY = 0;
       // $.ctx.drawImage(image, 20, 20);
		//$.ctx.shadowBlur    = 20;
		//$.ctx.shadowColor   = 'rgba(65, 157, 217, 0.9)'; //static atmosphere look for all planets
		//$.Draw.rect(this.position.x, this.position.y, 20,20, 'rgba(0, 0, 70, .99)');
		$.ctx.drawImage(this.imgs, -4, -4);

		$.ctx.restore();

	}
	//$.Draw.rect(this.position.x, this.position.y, 1, 1, 'rgba(0, 0, 70, .99)');

}
