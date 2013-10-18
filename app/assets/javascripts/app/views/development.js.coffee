class window.DevelopmentView extends Backbone.View
  el: '#view-content'

  render: ->
    $('#view-content').html(_.template($('#development-index-template').html(), {}))

  events:
    'click .general_assignment_form-development': 'open_general_assignment_form'
    'click .implement-invest_in_landing': 'land_invest'
    'click .implement-invest_in_commercing': 'commerce_invest'
    'click .implement-invest_in_flood_protectioning': 'flood_protection'
    'click .implement-invest_in_fire_protectioning': 'fire_protection'
    'click .implement-invest_in_earthquake_protectioning': 'earthquake_protection'

  initialize: ->
    @fake_generals = [
      { intelligence: '85%', charm: '80%', leadership: '95%', name: 'zhang liao', war: '91%', avatar: 'assets/avatar-zhang_liao.jpeg' },
      { intelligence: '95%', charm: '90%', leadership: '90%', name: 'xun yu', war: '50%', avatar: 'assets/avatar-xun-yu.jpeg'  }
    ]
    @

  render: ->
    $('#view-content').html(_.template($('#development-index-template').html(), {}))

  open_general_assignment_form: (event)->
    action = $(event.currentTarget).attr('data-action')
    details = $(event.currentTarget).attr('data-details')

    @open_development_container( {action:action} )
    @open_info_dialog({action: action, details: details})
    @list_generals('#development-general-template', action)

  open_info_dialog: (options)->
    action = options.action.split('_').join(' ')
    window.nav_view.sub_views['report'].request_info(subject: "#{action} the people", message: "who will #{action}?")
    if options.details?
      $('#development_details').html(_.template($('#development-details-template').html(), {details: options.details}))

  open_development_container: (options) ->
    $('#view-content').html(_.template($('#development-container-template').html(), {button: options.action, action:"#{options.action.replace(/[aeiou]$/, '').replace( /\s/g, '_')}ing"}))

  list_generals: (template, action)->
    attribute = 'intelligence'

    for general in @fake_generals
      $('#view-content .well').append(
        _.template($(template).html(),
        { general: general, attribute: { name: attribute, value: general[attribute] } }
        )
      )

  land_invest: ->
    value = $('#development_value').val()
    @render()
    window.nav_view.sub_views['report'].report_details([
      { type: 'warning', subject: 'gold reserves decreased!', message: "gold has decreased by #{value}" },
      { type: 'success', subject: 'land quality has increased!', message: "land quality has increased by 5%" }
    ])

  commerce_invest: ->
    value = $('#development_value').val()
    @render()
    window.nav_view.sub_views['report'].report_details([
      { type: 'warning', subject: 'gold reserves decreased!', message: "gold has decreased by #{value}" },
      { type: 'success', subject: 'commerce has increased!', message: "commerce has increased by 5%" }
    ])

  flood_protection: ->
    value = $('#development_value').val()
    @render()
    window.nav_view.sub_views['report'].report_details([
      { type: 'warning', subject: 'gold reserves decreased!', message: "gold has decreased by #{value}" },
      { type: 'success', subject: 'flood control has increased!', message: "flood control increased by 5%" }
    ])

  fire_protection: ->
    value = $('#development_value').val()
    @render()
    window.nav_view.sub_views['report'].report_details([
      { type: 'warning', subject: 'gold reserves decreased!', message: "gold has decreased by #{value}" },
      { type: 'success', subject: 'fire control has increased!', message: "fire control increased by 5%" }
    ])

  earthquake_protection: ->
    value = $('#development_value').val()
    @render()
    window.nav_view.sub_views['report'].report_details([
      { type: 'warning', subject: 'gold reserves decreased!', message: "gold has decreased by #{value}" },
      { type: 'success', subject: 'earthquake control has increased!', message: "earthquake control increased by 5%" }
    ])

