// For Example 02
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
    
    var width = 32; //text.getMeasuredWidth()+30;
    var height = 32; //text.getMeasuredHeight()+20;
    
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
    var target = event.target;
    console.log(target);
    alert("You clicked on a button: " + target._province_name);
  } 
  
  p.handleTick = function(event) {       
    p.alpha = Math.cos(p.count++*0.1)*0.4+0.6;
  }
  
  window.Button = Button;
}());

var stage, holder;
function example_02() {
  stage = new createjs.Stage("game_map");

  mapData = mapDataJson;
  tileset = new Image();
  tileset.src = mapData.tilesets[0].image;
  tileset.onLoad = initLayers(stage); 

  var btn1 = stage.addChild(new Button("100", "#F00"));
  btn1.x = 64;
  btn1.y = 0;

  var btn2 = stage.addChild(new Button("57", "#0F0"));
  btn2.x = 64;
  btn2.y = 96;
  createjs.Ticker.addEventListener("tick", stage);
  canvas = document.getElementById('game_controller')

  function climbing_mountain(coordinates){
    var climbingMountain = false;
    _.each( App.mountains, function(mountain){
      if( mountain.x == coordinates.x && mountain.y == coordinates.y ){
        climbingMountain = true
      }
    });
    return climbingMountain;
  } 

  $(window).keydown(function(e){
    var desired_x = btn1.x
    var desired_y = btn1.y

    if(e.keyCode == 37){
      e.preventDefault();
      desired_x -= 32;
      if (desired_x >= 0 && climbing_mountain({x: desired_x, y:desired_y}) == false){ btn1.x = desired_x; }
    } else if(e.keyCode == 38){
      e.preventDefault();
      desired_y -= 32;
      if (desired_y >= 0 && climbing_mountain({x: desired_x, y:desired_y}) == false){ btn1.y = desired_y; }
    } else if(e.keyCode == 39){
      e.preventDefault();
      desired_x += 32;
      if ( desired_x < stage.canvas.width && climbing_mountain({x: desired_x, y:desired_y}) == false){ 
        btn1.x = desired_x; 
      }
    } else if(e.keyCode == 40){
      e.preventDefault();
      desired_y += 32;
      if ( desired_y < stage.canvas.height && climbing_mountain({x: desired_x, y:desired_y}) == false){ btn1.y = desired_y; }
    }
  });
}

function init(){ example_02(); }

$(function(){ init(); })
