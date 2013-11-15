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

    @fake_generals = []
    self = @

    # move this to backbone collection
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

  give_rice: ->
    value = $('#civil_value').val()
    if @verify_form('integer', value)
      @render()
      App.nav_view.sub_views['report'].report_resource_details(decrease: 'rice reserves', increase: 'the people\'s loyalty', decreased_by: value, increased_by: '5%', messenger: @fake_generals[0])

  give_gold: ->
    value = $('#civil_value').val()
    if @verify_form('integer', value)
      @render()
      App.nav_view.sub_views['report'].report_resource_details(decrease: 'gold reserves', increase: 'the people\'s loyalty', decreased_by: value, increased_by: '5%', messenger: @fake_generals[0])

  tax: ->
    value = $('#civil_value').val()
    if @verify_form('integer', value)
      @render()
      App.nav_view.sub_views['report'].report_resource_details(increase: 'gold reserves', decrease: 'the people\'s loyalty', decreased_by: '10%', increased_by: @taxed_amount(value), messenger: @fake_generals[0])

  patrol: ->
    self = @
    if @verify_form('na', null)
      @render()
      generals = []
      _.each(@assigned_generals, (general)->
        generals.push(parseInt($(general).attr('data-value')))
      )

      $.ajax({
        type: 'PUT',
        url: '/game_provinces/1/prevent_crime',
        data: {generals: generals},
        success: (data) ->
          App.nav_view.sub_views['report'].standard_report(type: data.status, subject: 'patroling for the people was successful!', message: data.message, messenger: self.fake_generals[0])
        error: (data) ->
          alert('death')

      })

  taxed_amount: (tax_rate) ->
    # temporary population setting
    population = 10000
    return population * ( tax_rate / 100 )
