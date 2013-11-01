Neighbors = {
  go: function(origin, universe){
    var self = this;
    var neighbors = _.filter(universe, function(region){
      return Math.abs(region.x - origin.x) <= 32 && Math.abs(region.y - origin.y) <= 32;
    });
    return neighbors;
  }
};
