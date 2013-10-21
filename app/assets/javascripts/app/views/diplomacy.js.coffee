class window.DiplomacyView extends Backbone.View
  el: '#view-content'

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
    @fake_generals = [
      { charm: '80%', leadership: '95%', name: 'zhang liao', war: '91%', avatar: 'assets/avatar-zhang_liao.jpeg' },
      { charm: '90%', leadership: '90%', name: 'xun yu', war: '50%', avatar: 'assets/avatar-xun-yu.jpeg'  }
    ]
    @

  render: ->
    $('#view-content').html(_.template($('#diplomacy-index-template').html(), {}))

  open_general_assignment_form: (event)->
    action = $(event.currentTarget).attr('data-action')
    details = $(event.currentTarget).attr('data-details')

    @open_diplomacy_container( {action:action} )
    @open_info_dialog({action: action, details: details})
    @list_generals('#diplomacy-general-template', action)

  open_info_dialog: (options)->
    action = options.action.split('_').join(' ')
    window.nav_view.sub_views['report'].request_info(subject: "#{action}", message: "who will #{action}?")
    if options.details?
      $('#diplomacy_details').html(_.template($('#diplomacy-details-template').html(), {details: options.details}))

  open_diplomacy_container: (options) ->
    $('#view-content').html(_.template($('#diplomacy-container-template').html(), {button: options.action, action:"#{options.action.replace(/[aeiou]$/, '').replace( /\s/g, '_')}ing"}))

  list_generals: (template, action)->
    if action.match /patrol/
      attribute = 'war'
    else
      attribute = 'charm'

    for general in @fake_generals
      $('#view-content .well').append(
        _.template($(template).html(),
        { general: general, attribute: { name: attribute, value: general[attribute] } }
        )
      )

  ally: ->
    value = $('#diplomacy_value').val()
    @render()
    window.nav_view.sub_views['report'].report_details([
      { type: 'success', subject: 'the peoples loyalty increased!', message: 'the people have gained trust in you.  loyalty has increased by 10%!' },
      { type: 'warning', subject: 'rice reserves decreased!', message: "rice has decreased by #{value}" }
    ])

  joint: ->
    value = $('#diplomacy_value').val()
    @render()
    window.nav_view.sub_views['report'].report_details([
      { type: 'success', subject: 'the peoples loyalty increased!', message: 'the people have gained trust in you.  loyalty has increased by 10%!' },
      { type: 'warning', subject: 'rice reserves decreased!', message: "rice has decreased by #{value}" }
    ])

  threat: ->
    value = $('#diplomacy_value').val()
    @render()
    window.nav_view.sub_views['report'].report_details([
      { type: 'success', subject: 'the peoples loyalty increased!', message: 'the people have gained trust in you.  loyalty has increased by 10%!' },
      { type: 'warning', subject: 'rice reserves decreased!', message: "rice has decreased by #{value}" }
    ])

  marry: ->
    value = $('#diplomacy_value').val()
    @render()
    window.nav_view.sub_views['report'].report_details([
      { type: 'success', subject: 'the peoples loyalty increased!', message: 'the people have gained trust in you.  loyalty has increased by 10%!' },
      { type: 'warning', subject: 'rice reserves decreased!', message: "rice has decreased by #{value}" }
    ])

  gift: ->
    value = $('#diplomacy_value').val()
    @render()
    window.nav_view.sub_views['report'].report_details([
      { type: 'success', subject: 'the peoples loyalty increased!', message: 'the people have gained trust in you.  loyalty has increased by 10%!' },
      { type: 'warning', subject: 'gold reserves decreased!', message: "gold has decreased by #{value}" }
    ])

  mediate: ->
    value = $('#diplomacy_value').val()
    @render()
    window.nav_view.sub_views['report'].report_details([
      { type: 'success', subject: 'the peoples loyalty increased!', message: 'the people have gained trust in you.  loyalty has increased by 10%!' },
      { type: 'warning', subject: 'gold reserves decreased!', message: "gold has decreased by #{value}" }
    ])

  investigate: ->
    value = $('#diplomacy_value').val()
    @render()
    window.nav_view.sub_views['report'].report_details([
      { type: 'success', subject: 'the peoples loyalty increased!', message: 'the people have gained trust in you.  loyalty has increased by 10%!' },
      { type: 'warning', subject: 'gold reserves decreased!', message: "gold has decreased by #{value}" }
    ])

  assassinate: ->
    value = $('#diplomacy_value').val()
    @render()
    window.nav_view.sub_views['report'].report_details([
      { type: 'success', subject: 'the peoples loyalty increased!', message: 'the people have gained trust in you.  loyalty has increased by 10%!' },
      { type: 'warning', subject: 'gold reserves decreased!', message: "gold has decreased by #{value}" }
    ])

  kidnap: ->
    value = $('#diplomacy_value').val()
    @render()
    window.nav_view.sub_views['report'].report_details([
      { type: 'success', subject: 'the peoples loyalty increased!', message: 'the people have gained trust in you.  loyalty has increased by 10%!' },
      { type: 'warning', subject: 'gold reserves decreased!', message: "gold has decreased by #{value}" }
    ])

  request_prisoner_release: ->
    value = $('#diplomacy_value').val()
    @render()
    window.nav_view.sub_views['report'].report_details([
      { type: 'success', subject: 'gold reserves increased!', message: "gold has increased by #{value}" },
      { type: 'warning', subject: 'the peoples loyalty decreased!', message: "the people have lost trust in you.  loyalty has decreased by 10%!" }
    ])

  prison_break: ->
    value = $('#diplomacy_value').val()
    @render()
    window.nav_view.sub_views['report'].report_details([
      { type: 'success', subject: 'gold reserves increased!', message: "gold has increased by #{value}" },
      { type: 'warning', subject: 'the peoples loyalty decreased!', message: "the people have lost trust in you.  loyalty has decreased by 10%!" }
    ])
