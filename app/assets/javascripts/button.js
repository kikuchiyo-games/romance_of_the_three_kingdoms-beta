(function() {

  var Button = function(label, color) {
    this.initialize(label, color);
  }

  var p = Button.prototype = new createjs.Container(); // inherit from Container
  
  p.label;
  p.background;
  p.count = 0;
  
  p.Container_initialize = p.initialize;

  p.initialize = function(label, color) {
    this.Container_initialize();
    
    this.label = label;
    if (!color) { color = "#CCC"; }
    
    var text = new createjs.Text(label, "20px Arial", "#000");
    text.textBaseline = "top";
    text.textAlign = "center";
    
    var width = 32;
    var height = 32;
    
    this.background = new createjs.Shape();
    this.background._province_name = 'Hei Fei';
    this.background.graphics.beginFill(color).drawRoundRect(0,0,width,height,10);
    
    text.x = width/2;
    text.y = 10;

    text.province_name = function(name){
      this._province_name = name;
    };

    text.province_name('Hei Fei');

    this.addChild(this.background,text); 
    this.addEventListener("click", this.handleClick);  
    this.addEventListener("tick", this.handleTick);
  } 

  p.handleClick = function (event) {    
    var target = event.target.parent;
    var ally_unit = App.battlefield.ally_unit;
    var battlefield = App.battlefield;
    var graph = battlefield.graph;
    if(target.x < ally_unit.x){ ally_unit.gotoAndPlay('left'); } else if(target.x > ally_unit.x){ ally_unit.gotoAndPlay('right'); }

    function tween_to(destination_set){
      var destination; 
      _.each( App.movement_buttons, function(button){
        if(button.path_id == destination_set[0]){ destination = button; }
      });

      createjs.Tween.get(ally_unit).to({
         x: destination.x, 
         y: destination.y
       }, 
       500, 
       createjs.Ease.linear
      ).call(function(){
        destination_set.shift();
        if (destination_set.length > 0){
          tween_to(destination_set);
        } else {
          _.each( App.movement_buttons, function(button){ battlefield.stage.removeChild(button); });
          graph.create_movement_tiles(ally_unit, [32, 64, 96, 128]);
        }
      });
    }

    _.each( App.movement_buttons, function(button){button.removeAllEventListeners();});
    var destination = App.movement_buttons[App.movement_buttons.indexOf(App.movement_buttons[target.path_id])];
    tween_to(target.path_to_origin);
  } 
  
  p.handleTick = function(event) { p.alpha = 0.3; /*Math.min(Math.cos(p.count++*0.5)*0.4+0.8, 0.6);*/ }
  window.MovementButton = Button;
}());
