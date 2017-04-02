
$.pirate = function(g) {
	this.position = {
		x: $.width-100,
		y: 100
	};

	this.g = g;
	this.stopped = false;
	this.imgs = $.images['ship'];
	//this.glitch = true;
	this.s = 2.5;
	this.resize();
		$.util.popChat(this.position.x,this.position.y,['Yar, get off me boat BOB!'])
	
	this.chat = [['Bring me 4 x wood, 2 x string, and 2 x rock and I will make you an Ax'],['Bring me crap and I make shovel'] ];
	this.chatLoc = 0;
}

$.pirate.prototype = new $.sprite();

$.pirate.prototype.preRender = function(){

}

$.pirate.prototype.onClick = function(){
		//this.position.y-=5;
		if(this.stopped){
			$.state.bob.tasks.push(new $.task(this.position.x-20,(this.position.y+this.h),this));
			$.mouse.x = 0;
			$.mouse.y = 0;
		}

}

$.pirate.prototype.behavior = function() {
	if(!this.g.i.onland({x:this.position.x,y:this.position.y+this.h})){
		this.position.x-=.5;
		//this.s -=.1;
	}
	else
	{
		this.stopped = true;
		//this.s = Math.max(-2.5, this.s-.1);
		//this.position.x+=.5;
	}
}

$.pirate.prototype.complete = function(){
	var cost = {wood:4,string:2,rock:2};
	var canBuy = true;
	for(obj in cost){
		if (this.g.bob[obj] < cost[obj]){
			canBuy = false;
			break;
		}
	}
	
	if (canBuy){
		this.chatLoc += 1;
		$.util.popChat(this.position.x,this.position.y,["Here ya go, Chop down those trees."].concat(this.chat[this.chatLoc]));
	}
	else
	{
		var _chat = ['Yar, I told ya Bob...'];
		//_chat.pop();
		$.util.popChat(this.position.x,this.position.y,_chat.concat(this.chat[this.chatLoc]));
	}
	//if(cost.wood>=this.g.bob.wood)

	
	//$.pause = true;
} 
