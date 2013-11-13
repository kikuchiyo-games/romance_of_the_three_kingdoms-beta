require 'spec_helper'

describe ProvinceSafetyPatrolsController do
  before :each do
    @province = FactoryGirl.create(:province)
    @general = FactoryGirl.create(:officer)
  end
   
  it "has an update action" do
    @province.safety.should == 10
    lambda{ get :update, {game_province_id: @province.id, generals: [@general.id]} }.should_not raise_error

    # @province does not update after the save, so I have to reset it...
    @province = Province.find(@province.id)
    ( @province.safety > 10 ).should be_true
  end 
end 
