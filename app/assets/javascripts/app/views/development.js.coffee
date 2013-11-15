class App.DevelopmentView extends App.FormView
  events:
    'click .general_assignment_form-development': 'open_general_assignment_form'
    'click .implement-invest_in_landing': 'land_invest'
    'click .implement-invest_in_commercing': 'commerce_invest'
    'click .implement-invest_in_flood_protectioning': 'flood_protection'
    'click .implement-invest_in_fire_protectioning': 'fire_protection'
    'click .implement-invest_in_earthquake_protectioning': 'earthquake_protection'

  initialize: ->
    _.bindAll @, ['render']
    @view_name = 'development'
    @view_attribute = 'intelligence'
    @fake_generals = []
    self = @

    $.ajax(
      type: 'GET',
      url: '/game_provinces/1/province_generals'
      success: (data)->
        _.each( data.generals, ((general)->
          self.fake_generals.push(general)
        ))
        console.log(self.fake_generals)
      error: (data)->
        alert('death')
    )

    @

  land_invest: ->
    value = $('#development_value').val()
    if @verify_form('integer', value)
      @render()
      App.nav_view.sub_views['report'].report_resource_details(decrease: 'gold reserves', increase: 'land quality', decreased_by: value, increased_by: '5%')

  commerce_invest: ->
    value = $('#development_value').val()
    if @verify_form('integer', value)
      @render()
      App.nav_view.sub_views['report'].report_resource_details(decrease: 'gold reserves', increase: 'commerce', decreased_by: value, increased_by: '5%')

  flood_protection: ->
    value = $('#development_value').val()
    if @verify_form('integer', value)
      @render()
      App.nav_view.sub_views['report'].report_resource_details(decrease: 'gold reserves', increase: 'flood control', decreased_by: value, increased_by: '5%')

  fire_protection: ->
    value = $('#development_value').val()
    if @verify_form('integer', value)
      @render()
      App.nav_view.sub_views['report'].report_resource_details(decrease: 'gold reserves', increase: 'fire control', decreased_by: value, increased_by: '5%')

  earthquake_protection: ->
    value = $('#development_value').val()
    if @verify_form('integer', value)
      @render()
      App.nav_view.sub_views['report'].report_resource_details(decrease: 'gold reserves', increase: 'earthquake control', decreased_by: value, increased_by: '5%')
