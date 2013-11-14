class GameProvinces::ProvinceFloodPreventionsController < ApplicationController
  def update
    province = Province.find params[:game_province_id]
    province.invest_in_flood_control gold: params[:gold].to_i, generals: params[:generals]
    render :json => {}
  end
end
