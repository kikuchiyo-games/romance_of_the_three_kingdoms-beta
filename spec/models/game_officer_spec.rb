require 'spec_helper'

describe GameOfficer do
  before :each do
    @game_01_xu_yu = FactoryGirl.create(:game_officer, surname: 'xu', given_name: 'yu')
    @game_02_xu_yu = FactoryGirl.create(:game_officer, surname: 'xu', given_name: 'yu')
  end
  context 'with associated games' do
    before :each do
      @game_01 = FactoryGirl.create(:game)
      @game_01_xu_yu.game = @game_01
      @game_01_xu_yu.save!

      @game_02 = FactoryGirl.create(:game)
      @game_02_xu_yu.game = @game_02
      @game_02_xu_yu.save!
    end
    it 'belongs to expected game' do
      @game_01.game_officers.should == [@game_01_xu_yu]
      @game_02.game_officers.should == [@game_02_xu_yu]

      @game_01.game_officers.should_not == [@game_02_xu_yu]
      @game_02.game_officers.should_not == [@game_01_xu_yu]
    end
  end
end
