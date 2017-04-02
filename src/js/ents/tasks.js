
$.tasks = function() {
	
	this.position = {
		x: 0,
		y: 10
	};

	
	//this.g = g;
	
	
	//this.w = 30;
	this.h = 65;//equals task.size * scale
	
	this.tasklist = [];
	
	this.update = function(t) {
		this.tasklist = t;
	
		var i = this.tasklist.length;
		while (i--){
			this.tasklist[i].position.x = 10;
			this.tasklist[i].position.y = this.position.y +(this.h*i)+i;
			this.tasklist[i].update(i);
		}
	}

	this.render = function() {
		var i = this.tasklist.length;
		while (i--){
			this.tasklist[i].render();
		}

	}
}

