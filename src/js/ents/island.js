
$.island = function (g) {

	this.defaultMap = [];//this.generate();
	this.g = g;
	this.r = [0, -2, 2, 2, -4, 6, 8, -6, 4, 12, -6, 6, 18, -4, 4, 22, -2, 3]; ///land shading pattern
	this.z = ['#f4edc4', '#73defc', '#5fcafc', '#aba234', '#4ac2fc', '#aba234', '#36bdfc', '#dfd995']; ///land + water colors

	//Start tile
	//console.log("ISLAND OBJECT");

	this.s = { row: 2, column: 2 };

	this.init();
	//this.clear();
	//this.load(this.defaultMap);
	/* ////waves attempt///////////////////
	var map = $.btx.getImageData(0,0,$.width,$.height);
	var imdata = map.data;

	// convert image to grayscale
	var r,g,b,avg;
	for(var p = 0, len = imdata.length; p < len; p+=4) {
	r = imdata[p]
	g = imdata[p+1];
	b = imdata[p+2];
	o = imdata[p+3];
	// alpha channel (p+3) is ignored

	// avg = Math.floor((r+g+b)/3);
	if(r!=244){
	imdata[p+3] = 0;
}

//imdata[p] = imdata[p+1] = imdata[p+2] = avg;
}
var   append = 'data:image/gif;base64,';
var imgs = new Image();
imgs.src = append + map.data;
// 	$.btx.clearRect(0, 0, $.width, $.height);
//$.wtx.save();
//$.wtx.scale(4, 4);
$.wtx.drawImage(imgs,0,0);
// $.wtx.restore();
*/

}

$.island.prototype.generateFoliage = function () {


	//var wood = function(i) {$.state.bob.tasks.push(new $.task($.state.bob.tasks,$.mouse.x,$.mouse.y,i,this.imgs,function(){$.state.bob.wood+=1;$.state.bob.water+=1;})); $.mouse.x = 0;$.mouse.y = 0;}
	//	var rock = function(i) {$.state.bob.tasks.push(new $.task($.state.bob.tasks,$.mouse.x,$.mouse.y,i,this.imgs,function(){$.state.bob.rock+=1;$.state.bob.food+=1;})); $.mouse.x = 0;$.mouse.y = 0;}
	//	var rum = function(i) {$.state.bob.tasks.push(new $.task($.state.bob.tasks,$.mouse.x,$.mouse.y,i,this.imgs,function(){$.state.bob.rum+=1;})); $.mouse.x = 0;$.mouse.y = 0;}
	if (this.defaultMap.length > 0) {
		var i = 100;
		while (i--) {
			$.entities.push(new $.rock(this));
			//$.entities.push(new $.iObject(this,$.data.i.rock,1,{x:4,y:4}, undefined, 0,0,rock));
		}
		$.entities.push(new $.rum(this));
		//$.entities.push(new $.iObject(this,$.data.i.rum,1,{x:4,y:8},undefined, 0,0,rum));

		i = 100;
		while (i--) {
			$.entities.push(new $.bush(this));
			//$.entities.push(new $.iObject(this,$.data.i.bush,1.5,{x:4,y:8}));
		}
		//$.entities.push(new $.animal(this));

		i = 300;
		while (i--) {
			//$.entities.push(new $.iObject(this,$.data.i.tree,2,{x:4,y:16}, $.data.i.shadow,0,0,wood));
			$.entities.push(new $.tree(this));
		}

	}




}

$.island.prototype.init = function (d) {
	//d - Direction bob went to generate new island
	//console.log("ISLAND INIT");
	//console.log("BOB DIRECTION - " + d);


	if (d != undefined) {
		//Not the game start
		switch (d) {
			case 'n':
				this.s.row = this.s.row - 1;
				break;
			case 's':
				this.s.row = this.s.row + 1;
				break;
			case 'e':
				this.s.column = this.s.column + 1;
				break;
			case 'w':
				this.s.column = this.s.column - 1;
				break;
			default:
				console.log('HUH');
				break;
		}
	}

	//$.btx.clearRect(0, 0, $.width, $.height);
	///
	////create static waves
	//this.z = ['#f4edc4', '#73defc', '#5fcafc', '#aba234', '#4ac2fc', '#aba234', '#36bdfc', '#dfd995']; ///land + water colors
	//this.r = [0, -2, 2, 2, -4, 6, 8, -6, 4, 12, -6, 6, 18, -4, 4, 22, -2, 3]; ///land shading pattern

	this.clear();
	//$.entities.splice(0,$.entities.length);
	//if(this.defaultMap.length == 0){



	if (this.g.worldMap != undefined) {

		var islandMap = this.g.worldMap.getIsland(this.s.row, this.s.column);

		if (islandMap != null) {
			this.defaultMap = islandMap.mapPlots;
		} else {
			if (d == undefined) { //d being undefined means initial load, always gen an island there
				this.defaultMap = this.generate();
			}
			else {//50% chance to generate an island
				this.defaultMap = $.util.randomInRange(0, 100) > 50 ? [] : this.generate();
			}

			//this.defaultMap = d==undefined?this.generate():[];
			this.g.worldMap.addIsland({ mapPlots: this.defaultMap, row: this.s.row, column: this.s.column });
		}

		this.g.worldMap.setCurrentIsland(this.s.row, this.s.column);

	} else {
		this.defaultMap = this.generate();
	}



	this.load(this.defaultMap);
	this.generateFoliage();

	//}
	//else
	//{
	//this.defaultMap = [];
	//}


}

