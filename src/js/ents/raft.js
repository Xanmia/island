
$.raft = function(g) {
	this.g = g;
	//this.a ={x:-8,y:-6};
	//this.follow = 0;
	this.raftStatus="docked";
	this.position = {x:300, y:390};
	
	this.imgs = $.images['raft'];
	this.s = 1.5;
	this.resize();
}

$.raft.prototype = new $.sprite();

$.raft.prototype.onClick = function(){
	$.state.bob.tasks.push(new $.task(this.position.x+(5*this.s),this.position.y-(5*this.s),this));
	$.mouse.x = 0;
	$.mouse.y = 0;
} 

$.raft.prototype.behavior = function(){
	//this.raftStatus='following'
	if(this.raftStatus=="following"){
		this.position.x = this.g.bob.x-(5*this.s);
		this.position.y = this.g.bob.y+(5*this.s);
		
		if(this.g.i.onland({x:this.position.x,y:this.position.y})||this.g.i.onland({x:this.position.x,y:this.position.y+this.h})||this.g.i.onland({x:this.position.x+this.w,y:this.position.y})){
			this.raftStatus="docking";
			//var land = this.g.i.getNeighbors(this.position);
			//this.y -= 10;
			//this.g.bob.y -= 10;
		}
	}
	else if(this.raftStatus=="docking"){
		this.raftStatus="docked";
		
	}
	else if(this.raftStatus=="embarking"){
		var land = this.g.i.getNeighbors(this.position);
		if(!land.up){
			this.g.bob.y -= 1;
		}
		if(!land.down){
			this.g.bob.y += 1;
		}
		 if(!land.left){
			this.g.bob.x -= 1;
		}
		 if(!land.right){
			this.g.bob.x += 1;
		}
		
		this.position.x = this.g.bob.x-(5*this.s);
		this.position.y = this.g.bob.y+(5*this.s);
		if(!this.g.i.onland(this.position)&&!this.g.i.onland({x:this.position.x,y:this.position.y+this.h})&&!this.g.i.onland({x:this.position.x+this.w,y:this.position.y})){
			this.raftStatus="following";
		}			
	}

} 

$.raft.prototype.complete = function(){
	this.raftStatus = "embarking";
	//this.g.bob.x = this.position.x;
	//this.g.bob.y = this.position.y;
	//this.follow = 1;
} 
