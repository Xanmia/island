
$.rock = function(g) {
	this.g = g;
	this.a ={x:-4,y:-4};
	this.collectTTW = 50;
	while(!this.g.onland(this.position)){
		this.position = {
			x: $.util.randomInRange(0,$.width),
			y: $.util.randomInRange(0,$.height)
		};
	}
	this.imgs = $.images['rock'];
	this.resize();
}

$.rock.prototype = new $.sprite();

$.rock.prototype.behavior = function(){
	if(this.status==1){
		if($.state.bob.tool == $.tools.shovel){
			this.collectTTW = 30;
		}
		else {
			this.collectTTW = 100;
		}
	}
}

$.rock.prototype.complete = function(){
	if(this.status==1){
		this.status=0;
		this.collectTTW=0;
		this.position = {x: -100,y: -100};
		$.state.bob.rock+=1;
		//$.state.bob.food+=1;
		$.state.bob.hunger+=20;
		$.state.notifyList.list.push(new $.notification("bugs +2"));
		$.state.notifyList.list.push(new $.notification("rock +2"));
		$.state.bob.inventory.add($.inventoryItems.rock);
		$.state.bob.inventory.add($.inventoryItems.bug);
		//$.util.popChat($.state.bob.x,$.state.bob.y,['Bugs, yuck...']);
	}
} 