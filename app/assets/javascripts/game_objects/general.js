//require(['assets/game_objects/force.js'], function(Force){
  var General = function(options){
    this.initialize = function(options){
      if (!(options.force instanceof Force)){ throw('General cannot be initialized without a Force'); }
      this.leadership = options.leadership;
      this.war = options.war;
      this.intelligence = options.intelligence;
      this.surname = options.surname;
      this.given_name = options.given_name;
      this.loyalty = options.loyalty;
    };

    this.initialize(options);
  };
  //return(General);
//});
