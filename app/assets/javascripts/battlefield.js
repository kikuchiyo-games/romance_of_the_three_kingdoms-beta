// Set the stage for battle, adding an ally and enemy unit.

function Battlefield() {
  return({
    initialize: function(){
      var self = this;
      this.game_over = false;
      this.stage = new createjs.Stage("game_map"),
      this.mapData =  mapDataJson,
      this.tileset = new Image();
      this.tileset.src = this.mapData.tilesets[0].image;
      this.tileset.onLoad = initLayers(this); 

      this.attackers = [ 
        new App.Unit({
          direction: 'right',
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
          direction: 'left',
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
        }),

        new App.Unit({
          direction: 'left',
          is_playable: true,
          force: 'defending',
          unit_id: 0,
          battlefield: self,
          position: {
            x: 704, 
            y: 192
          },
          general: {
            surname: 'xun',
            given_name: 'yu',
            loyalty: 100,
            war: 50,
            intelligence: 95,
            leadership: 90,
            troop_count: 100
          }
        })
      ]

      this.movement_buttons = [];
      this.active_unit = this.defenders[0]
      this.graph = new App.Graph({battlefield: this});
      this.graph.create_movement_tiles(this.active_unit.el, [32, 64, 96, 128]);
      createjs.Ticker.addEventListener("tick", this.stage);
      this.stage.enableMouseOver(200);
    }, 

    announce_victory: function(){
      console.log('victory');
      $('#game_map').hide();
      $('#attack_menu').css('visibility', 'hidden');
      this.stage.removeAllChildren();
      delete this;
      alert('victory!');
    },

    announce_defeat: function(){
      console.log('defeat');
      $('#game_map').hide();
      $('#attack_menu').css('visibility', 'hidden');
      this.stage.removeAllChildren();
      delete this;
      alert('defeat!');
    },

    detect_game_over: function(){
      if(this.attackers.length == 0){
        this.announce_victory();
        this.game_over = true
        return true;
      } else if (this.defenders.length == 0){
        this.announce_defeat();
        this.game_over = true
        return true;
      }
      console.log('game still in progress!');
      return false;
    },

    update_active_unit: function(){
      if (!this.game_over && !this.detect_game_over()){
        this.active_unit = this.next_force_unit();
        if(this.active_unit.force == 'defending'){
          this.graph.create_movement_tiles(this.active_unit.el, [32, 64, 96, 128])
        } else {
          this.play_out_cpu_turn();
          this.active_unit = this.next_force_unit();
          this.graph.create_movement_tiles(this.active_unit.el, [32, 64, 96, 128])
        }
      }
    },

    next_force_unit: function(){
      var self = this, force_unit, force, index, next_force_index, unit = this.active_unit;

      if(unit.force == 'defending'){
        force = this.defenders; 
        opposing_force = this.attackers;
      } else { 
        force = this.attackers; 
        opposing_force = this.defenders;
      }

      index = force.indexOf(unit);

      if(index == force.length - 1){
        next_force_index = 0;
        force = opposing_force;
      } else { next_force_index = index + 1; }

      return(force[next_force_index]);
    },

    play_out_cpu_turn: function(){
      _.each( this.attackers, function(attacker){ attacker.simulate_action(); });
    },

    find_tile_by_coordinates: function(coordinates){
      return _.find(self.movement_buttons, function(button){ 
        return button.x == coordinates.x && button.y == coordinates.y
      });
    },

    find_tile_by_path_id: function(path_id){
      return _.find(this.movement_buttons, function(button){ return button.path_id == path_id });
    },

    mute_movement_buttons: function(){
      _.each( this.movement_buttons, function(button){button.removeAllEventListeners(); button.alpha = 0;});
    },

    reset_movement_buttons: function(){
      this.movement_buttons = [];
    },

    remove_movement_buttons: function(){
      _.each( this.movement_buttons, function(button){button.removeAllEventListeners(); button.alpha = 0;});
      this.reset_movement_buttons();
    },

    close_attack_menu: function(enemy_unit){
      this.content.visible = false;
    },

    deduct_enemy_troops: function(enemy_unit){
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
