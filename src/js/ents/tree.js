
$.tree = function(g) {
	this.g = g;
	this.a ={x:-4,y:-16};
	this.collectTTW = 100;
	//this.i = i;
	while(!this.g.onland(this.position)){
		this.position = {
			x: $.util.randomInRange(0,$.width),
			y: $.util.randomInRange(0,$.height)
		};
	}
	
	this.shadow = new $.sprite();
	this.shadow.imgs = $.images['shadow'];
	this.shadow.s = 2;
	this.shadow.position = {x:this.position.x+(this.a.x*2)-7, y:this.position.y+(this.a.y*2)};
	this.shadow.o = .35;
	this.shadow.resize();
	
	this.imgs = $.images['tree'];
	this.s = 2;
	this.resize();
}

$.tree.prototype = new $.sprite();

$.tree.prototype.behavior = function(){
	if(this.status==1){
		if($.state.bob.tool == $.tools.axe){
			this.collectTTW = 30;
		}
		else {
			this.collectTTW = 100;
		}
	}

}

$.tree.prototype.preRender = function(){
	this.shadow.render();
} 

$.tree.prototype.complete = function(){
	if(this.status==1){
		this.status=0;
		this.collectTTW=0;
		this.position = {x: -100,y: -100};
		$.state.bob.wood+=1;
		$.state.bob.thirst+=20;
		//$.util.popChat($.state.bob.x,$.state.bob.y,['Water!']);
		$.state.notifyList.list.push(new $.notification("wood +2"));

		$.state.bob.inventory.add($.inventoryItems.wood);
		$.state.bob.inventory.add($.inventoryItems.water);
		//$.state.notifyList.list.push(new $.notification("rock +2"));
	}
} 
