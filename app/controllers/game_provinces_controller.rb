class GameProvincesController < ApplicationController
  def show  
    @province = GameProvince.find(params[:id])
  end
end
