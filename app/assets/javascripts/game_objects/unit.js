var Unit = function(options){
  this.initialize = function(options){
    if (!(options.general instanceof General)){ throw('Unit cannot be initialized without a General') };

    this.animation = new UnitAnimation({
      world: options.world, 
      unit: this, 
      field: options.field, 
      position: options.position, 
      type: options.type
    });
    this.force = options.force;
    this.general = options.general;
    this.scout = new Scout({world: options.world, general: this.general, unit: this, field: options.field})
  };

  this.move = function(){

  };

  this.attack = function(){

  };

  this.start_turn = function(){

  };

  this.stop_turn = function(){

  };

  this.initialize(options);
  return this;
};
