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
  end
end
