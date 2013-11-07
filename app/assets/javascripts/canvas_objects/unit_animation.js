var UnitAnimation = function(options){
  this.initialize = function(options){
    this.data = {
      images: ["assets/" + options.type + "-unit-sprite-sheet.png"],
      frames: {width:32, height:32},
      animations: {left:[0], right:[1]}
    };

    this.world = options.world;
    this.unit = options.unit;
    this.field = options.field;
    this.spriteSheet = new createjs.SpriteSheet(this.data);
    
    this.el = this.field.addChild(new createjs.Sprite(this.spriteSheet, 'left'));
    this.el.x = options.position.x;
    this.el.y = options.position.y;
  }

  this.travel_to = function(region_pid){
    this.unit.scout.hide_regions();
    this.status = 'traveling';
    this.go(region_pid);
  };

  this.attack = function(region_pid){
    this.unit.scout.hide_regions();
    this.status = 'attacking';
    this.go(region_pid);
  };

  this.go = function(region_pid){
    var path = this.unit.scout.construct_path_to(region_pid);
    this.animate(path);
  };

  this.update_direction = function(x, y){
    if(x < this.el.x){
      this.el.gotoAndPlay('left');
    } else if(x > this.el.x){ this.el.gotoAndPlay('right'); }
  }

  this.violence = function(pid){
    document.getElementById('sword_swing').currentTime=0;
    document.getElementById('sword_swing').play();
    var enemy = this.unit.scout.fetch_region_by_pid(pid).el.residing_enemy;
    this.wet(enemy);
  };

  this.wet = function(unit){
    var force, inertia, count = this.unit.troop_count,
      deaths = 0, murders = 0;
    
    for(var i = 0; i < count; i++){
      force = this.unit.power();
      inertia = unit.power();
      if (force > inertia && unit.power() < this.unit.power() ){
        unit.troop_count--;
      } else if (inertia > force && unit.power() < this.unit.power()){
        this.unit.troop_count--;
      }
    }

    if(unit.troop_count < 0){
      this.world.remove(unit);
    }

  };

  this.animate = function(path){
    if( path.length == 0 ){ 
      this.unit.scout.rest();

      if(this.status == 'attacking'){
        this.unit.scout.survey();
        var pid = this.unit.scout.closest_vacant_region_pid({close_menu: true});
        //this.violence(pid)
        this.travel_to(pid);
      } else {
        this.world.next(); 
      }
      return; 
    }
    var self = this, 
      region_pid = path.shift(), 
      region = this.unit.scout.fetch_region_by_pid(region_pid);

    this.update_direction(region.x, region.y);

    if(region.el.residing_enemy != undefined){
      this.violence(region_pid);
      if(this.unit.troop_count < 0){
        delete this.unit;
        return;
      }
    }

    createjs.Tween.get(this.el).to({ x: region.x, y: region.y }, 100, createjs.Ease.linear ).call(function(){
      self.animate(path);
    });
  };

  this.initialize(options);

  return this;
};
