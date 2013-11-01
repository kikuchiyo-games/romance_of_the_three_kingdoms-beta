require(['underscore.js', 'mocha.js', 'chai.js', 'spec_helper.js'], function(){
  mocha.ui('bdd');
  mocha.reporter('html');
  expect = chai.expect;
});
