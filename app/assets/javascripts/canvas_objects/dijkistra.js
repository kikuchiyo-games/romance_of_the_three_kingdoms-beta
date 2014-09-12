// A*
App.Dijkstra = {
  go: function(start_node, nodes){
    var g = [];
    var d = {};
    var pi = {};
    var u;
    var queue = {};

    var found_path_length;

    _.each(nodes, function(node){
      node.distance = Number.POSITIVE_INFINITY;
      node.handled = false;
      pi[node.pid] = null;
      queue[node.pid] = node;
    })

    start_node.distance = 0;
    start_node.handled = false;
    queue[start_node.pid] = start_node;

    var distance = function(u, v){
      return Math.sqrt( Math.pow( u.coordinates.x - v.coordinates.x, 2) + Math.pow( u.coordinates.y - v.coordinates.y, 2))
    };

    not_handled = _.where(queue, {handled: false});

    while(not_handled.length > 1){
      not_handled = _.where(queue, {handled: false});
      //* use heap instead
      u = _.min(not_handled, function(i){return i.distance});

      // island of inaccessable regions, just remove them...
      if(typeof u == 'number'){
        //_.each(not_handled, function(i){ i.country.stage.removeChild(i.presence); delete i;})
        not_hendled = [];
        return {queue: queue, pi: pi};
      }
      _.each(u.neighbors, function(v){
        found_path_length = queue[u.pid].distance + distance(queue[u.pid], queue[v.pid]);

        if(queue[v.pid].distance > found_path_length){
          queue[v.pid].distance = found_path_length;
          pi[v.pid] = u.pid;
        }
      });
      queue[u.pid].handled = true;

    }
    return {queue: queue, pi: pi}
  }
};
