App.Country = function(options){
  this.initialize = function(options){
    this.stage = new createjs.Stage('map-canvas');
    this.searching_for = 'start';
    this.highlighted_roads = [];
    this.create_cities();
    this.connect_cities();
    this.stage.sortChildren(function(obj){return obj.zIndex;})
    this.stage.update();
  };

  this.highlight_path_to = function(city){
    var pid = city.pid, self = this;

    this.highlighted_cities.push(city)
    this.highlighted_roads = []

    while( this.thomas_guide.pi[pid] != undefined || this.thomas_guide.pi[pid] != null ){
      city = _.find(this.cities, function(city){ return city.pid == self.thomas_guide.pi[pid]})
      var road = _.find( city.roads, 
        function(road){ 
          return road.city_pids.indexOf(pid) != -1 && 
            road.city_pids.indexOf( self.thomas_guide.pi[pid] != -1)
        }
      );

      this.highlighted_roads.push(road);
      road.highlight();
      pid = city.pid;
    }
    this.toggle_state();
  }

  this.toggle_state = function(){
    var user_prompt;
    this.searching_for = ( this.searching_for == 'start' ? 'end' : 'start' );
    user_prompt = ( this.searching_for == 'start' ? 'To start a new journey, please select an origin city below:' : 'To complete your journey, please select a destination city below:')
    $('#prompt').html(user_prompt);
  };

  this.create_thomas_guide = function(city){
    this.clear_highlights();
    this.highlighted_cities = [];
    this.thomas_guide = App.Dijkstra.go(city, _.indexBy(this.cities, 'pid'));
    this.highlighted_cities.push(city)
    this.toggle_state();
  };

  this.connect_cities = function(){
    var self = this;
    _.each(this.cities, function(city){ city.connect_to_network(self.cities); });
  };

  this.create_cities = function(city_count){
    var self = this;
    this.cities = [];
    _.each( App.CityData, function(city){
      console.log(city.coordinates.x)
      console.log(city.coordinates.y)
      self.cities.push( new App.City({country: self, coordinates: {x: city.coordinates.x, y: city.coordinates.y}, cid: city.pid, name: city.name, connections: city.neighbors}));
    });
  };

  this.random = function(max){
    return Math.floor(Math.random(1) * max);
  }

  this.random_coordinates = function(){
    var x = this.random(1000), 
      y = this.random(600);

    while( this.resample(x, y) == true){
      x = this.random(1000);
      y = this.random(600);
    }
    return { x: x, y: y }
  };

  this.resample = function(x, y){
    return _.filter(this.cities, function(city){ return city.distance_to({coordinates: {x: x, y: y}}) < city.radius * 3; }).length != 0;
  };

  this.clear_highlights = function(){
    _.each( this.highlighted_roads, function(road){ road.unhighlight() });
    _.each( this.highlighted_cities, function(city){ city.unhighlight()});
    this.stage.update();
  }

  this.initialize(options);
};
