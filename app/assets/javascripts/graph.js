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

App.Graph = function(stage){
  return({
    initialize: function(stage){
      this.stage = stage;
    },
    add_movement_button: function(button, desired_x, desired_y){
      App.movement_buttons.push( stage.addChild(new MovementButton(' ', '#00F')))
      App.movement_buttons[App.movement_buttons.length - 1].x = desired_x;
      App.movement_buttons[App.movement_buttons.length - 1].y = desired_y;
      App.movement_buttons[App.movement_buttons.length - 1].path_id = App.movement_buttons.length - 1;
      App.movement_buttons[App.movement_buttons.length - 1].connections = [];
    },

    can_move_west: function(desired_x, desired_y) {
      return desired_x >= 0 && this.climbing_mountain({x: desired_x, y:desired_y}) == false;
    },

    can_move_north: function(desired_x, desired_y){
      return desired_y >= 0 && this.climbing_mountain({x: desired_x, y:desired_y}) == false;
    },

    can_move_east: function(desired_x, desired_y) {
      return desired_x < stage.canvas.width && this.climbing_mountain({x: desired_x, y:desired_y}) == false;
    },

    can_move_south: function(desired_x, desired_y){
      return desired_y < stage.canvas.height && this.climbing_mountain({x: desired_x, y:desired_y}) == false;
    },

    can_move_north_west: function(desired_x, desired_y){
      return desired_x >= 0 && desired_y >= 0 && this.climbing_mountain({x: desired_x, y:desired_y}) == false;
    },

    can_move_south_west: function(desired_x, desired_y){
      return desired_x >= 0 && desired_y < stage.canvas.height && this.climbing_mountain({x: desired_x, y:desired_y}) == false;
    },

    can_move_south_east: function(desired_x, desired_y){
      return desired_x < stage.canvas.width && desired_y < stage.canvas.height && this.climbing_mountain({x: desired_x, y:desired_y}) == false;
    },

    can_move_north_east: function(desired_x, desired_y){
      return desired_x < stage.canvas.width && desired_y >= 0 && this.climbing_mountain({x: desired_x, y:desired_y}) == false;
    },

    reset_movement_buttons: function(){
      App.movement_buttons = [];
    },

    create_axis_buttons: function(button, adjustment){
      var self = this;
      (function(desired_x, desired_y){ if (self.can_move_west(desired_x, desired_y)) { self.add_movement_button(button, desired_x, desired_y) } })(button.x - adjustment, button.y);
      (function(desired_x, desired_y){ if (self.can_move_east(desired_x, desired_y) ){ self.add_movement_button(button, desired_x, desired_y) } })(button.x + adjustment, button.y);
      (function(desired_x, desired_y){ if (self.can_move_south(desired_x, desired_y)){ self.add_movement_button(button, desired_x, desired_y) } })(button.x, button.y + adjustment);
      (function(desired_x, desired_y){ if (self.can_move_north(desired_x, desired_y)){ self.add_movement_button(button, desired_x, desired_y) } })(button.x, button.y - adjustment);
    },

    create_non_axis_buttons: function(button, adjustment, j){
      var self = this;
      (function(desired_x, desired_y){ if (self.can_move_north_west(desired_x, desired_y)){ self.add_movement_button(button, desired_x, desired_y) } })(button.x - adjustment, button.y - j);
      (function(desired_x, desired_y){ if (self.can_move_south_east(desired_x, desired_y)){ self.add_movement_button(button, desired_x, desired_y) } })(button.x + adjustment, button.y + j);
      (function(desired_x, desired_y){ if (self.can_move_north_east(desired_x, desired_y)){ self.add_movement_button(button, desired_x, desired_y) } })(button.x + adjustment, button.y - j);
      (function(desired_x, desired_y){ if (self.can_move_south_west(desired_x, desired_y)){ self.add_movement_button(button, desired_x, desired_y) } })(button.x - adjustment, button.y + j);
      (function(desired_x, desired_y){ if (self.can_move_north_west(desired_x, desired_y)){ self.add_movement_button(button, desired_x, desired_y) } })(button.x - j, button.y - adjustment);
      (function(desired_x, desired_y){ if (self.can_move_south_east(desired_x, desired_y)){ self.add_movement_button(button, desired_x, desired_y) } })(button.x + j, button.y + adjustment);
      (function(desired_x, desired_y){ if (self.can_move_north_east(desired_x, desired_y)){ self.add_movement_button(button, desired_x, desired_y) } })(button.x + j, button.y - adjustment);
      (function(desired_x, desired_y){ if (self.can_move_south_west(desired_x, desired_y)){ self.add_movement_button(button, desired_x, desired_y) } })(button.x - j, button.y + adjustment);
      (function(desired_x, desired_y){ if (self.can_move_north_west(desired_x, desired_y)){ self.add_movement_button(button, desired_x, desired_y) } })(button.x - j, button.y - j);
      (function(desired_x, desired_y){ if (self.can_move_south_east(desired_x, desired_y)){ self.add_movement_button(button, desired_x, desired_y) } })(button.x + j, button.y + j);
      (function(desired_x, desired_y){ if (self.can_move_north_east(desired_x, desired_y)){ self.add_movement_button(button, desired_x, desired_y) } })(button.x + j, button.y - j);
      (function(desired_x, desired_y){ if (self.can_move_south_west(desired_x, desired_y)){ self.add_movement_button(button, desired_x, desired_y) } })(button.x - j, button.y + j);
    },

    create_movement_tiles: function(button, infantry_ranges){
      this.reset_movement_buttons();
      this.add_movement_button(button, button.x, button.y);
      var self = this;
      _.each(infantry_ranges, function(adjustment, i){
        self.create_axis_buttons(button, adjustment);
        if(i + 1 <= infantry_ranges.length / 2){
          for(var j = adjustment; j-=32; j > 0 ){
            self.create_non_axis_buttons(button, adjustment, j);
          }
        }
      });
      this.find_all_paths(App.movement_buttons);
      this.delete_buttons_with_unreachable_paths();
    },

    delete_buttons_with_unreachable_paths: function(){
      var test_buttons = App.movement_buttons.slice(0), self = this;
      test_buttons.splice(0, 1);
      _.each(test_buttons, function(button){ if( !self.path_to_origin_exists(button, [], button) ){ stage.removeChild(button); } });
      stage.removeChild(App.movement_buttons[0]);
    },

    climbing_mountain: function(coordinates){
      var climbingMountain = false;
      _.each( App.mountains, function(mountain){
        if( mountain.x == coordinates.x && mountain.y == coordinates.y ){
          climbingMountain = true
        }
      });
      return climbingMountain;
    }, 
    
    path_to_origin_exists: function(button, paths_traveled, original_button){
      var result = false, button_connection, self = this;
    
      if(button.connections.indexOf(0) != -1){
        paths_traveled.unshift(original_button.path_id);
        original_button.path_to_origin = paths_traveled.getUnique().reverse();
        return true;
      } else {
        if( paths_traveled.indexOf(button.phase_id) == -1){paths_traveled.push(button.path_id);}
        test_connections = button.connections.slice(0);
        _.each( $(test_connections).not(paths_traveled).get(), function(connection){
          if( paths_traveled.indexOf(connection) == -1){ paths_traveled.push(connection); }
          button_connection = App.movement_buttons[connection];
          result = result || self.path_to_origin_exists(button_connection, paths_traveled, original_button);
        });
      }
      return result;
    },

    find_all_paths: function(grid){
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
        _.each( comparison_buttons, function(comparison_button, i){ if(comparison_button.phase_id == button.phase_id){ position = i; } });
        comparison_buttons.splice(position,1);
    
        _.each( comparison_buttons, function(comparison_button){
          _.each( adjacent_hash, function(coordinates){
            if( comparison_button.x == coordinates.x && comparison_button.y == coordinates.y){
              button.connections.push(comparison_button.path_id)        
            }
          })
        })
      });
    },
    shortest_path: function(button, paths_traveled){
    }
  });
}
