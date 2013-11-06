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
    this.status = 'traveling';
    this.go(region_pid);
  };

  this.attack = function(region_pid){
    this.status = 'attacking';
    this.go(region_pid);
  };

  this.go = function(region_pid){
    var path = this.unit.scout.construct_path_to(region_pid);
    this.animate(path);
  };

  this.animate = function(path){
    if( path.length == 0 ){ 
      this.unit.scout.rest();

      if(this.status == 'attacking'){
        this.unit.scout.survey();
        var pid = this.unit.scout.closest_vacant_region_pid({close_menu: true});
        this.travel_to(pid);
      } else {
        this.world.next(); 
      }
      return; 
    }
    var self = this, 
      region_pid = path.shift(), 
      region = this.unit.scout.fetch_region_by_pid(region_pid);

    createjs.Tween.get(this.el).to({ x: region.x, y: region.y }, 100, createjs.Ease.linear ).call(function(){
      self.animate(path);
    });
  };

  this.initialize(options);

  return this;
};
