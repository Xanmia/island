$.play = function(g){

//	this.zoom = 0;

//console.log("NEW ISLAND OBJECT");

this.dayRotate = 1;
this.cycle = 0.1;
this.cycleOn = 1500;
this.ttl = 0;

// I moved the below before the island object is created so the creation of the island
// will get saved in the worldMap. I hope this doesnt mess you up! If it does
// we can change it back - Paul

//this.worldMap = new $.world(this);
this.pirate = new $.pirate(this);
//this.effects = new $.effects();
this.raft = new $.raft(this);
this.bob = new $.bob(this);
this.fire = []; //new $.fire(20,200);

this.i = new $.island(this);



$.entities.push(new $.animal(this));
$.entities.push(new $.animal(this));
$.entities.push(new $.animal(this));
$.entities.push(new $.animal(this));
$.entities.push(new $.animal(this));
$.entities.push(new $.animal(this));
$.entities.push(new $.animal(this));
$.entities.push(new $.animal(this));
$.entities.push(new $.animal(this));
$.entities.push(new $.animal(this));
$.entities.push(new $.animal(this));
$.entities.push(new $.animal(this));

//$.entities.push(new $.cloud(Math.random() * $.width, Math.random() * $.height - 100));
//$.entities.push(new $.cloud(Math.random() * $.width, Math.random() * $.height - 100));
//$.entities.push(new $.cloud(Math.random() * $.width, Math.random() * $.height - 100));


//$.entities.push(world);

//this.effects.fire(400, 210,210);

//this.raft = new $.sprite($.data.i.raft,1.5);
//this.raft.position = {x:300, y:420};


this.tasklist = new $.tasks(this);


this.notifyList = new $.notifications();



//this.inventory = [];
this.toolbar = [];
/*
this.inventory.push(new $.btn(this, $.width-80,$.height-80,$.images['raft'], undefined, function(){return "";}));

var raftbtn = new $.btn(this, $.width-95 ,$.height-80, $.images['log'], undefined, function(){return "10"});
var stringbtn = new $.btn(this, $.width-65 ,$.height-80, $.images['string'], undefined, function(){return "10"});
raftbtn.scale = stringbtn.scale = 1;
raftbtn.size = stringbtn.size = 20;

this.inventory.push(raftbtn);
this.inventory.push(stringbtn);
*/
//this.inventory.push(new $.btn(this, 200,$.height-80,$.images['log'], undefined, function(){return this.g.bob.wood;}));
//this.inventory.push(new $.btn(this, 270,$.height-80,$.images['rock'], undefined, function(){return this.g.bob.rock;}));
//this.inventory.push(new $.btn(this, 340,$.height-80,$.images['string'], undefined, function(){return this.g.bob.string;}));

//this.inventory.push(new $.btn(this, 410,$.height-80,$.images['water'],function(){this.g.bob.thirst+=20; this.g.bob.water = Math.max(0,this.g.bob.water-1)},function(){return this.g.bob.water;}));
//this.inventory.push(new $.btn(this, 480,$.height-80,$.images['food'], function(){this.g.bob.hunger+=20; this.g.bob.food = Math.max(0,this.g.bob.food-1)},function(){return this.g.bob.food;}));

//this.inventory.push(new $.btn(this, 550,$.height-80,$.images['rum'], function(){this.g.bob.thirst=100;this.g.bob.hunger=100;this.g.bob.health=100;this.g.bob.rum = Math.max(0,this.g.bob.rum-1);},function(){return this.g.bob.rum;}));

this.toolbar.push(new $.btn(this, 150,$.height-55,null, function(){this.g.bob.tool=$.tools.hands;}, function(){return "1";}));
this.toolbar.push(new $.btn(this, 205,$.height-55,null, function(){this.g.bob.tool=$.tools.fire;}, function(){return "2"}));
this.toolbar.push(new $.btn(this, 260,$.height-55,null, function(){this.g.bob.tool=$.tools.shovel;}, function(){return "3"}));
this.toolbar.push(new $.btn(this, 315,$.height-55,null, function(){this.g.bob.tool=$.tools.axe;}, function(){return "4"}));
this.toolbar.push(new $.btn(this, 370,$.height-55,null, function(){this.g.bob.tool=$.tools.hands;}, function(){return "5";}));
this.toolbar.push(new $.btn(this, 425,$.height-55,null, function(){this.g.bob.tool=$.tools.fire;}, function(){return "6"}));
this.toolbar.push(new $.btn(this, 480,$.height-55,null, function(){this.g.bob.tool=$.tools.shovel;}, function(){return "7"}));
this.toolbar.push(new $.btn(this, 535,$.height-55,null, function(){this.g.bob.tool=$.tools.axe;}, function(){return "8"}));
this.toolbar.push(new $.btn(this, 590,$.height-55,null, function(){this.g.bob.tool=$.tools.axe;}, function(){return "9"}));
}


