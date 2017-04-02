$.title = function(){
	this.position = {
		x: 5,
		y: 100
	};
	//console.log("NEW ISLAND OBJECT - TITLE - NOT THE PLAY ISLAND");

	this.i = new $.island(this);
	this.i.clear();

	this.imgs = $.images['title'];
	this.s = 22;
	this.resize();
}

$.title.prototype = new $.sprite(true);

$.title.prototype.onClick = function(){
	$.state = new $.play();
	$.mouse.x = 0;
	$.mouse.y = 0;
}
//this.onClick = function(){$.state.bob.tasks.push(new $.task($.mouse.x,$.mouse.y,this));$.mouse.x = 0;$.mouse.y = 0;}
	//default state of onclick
//this.behavior = function(){};
//$.title.prototype.preRender = function(){
	//$.ctx.fillStyle = '#4ac2fc';
	//$.ctx.fillRect(0, 0, $.width, $.height);
	//};
