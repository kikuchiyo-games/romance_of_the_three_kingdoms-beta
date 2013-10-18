class window.MilitaryView extends Backbone.View
  el: '#view-content'

  events:
    'click .general_assignment_form': 'open_general_assignment_form'
    'click .implement-training': 'train_troops'
    'click .implement-conscripting': 'conscript_troops'
    'click .implement-drafting': 'draft_troops'
    'click .implement-releasing': 'release_troops'
    'click .implement-equiping': 'equip_troops'

  initialize: ->
    @fake_generals = [
      { charm: '80%', leadership: '95%', name: 'zhang liao', war: '91%', avatar: 'assets/avatar-zhang_liao.jpeg' },
      { charm: '90%', leadership: '90%', name: 'xun yu', war: '50%', avatar: 'assets/avatar-xun-yu.jpeg'  }
    ]
    @

  render: ->
    $('#view-content').html(_.template($('#military-index-template').html(), {}))

  open_general_assignment_form: (event)->
    action = $(event.currentTarget).attr('data-action')
    details = $(event.currentTarget).attr('data-details')

    @open_military_container( {action:action} )
    @open_info_dialog({action: action, details: details})
    @list_generals('#military-training-general-template')

  open_info_dialog: (options)->
    window.nav_view.sub_views['report'].request_info(subject: "#{options.action} troops", message: "who will #{options.action} the troops?")
    if options.details?
      $('#troop_details').html(_.template($('#military-details-template').html(), {details: options.details}))

  open_military_container: (options) ->
    $('#view-content').html(_.template($('#military-container-template').html(), {button: options.action, action:"#{options.action.replace(/[aeiou]$/, '')}ing"}))

  train_troops: ->
    @render()
    window.nav_view.sub_views['report'].standard_report(type: 'success', subject: 'troop training successful!', message: "troop readiness has increased by 3%")

  conscript_troops: ->
    value = $('#military_value').val()
    @render()
    window.nav_view.sub_views['report'].standard_report(type: 'success', subject: 'troop conscripting successful!', message: "troop count has increased by #{value}")

  equip_troops: ->
    value = $('#military_value').val()
    @render()
    window.nav_view.sub_views['report'].standard_report(type: 'success', subject: 'troop equiping successful!', message: "troop arms have increased by #{value}")

   draft_troops: ->
    value = $('#military_value').val()
    @render()
    window.nav_view.sub_views['report'].report_details([
      { type: 'danger', subject: 'the peoples loyalty decreased!', message: 'the people have lost trust in you.  loyalty has decreased by 10%!' },
      { type: 'success', subject: 'troop drafting successful!', message: "troop count has increased by #{value}" }
    ])

   release_troops: ->
    value = $('#military_value').val()
    @render()
    window.nav_view.sub_views['report'].report_details([
      { type: 'success', subject: 'the peoples loyalty increased!', message: 'the people have gained trust in you.  loyalty has increased by 10%!' },
      { type: 'warning', subject: 'troop releasing successful!', message: "troop count has decreased by #{value}" }
    ])

  list_generals: (template)->
    for general in @fake_generals
      $('#view-content .well').append(_.template($(template).html(), general))
