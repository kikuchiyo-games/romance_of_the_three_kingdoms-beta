// Set the stage for battle, adding an ally and enemy unit.

function Battlefield() {
  return({
    initialize: function(){
      var self = this;
      this.stage = new createjs.Stage("game_map"),
      this.mapData =  mapDataJson,
      this.tileset = new Image();
      this.tileset.src = this.mapData.tilesets[0].image;
      this.tileset.onLoad = initLayers(this); 
      this.data = {
        images: ["assets/calvalry-unit-sprite-sheet.png"],
        frames: {width:32, height:32},
        animations: {left:[0], right:[1]}
      };

      this.spriteSheet = new createjs.SpriteSheet(this.data);

      this.ally_unit = this.stage.addChild(new createjs.Sprite(self.spriteSheet, "left"));
      this.ally_unit.x = 448;
      this.ally_unit.y = 224;
      this.enemy_unit = this.stage.addChild(new createjs.Sprite(self.spriteSheet, "right"));
      this.enemy_unit.x = 64;
      this.enemy_unit.y = 0;
      App.movement_buttons = [];
      this.graph = new App.Graph(this.stage);
      this.graph.create_movement_tiles(this.ally_unit, [32, 64, 96, 128]);
      createjs.Ticker.addEventListener("tick", this.stage);
      canvas = document.getElementById('game_controller')
    }
  })
}

function init(){ 
  App.battlefield = new Battlefield(); 
  App.battlefield.initialize();
}

$(function(){ init(); })
