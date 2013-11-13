class ProvinceSafetyPatrolsController < ApplicationController
  def update
    province = Province.find params[:game_province_id]
    province.invest_in_safety generals: params[:generals]
    render :json => {}
  end
end
