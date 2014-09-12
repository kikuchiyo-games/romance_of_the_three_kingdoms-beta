class App.MarketView extends App.FormView
  events:
    'click .general_assignment_form-market': 'open_general_assignment_form'
    'click .implement-buy_ricing': 'buy_rice'
    'click .implement-sell_ricing': 'sell_rice'

  initialize: ->
    _.bindAll @, ['render']
    @view_attribute = 'charm'
    @view_name = 'market'

    @fake_generals = [
      { intelligence: '85%', charm: '80%', leadership: '95%', name: 'zhang liao', war: '91%', avatar: '/assets/avatar-zhang_liao.jpeg' },
      { intelligence: '95%', charm: '90%', leadership: '90%', name: 'xun yu', war: '50%', avatar: '/assets/avatar-xun-yu.jpeg' }
    ]
    @

  buy_rice: ->
    value = $('#market_value').val()
    if @verify_form('integer', value)
      @render()
      App.nav_view.sub_views['report'].report_resource_details(decrease: 'gold reserves', increase: 'rice reserves', decreased_by: value, increased_by: '5%')

  sell_rice: ->
    value = $('#market_value').val()
    if @verify_form('integer', value)
      @render()
      App.nav_view.sub_views['report'].report_resource_details(decrease: 'rice reserves', increase: 'gold reserves', decreased_by: value, increased_by: '5%')
