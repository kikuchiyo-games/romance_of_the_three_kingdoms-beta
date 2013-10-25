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
      this.ally_unit.troop_count = 11;
      this.enemy_unit = this.stage.addChild(new createjs.Sprite(self.spriteSheet, "right"));
      this.enemy_unit.x = 384;
      this.enemy_unit.y = 160;
      this.enemy_unit.troop_count = 10;

      this.enemy_unit.surname = 'zhang';
      this.enemy_unit.given_name = 'fei';
      this.enemy_unit.war = '91%';
      this.enemy_unit.loyalty = '100%';
      this.enemy_unit.leadership = '90%';
      this.enemy_unit.intelligence = '30%';

      App.movement_buttons = [];

      this.graph = new App.Graph(this.stage);
      this.graph.create_movement_tiles(this.ally_unit, [32, 64, 96, 128]);

      createjs.Ticker.addEventListener("tick", this.stage);

      canvas = document.getElementById('game_controller')
      
      this.stage.enableMouseOver(200);

    }, 

    close_attack_menu: function(enemy_unit){
      this.content.visible = false;
      //this.stage.removeChild(this.content);
      //this.stage.removeChild(this.container);
    },

    open_attack_menu: function(enemy_unit){

      $('#attack_menu .battlefield-officer').html( enemy_unit.surname + ' ' + enemy_unit.given_name );
      $('#attack_menu .battlefield-officer-war').html( enemy_unit.war );
      $('#attack_menu .battlefield-officer-loyalty').html( enemy_unit.loyalty );
      $('#attack_menu .battlefield-officer-intelligence').html( enemy_unit.intelligence );
      $('#attack_menu .battlefield-officer-leadership').html( enemy_unit.intelligence );
      var destination;
      _.each( App.movement_buttons, function(button){ if(button.x == enemy_unit.x && button.y == enemy_unit.y){ destination = button; } });

      $('#attack_menu [data-action="charge"]').attr('path_id', destination.path_id);

      if(this.container != undefined){
        this.content.visible = true;
        return;
      }

      this.container = new createjs.Container();
      this.stage.addChild(this.container);
      
      this.content = new createjs.DOMElement("attack_menu");
      this.content.regX = App.battlefield.enemy_unit.x + 32;;
      this.content.regY = App.battlefield.enemy_unit.y;;
      
      this.container.addChild(this.content);
      this.container.x = App.battlefield.enemy_unit.x + 30;;
      this.container.y = App.battlefield.enemy_unit.y;

      this.container.alpha = 0.8;
    },
    charge: function(event){
      alert($(event.currentTarget));
    },

    assault: function(event){
    },
    dual: function(event){
    },
    bribe: function(event){
    }
  })
}

function init(){ 
  App.battlefield = new Battlefield(); 
  App.battlefield.initialize();
}

$(function(){ init(); })
