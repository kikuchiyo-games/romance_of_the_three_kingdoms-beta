require('./spec_helper.js')

describe('Battlefield', function(){
  it('does not initialize without map data', function(){
    expect(function(){new Battlefield({map_data: {}})}).to.throw('Battlefield cannot be initialized without MapData');
  }); 
}); 
