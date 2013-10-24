// TODO Organize the test code...
// Make Appropriate classes for all this junk that works for getting basic game movement working...

function add_movement_button(button, desired_x, desired_y){
  App.movement_buttons.push( stage.addChild(new Button(' ', '#00F')))
  App.movement_buttons[App.movement_buttons.length - 1].x = desired_x;
  App.movement_buttons[App.movement_buttons.length - 1].y = desired_y;
  App.movement_buttons[App.movement_buttons.length - 1].path_id = App.movement_buttons.length - 1;
  App.movement_buttons[App.movement_buttons.length - 1].connections = [];
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
  App.movement_buttons = [];
  add_movement_button(button, button.x, button.y);
  _.each(infantry_ranges, function(adjustment, i){
    (function(desired_x, desired_y){ if (can_move_west(desired_x, desired_y)) { add_movement_button(button, desired_x, desired_y) } })(button.x - adjustment, button.y);
    (function(desired_x, desired_y){ if (can_move_east(desired_x, desired_y) ){ add_movement_button(button, desired_x, desired_y) } })(button.x + adjustment, button.y);
    (function(desired_x, desired_y){ if (can_move_south(desired_x, desired_y)){ add_movement_button(button, desired_x, desired_y) } })(button.x, button.y + adjustment);
    (function(desired_x, desired_y){ if (can_move_north(desired_x, desired_y)){ add_movement_button(button, desired_x, desired_y) } })(button.x, button.y - adjustment);
    if(i + 1 <= infantry_ranges.length / 2){
      for(var j = adjustment; j-=32; j > 0 ){
        (function(desired_x, desired_y){ if (can_move_north_west(desired_x, desired_y)){ add_movement_button(button, desired_x, desired_y) } })(button.x - adjustment, button.y - j);
        (function(desired_x, desired_y){ if (can_move_south_east(desired_x, desired_y)){ add_movement_button(button, desired_x, desired_y) } })(button.x + adjustment, button.y + j);
        (function(desired_x, desired_y){ if (can_move_north_east(desired_x, desired_y)){ add_movement_button(button, desired_x, desired_y) } })(button.x + adjustment, button.y - j);
        (function(desired_x, desired_y){ if (can_move_south_west(desired_x, desired_y)){ add_movement_button(button, desired_x, desired_y) } })(button.x - adjustment, button.y + j);
        (function(desired_x, desired_y){ if (can_move_north_west(desired_x, desired_y)){ add_movement_button(button, desired_x, desired_y) } })(button.x - j, button.y - adjustment);
        (function(desired_x, desired_y){ if (can_move_south_east(desired_x, desired_y)){ add_movement_button(button, desired_x, desired_y) } })(button.x + j, button.y + adjustment);
        (function(desired_x, desired_y){ if (can_move_north_east(desired_x, desired_y)){ add_movement_button(button, desired_x, desired_y) } })(button.x + j, button.y - adjustment);
        (function(desired_x, desired_y){ if (can_move_south_west(desired_x, desired_y)){ add_movement_button(button, desired_x, desired_y) } })(button.x - j, button.y + adjustment);
        (function(desired_x, desired_y){ if (can_move_north_west(desired_x, desired_y)){ add_movement_button(button, desired_x, desired_y) } })(button.x - j, button.y - j);
        (function(desired_x, desired_y){ if (can_move_south_east(desired_x, desired_y)){ add_movement_button(button, desired_x, desired_y) } })(button.x + j, button.y + j);
        (function(desired_x, desired_y){ if (can_move_north_east(desired_x, desired_y)){ add_movement_button(button, desired_x, desired_y) } })(button.x + j, button.y - j);
        (function(desired_x, desired_y){ if (can_move_south_west(desired_x, desired_y)){ add_movement_button(button, desired_x, desired_y) } })(button.x - j, button.y + j);

      }
    }
  });
  find_all_paths(App.movement_buttons);
  test_buttons = App.movement_buttons.slice(0)
  test_buttons.splice(0, 1);
  _.each(test_buttons, function(button){ if( !path_to_origin_exists(button, []) ){ stage.removeChild(button); } });
  stage.removeChild(App.movement_buttons[0]);
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

    _.each( App.movement_buttons, function(button){ stage.removeChild(button); });
    create_movement_tiles(btn2, [32, 64, 96, 128]);
  } 
  
  p.handleTick = function(event) { p.alpha = 0.3; /*Math.min(Math.cos(p.count++*0.5)*0.4+0.8, 0.6);*/ }
  window.Button = Button;
}());

function prepare_battlefield() {
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
  btn2.x = 448;
  btn2.y = 224;

  var btn1 = stage.addChild(new createjs.Sprite(spriteSheet, "right"));
  btn1.x = 64;
  btn1.y = 0;
  App.movement_buttons = [];
  create_movement_tiles(btn2, [32, 64, 96, 128]);

  createjs.Ticker.addEventListener("tick", stage);
  canvas = document.getElementById('game_controller')
}

function find_all_paths(grid){
  _.each( grid, function(button){
    var x = button.x;
    var y = button.y;
    var adjacent_hash = [ 
      {x: x + 32, y: y}, {x: x - 32, y: y}, 
      {x: x, y: y + 32}, {x: x, y: y - 32}, 
      {x: x + 32 , y: y - 32}, {x: x - 32 , y: y + 32}, 
      {x: x + 32 , y: y + 32}, {x: x - 32 , y: y - 32} 
    ];
    comparison_buttons = grid.slice(0);

    var position;
    _.each( comparison_buttons, function(comparison_button, i){ if(comparison_button.phase_id == button.phase_id){ position = i; } });
    comparison_buttons.splice(position,1);

    _.each( comparison_buttons, function(comparison_button){
      _.each( adjacent_hash, function(coordinates){
        if( comparison_button.x == coordinates.x && comparison_button.y == coordinates.y){
          button.connections.push(comparison_button.path_id)        
        }
      })
    })
  });
}

function climbing_mountain(coordinates){
  var climbingMountain = false;
  _.each( App.mountains, function(mountain){
    if( mountain.x == coordinates.x && mountain.y == coordinates.y ){
      climbingMountain = true
    }
  });
  return climbingMountain;
} 

function path_to_origin_exists(button, paths_traveled){
  var result = false, button_connection;

  if(button.connections.indexOf(0) != -1){
    return true;
  } else {
    paths_traveled.push(button.path_id);
    test_connections = button.connections.slice(0);
    _.each( $(test_connections).not(paths_traveled).get(), function(connection){
      paths_traveled.push(connection);
      button_connection = App.movement_buttons[connection];
      result = result || path_to_origin_exists(button_connection, paths_traveled);
    });
  }
  return result;
}

function init(){ prepare_battlefield(); }

$(function(){ init(); })
