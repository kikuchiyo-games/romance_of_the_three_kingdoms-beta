Battlefield = function(){
  return({
    initialize: function(){
      var self = this;
      this.game_over = false;
      this.map = new Map();
      this.populate();
      this.turn();
    }, 

    turn: function(){
      this.active_unit.scout.survey();
      var scout = this.active_unit.scout;
      // this happens after user clicks a region...
      //this.active_unit.animation.travel_to(scout.regions[0]);
    },

    next: function(){
      this.active_unit_index++;
      if (this.active_unit_index > this.units.length - 1){ this.active_unit_index = 0; }
      this.active_unit = this.units[this.active_unit_index];
      this.turn();
    },

    populate: function(){
      var cao_cao = new Force({name: 'Cao Cao'});
      var liu_bei = new Force({name: 'Liu Bei'});
      this.units = [
        new Unit({
          force: liu_bei,
          position: {x: 128, y: 128},
          world: this, 
          type: 'foot',
          field: this.map.stage, 
          general: new General({force: liu_bei})
        }),         
        new Unit({
          force: liu_bei,
          position: {x: 640, y: 640},
          world: this, 
          type: 'foot',
          field: this.map.stage, 
          general: new General({force: liu_bei})
        }),
        new Unit({
          force: cao_cao,
          position: {x: 384, y: 384},
          world: this, 
          type: 'calvalry',
          field: this.map.stage, 
          general: new General({force: cao_cao})
        }),
        new Unit({
          force: cao_cao,
          position: {x: 448, y: 384},
          world: this, 
          type: 'calvalry',
          field: this.map.stage, 
          general: new General({force: cao_cao})
        })

      ];
      this.active_unit_index = 0;
      this.active_unit = this.units[this.active_unit_index];
    }
  });
};
