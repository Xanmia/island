$.tools = {hands:'W', fire:'F', axe:'A', shovel:'S'}


$.bob = function(g) {
	this.x = 400;
	this.y = 300;

	this.velocity = 1;

	this.inventory = new $.inventory(35);
	this.crafting = new $.inventory(35,$.width-275,10);

	//this.crafting.position = {x:$.width-275,y:10};
	//this.inventory.add($.inventoryItems.rock);
//	this.inventory.add($.inventoryItems.wood);

	this.tool = $.tools.hands;

	this.w = 8;
	this.h = 16;

	this.tasks = [];

	this.g = g;

	this.to = this;

   // this.workLife = 100;
    this.ttw = 0;

	this.health = 100;
	this.hunger = 100;
	this.thirst = 100;

	this.hungerTick = .005;
	this.thirstTick = .01;

	this.wood = 0;
	this.rock = 0;
	this.string = 0;
	this.food = 0;
	this.water = 0;
	this.rum = 0;
	//var   append = 'data:image/gif;base64,';
   	this.imgs =$.images['bob'];// new Image();
          // g.imgs[n].onload = this.checkLoaded();
		//  this.imgs.src = append + $.data.i.bob;
	this.checkBounds = function(){
		if(this.x<20)
		{
			this.x = $.width-40;
			this.g.i.init('w');
			this.tasks[0].complete(0);
			this.tasks = [];
		}
		else if(this.y<20)
		{
			this.y = $.height-40;
			this.g.i.init('n');
			this.tasks[0].complete(0);
			this.tasks = [];
		}
		else if(this.y>$.height-30)
		{
			this.y = 40;
			this.g.i.init('s');
			this.tasks[0].complete(0);
			this.tasks = [];
		}
		else if(this.x>$.width-30)
		{
			this.x = 40;
			this.g.i.init('e');
			this.tasks[0].complete(0);
			this.tasks = [];
		}
		
	}

}


$.bob.prototype.update = function(i) {
	this.inventory.update();
	this.crafting.update();
	this.checkBounds();
	this.hunger = Math.min(100,Math.max(0,this.hunger-this.hungerTick));
	this.thirst = Math.min(100,Math.max(0,this.thirst-this.thirstTick));
	
	if(this.hunger==0||this.thirst==0){
		this.health = Math.min(100,Math.max(0,this.health-this.hungerTick));
	}

	//this.g.effects.torch(1, this.x+10,this.y+2);
    $.entities.push(new $.particle($.util.randomInRange(this.x+10,this.x+10+1),$.util.randomInRange(this.y,this.y+1),4,3.5,{x:0,y:-1,w:-.3,h:-.3},'l'));
    $.entities.push(new $.particle($.util.randomInRange(this.x+10-10,this.x+10+10),$.util.randomInRange(this.y-10,this.y+10),20,20,{x:0,y:0,w:0,h:0},'d','rgba(0, 0, 0, 1.0)',$.ftx,-20));



	if (this.tasks.length){
		this.to = this.tasks[0];
		var dx = this.x - this.to.x,
			dy = this.y - this.to.y;
		var currentDir = Math.atan2( dx, dy );
		dx = Math.sin( (Math.PI) + currentDir) * (this.velocity);
		dy = Math.cos( (Math.PI) + currentDir) * (this.velocity);
		/*if(this.g.i.onland({x:this.x + dx,y:this.y + dy})&&this.g.i.onland({x:this.x + dx,y:(this.y + dy + this.imgs.height)}))
		{
			this.x += dx;//Math.sin( (Math.PI) + currentDir) * (this.velocity*$.dt);
			this.y += dy;//Math.cos( (Math.PI) + currentDir) * (this.velocity*$.dt);
		}
		else if(this.g.raft.raftStatus=="following"){
			this.x += dx;//Math.sin( (Math.PI) + currentDir) * (this.velocity*$.dt);
			this.y += dy;//Math.cos( (Math.PI) + currentDir) * (this.velocity*$.dt);

		}
		else
		{
			this.tasks.splice(0,1);
		}
		*/
		this.x += dx;//Math.sin( (Math.PI) + currentDir) * (this.velocity*$.dt);
		this.y += dy;//Math.cos( (Math.PI) + currentDir) * (this.velocity*$.dt);

		if ($.util.rectInRect({x:this.x,y:this.y,w:this.imgs.width,h:this.imgs.height},this.to)){
				this.ttw+=1;
				if(this.ttw > this.tasks[0].obj.collectTTW){//object might take time to knockdown or pick up before we can complete()
					this.tasks[0].complete(0);
					this.ttw=0;
				}

		}

	}


}

$.bob.prototype.renderStatus = function(){
	//draw background for status'
	$.ftx.fillStyle = 'rgba(255, 255, 255, .61)';
	$.ftx.fillRect($.width-190, 5, 180, 65);
	//draw health meter
	$.util.drawText({x:$.width-180,y:13},'health', 2, $.ftx);
	$.ftx.fillStyle = 'rgba(255, 0, 0, .61)';
	$.ftx.fillRect($.width-120, 10, this.health, 15);
	//draw hunger meter
	$.util.drawText({x:$.width-180,y:33},'hunger', 2, $.ftx);
	$.ftx.fillStyle = 'rgba(0, 100, 0, .61)';
	$.ftx.fillRect($.width-120, 30, this.hunger, 15);
	//draw thirst meter
	$.util.drawText({x:$.width-180,y:53},'thirst', 2, $.ftx);
	$.ftx.fillStyle = 'rgba(0, 0, 255, .61)';
	$.ftx.fillRect($.width-120, 50, this.thirst, 15);

}

$.bob.prototype.render = function() {

//	$.mouse.x = e.pageX-$.canvas2.offsetLeft;
//	$.mouse.y = e.pageY-$.canvas2.offsetTop;
    $.ctx.save();
	$.ctx.translate(this.x,this.y);
	$.ctx.scale(1, 1);
	$.ctx.shadowBlur    = 10;
	$.ctx.shadowOffsetX = -2;
	$.ctx.shadowOffsetY = -2;
	$.ctx.shadowColor   = 'rgba(0, 0, 0, .7)';
	$.ctx.drawImage(this.imgs, 0,0);
 //static atmosphere look for all planets
	 // $.ctx.drawImage(this.imgs, this.position.x+.5, this.position.y-.5);
   	$.ctx.restore();
	this.renderStatus();
	//this.inventory.render();
//	this.crafting.render();
	//$.Draw.rect($.width-120, 10, 100, 15, 'rgba(255, 0, 0, .61)');
}
