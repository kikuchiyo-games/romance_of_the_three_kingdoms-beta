var ScoutRegion = function(options){
  this.initialize = function(options){
    this.field = options.field;
    this.x = options.x;
    this.y = options.y;
    this.coordinates = {x: this.x, y: this.y};
    this.pid = this.x + ':' + this.y;
    this.report(options);
  };

  this.report = function(options){
    this.el = this.field.addChild(new RegionAnimation({discoverer: options.discoverer, label: ' ', color: 'black', field: this.field, pid: this.pid}));
    this.el.y = this.y;
    this.el.x = this.x;
    this.el.pid = this.pid;
    this.el.coordinates = {x: this.x, y: this.y};
    this.el.neighbors = [];
  };

  this.initialize(options);
  return this;
};
