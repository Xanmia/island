$.inventory = function (slots,x,y) {
    //$.width-125,$.height-19
    this.position = {
        x: x||10,
        y: y||10
    };

    this.dim = {
        w: 5,
        h: (slots / 5)
    }
    //this.g = g;
    this.buttons = [];

    for (var i = 0; i < this.dim.w; i++) {
        for (var o = 0; o < this.dim.h; o++) {
            this.buttons.push(new $.btn(this, (i * 55)+this.position.x,(o * 55)+this.position.y,null, function(){$.state.toolbar[0].imgs=$.images['rock']}, function(){return "";}));
            //invItem++;
        }
    }
    //this.w = 30;
    this.h = 50;//equals task.size * scale
    this.w = 50;

    this.list = [];


    this.add = function(item){
        var i = this.list.indexOf(item);
        if(i==-1){
            this.list.push(item);
            this.buttons[this.list.length-1].imgs = $.images[item.image];
            this.buttons[this.list.length-1].value = function(){return "1";}
            //this.buttons.push(new $.button)
        }
        else{
            this.list[i].total++;
            this.buttons[i].value = function(){return $.state.bob.inventory.list[i].total;}
            //this.list.push(item);
        }

    }

    this.update = function (t) {
        for(var i = 0;i<this.buttons.length;i++){
           this.buttons[i].update(i);
       }
        //	this.list = t;
        //	var i = this.list.length;
        //	while (i--){
        //		this.list[i].position.x = this.position.x;
        //		this.list[i].position.y = this.position.y -(this.h*((this.list.length-1)-i));
        //		this.list[i].update(i);
        //	}
    }

    this.render = function(){
        $.ftx.save();
       // $.ftx.translate(this.position.x, this.position.y);
        var invItem = 0;
      //  $.ftx.scale(2, 2);
        //    $.ftx.globalAlpha =  (this.ttl-this.tick)/this.ttl;
      //  $.ftx.fillStyle = 'rgba(200, 200, 200, .91)';

       for(var i = 0;i<this.buttons.length;i++){
           this.buttons[i].render();
       }

        $.ftx.restore();

    }
    

    this.renderOLD = function () {
        $.ftx.save();
        $.ftx.translate(this.position.x, this.position.y);
        var invItem = 0;
      //  $.ftx.scale(2, 2);
        //    $.ftx.globalAlpha =  (this.ttl-this.tick)/this.ttl;
        $.ftx.fillStyle = 'rgba(200, 200, 200, .91)';

        for (var i = 0; i < this.dim.w; i++) {
            for (var o = 0; o < this.dim.h; o++) {
                $.ftx.fillStyle = 'rgba(200, 200, 200, .91)';
                $.ftx.fillRect(i * 55, o*55, this.w, this.h);

                if(invItem<this.list.length){
                    var item = this.list[invItem];
                    $.ftx.drawImage($.images[item.image],(i * 55)+item.offset.x,  (o*55)+item.offset.y, $.images[item.image].width*3, $.images[item.image].height*3 );
                    $.util.drawText({ x: (i * 55)+5, y: (o*55)+5 }, item.total.toString(), 1, $.ftx);//////////text draw example
                }
                else{
                    $.util.drawText({ x: (i * 55)+5, y: (o*55)+5 }, "0", 1, $.ftx);//////////text draw example
                }
                invItem++;
            }
        }

        $.ftx.restore();

    }
}

$.inventoryItem = function(){
    this.x = 0;
    this.y=0;

    this.position = {

    }

    this.update = function(){

    }

    this.render = function(){

    }
}