require(['./spec_helper.js'], function(){
  describe('Unit', function(){
    describe('instantiation', function(){
      it('will not instantiate without a general', function(){
        expect(function(){new Unit({})}).to.throw('Unit cannot be initialized without a General');
      });   
  
      it('will instantiate with a general', function(){
        expect(function(){new Unit({general: new General({force: new Force()})})}).not.to.throw('Unit cannot be initialized without a General');
      });
    }); 
  
    describe('with only four methods', function(){
      it('responds to move()', function(){
        expect(function(){new Unit({general: new General({force: new Force()})}).move()}).not.to.throw();
      });
      it('responds to attack()', function(){
        expect(function(){new Unit({general: new General({force: new Force()})}).attack()}).not.to.throw();
      });
      it('responds to start_turn()', function(){
        expect(function(){new Unit({general: new General({force: new Force()})}).start_turn()}).not.to.throw();
      });
      it('responds to stop_turn()', function(){
        expect(function(){new Unit({general: new General({force: new Force()})}).stop_turn()}).not.to.throw();
      });
    })
  });
})
