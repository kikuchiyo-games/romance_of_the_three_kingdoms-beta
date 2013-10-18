class window.CivilView extends Backbone.View
  el: '#view-content'

  events:
    'click .general_assignment_form-civil': 'open_general_assignment_form'
    'click .implement-give_rice_ting': 'give_rice'
    'click .implement-give_gold_ting': 'give_gold'
    'click .implement-taxing': 'tax'
    'click .implement-patrol_foring': 'patrol'

  initialize: ->
    @fake_generals = [
      { charm: '80%', leadership: '95%', name: 'zhang liao', war: '91%', avatar: 'assets/avatar-zhang_liao.jpeg' },
      { charm: '90%', leadership: '90%', name: 'xun yu', war: '50%', avatar: 'assets/avatar-xun-yu.jpeg'  }
    ]
    @

  render: ->
    $('#view-content').html(_.template($('#civil-index-template').html(), {}))

  open_general_assignment_form: (event)->
    action = $(event.currentTarget).attr('data-action')
    details = $(event.currentTarget).attr('data-details')

    @open_civil_container( {action:action} )
    @open_info_dialog({action: action, details: details})
    @list_generals('#civil-general-template', action)

  open_info_dialog: (options)->
    action = options.action.split('_').join(' ')
    window.nav_view.sub_views['report'].request_info(subject: "#{action} the people", message: "who will #{action} the people?")
    if options.details?
      $('#civil_details').html(_.template($('#civil-details-template').html(), {details: options.details}))

  open_civil_container: (options) ->
    $('#view-content').html(_.template($('#civil-container-template').html(), {button: options.action, action:"#{options.action.replace(/[aeiou]$/, '').replace( /\s/g, '_')}ing"}))

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

  give_rice: ->
    value = $('#civil_value').val()
    @render()
    window.nav_view.sub_views['report'].report_details([
      { type: 'success', subject: 'the peoples loyalty increased!', message: 'the people have gained trust in you.  loyalty has increased by 10%!' },
      { type: 'warning', subject: 'rice reserves decreased!', message: "rice has decreased by #{value}" }
    ])

  give_gold: ->
    value = $('#civil_value').val()
    @render()
    window.nav_view.sub_views['report'].report_details([
      { type: 'success', subject: 'the peoples loyalty increased!', message: 'the people have gained trust in you.  loyalty has increased by 10%!' },
      { type: 'warning', subject: 'gold reserves decreased!', message: "gold has decreased by #{value}" }
    ])

  tax: ->
    value = $('#civil_value').val()
    @render()
    window.nav_view.sub_views['report'].report_details([
      { type: 'success', subject: 'gold reserves increased!', message: "gold has increased by #{value}" },
      { type: 'warning', subject: 'the peoples loyalty decreased!', message: "the people have lost trust in you.  loyalty has decreased by 10%!" }
    ])

  #   value = $('#civil_value').val()
  #   @render()
  #   window.nav_view.sub_views['report'].report_details([
  #     { type: 'success', subject: 'the peoples safety increased!', message: 'the peoples safety has increased by 10%!' },
  #   ])
  patrol: ->
    @render()
    window.nav_view.sub_views['report'].standard_report(type: 'success', subject: 'patroling for the people was successful!', message: "public safety has increased by 10%")