$.play.prototype.update = function(){
	//this.w.update();
	//this.bg.update();
	//$.entities.push(new $.particle(this, $.util.randomInRange(210,218),$.util.randomInRange(210,218)));

 //   $.entities.push(new $.particle($.util.randomInRange(200,200+3),$.util.randomInRange(200,200+3),12,8,{x:0,y:-.4,w:-.3,h:-.15},'l'));
  //  $.entities.push(new $.particle($.util.randomInRange(200-10,200+10),$.util.randomInRange(200-10,200+10),60,60,{x:0,y:0,w:0,h:0},'d','rgba(0, 0, 0, 1.0)',$.ftx,20));

//	this.worldMap.update();
	this.pirate.update();
	this.notifyList.update();
   // this.fire.update();
	this.bob.update();


	for (var i = 0; i < this.fire.length; i++) {
			this.fire[i].update(i);
	}
	for (var i = 0; i < this.toolbar.length; i++) {
			this.toolbar[i].update();
	}
	for (var i = 0; i < $.entities.length; i++) {
		$.entities[i].update(i);
	}
	//this.inventory.update();
	this.raft.update();
	 this.tasklist.update(this.bob.tasks);



 	if (this.ttl > this.cycleOn){
 		this.cycle += .0005 * this.dayRotate;
 		if (this.cycle>=.91 || this.cycle <= 0){
 			this.ttl = 0;
			this.dayRotate *= -1;
 		}
 	}
	else{
		this.ttl += 1;
	}

/*	if($.mouse.s){
		if ($.mouse.s<0){
			this.zoom -=.1;
			this.zoom = Math.max(0,this.zoom);
			this.camera = {x:this.bob.x,y:this.bob.y};
		}
		else{
			this.zoom +=.1;
			this.zoom = Math.min(9,this.zoom);
			this.camera = {x:this.bob.x,y:this.bob.y};
		}




		$.mouse.s = 0;
	}
*/
	if($.mouse.x){


		//this.bob.tasks.push({x:$.mouse.x,y:$.mouse.y,h:1,w:1,obj:-1});
		if(this.i.onland($.mouse)&&this.bob.tool == $.tools.fire){
			var mx = $.mouse.x;
			var my = $.mouse.y;
			var tGame = this;
			//{collectTTW:0,imgs:undefined,complete:function(){$.state.effects.fire(500,mx,my);}};
			//this.effects.fire(1000, 200,200).num = 100;
			//this.fire.update();
			this.bob.tasks.push(new $.task($.mouse.x,$.mouse.y,{collectTTW:0,imgs:undefined,complete:function(){$.state.bob.wood-=2;$.state.fire.push(new $.fire(tGame,mx,my));}}));

			$.mouse.x = 0;
			$.mouse.y = 0;
		}
		else
		{
			
			if (this.i.onland($.mouse)||this.raft.raftStatus=="following"){
				   // .bob.tasks.push(new $.task($.mouse.x,$.mouse.y,this));
				  
				this.bob.tasks.push(new $.task($.mouse.x,$.mouse.y,{collectTTW:0,imgs:this.bob.imgs,complete:function(){}}));
				$.mouse.x = 0;
				$.mouse.y = 0;
			}

		}



//		$.keys.w = 0;


		//this.bob.to = {x:$.mouse.x,y:$.mouse.y,h:1,w:1};
		//this.bob.update();
		//this.currentloc = {x:$.mouse.x,y:$.mouse.y};


	}

	/*
	if($.keys.space){
		this.grandpa.prepJump();
	}
	else if (this.grandpa.jumpPower>0){
		this.grandpa.doJump();
	}
	*/
}

$.play.prototype.render = function(){
	this.pirate.render();
	this.raft.render();

	$.ftx.save();
	//this.w.render();
    $.ftx.clearRect(0, 0, $.width, $.height);
	//$.util.drawText({x:0,y:0},'Sample TEXT, yay', 2, $.ftx);//////////text draw example

	$.ftx.fillStyle = 'rgba(0, 0, 50, ' + this.cycle + ')';
	$.ftx.fillRect(0, 0, $.width, $.height);

    /*$.ctx.fillStyle = 'rgba(0, 0, 0, .55)';
	$.ctx.globalCompositeOperation = 'destination-out';
    $.ctx.strokeStyle = $.ctx.fillStyle;
    $.Draw.rect(0, 0, 100, 100, 'rgba(0, 0, 70, .61)');
	$.ctx.fill();

	*/
	$.ftx.restore();
	this.bob.render();
	this.tasklist.render();
	this.notifyList.render();
//		this.worldMap.render();
	for (var i = 0; i < this.toolbar.length; i++) {
			this.toolbar[i].render();
	}


//	this.bg.render();
}
