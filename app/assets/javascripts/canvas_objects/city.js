App.City = function(options){
  // initialization
  this.initialize = function(options){
    _.bindAll( this, 'handle_click');
    this.neighbors = [];
    this.roads = [];
    this.connection_names = options.connections;
    this.radius = 4;
    this.name = options.name;
    this.pid = options.cid;
    this.country = options.country;
    this.coordinates = options.coordinates;

    this.presence = new createjs.Shape()
    this.presence.graphics.beginFill('gray').drawCircle(0, 0, this.radius);
    this.presence.x = this.coordinates.x;
    this.presence.y = this.coordinates.y;
    this.presence.zIndex = 1;
    this.presence.addEventListener('click', this.handle_click);
    this.country.stage.addChild(this.presence);
  };

  /*--EVENTS--*/
  // user selects as a start or end point
  // and tell country to highlight paths to start and end cities
  this.handle_click = function(){
    var view = this.country.searching_for;
    view=='end' ? this.country.highlight_path_to(this) : this.country.create_thomas_guide(this);
    this.mark(view);
  };

  this.unhighlight = function(){
    this.presence.graphics.clear();
    this.presence.graphics.beginFill('gray').drawCircle(0, 0, this.radius);
    this.country.stage.removeChild(this.text);
    this.presence.addEventListener('click', this.handle_click);
  };

  /*--DISPLAY--*/
  // marks the city as a start or end point
  this.mark = function(view){
    this.presence.removeEventListener('click', this.handle_click);
    this.add_tooltip(view)
    this.presence.graphics.clear();
    this.presence.graphics.beginFill('red').drawCircle(0, 0, this.radius);
    this.country.stage.addChild(this.text);
    this.country.stage.update();
  };

  // creates a tooltip on the page indicating start or end position
  this.add_tooltip = function(view){
    this.text = new createjs.Text(view, "20px Arial", "#ff7700"); 
    var x = this.coordinates.x;
    if( x >= 900 ){ x -= 40; }
    this.text.x = x; 
    this.text.y = this.coordinates.y; 
    this.text.textBaseline = "alphabetic";
  }

  /*--CONNECTIONS--*/
  // creates roads to other cities
  this.connect_to_network = function(network){
    var self = this, 
      condensed_network = _.filter(network, function(city){ return city !== self && city.neighbors.indexOf(self) == -1 && self.connection_names.indexOf(city.name) != -1});
    _.each(condensed_network, function(city){ self.create_connection(city); });
  };

  this.create_connection = function(city){
    var road = new App.Road({cities: [city, this]});

    // ugliest piece of of code here
    this.neighbors.push(city);
    city.neighbors.push(this);
    this.roads.push(road);
    city.roads.push(road);

    this.country.stage.addChild(road.presence);
  };

  // decision to create a road to another city
  this.should_create_connection = function(city){
    var distance = this.distance_to(city);
    return this.connection_probability_distribution(distance);
  };

  // probability of decision being made based on distance
  this.connection_probability_distribution = function(distance){
    return -Math.log( distance / 200 ) > 0.5;
  };

  // distance to another city
  this.distance_to = function(city){
    return Math.sqrt(Math.pow(city.coordinates.x - this.coordinates.x, 2) + Math.pow(city.coordinates.y - this.coordinates.y, 2));
  };

  this.initialize(options);
}
