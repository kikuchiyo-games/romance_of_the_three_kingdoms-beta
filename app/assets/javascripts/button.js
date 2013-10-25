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

    text.province_name = function(name){
      this._province_name = name;
    };

    text.province_name('Hei Fei');

    this.addChild(this.background,text); 
    this.addEventListener("click", this.handleClick);  
    this.addEventListener("tick", this.handleTick);
    this.cursor = 'pointer';
  } 

  p.attack = function () {
    this.path_to_origin.pop();
    tween_to(App.battlefield.ally_unit, this.path_to_origin);
    App.battlefield.close_attack_menu();
    App.battlefield.enemy_unit.troop_count -= 10;
    App.battlefield.ally_unit.troop_count -= 10;

    if(App.battlefield.enemy_unit.troop_count <= 0){
      App.battlefield.stage.removeChild(App.battlefield.enemy_unit)
      App.battlefield.enemy_unit = null
    }

    if(App.battlefield.ally_unit.troop_count <= 0){
      App.battlefield.stage.removeChild(App.battlefield.ally_unit);
    }

  }

  p.handleClick = function (event) {    
    var target = event.target.parent;

    if(target.color == '#FF0000'){
      App.battlefield.open_attack_menu(App.battlefield.enemy_unit);
      return;
    }

    var ally_unit = App.battlefield.ally_unit;

    if(target.x < ally_unit.x){ ally_unit.gotoAndPlay('left'); } else if(target.x > ally_unit.x){ ally_unit.gotoAndPlay('right'); }

    _.each( App.movement_buttons, function(button){button.removeAllEventListeners(); button.alpha = 0;});

    tween_to(ally_unit, target.path_to_origin);
  } 

  function tween_to(unit, destination_set){
    var battlefield = App.battlefield;
    var graph = battlefield.graph;
    var destination; 
    _.each( App.movement_buttons, function(button){ if(button.path_id == destination_set[0]){ destination = button; } });

    if ( destination == undefined ){ return; }

    if(destination.x < unit.x){
      unit.gotoAndPlay('left'); 
    } else if(destination.x > unit.x){  unit.gotoAndPlay('right'); }

    createjs.Tween.get(unit).to({ x: destination.x, y: destination.y }, 100, createjs.Ease.linear ).call(function(){
      var destination;
      destination_set.shift();

      if (destination_set.length > 0){
        _.each( App.movement_buttons, function(button){ if(button.path_id == destination_set[0]){ destination = button; } });

        if( unit.x <  destination.x){ 
          unit.gotoAndPlay('right'); 
        } else if( unit.x >  destination.x){ unit.gotoAndPlay('left'); }

        tween_to(unit, destination_set);

      } else {
        _.each( App.movement_buttons, function(button){ battlefield.stage.removeChild(button); });
        graph.create_movement_tiles(unit, [32, 64, 96, 128]);
      }
    });
  } 

  p.handleTick = function(event) { p.alpha = 0.4; }
  window.MovementButton = Button;
}());
