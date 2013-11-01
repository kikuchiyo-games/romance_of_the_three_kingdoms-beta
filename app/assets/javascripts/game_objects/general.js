//require(['assets/game_objects/force.js'], function(Force){
  var General = function(options){
    this.initialize = function(options){
      if (!(options.force instanceof Force)){ throw('General cannot be initialized without a Force'); }
    };

    this.initialize(options);
  };
  //return(General);
//});
