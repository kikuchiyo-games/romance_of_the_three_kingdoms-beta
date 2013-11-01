require('./spec_helper.js')

describe('Scout', function(){

  it('will not instantiate without a general', function(){
    expect(function(){new Scout({general: {}})}).to.throw('Scout cannot be initialized without a General');
  }); 

  it('has access to djkistra algorithm for computing shortest paths', function(){
    var scout = new Scout({general: new General({force: new Force()})});
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
    
    var start_node = nodes[0];
    delete nodes[0];

    paths = {
      'upper-middle': 'upper-left',
      'upper-right': 'upper-middle',
      'lower-left': 'upper-left',
      'lower-middle': 'upper-left',
      'lower-right': 'lower-middle'
    };

    scout.calculate_paths(start_node, nodes);
    expect(scout.paths.pi['upper-left']).to.eq(paths['upper-left']);
    expect(scout.paths.pi['upper-middle']).to.eq(paths['upper-middle']);
    expect(scout.paths.pi['upper-right']).to.eq(paths['upper-right']);
    expect(scout.paths.pi['lower-middle']).to.eq(paths['lower-middle']);
    expect(scout.paths.pi['lower-right']).to.eq(paths['lower-right']);
  }); 
}); 
