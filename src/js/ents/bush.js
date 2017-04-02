
$.bush = function(g) {
	this.g = g;
	this.a ={x:-4,y:-8};
	this.collectTTW = 100;
	while(!this.g.onland(this.position)){
		this.position = {
			x: $.util.randomInRange(0,$.width),
			y: $.util.randomInRange(0,$.height)
		};
	}
	this.imgs = $.images['bush'];
	this.s = 1.5;
	this.resize();
}

$.bush.prototype = new $.sprite();

$.bush.prototype.behavior = function(){
	if(this.status==1){
		if($.state.bob.tool == $.tools.shovel){
			this.collectTTW = 30;
		}
		else {
			this.collectTTW = 100;
		}
	}
}

$.bush.prototype.complete = function(){
	if(this.status==1){
		this.status=0;
		this.collectTTW=0;
		this.position = {x: -100,y: -100};
		$.state.bob.string+=1;
		//$.state.bob.food+=1;
		$.state.bob.hunger+=20;
	//	$.util.popChat($.state.bob.x,$.state.bob.y,['Food!']);
		$.state.notifyList.list.push(new $.notification("twine +2"));
		$.state.notifyList.list.push(new $.notification("bugs +2"));
		$.state.bob.inventory.add($.inventoryItems.twine);
		$.state.bob.inventory.add($.inventoryItems.bug);
	}
} 