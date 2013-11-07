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
    this.uid = options.uid;
    this.player = options.player;
    this.force = options.force;
    this.troop_count = options.troop_count;
    this.general = options.general;
    this.scout = new Scout({world: options.world, general: this.general, unit: this, field: options.field})
  };

  this.attack = function(){
    this.move();
  };

  this.power = function(){
    return Math.round(Math.log(Math.random(1) * this.general.war) + 1);
  };

  this.start_turn = function(){
    if (this.player == 'user'){
      this.scout.survey();
    } else {
      this.delegate_turn();
    }
  };

  this.delegate_turn = function(){
    var self = this;
    (new CPUTurn({unit: self})).go();
  };

  // not needed...
  this.move = function(){ };
  this.stop_turn = function(){ };

  this.initialize(options);
  return this;
};
