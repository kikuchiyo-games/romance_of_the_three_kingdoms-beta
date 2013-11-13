class ProvinceLandInvestmentsController < ApplicationController
  def update
    province = Province.find params[:game_province_id]
    province.invest_in_land gold: params[:gold].to_i, generals: params[:generals]
    render :json => {}
  end
end
