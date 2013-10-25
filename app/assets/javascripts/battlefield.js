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

      this.attackers = [ 
        new App.Unit({
          is_playable: false,
          force: 'attacking',
          unit_id: 0,
          battlefield: self,
          position: {
            x: 352, 
            y: 96
          },
          general: {
            surname: 'zhang',
            given_name: 'fei',
            loyalty: 100,
            war: 99,
            intelligence: 30,
            leadership: 90,
            troop_count: 90
          }
        })
      ]

      this.defenders = [ 
        new App.Unit({
          is_playable: true,
          force: 'defending',
          unit_id: 0,
          battlefield: self,
          position: {
            x: 448, 
            y: 224
          },
          general: {
            surname: 'zhang',
            given_name: 'liao',
            loyalty: 100,
            war: 91,
            intelligence: 85,
            leadership: 95,
            troop_count: 100
          }
        })
      ]

      this.movement_buttons = [];
      this.active_unit = this.defenders[0]
      this.graph = new App.Graph({battlefield: this});
      this.graph.create_movement_tiles(this.active_unit.el, [32, 64, 96, 128]);
      //this.graph.create_map_tiles(this.active_unit.el)

      createjs.Ticker.addEventListener("tick", this.stage);
      this.stage.enableMouseOver(200);

    }, 

    find_tile_by_path_id: function(path_id){
      var self = this, tile;
      _.each(self.movement_buttons, function(button){ if(button.path_id == path_id){ tile = button; } });
      return(tile);
    },

    mute_movement_buttons: function(){
      var self = this;
      _.each( self.movement_buttons, function(button){button.removeAllEventListeners(); button.alpha = 0;});
    },

    reset_movement_buttons: function(){
      this.movement_buttons = [];
    },

    remove_movement_buttons: function(){
      var self = this;
      _.each( self.movement_buttons, function(button){button.removeAllEventListeners(); button.alpha = 0;});
      this.reset_movement_buttons();
    },

    close_attack_menu: function(enemy_unit){
      this.content.visible = false;
      //this.stage.removeChild(this.content);
      //this.stage.removeChild(this.container);
    },

    deduct_enemy_troops: function(enemy_unit){
      //$('#attack_menu .battlefield-officer').html( enemy_unit.surname + ' ' + enemy_unit.given_name );
      //this.container = new createjs.Container();
      //this.stage.addChild(this.container);
      //
      //this.content = new createjs.DOMElement("enemy_troop_count");
      //this.content.regX = App.battlefield.enemy_unit.x + 32;
      //this.content.regY = App.battlefield.enemy_unit.y;
      //
      //this.container.addChild(this.content);
      //this.container.x = App.battlefield.enemy_unit.x + 30;
      //this.container.y = App.battlefield.enemy_unit.y;
      //alert(this.container.x);
      //this.container.alpha = 0.8;
      //$('#enemy_troop_count').css('left', App.battlefield.enemy_unit.x + 'px');
      //this.content.visible = true;
      //$('#enemy_troop_count').addClass('bounceOut');

    },

    open_attack_menu: function(unit){
      $('#attack_menu .battlefield-officer').html( unit.surname + ' ' + unit.given_name );
      $('#attack_menu .battlefield-officer-war').html( unit.war );
      $('#attack_menu .battlefield-officer-loyalty').html( unit.loyalty );
      $('#attack_menu .battlefield-officer-intelligence').html( unit.intelligence );
      $('#attack_menu .battlefield-officer-leadership').html( unit.leadership );
      $('#attack_menu .battlefield-officer-troops').html( Math.round(unit.troop_count) );
      var destination, self = this;
      _.each( self.movement_buttons, function(button){ if(button.x == unit.el.x && button.y == unit.el.y){ destination = button; } });

      $('#attack_menu [data-action="charge"]').attr('path_id', destination.path_id);

      if(this.container != undefined){
        this.content.visible = true;
        return;
      }

      this.container = new createjs.Container();
      this.stage.addChild(this.container);
      
      this.content = new createjs.DOMElement("attack_menu");
      this.content.regX = unit.el.x + 32;;
      this.content.regY = unit.el.y;
      
      this.container.addChild(this.content);
      this.container.x = unit.el.x + 30;;
      this.container.y = unit.el.y;
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
  sparkle_init();
}

$(function(){ init(); })
