class App.MilitaryView extends App.FormView

  events:
    'click .general_assignment_form': 'open_general_assignment_form'
    'click .implement-training': 'train_troops'
    'click .implement-conscripting': 'conscript_troops'
    'click .implement-drafting': 'draft_troops'
    'click .implement-releasing': 'release_troops'
    'click .implement-equiping': 'equip_troops'

  initialize: ->
    _.bindAll @, ['render']
    @view_attribute = 'war'
    @view_name = 'military'

    @fake_generals = [
      { charm: '80%', leadership: '95%', name: 'zhang liao', war: '91%', avatar: 'assets/avatar-zhang_liao.jpeg' },
      { charm: '90%', leadership: '90%', name: 'xun yu', war: '50%', avatar: 'assets/avatar-xun-yu.jpeg'  }
    ]
    @

  train_troops: ->
    @render()
    App.nav_view.sub_views['report'].standard_report(type: 'success', subject: 'troop training successful!', message: "troop readiness has increased by 3%")

  conscript_troops: ->
    value = $('#military_value').val()

    if @verify_input('integer', value)
      @render()
      App.nav_view.sub_views['report'].standard_report(type: 'success', subject: 'troop conscripting successful!', message: "troop count has increased by #{value}")
    else
      App.nav_view.sub_views['report'].invalid_input('integer', value)

  equip_troops: ->
    value = $('#military_value').val()
    if @verify_input('integer', value)
      @render()
      App.nav_view.sub_views['report'].standard_report(type: 'success', subject: 'troop equiping successful!', message: "troop arms have increased by #{value}")
    else
      App.nav_view.sub_views['report'].invalid_input('integer', value)

   draft_troops: ->
    value = $('#military_value').val()
    if @verify_input('integer', value)
      @render()
      App.nav_view.sub_views['report'].report_details([
        { type: 'danger', subject: 'the peoples loyalty decreased!', message: 'the people have lost trust in you.  loyalty has decreased by 10%!' },
        { type: 'success', subject: 'troop drafting successful!', message: "troop count has increased by #{value}" }
      ])
    else
      App.nav_view.sub_views['report'].invalid_input('integer', value)

   release_troops: ->
    value = $('#military_value').val()
    if @verify_input('integer', value)
      @render()
      App.nav_view.sub_views['report'].report_details([
        { type: 'success', subject: 'the peoples loyalty increased!', message: 'the people have gained trust in you.  loyalty has increased by 10%!' },
        { type: 'warning', subject: 'troop releasing successful!', message: "troop count has decreased by #{value}" }
      ])
    else
      App.nav_view.sub_views['report'].invalid_input('integer', value)
