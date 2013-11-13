require 'spec_helper'
describe Province do
  before :each do
    @province = FactoryGirl.create(:province)
  end
  context 'with officers' do
    before :each do   
      @officers = [
        FactoryGirl.create(:officer),
        FactoryGirl.create(:officer)
     ]
    end
    it 'has many officers' do
      @province.officers << @officers[0]
      @province.officers << @officers[1]
      @province.save!
      @officers[0].save!
      @officers[1].save!
      @officers[0].province.should == @province
      @officers[1].province.should == @province
      @province.officers.should == @officers
    end
    it "invests in safety" do
      @province.safety.should == 10
      @province.invest_in_safety generals: [@officers[0].id]
      (@province.safety > 10).should be_true
      (@province.safety < 100).should be_true
    end 

    it "invests in land" do
      @province.land.should == 10
      @province.invest_in_land gold: 100, generals: [@officers[0].id]
      (@province.land > 10).should be_true
      (@province.land < 100).should be_true
    end 

    it "invests in flood protection" do
      @province.flood.should == 10
      @province.invest_in_flood_control gold: 100, generals: [@officers[0].id]
      (@province.flood > 10).should be_true
      (@province.flood < 100).should be_true
    end 

    it "invests in fire protection" do
      @province.fire.should == 10
      @province.invest_in_fire_control gold: 100, generals: [@officers[0].id]
      (@province.fire > 10).should be_true
      (@province.fire < 100).should be_true
    end 

  end
end
