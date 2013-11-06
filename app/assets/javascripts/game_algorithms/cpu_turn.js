var CPUTurn = function(options){
  this.initialize = function(options){
    this.unit = options.unit;
  };

  this.go = function(){
    this.unit.scout.survey_world();
    this.action();
  };

  this.suicide = function(){
    delete this;
  };

  this.action = function(){
    
    var target_pid = this.unit.scout.closest_enemy_region_pid(),
      path = this.unit.scout.construct_path_to(target_pid),
      coordinates, constrained_pid;
    if(path.length > this.unit.scout.range){
      coordinates = path[this.unit.scout.range - 1].split(':'),
      constrained_pid = this.unit.scout.fetch_region_by_coordinates( 
        parseInt(coordinates[0]), parseInt(coordinates[1])
      ).pid;

      this.unit.animation.travel_to(constrained_pid);

    } else { this.unit.animation.attack(target_pid); }

    this.suicide();
  };

  this.initialize(options);
};
