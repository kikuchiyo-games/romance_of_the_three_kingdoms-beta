(function() {

  var Button = function(label, color) {
    this.initialize(label, color);
  }

  var p = Button.prototype = new createjs.Container();
  
  p.label;
  p.background;
  p.count = 0;
  
  p.Container_initialize = p.initialize;

  p.initialize = function(label, color) {
    this.Container_initialize();
    this.battlefield = App.battlefield;
    this.label = label;
    if (!color) { color = "#CCC"; }
    this.color = color;
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

    this.addChild(this.background,text); 
    this.addEventListener("click", this.handleClick);  
    this.addEventListener("tick", this.handleTick);
    this.cursor = 'pointer';
  } 

  p.attack = function () {
    this.path_to_origin.pop();
    App.battlefield.close_attack_menu();
    App.battlefield.active_unit.charge(this);
  }

  p.handleClick = function (event) {    
    var tile = event.target.parent;
    App.battlefield.active_unit.move(tile);
  } 

  p.handleTick = function(event) { p.alpha = 0.4; }
  window.MovementButton = Button;
}());
