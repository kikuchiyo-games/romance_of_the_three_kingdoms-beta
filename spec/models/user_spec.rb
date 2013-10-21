require 'spec_helper'

describe User do
  before :each do
    @user = User.new
  end
  describe 'with a game' do
    before :each do
      @game = Game.new
    end
    it 'can assign the game to itself' do
      @user.game = @game
      @user.save!
      @user.game.should == @game
    end
  end
end
