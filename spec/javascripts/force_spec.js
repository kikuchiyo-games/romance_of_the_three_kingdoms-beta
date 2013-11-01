require('./spec_helper.js')

describe('Force', function(){
  it('initializes without any input', function(){
    expect(function(){new Force()}).not.to.throw();
  }); 
});
