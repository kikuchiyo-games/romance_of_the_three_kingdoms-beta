// For Example 02

function climbing_mountain(coordinates){
  var climbingMountain = false;
  _.each( App.mountains, function(mountain){
    if( mountain.x == coordinates.x && mountain.y == coordinates.y ){
      climbingMountain = true
    }
  });
  return climbingMountain;
} 

function add_movement_button(button, desired_x, desired_y){
  movement_buttons.push( stage.addChild(new Button(' ', '#95B')))
  movement_buttons[movement_buttons.length - 1].x = desired_x;
  movement_buttons[movement_buttons.length - 1].y = desired_y;
}

function can_move_west(desired_x, desired_y) { return desired_x >= 0 && climbing_mountain({x: desired_x, y:desired_y}) == false; }
function can_move_north(desired_x, desired_y){ return desired_y >= 0 && climbing_mountain({x: desired_x, y:desired_y}) == false; }

function can_move_east(desired_x, desired_y) { return desired_x < stage.canvas.width && climbing_mountain({x: desired_x, y:desired_y}) == false; }
function can_move_south(desired_x, desired_y){ return desired_y < stage.canvas.height && climbing_mountain({x: desired_x, y:desired_y}) == false; }

function can_move_north_west(desired_x, desired_y){ return desired_x >= 0 && desired_y >= 0 && climbing_mountain({x: desired_x, y:desired_y}) == false; }
function can_move_south_west(desired_x, desired_y){ return desired_x >= 0 && desired_y < stage.canvas.height && climbing_mountain({x: desired_x, y:desired_y}) == false; }

function can_move_south_east(desired_x, desired_y){ return desired_x < stage.canvas.width && desired_y < stage.canvas.height && climbing_mountain({x: desired_x, y:desired_y}) == false; }
function can_move_north_east(desired_x, desired_y){ return desired_x < stage.canvas.width && desired_y >= 0 && climbing_mountain({x: desired_x, y:desired_y}) == false; }

function create_movement_tiles(button, infantry_ranges){
  _.each(infantry_ranges, function(adjustment, i){
    (function(desired_x, desired_y){ if (can_move_west(desired_x, desired_y)) { add_movement_button(button, desired_x, desired_y) } })(button.x - adjustment, button.y);
    (function(desired_x, desired_y){ if (can_move_east(desired_x, desired_y) ){ add_movement_button(button, desired_x, desired_y) } })(button.x + adjustment, button.y);
    (function(desired_x, desired_y){ if (can_move_south(desired_x, desired_y)){ add_movement_button(button, desired_x, desired_y) } })(button.x, button.y + adjustment);
    (function(desired_x, desired_y){ if (can_move_north(desired_x, desired_y)){ add_movement_button(button, desired_x, desired_y) } })(button.x, button.y - adjustment);
    if(i + 1 <= infantry_ranges.length / 2){
      (function(desired_x, desired_y){ if (can_move_north_west(desired_x, desired_y)){ add_movement_button(button, desired_x, desired_y) } })(button.x - adjustment, button.y - adjustment);
      (function(desired_x, desired_y){ if (can_move_south_east(desired_x, desired_y)){ add_movement_button(button, desired_x, desired_y) } })(button.x + adjustment, button.y + adjustment);
      (function(desired_x, desired_y){ if (can_move_north_east(desired_x, desired_y)){ add_movement_button(button, desired_x, desired_y) } })(button.x + adjustment, button.y - adjustment);
      (function(desired_x, desired_y){ if (can_move_south_west(desired_x, desired_y)){ add_movement_button(button, desired_x, desired_y) } })(button.x - adjustment, button.y + adjustment);
    }
  });
}
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

    if(target.x < btn2.x){ btn2.gotoAndPlay('left'); } else if(target.x > btn2.x){ btn2.gotoAndPlay('right'); }
    btn2.x = target.x; 
    btn2.y = target.y;

    _.each( movement_buttons, function(button){ stage.removeChild(button); });
    create_movement_tiles(btn2, [32, 64]);
  } 
  
  p.handleTick = function(event) { p.alpha = Math.min(Math.cos(p.count++*0.5)*0.4+0.8, 0.6); }
  window.Button = Button;
}());

function example_02() {
  stage = new createjs.Stage("game_map");

  mapData = mapDataJson;
  tileset = new Image();
  tileset.src = mapData.tilesets[0].image;
  tileset.onLoad = initLayers(stage); 

  var data = {
    images: ["assets/calvalry-unit-sprite-sheet.png"],
    frames: {width:32, height:32},
    animations: {left:[0], right:[1]}
  };

  var spriteSheet = new createjs.SpriteSheet(data);

  btn2 = stage.addChild(new createjs.Sprite(spriteSheet, "left"));
  btn2.x = 192;
  btn2.y = 224;

  var btn1 = stage.addChild(new createjs.Sprite(spriteSheet, "right"));
  btn1.x = 64;
  btn1.y = 0;
  movement_buttons = [];

  create_movement_tiles(btn2, [32, 64]);

  createjs.Ticker.addEventListener("tick", stage);
  canvas = document.getElementById('game_controller')
  //sparkle_init();
}

function init(){ example_02(); }
$(function(){ init(); })
