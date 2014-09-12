class App.DiplomacyView extends App.FormView

  events:
    'click .general_assignment_form-diplomacy': 'open_general_assignment_form'
    'click .implement-ally': 'ally'
    'click .implement-joint': 'joint'
    'click .implement-threat': 'threat'
    'click .implement-marry': 'marry'
    'click .implement-gift': 'gift'
    'click .implement-mediate': 'mediate'
    'click .implement-instigate': 'instigate'
    'click .implement-assassinate': 'assassinate'
    'click .implement-kidnap': 'kidnap'
    'click .implement-request_prisoner_release': 'request_prisoner_release'
    'click .implement-prison_break': 'prison_break'

  initialize: ->
    _.bindAll @, ['render']
    @view_name = 'diplomacy'
    @view_attribute = 'charm'

    @fake_generals = [
      { charm: '80%', leadership: '95%', name: 'zhang liao', war: '91%', avatar: '/assets/avatar-zhang_liao.jpeg' },
      { charm: '90%', leadership: '90%', name: 'xun yu', war: '50%', avatar: '/assets/avatar-xun-yu.jpeg'  }
    ]
    @

  ally: ->
    value = $('#diplomacy_value').val()
    @render()
    # App.nav_view.sub_views['report'].report_resource_details(decrease: 'rice reserves', increase: 'the people\'s loyalty', decreased_by: value, increased_by: '5%')

  joint: ->
    value = $('#diplomacy_value').val()
    @render()
    # App.nav_view.sub_views['report'].report_resource_details(decrease: 'rice reserves', increase: 'the people\'s loyalty', decreased_by: value, increased_by: '5%')

  threat: ->
    value = $('#diplomacy_value').val()
    @render()
    # App.nav_view.sub_views['report'].report_resource_details(decrease: 'rice reserves', increase: 'the people\'s loyalty', decreased_by: value, increased_by: '5%')

  marry: ->
    value = $('#diplomacy_value').val()
    @render()
    # App.nav_view.sub_views['report'].report_resource_details(decrease: 'rice reserves', increase: 'the people\'s loyalty', decreased_by: value, increased_by: '5%')

  gift: ->
    value = $('#diplomacy_value').val()
    @render()
    # App.nav_view.sub_views['report'].report_resource_details(decrease: 'rice reserves', increase: 'the people\'s loyalty', decreased_by: value, increased_by: '5%')

  mediate: ->
    value = $('#diplomacy_value').val()
    @render()
    # App.nav_view.sub_views['report'].report_resource_details(decrease: 'rice reserves', increase: 'the people\'s loyalty', decreased_by: value, increased_by: '5%')

  investigate: ->
    value = $('#diplomacy_value').val()
    @render()
    # App.nav_view.sub_views['report'].report_resource_details(decrease: 'rice reserves', increase: 'the people\'s loyalty', decreased_by: value, increased_by: '5%')

  assassinate: ->
    value = $('#diplomacy_value').val()
    @render()
    # App.nav_view.sub_views['report'].report_resource_details(decrease: 'rice reserves', increase: 'the people\'s loyalty', decreased_by: value, increased_by: '5%')

  kidnap: ->
    value = $('#diplomacy_value').val()
    @render()
    # App.nav_view.sub_views['report'].report_resource_details(decrease: 'rice reserves', increase: 'the people\'s loyalty', decreased_by: value, increased_by: '5%')

  request_prisoner_release: ->
    value = $('#diplomacy_value').val()
    @render()
    # App.nav_view.sub_views['report'].report_resource_details(decrease: 'rice reserves', increase: 'the people\'s loyalty', decreased_by: value, increased_by: '5%')

  prison_break: ->
    value = $('#diplomacy_value').val()
    @render()
    # App.nav_view.sub_views['report'].report_resource_details(decrease: 'rice reserves', increase: 'the people\'s loyalty', decreased_by: value, increased_by: '5%')

