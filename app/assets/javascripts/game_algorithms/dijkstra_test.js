// o o o
// o o o

define(['./dijkstra.js'], function(){
  var nodes = [
    {
      coordinates: { x: 0, y: 0 },
      id: 'upper-left'
    }, 
    {
      coordinates: { x: 1, y: 0 },
      id: 'upper-middle'
    }, 
    {
      coordinates: { x: 2, y: 0 },
      id: 'upper-right'
    }, 
    {
      coordinates: { x: 1, y: 0 },
      id: 'lower-left'
    }, 
    {
      coordinates: { x: 1, y: 1 },
      id: 'lower-middle'
    }, 
    {
      coordinates: { x: 1, y: 2 },
      id: 'lower-right',
    } 
  
  ];
  
  nodes[0].neighbors = [nodes[1], nodes[3], nodes[4]]
  nodes[1].neighbors = [nodes[0], nodes[3], nodes[4], nodes[5], nodes[2]]
  nodes[2].neighbors = [nodes[1], nodes[5], nodes[4]]
  nodes[3].neighbors = [nodes[0], nodes[1], nodes[4]]
  nodes[4].neighbors = [nodes[0], nodes[3], nodes[1], nodes[5], nodes[2]]
  nodes[5].neighbors = [nodes[1], nodes[2], nodes[4]]
  
  start_node = nodes[0];
  delete nodes[0];
  
  console.log( Dijkstra.go(start_node, nodes) );
});
