require 'spec_helper'

describe GameProvince do
  before :each do
    @game_province = FactoryGirl.create(:game_province)
  end
  context 'with multiple games going on' do
    before :each do
      @game_01 = FactoryGirl.create(:game)
      @game_02 = FactoryGirl.create(:game)
    end
    describe 'belonging to one game' do
      before :each do
        @game_province.game = @game_01
      end
      describe 'having multiple officers' do
        before :each do
          @officer_set_01 = [ 
            FactoryGirl.create(:game_officer, surname: 'xu'), 
            FactoryGirl.create(:game_officer, surname: 'yu')
          ]

          @officer_set_02 = [ 
            FactoryGirl.create(:game_officer, surname: 'xu'), 
            FactoryGirl.create(:game_officer, surname: 'yu')
          ]
          @game_province.game_officers = @officer_set_01
          @game_province.save!
        end
        it 'has expected officers' do
          @game_province.game_officers.should == @officer_set_01
          @game_province.game_officers.should_not == @officer_set_02
        end
      end
    end
  end
end