$.island.prototype.generate = function () {
	var width = 32;
	var height = 24;
	var freq = .08;  //.05
	var simplex = new SimplexNoise();
	var map = [];
	for (var y = 0; y < height; y += 1) {
		map[y]= [];
		for (var x = 0; x < width; x += 1) {
			var r = simplex.noise2D(x * freq, y * freq);
			if (r >= 0) {
				map[y].push(1);
			}
			else{
				map[y].push(0);
			}

		}
	}
	return map;

}
/*
$.island.prototype.generate = function(){

//	console.log("GENERATE ISLAND");

	//Create map object array
	var map = [];

	//Set map shape {st: StartIndex, sp: StopIndex} land is between
	var mapPlots = [
		{st:0, sp:0},
		{st:0, sp:0},
		{st:0, sp:0},
		{st:14, sp:23},
		{st:7, sp:24},
		{st:6, sp:26},
		{st:5, sp:25},
		{st:5, sp:25},
		{st:5, sp:24},
		{st:6, sp:24},
		{st:7, sp:22},
		{st:7, sp:20},
		{st:8, sp:20},
		{st:10, sp:18},
		{st:10, sp:17},
		{st:11, sp:17}
	]

	//Iterate over the map plots
	for(var r = 0; r < mapPlots.length; r++){

		//Create new map row
		var row = [];
		var mapPlot = mapPlots[r];
		//console.log("mapPlot", mapPlot);

		//Check if the row is supposed to only be water
		var onlyWater = (mapPlot.st == 0 && mapPlot.sp == 0);

		//Only randomize if we dont want the row to be water
		if(onlyWater == false){
			mapPlot.st = $.util.randomInRange(mapPlot.st - 3,mapPlot.st + 3);//Math.floor(Math.random() * ((mapPlot.st - 3) - (mapPlot.st + 3))) + (mapPlot.st + 3);
			mapPlot.sp = $.util.randomInRange(mapPlot.sp - 3,mapPlot.sp + 3);//Math.floor(Math.random() * ((mapPlot.sp - 3) - (mapPlot.sp + 3))) + (mapPlot.sp + 3);
		}

		//Iterate 29 positions for the map row
		for(var i = 0; i < 29; i++){

			//Determine if the plot is land or sea
			if(onlyWater == true){
				//We want water in this row
				row.push(0); //sea
			}else{
				if(i <= mapPlot.st || i >= mapPlot.sp){
					row.push(0); //sea
				}else{
					row.push(1); //land
				}
			}
		}

		//Add row to map
		//console.log("row", row);
		map.push(row);

	}

	//console.log("map", map);

	return map;

}
*/
$.island.prototype.load = function (result) {
	var tOBJ = result;
	for (var i = 0; i < result.length; i++) {
		for (var p = 0; p < result[i].length; p++) {
			if (tOBJ[i][p]) this.landShading(0, {
				x: p * 25,
				y: i * 25
			}, 1);
		}
	}
}


$.island.prototype.onland = function (loc) {

	var x = Math.floor(loc.x / 25);
	var y = Math.floor(loc.y / 25);
	if (y <= this.defaultMap.length - 1 && y >= 0 && x <= this.defaultMap[0].length - 1 && x >= 0) {
		return this.defaultMap[y][x];
	}
	return 0;
}

