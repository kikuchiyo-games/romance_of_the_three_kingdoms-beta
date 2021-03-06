require 'spec_helper'

describe GameProvinces::ProvinceFirePreventionsController do
  before :each do
    @province = FactoryGirl.create(:province)
    @general = FactoryGirl.create(:officer)
    @gold = 100
  end
   
  it "has an update action" do
    @province.fire.should == 10
    lambda{ get :update, {game_province_id: @province.id, gold: @gold, generals: [@general.id]} }.should_not raise_error

    # @province does not update after the save, so I have to reset it...
    @province = Province.find(@province.id)
    ( @province.fire > 10 ).should be_true
  end 
end 
