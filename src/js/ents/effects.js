
$.fire = function(g,x,y) {
	this.g = g;
	this.x = x;
	this.y = y;
	this.radius = 60;
	this.ttl = this.tts = this.tick = 3;
}

$.fire.prototype.update = function(i) {
    this.tick += 1;
	this.ttl += 1;
    if (this.tick > this.tts) {
    	$.entities.push(new $.particle($.util.randomInRange(this.x,this.x+3),$.util.randomInRange(this.y,this.y+3),12,8,{x:0,y:-.4,w:-.3,h:-.15},'l'));
    	$.entities.push(new $.particle($.util.randomInRange(this.x-10,this.x+10),$.util.randomInRange(this.y-10,this.y+10),60,60,{x:0,y:0,w:0,h:0},'d','rgba(0, 0, 0, 1.0)',$.ftx,20));
		this.tick =0;
	}
	if(this.ttl>3000){this.g.fire.splice(i,1);}
}


//$.entities.push(
	//new $.particle($.util.randomInRange(this.x,this.x+3),$.util.randomInRange(this.y,this.y+3),12,8,{x:0,y:-.4,w:-.3,h:-.15},'l'));
	

//$.entities.push(
	//new $.particle($.util.randomInRange(this.x-10,this.x+10),$.util.randomInRange(this.y-10,this.y+10),60,60,{x:0,y:0,w:0,h:0},'d','rgba(0, 0, 0, 1.0)',$.ftx,20));
