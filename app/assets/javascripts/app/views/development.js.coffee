class window.DevelopmentView extends window.FormView
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

    @fake_generals = [
      { intelligence: '85%', charm: '80%', leadership: '95%', name: 'zhang liao', war: '91%', avatar: 'assets/avatar-zhang_liao.jpeg' },
      { intelligence: '95%', charm: '90%', leadership: '90%', name: 'xun yu', war: '50%', avatar: 'assets/avatar-xun-yu.jpeg'  }
    ]
    @

  land_invest: ->
    value = $('#development_value').val()
    if @verify_input('integer', value)
      @render()
      window.nav_view.sub_views['report'].report_details([
        { type: 'warning', subject: 'gold reserves decreased!', message: "gold has decreased by #{value}" },
        { type: 'success', subject: 'land quality has increased!', message: "land quality has increased by 5%" }
      ])
    else
      window.nav_view.sub_views['report'].invalid_input('integer', value)

  commerce_invest: ->
    value = $('#development_value').val()
    if @verify_input('integer', value)
      @render()
      window.nav_view.sub_views['report'].report_details([
        { type: 'warning', subject: 'gold reserves decreased!', message: "gold has decreased by #{value}" },
        { type: 'success', subject: 'commerce has increased!', message: "commerce has increased by 5%" }
      ])
    else
      window.nav_view.sub_views['report'].invalid_input('integer', value)

  flood_protection: ->
    value = $('#development_value').val()
    if @verify_input('integer', value)
      @render()
      window.nav_view.sub_views['report'].report_details([
        { type: 'warning', subject: 'gold reserves decreased!', message: "gold has decreased by #{value}" },
        { type: 'success', subject: 'flood control has increased!', message: "flood control increased by 5%" }
      ])
    else
      window.nav_view.sub_views['report'].invalid_input('integer', value)

  fire_protection: ->
    value = $('#development_value').val()
    if @verify_input('integer', value)
      @render()
      window.nav_view.sub_views['report'].report_details([
        { type: 'warning', subject: 'gold reserves decreased!', message: "gold has decreased by #{value}" },
        { type: 'success', subject: 'fire control has increased!', message: "fire control increased by 5%" }
      ])
    else
      window.nav_view.sub_views['report'].invalid_input('integer', value)

  earthquake_protection: ->
    value = $('#development_value').val()
    if @verify_input('integer', value)
      @render()
      window.nav_view.sub_views['report'].report_details([
        { type: 'warning', subject: 'gold reserves decreased!', message: "gold has decreased by #{value}" },
        { type: 'success', subject: 'earthquake control has increased!', message: "earthquake control increased by 5%" }
      ])
    else
      window.nav_view.sub_views['report'].invalid_input('integer', value)
