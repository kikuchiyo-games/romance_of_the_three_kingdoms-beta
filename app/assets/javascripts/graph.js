Array.prototype.getUnique = function(){
   var u = {}, a = [];
   for(var i = 0, l = this.length; i < l; ++i){
      if(u.hasOwnProperty(this[i])) {
         continue;
      }
      a.push(this[i]);
      u[this[i]] = 1;
   }
   return a;
}

App.Graph = function(options){
  this.initialize = function(options){
    this.stage = options.battlefield.stage;
    this.battlefield = options.battlefield;
  }

  this.initialize(options);

  this.add_movement_button = function(desired_x, desired_y){
    var color, residing_unit, movement_buttons = this.battlefield.movement_buttons, index;
    color = 'black';

    _.each( App.battlefield.attackers, function(unit){
      if(unit != null && unit.el.x == desired_x && unit.el.y == desired_y){
        color = '#FF0000'; 
        residing_unit = unit
        return false;
      }
    })

     _.each( App.battlefield.defenders, function(unit){
      if(unit != null && unit.el.x == desired_x && unit.el.y == desired_y){
        residing_unit = unit
        return false;
      }
    })
   
    movement_buttons.push( this.stage.addChild(new MovementButton(' ', color)))
    index = movement_buttons.length - 1

    movement_buttons[index].x = desired_x;
    movement_buttons[index].y = desired_y;
    movement_buttons[index].path_id = index;
    movement_buttons[index].connections = [];
    movement_buttons[index].residing_unit = residing_unit;
    if(residing_unit != undefined){
      residing_unit.tile = movement_buttons[index];
    }
  };

  this.can_move_west = function(desired_x, desired_y) {
    return desired_x >= 0 && this.climbing_mountain({x: desired_x, y:desired_y}) == false;
  };

  this.can_move_north = function(desired_x, desired_y){
    return desired_y >= 0 && this.climbing_mountain({x: desired_x, y:desired_y}) == false;
  };

  this.can_move_east = function(desired_x, desired_y) {
    return desired_x < this.stage.canvas.width && this.climbing_mountain({x: desired_x, y:desired_y}) == false;
  };

  this.can_move_south = function(desired_x, desired_y){
    return desired_y < this.stage.canvas.height && this.climbing_mountain({x: desired_x, y:desired_y}) == false;
  };

  this.can_move_north_west = function(desired_x, desired_y){
    return desired_x >= 0 && desired_y >= 0 && this.climbing_mountain({x: desired_x, y:desired_y}) == false;
  };

  this.can_move_south_west = function(desired_x, desired_y){
    return desired_x >= 0 && desired_y < this.stage.canvas.height && this.climbing_mountain({x: desired_x, y:desired_y}) == false;
  };

  this.can_move_south_east = function(desired_x, desired_y){
    return desired_x < this.stage.canvas.width && desired_y < this.stage.canvas.height && this.climbing_mountain({x: desired_x, y:desired_y}) == false;
  };

  this.can_move_north_east = function(desired_x, desired_y){
    return desired_x < this.stage.canvas.width && desired_y >= 0 && this.climbing_mountain({x: desired_x, y:desired_y}) == false;
  };

  this.create_axis_buttons = function(origin, adjustment){
    var self = this;
    (function(desired_x, desired_y){ if (self.can_move_west(desired_x, desired_y)) { self.add_movement_button(desired_x, desired_y) } })(origin.x - adjustment, origin.y);
    (function(desired_x, desired_y){ if (self.can_move_east(desired_x, desired_y) ){ self.add_movement_button(desired_x, desired_y) } })(origin.x + adjustment, origin.y);
    (function(desired_x, desired_y){ if (self.can_move_south(desired_x, desired_y)){ self.add_movement_button(desired_x, desired_y) } })(origin.x, origin.y + adjustment);
    (function(desired_x, desired_y){ if (self.can_move_north(desired_x, desired_y)){ self.add_movement_button(desired_x, desired_y) } })(origin.x, origin.y - adjustment);
  };

  this.create_non_axis_buttons = function(origin, adjustment, j){
    var self = this;
    (function(desired_x, desired_y){ if (self.can_move_north_west(desired_x, desired_y)){ self.add_movement_button(desired_x, desired_y) } })(origin.x - adjustment, origin.y - j);
    (function(desired_x, desired_y){ if (self.can_move_south_east(desired_x, desired_y)){ self.add_movement_button(desired_x, desired_y) } })(origin.x + adjustment, origin.y + j);
    (function(desired_x, desired_y){ if (self.can_move_north_east(desired_x, desired_y)){ self.add_movement_button(desired_x, desired_y) } })(origin.x + adjustment, origin.y - j);
    (function(desired_x, desired_y){ if (self.can_move_south_west(desired_x, desired_y)){ self.add_movement_button(desired_x, desired_y) } })(origin.x - adjustment, origin.y + j);
    (function(desired_x, desired_y){ if (self.can_move_north_west(desired_x, desired_y)){ self.add_movement_button(desired_x, desired_y) } })(origin.x - j, origin.y - adjustment);
    (function(desired_x, desired_y){ if (self.can_move_south_east(desired_x, desired_y)){ self.add_movement_button(desired_x, desired_y) } })(origin.x + j, origin.y + adjustment);
    (function(desired_x, desired_y){ if (self.can_move_north_east(desired_x, desired_y)){ self.add_movement_button(desired_x, desired_y) } })(origin.x + j, origin.y - adjustment);
    (function(desired_x, desired_y){ if (self.can_move_south_west(desired_x, desired_y)){ self.add_movement_button(desired_x, desired_y) } })(origin.x - j, origin.y + adjustment);
    (function(desired_x, desired_y){ if (self.can_move_north_west(desired_x, desired_y)){ self.add_movement_button(desired_x, desired_y) } })(origin.x - j, origin.y - j);
    (function(desired_x, desired_y){ if (self.can_move_south_east(desired_x, desired_y)){ self.add_movement_button(desired_x, desired_y) } })(origin.x + j, origin.y + j);
    (function(desired_x, desired_y){ if (self.can_move_north_east(desired_x, desired_y)){ self.add_movement_button(desired_x, desired_y) } })(origin.x + j, origin.y - j);
    (function(desired_x, desired_y){ if (self.can_move_south_west(desired_x, desired_y)){ self.add_movement_button(desired_x, desired_y) } })(origin.x - j, origin.y + j);
  };

  this.create_movement_tiles = function(origin, infantry_ranges){
    this.battlefield.remove_movement_buttons();
    this.add_movement_button(origin.x, origin.y);

    var self = this;

    _.each(infantry_ranges, function(adjustment, i){
      self.create_axis_buttons(origin, adjustment);
      if(i + 1 <= infantry_ranges.length / 2){
        for(var j = adjustment; j-=32; j > 0 ){
          self.create_non_axis_buttons(origin, adjustment, j);
        }
      }
    });

    this.find_unit_paths(this.battlefield.movement_buttons);
    this.delete_buttons_with_unreachable_paths();
  };

  this.delete_buttons_with_unreachable_paths = function(){
    var test_buttons = this.battlefield.movement_buttons.slice(0), self = this;
    test_buttons.splice(0, 1);

    _.each(test_buttons, function(button){ if( !self.path_to_origin_exists(button, [], button) ){ self.stage.removeChild(button); } });

    //this.stage.removeChild(this.battlefield.movement_buttons[0]);
  };

  this.climbing_mountain = function(coordinates){
    var climbingMountain = false;
    _.each( App.mountains, function(mountain){
      if( mountain.x == coordinates.x && mountain.y == coordinates.y ){
        climbingMountain = true
      }
    });
    return climbingMountain;
  };
  
  this.path_to_origin_exists = function(button, paths_traveled, original_button){
    var result = false, button_connection, self = this;
  
    if(button.connections.indexOf(0) != -1){
      paths_traveled.unshift(original_button.path_id);
      //first path found
      original_button.path_to_origin = paths_traveled.getUnique().reverse();
      //need smarter algorithm that finds shortest path for ai...
      return true;
    } else {
      if( paths_traveled.indexOf(button.path_id) == -1){paths_traveled.push(button.path_id);}
      test_connections = button.connections.slice(0);
      _.each( $(test_connections).not(paths_traveled).get(), function(connection){
        if( paths_traveled.indexOf(connection) == -1){ paths_traveled.push(connection); }
        button_connection = self.battlefield.movement_buttons[connection];
        result = result || self.path_to_origin_exists(button_connection, paths_traveled, original_button);
      });
    }
    return result;
  };

  this.find_unit_paths = function(grid){
    _.each( grid, function(button){
      var x = button.x;
      var y = button.y;
      var adjacent_hash = [ 
        {x: x + 32, y: y}, {x: x - 32, y: y}, 
        {x: x, y: y + 32}, {x: x, y: y - 32}, 
        {x: x + 32 , y: y - 32}, {x: x - 32 , y: y + 32}, 
        {x: x + 32 , y: y + 32}, {x: x - 32 , y: y - 32} 
      ];
      comparison_buttons = grid.slice(0);
  
      var position;
      _.each( comparison_buttons, function(comparison_button, i){ if(comparison_button.path_id == button.path_id){ position = i; } });
      comparison_buttons.splice(position,1);
  
      _.each( comparison_buttons, function(comparison_button){
        _.each( adjacent_hash, function(coordinates){
          if( comparison_button.x == coordinates.x && comparison_button.y == coordinates.y){
            button.connections.push(comparison_button.path_id)        
          }
        })
      })
    });
  }

  this.create_map_tiles = function(origin){
    for( var row = 1; row < 24; row++){
      for( var col = 1; col < 24; col++){
        this.add_movement_button( row * 32, col * 32);
      }
    }
    this.find_unit_paths(this.battlefield.movement_buttons);
    this.find_map_paths(origin)
  };

  this.find_map_paths = function(source){
    var tile = source.tile, tiles_passed = 0;
    var target = App.battlefield.defenders[0].tile
    var og_target = $.extend({}, target);
    var v = this.find_shortest_path(tile, target);
    v = v.reverse();
    source.tween_through(v);
  };

  // source is path_id of button in movement_buttons
  this.find_shortest_path = function(source, target){
    var d = [];
    var y = source, self = this, connection;
    var v = [];
    var min = y;
    y.distance_to_target = self.distance(y, target);
    y.distance = 0;
    y.previous = null;
    y.visited = true;

    d.push(y); 
    v.push(y); 

    while( d.length != 0 ){

      if(y === target){ 
        console.log('got it!');
        return v;
      }
      
      _.each(y.connections, function(path_id){
        connection = self.battlefield.find_tile_by_path_id(path_id);
        if(connection.visited != true){
          connection.visited = true;
          connection.distance_to_target = self.distance(connection, target);
          if( !self.climbing_mountain(connection) && connection.distance_to_target < min.distance_to_target ){ 
            min = connection 
          }
          connection.distance = y.distance + 32;
          connection.previous = y;
          d.push(connection);
        }
      });
      if(min === y){
        return v;
      }
      y = min;
      v.push(min);
    }
    return v;
  };

  this.distance = function(u, v){
    return Math.sqrt( Math.pow(u.x - v.x, 2) + Math.pow(u.y - v.y, 2));
  };

  return(this);
}
