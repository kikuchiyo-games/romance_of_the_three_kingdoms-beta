var RegionAnimation = function(options){
  this.initialize(options);
};

var p = RegionAnimation.prototype = new createjs.Container();

p.Container_initialize = p.initialize;

p.initialize = function(options){
  var width = 32, height = 32, background = new createjs.Shape();
  _.bindAll(this, 'chosen');
  this.Container_initialize();
  this.discoverer = options.discoverer;
  this.alpha = 0.4;
  this.field = options.field
  background.graphics.beginFill(options.color).drawRoundRect(0, 0, width, height, 10);
  this.addChild(background);
  this.addEventListener('click', this.chosen);
};

p.chosen = function(event){
  this.discoverer.origin.travel_to(this.pid)
};

  //var Button = function(label, color) {
  //  this.initialize(label, color);
  //}

  //var p = Button.prototype = new createjs.Container(); // inherit from Container
  //
  //p.label;
  //p.background;
  //p.count = 0;
  //
  //p.Container_initialize = p.initialize;

  //p.initialize = function(label, color) {
  //  this.Container_initialize();
  //  this.battlefield = App.battlefield;
  //  this.label = label;
  //  if (!color) { color = "#CCC"; }
  //  this.color = color;
  //  var text = new createjs.Text(label, "20px Arial", "#000");
  //  text.textBaseline = "top";
  //  text.textAlign = "center";
  //  
  //  var width = 32;
  //  var height = 32;
  //  
  //  this.background = new createjs.Shape();
  //  this.background._province_name = 'Hei Fei';
  //  this.background.graphics.beginFill(color).drawRoundRect(0,0,width,height,10);
  //  
  //  text.x = width/2;
  //  text.y = 10;

  //  this.addChild(this.background,text); 
  //  this.addEventListener("click", this.handleClick);  
  //  this.addEventListener("tick", this.handleTick);
  //  this.cursor = 'pointer';
  //} 

  //p.attack = function () {
  //  this.path_to_origin.pop();
  //  App.battlefield.close_attack_menu();
  //  App.battlefield.active_unit.charge(this);
  //  //// the rest should be handled by unit;
  //  //tween_to(App.battlefield.ally_unit, this.path_to_origin);
  //  //App.battlefield.enemy_unit.troop_count -= 10;
  //  //App.battlefield.ally_unit.troop_count -= 10;
  //  //App.battlefield.deduct_enemy_troops(App.battlefield.enemy_unit);
  //  //if(App.battlefield.enemy_unit.troop_count <= 0){
  //  //  App.battlefield.stage.removeChild(App.battlefield.enemy_unit)
  //  //  App.battlefield.enemy_unit = null
  //  //}

  //  //if(App.battlefield.ally_unit.troop_count <= 0){
  //  //  App.battlefield.stage.removeChild(App.battlefield.ally_unit);
  //  //}
  //  //this.battlefield.remove_movement_buttons(); 
  //  ////_.each( App.movement_buttons, function(button){ App.battlefield.stage.removeChild(button); });
  //  //App.battlefield.graph.create_movement_tiles(App.battlefield.ally_unit, [32, 64, 96, 128]);
  //}

  //p.handleClick = function (event) {    
  //  // should be handled by unit;
  //  var tile = event.target.parent;
  //  App.battlefield.active_unit.move(tile);
  //} 

  ////function tween_to(unit, destination_set){
  ////  var battlefield = App.battlefield;
  ////  var graph = battlefield.graph;
  ////  var destination; 
  ////  this.battlefield.find_tile_by_path_id(destination_set[0])
  ////  _.each( App.movement_buttons, function(button){ if(button.path_id == destination_set[0]){ destination = button; } });

  ////  if ( destination == undefined ){ return; }

  ////  if(destination.x < unit.x){
  ////    unit.gotoAndPlay('left'); 
  ////  } else if(destination.x > unit.x){  unit.gotoAndPlay('right'); }

  ////  createjs.Tween.get(unit).to({ x: destination.x, y: destination.y }, 100, createjs.Ease.linear ).call(function(){
  ////    var destination;
  ////    destination_set.shift();

  ////    if (destination_set.length > 0){
  ////      _.each( App.movement_buttons, function(button){ if(button.path_id == destination_set[0]){ destination = button; } });

  ////      if( unit.x <  destination.x){ 
  ////        unit.gotoAndPlay('right'); 
  ////      } else if( unit.x >  destination.x){ unit.gotoAndPlay('left'); }

  ////      tween_to(unit, destination_set);

  ////    } else {
  ////      _.each( App.movement_buttons, function(button){ battlefield.stage.removeChild(button); });
  ////      graph.create_movement_tiles(unit, [32, 64, 96, 128]);
  ////    }
  ////  });
  ////} 

  //p.handleTick = function(event) { p.alpha = 0.4; }
//}

window.RegionAnimation = RegionAnimation;
