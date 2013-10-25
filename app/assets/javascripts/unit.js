App.Unit = function(options){
  this.initialize = function(options){
    this.data = {
      images: ["assets/calvalry-unit-sprite-sheet.png"],
      frames: {width:32, height:32},
      animations: {left:[0], right:[1]}
    };

    this.spriteSheet = new createjs.SpriteSheet(this.data);
    
    var general = options.general,
      battlefield = options.battlefield,
      position = options.position,
      self = this;
    this.battlefield = battlefield;    
    this.el = battlefield.stage.addChild(new createjs.Sprite(self.spriteSheet, 'left'));
    this.el.x = position.x;
    this.el.y = position.y;

    this.troop_count = general.troop_count;
    this.intelligence = general.intelligence;

    this.report_troop_count();

    this.leadership = general.leadership;
    this.given_name = general.given_name;
    this.surname = general.surname;
    this.loyalty = general.loyalty;

    this.war = general.war;

  };

  //this.take_damage(unit){
  //  this.troop_count -= 10 * ( unit.war / 100 )
  //}

  this.give_damage = function(unit){
    unit.troop_count -= 10 * ( ( Math.random(1) * 10 + this.war ) / 100 )
    unit.reposition_troop_count_report()
  }

  this.check_status = function(){
    if(this.troop_count <= 0){
      App.battlefield.stage.removeChild(this.el)
      App.battlefield.stage.removeChild(this.el.text)
      this.battlefield.remove_movement_buttons();
      this.battlefield.graph.create_movement_tiles(this.el, [32, 64, 96, 128]);
      delete(this);
     } else {
       console.log( this.surname + ' ' + this.given_name + ' : ' + this.troop_count)
     }
  }

  this.charge = function(tile){
    var victim = tile.residing_unit,
      first_tile = this.battlefield.find_tile_by_path_id(tile.path_to_origin[0]);
    if( first_tile != undefined ){
      this.tween_path(first_tile, tile.path_to_origin);
    }

    console.log(victim);
    this.give_damage(victim);
    victim.give_damage(this);
    
    victim.check_status();
    this.check_status();

  };

  this.move = function(tile){
    if(tile.color == '#FF0000'){
      App.battlefield.open_attack_menu(tile.residing_unit);
      return;
    }

    var first_tile = App.battlefield.find_tile_by_path_id(tile.path_to_origin[0]);
    this.set_direction(first_tile)

    this.battlefield.mute_movement_buttons();
    this.tween_path(first_tile, tile.path_to_origin);
  };

  this.hide_troop_count_report = function(){
    this.text.visible = false;
  };

  this.show_troop_count_report = function(){
    this.text.text = Math.round(this.troop_count, 0);
    console.log(this.troop_count);
    this.text.visible = true;
  };

  this.reposition_troop_count_report = function(){
    this.text.x = this.el.x + 22;
    this.text.y = this.el.y - 10;
    this.show_troop_count_report()
  };

  this.report_troop_count = function(){
    this.text = this.battlefield.stage.addChild( new createjs.Text(this.troop_count, '12px "Star Jedi"', 'black'));
    this.reposition_troop_count_report();
  };

  this.set_direction = function(tile){
    if(tile.x < this.el.x){
      this.el.gotoAndPlay('left'); 
    } else if(tile.x > this.el.x){  
      this.el.gotoAndPlay('right'); 
    }
  }

  this.tween_path = function(tile, destination_set){
    var self = this;
    this.set_direction(tile);
    this.hide_troop_count_report();

    createjs.Tween.get(this.el).to({ x: tile.x, y: tile.y }, 500, createjs.Ease.linear ).call(function(){
      destination_set.shift();
      self.reposition_troop_count_report();

      if (destination_set.length > 0){
        var new_tile = App.battlefield.find_tile_by_path_id(destination_set[0]);
        self.set_direction(new_tile);
        self.tween_path(new_tile, destination_set);

      } else {
        self.battlefield.remove_movement_buttons();
        self.battlefield.graph.create_movement_tiles(self.el, [32, 64, 96, 128]);
      }
    });
  }

  this.initialize(options);
  return(this);
};
