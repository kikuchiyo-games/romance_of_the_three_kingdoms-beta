require 'spec_helper'

describe Game do
  before :each do
    @game = Game.new
  end
  describe "belonging to a user" do
    before :each do
      @user = User.new
      @user.game = @game
      @user.save!
    end
    it 'has access to its user' do
      @game.user.should == @user
    end
  end
end
