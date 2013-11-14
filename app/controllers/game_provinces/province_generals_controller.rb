class GameProvinces::ProvinceGeneralsController < ApplicationController
  def index
    province = GameProvince.find(params[:game_province_id])
    render :json => { generals: province.game_officers }
  end
end
