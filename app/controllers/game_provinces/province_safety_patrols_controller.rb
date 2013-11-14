class GameProvinces::ProvinceSafetyPatrolsController < ApplicationController
  def update
    province = GameProvince.find params[:game_province_id]
    province.invest_in_safety generals: params[:generals]
    render :json => {status: 'success', message: "public safety is now at #{province.safety}%"}
  end
end
