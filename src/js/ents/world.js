$.world = function(g){
	this.g = g; //game (play.js)
	this.v = {w: $.width , h: $.height}; //viewport
	this.c = {x: 10, y: this.v.h - 140}; //coordinates of world map
	this.d = {w: 160, h: 120}; //dimensions of world map
	this.t = {w: 32, h: 24}; //world map tile size
	this.n = {r: 5, c: 5}; //world map rows and columns
	this.s = {x: 2, y: 2}; //start position

	this.islandList = [];

	//this.map = $.images['map'];

	//console.log(this.map);


}


$.world.prototype.setCurrentIsland = function(row, column){

	this.p = {row: row, column: column};
}

$.world.prototype.addIsland = function(island){

    this.islandList.push(island);

	//	console.log("ADDED ISLAND TO WORLD MAP");

}

$.world.prototype.update = function(){
	//this.x+=1;

}


$.world.prototype.getIsland = function(row, column){

	var island = null;

	if(this.islandList != null && this.islandList.length > 0){
		for(var m = 0; m < this.islandList.length; m++){
			if(this.islandList[m].row == row && this.islandList[m].column == column){
				island = this.islandList[m];
			}
		}
	}

	return island;

}

$.world.prototype.render = function(){

//$.ftx.drawImage(this.map, 0,450);

	$.ftx.fillStyle = 'rgba(30, 87, 153, .90)';
  $.ftx.fillRect(this.c.x, this.c.y, this.d.w, this.d.h);

	$.ftx.strokeStyle = 'rgba(88, 72, 15, 0.9)';
  $.ftx.strokeRect(this.c.x, this.c.y, this.d.w, this.d.h);

	//$.util.drawText({x:this.c.x,y:this.c.y},this.islandList.length.toString(), 3, $.ftx);
	//console.log(Math.round(this.g.bob.x) + ", " + Math.round(this.g.bob.y));
	//console.log(this.g.pirate.position);
	//console.log(this.d)


	var spy = this.c.y;

	//Because we start in the middle of the world map
	var bobxoffset = 32;
	var bobyoffset = 24;

	//Build the world map grid
	for(var r = 0; r < this.n.r; r++){

		var spx = this.c.x;

		for(var c = 0; c < this.n.c; c++){

			if(r != this.s.x && c != this.s.y){
				$.ftx.strokeStyle = 'rgba(165, 137, 33, 0)';
				$.ftx.strokeRect(spx, spy, this.t.w, this.t.h);
			}

			spx += this.t.w;
		}

		spx += this.t.w;
		spy += this.t.h;
	}

	this.generateIslandMap();

	//Plot Mini Bob
	var bobx = ($.util.roundToWhole(this.g.bob.x / 25) + this.c.x) + (bobxoffset * this.p.column);
	var boby = ($.util.roundToWhole(this.g.bob.y / 25) + this.c.y) + (bobyoffset * this.p.row);

	$.ftx.fillStyle = 'rgba(0, 0, 0, .90)';
	$.ftx.fillRect(bobx, boby, 3, 3);

}

$.world.prototype.generateIslandMap = function(){


	var sty = sty + 3;
	var x = 0;
	var y = 0;

	if(this.islandList != null && this.islandList.length > 0){

			for(var s = 0; s < this.islandList.length; s++){

				if(this.islandList[s].mapPlots != null){

					for(var r = 0; r < this.islandList[s].mapPlots.length; r++){

						var y = ((this.t.h * this.islandList[s].row) + this.c.y) + r;

						var mapPlot = this.islandList[s].mapPlots[r];

						var stx = (this.t.w + this.c.x);

						for(var i = 0; i < mapPlot.length; i++){

								x = (((this.t.w * this.islandList[s].column)) + this.c.x) + i;

								if(mapPlot[i] == 1){
									//Plot land
									stx = (stx) + 1;
									$.ftx.fillStyle = 'rgba(88, 72, 15, 0.9)';
									$.ftx.fillRect(x, y, 1, 1);
								}
						}

						sty++;

					}
				}
			}
	}
}
