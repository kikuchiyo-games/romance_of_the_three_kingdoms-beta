App.Road = function(options){
  this.initialize = function(options){
    this.cities = options.cities;
    this.city_pids = [ this.cities[0].pid, this.cities[1].pid ]
    var line = new createjs.Graphics();
    line.beginStroke('rgba(0,0,0,0.2)')
      .moveTo(options.cities[0].coordinates.x, options.cities[0].coordinates.y)
      .lineTo(options.cities[1].coordinates.x, options.cities[1].coordinates.y)
      .endStroke();
    this.presence = new createjs.Shape(line);
    this.presence.zIndex = -1;
  }

  this.unhighlight = function(){
    this.presence.graphics.clear();
    this.presence.graphics.beginStroke('rgba(0,0,0,0.2)')
      .moveTo(this.cities[0].coordinates.x, this.cities[0].coordinates.y)
      .lineTo(this.cities[1].coordinates.x, this.cities[1].coordinates.y)
      .endStroke();
  }

  this.highlight = function(){
    this.presence.graphics.clear();
    this.presence.graphics.beginStroke('red')
      .moveTo(this.cities[0].coordinates.x, this.cities[0].coordinates.y)
      .lineTo(this.cities[1].coordinates.x, this.cities[1].coordinates.y)
      .endStroke();
    this.cities[0].country.stage.update();
  }

  this.initialize(options);
}
