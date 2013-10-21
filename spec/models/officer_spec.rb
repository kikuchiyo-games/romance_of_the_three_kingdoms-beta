require 'spec_helper'
describe Officer do
  describe "attributes" do
    before :each do
      @officer = FactoryGirl.create(:officer)
      @officer.intelligence = 91
      @officer.politics = 85
      @officer.loyalty = 100
      @officer.charm = 80
      @officer.war = 91
      @officer.save!
    end
  
    it "instantiates with all attributes" do
      @officer.intelligence.should == 91
      @officer.politics.should == 85
      @officer.loyalty.should == 100
      @officer.charm.should == 80
      @officer.war.should == 91
    end 
  end 
end 
