require('./spec_helper.js')

describe('General', function(){
  describe('initialization', function(){
    it('will not instantiate without a force', function(){
      expect(function(){new General({force: {}})}).to.throw('General cannot be initialized without a Force');
    }); 

    it('will instantiate with a force', function(){
      expect(function(){new General({force: new Force()})}).not.to.throw('General can be initialized without a Force');
    }); 
  });
}); 
