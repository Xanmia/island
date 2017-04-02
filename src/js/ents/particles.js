$.particle = function(x,y,w,h,v,n,color,canvas,l) {

    this.w = w||12;
    this.h = h||12;
	this.canvas = canvas||$.ctx;
	this.c = v||{x:0,y:-.7,w:-.3,h:-.3};
	
	this.x = x;
	this.y = y;
	
	this.color = color||'rgba(255, 255, 0, 1.0)';
	
	this.n = n||false;
	
    this.lifespan = $.util.randomInRange(30+(l||0),40+(l||0));
    this.ttl = this.lifespan;
};


$.particle.prototype.update = function(i) {
	this.x += this.c.x;
	this.y += this.c.y;//-.4
	
	this.w += this.c.w;
	this.h += this.c.h;//.2;
	if (this.w<0)
	{
		this.w=0;
	}
	if (this.h<0){
		this.h=0
	}
	
  this.ttl -= 1;
  if (this.ttl < 0) {
     $.entities.splice(i,1);
  }

};


$.particle.prototype.render = function() {
 
	this.canvas.save();


	if(this.n=='d'){
  		this.canvas.globalCompositeOperation = 'destination-out';
  	}
  	else if(this.n=='l'){
	  	this.canvas.globalCompositeOperation='lighter';
  	}
  /*	else
  	{
	  	this.canvas.globalAlpha = (this.ttl / this.lifespan);
	  	this.canvas.globalCompositeOperation='none';
  	}
	*/
  //
	var grad = this.canvas.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.h);
	grad.addColorStop(0, this.color);
	grad.addColorStop(1, 'rgba(252, 0, 0, .2)');
	this.canvas.fillStyle = grad;
	this.canvas.beginPath();
	this.canvas.arc(this.x, this.y, this.h, 0, Math.PI * 2, true);
	this.canvas.fill();
	this.canvas.closePath();

 // this.canvas.fillStyle = this.color;
 // this.canvas.fillRect(this.x, this.y, this.w, this.h);
//	this.canvas.globalAlpha = 1;
	this.canvas.restore();

};