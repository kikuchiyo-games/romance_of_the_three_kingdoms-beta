describe GameProvinces::ProvinceGeneralsController do
  before :each do
    @province = FactoryGirl.create(:game_province)
    @general = FactoryGirl.create(:zhang_liao)
    @province.game_officers << @general
    @general.game_province = @province
    @general.save!
    @province.save!
  end
   
  it "has an index action" do
    lambda{ get :index, {game_province_id: @province.id} }.should_not raise_error
    generals = JSON.parse(response.body)['generals']
    generals.should_not be_empty
  end 
end 