$.island.prototype.getNeighbors = function (loc) {

	var x = Math.floor(loc.x / 25);
	var y = Math.floor(loc.y / 25);
	if (y <= this.defaultMap.length - 1 && y >= 0 && x <= this.defaultMap[0].length - 1 && x >= 0) {//x is always 29 per generate()
		return {
			me: y <= this.defaultMap.length - 1 && y >= 0 && x <= this.defaultMap[0].length - 1 && x >= 0 ? this.defaultMap[y][x] : 0,
			up: y - 1 <= this.defaultMap.length - 1 && y - 1 >= 0 && x <= this.defaultMap[0].length - 1 && x >= 0 ? this.defaultMap[y - 1][x] : 0,
			right: y <= this.defaultMap.length - 1 && y >= 0 && x + 1 <= this.defaultMap[0].length - 1 && x + 1 >= 0 ? this.defaultMap[y][x + 1] : 0,
			down: y + 1 <= this.defaultMap.length - 1 && y + 1 >= 0 && x <= this.defaultMap[0].length - 1 && x >= 0 ? this.defaultMap[y + 1][x] : 0,
			left: y <= this.defaultMap.length - 1 && y >= 0 && x - 1 <= this.defaultMap[0].length - 1 && x - 1 >= 0 ? this.defaultMap[y][x - 1] : 0,
		}
	}
	return 0;
}

/////////////////////
/*
function loop() {
requestAnimationFrame(loop);

foreCTX.clearRect(0, 0, w, h);

if (Math.random() * 25 < .06) clouds.push(new cloud());
t = clouds.length;
while (t--) {
clouds[t].update();
clouds[t].render();
if (clouds[t].position.x < -500) {
clouds.splice(t, 1);
}
}
}
*/

$.island.prototype.landShading = function (recursion, s, recur) {
	if (recursion == 4) return;
	$.btx.save();
	$.btx.translate(s.x, s.y);
	if (!recursion) {
		$.btx.fillStyle = this.z[7];
		$.btx.fillRect(0, 0, 25, 25);
	} else {
		if (recursion == 1) $.btx.translate(25, 0); //right ///clean up
		if (recursion == 2) $.btx.translate(25, 25); //bottom //// clean up
		if (recursion == 3) $.btx.translate(0, 25); //left ////clean up
		$.btx.rotate((3.14 * (recursion * .5)));
	}

	var po = 3.14 * (1.5 + (recursion * .5)); //angle
	var Mx = (s.x + 12) + 25 * Math.cos(po);
	var My = (s.y + 12) + 25 * Math.sin(po);
	//var check = $.btx.getImageData(Mx, My, 1, 1).data[2] == 252; ///check neighbor for water
	var check = !this.onland({ x: Mx, y: My });

	$.btx.fillStyle = this.z[0]; ///sand
	$.btx.fillRect(Math.random() * 20, Math.random() * 20, 2, 2); ///sand
	var m = 0;

	while (m < (recursion == 2 ? 4 : 3)) { //how much shading
		$.btx.translate(0, 2);
		$.btx.fillStyle = this.z[m];
		var n = 0
		while (n < this.r.length) {
			if (check) {
				$.btx.fillRect(this.r[n], this.r[n + 1], this.r[n + 2], 2);
			}
			n += 3;
		}
		m++;
	}
	$.btx.restore();

	this.landShading(recursion + 1, s, recur); ///continue recursion on current for all sides

	if (!check && recur) {
		this.landShading(0, {
			x: Math.floor(Mx / 25) * 25,
			y: Math.floor(My / 25) * 25
		}, 0)
	} ///recur for neighbor tile
}




$.island.prototype.clear = function Clear() {
	//clear
	$.entities.splice(0, $.entities.length);

	$.btx.fillStyle = this.z[6];
	$.btx.fillRect(0, 0, $.width, $.height);
	///
	////create static waves
	for (var i = 0; i < $.height; i += 10) {
		var s = 1;
		for (var t = 0; t < $.width; t += 10) {
			$.btx.fillStyle = this.z[2];
			$.btx.fillRect(t, (s == 1 ? i : i - 2), 10, 2);
			$.btx.fillStyle = Math.random() * 25 < .3 ? this.z[1] : this.z[4];
			$.btx.fillRect(t, (s == 1 ? i - 2 : i - 4), 10, 2);
			s *= -1;
		}
	}
}
/*

window.addEventListener('load', function() {
Clear();
///start with some clouds
//clouds.push(new cloud(Math.random() * w, Math.random() * h - 100))
//clouds.push(new cloud(Math.random() * w, Math.random() * h - 100))
//clouds.push(new cloud(Math.random() * w, Math.random() * h - 100))
//loop();
//////
LoadFromData(defaultMap);

});
*/
