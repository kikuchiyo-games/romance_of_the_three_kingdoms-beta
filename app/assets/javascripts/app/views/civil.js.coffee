class App.CivilView extends App.FormView
  events:
    'click .general_assignment_form-civil': 'open_general_assignment_form'
    'click .implement-give_rice_to_the_peopling': 'give_rice'
    'click .implement-give_gold_to_the_peopling': 'give_gold'
    'click .implement-tax_the_peopling': 'tax'
    'click .implement-patrol_for_the_peopling': 'patrol'

  initialize: ->
    _.bindAll @, ['render']
    @view_name = 'civil'
    @view_attribute = 'charm'

    @fake_generals = [
      { id: 1, charm: '18%', leadership: '95%', name: 'lu bu', war: '100%', avatar: 'assets/avatar-lu_bu.jpeg' },
      { id: 2, charm: '95%', leadership: '98%', name: 'cao cao', war: '90%', avatar: 'assets/avatar-cao_cao.jpg' },
      { id: 3, charm: '80%', leadership: '95%', name: 'zhang liao', war: '91%', avatar: 'assets/avatar-zhang_liao.jpeg' },
      { id: 8, charm: '90%', leadership: '90%', name: 'xun yu', war: '50%', avatar: 'assets/avatar-xun-yu.jpeg'  }
    ]
    @

  give_rice: ->
    value = $('#civil_value').val()
    if @verify_form('integer', value)
      @render()
      App.nav_view.sub_views['report'].report_resource_details(decrease: 'rice reserves', increase: 'the people\'s loyalty', decreased_by: value, increased_by: '5%')

  give_gold: ->
    value = $('#civil_value').val()
    if @verify_form('integer', value)
      @render()
      App.nav_view.sub_views['report'].report_resource_details(decrease: 'gold reserves', increase: 'the people\'s loyalty', decreased_by: value, increased_by: '5%')

  tax: ->
    value = $('#civil_value').val()
    if @verify_form('integer', value)
      @render()
      App.nav_view.sub_views['report'].report_resource_details(increase: 'gold reserves', decrease: 'the people\'s loyalty', decreased_by: '10%', increased_by: @taxed_amount(value))

  patrol: ->
    @render()
    App.nav_view.sub_views['report'].standard_report(type: 'success', subject: 'patroling for the people was successful!', message: "public safety has increased by 10%")

  taxed_amount: (tax_rate) ->
    # temporary population setting
    population = 10000
    return population * ( tax_rate / 100 )
