class window.MarketView extends window.FormView
  events:
    'click .general_assignment_form-market': 'open_general_assignment_form'
    'click .implement-buy_ricing': 'buy_rice'
    'click .implement-sell_ricing': 'sell_rice'

  initialize: ->
    _.bindAll @, ['render']
    @view_attribute = 'charm'
    @view_name = 'market'

    @fake_generals = [
      { intelligence: '85%', charm: '80%', leadership: '95%', name: 'zhang liao', war: '91%', avatar: 'assets/avatar-zhang_liao.jpeg' },
      { intelligence: '95%', charm: '90%', leadership: '90%', name: 'xun yu', war: '50%', avatar: 'assets/avatar-xun-yu.jpeg' }
    ]
    @

  buy_rice: ->
    value = $('#market_value').val()
    if @verify_input('integer', value)
      @render()
      window.nav_view.sub_views['report'].report_details([
        { type: 'warning', subject: 'gold reserves decreased!', message: "gold has decreased by #{value}" },
        { type: 'success', subject: 'rice reserves increased!', message: "rice reserves have increased by 5%" }
      ])
    else
      window.nav_view.sub_views['report'].invalid_input('integer', value)

  sell_rice: ->
    value = $('#development_value').val()
    if @verify_input('integer', value)
      @render()
      window.nav_view.sub_views['report'].report_details([
        { type: 'warning', subject: 'rice reserves decreased!', message: "rice reserves have decreased by #{value}" },
        { type: 'success', subject: 'gold reserves increased!', message: "gold has increased by 500" }
      ])
    else
      window.nav_view.sub_views['report'].invalid_input('integer', value)
