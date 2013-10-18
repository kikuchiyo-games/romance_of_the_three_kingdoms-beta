class window.MarketView extends Backbone.View

  el: '#view-content'

  render: ->
    $('#view-content').html(_.template($('#market-index-template').html(), {}))

  events:
    'click .general_assignment_form-market': 'open_general_assignment_form'
    'click .implement-buy_ricing': 'buy_rice'
    # 'click .implement-buy_armsing': 'buy_arms'
    'click .implement-sell_ricing': 'sell_rice'

  initialize: ->
    @fake_generals = [
      { intelligence: '85%', charm: '80%', leadership: '95%', name: 'zhang liao', war: '91%', avatar: 'assets/avatar-zhang_liao.jpeg' },
      { intelligence: '95%', charm: '90%', leadership: '90%', name: 'xun yu', war: '50%', avatar: 'assets/avatar-xun-yu.jpeg'  }
    ]
    @

  render: ->
    $('#view-content').html(_.template($('#market-index-template').html(), {}))

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
    attribute = 'charm'

    for general in @fake_generals
      $('#view-content .well').append(
        _.template($(template).html(),
        { general: general, attribute: { name: attribute, value: general[attribute] } }
        )
      )

  buy_rice: ->
    value = $('#development_value').val()
    @render()
    window.nav_view.sub_views['report'].report_details([
      { type: 'warning', subject: 'gold reserves decreased!', message: "gold has decreased by #{value}" },
      { type: 'success', subject: 'rice reserves increased!', message: "rice reserves have increased by 5%" }
    ])

  sell_rice: ->
    value = $('#development_value').val()
    @render()
    window.nav_view.sub_views['report'].report_details([
      { type: 'warning', subject: 'rice reserves decreased!', message: "rice reserves have decreased by #{value}" },
      { type: 'success', subject: 'gold reserves increased!', message: "gold has increased by 500" }
    ])

  # buy_arms: ->
  #   value = $('#development_value').val()
  #   @render()
  #   window.nav_view.sub_views['report'].report_details([
  #     { type: 'warning', subject: 'gold reserves decreased!', message: "gold has decreased by #{value}" },
  #     { type: 'success', subject: 'flood control has increased!', message: "flood control increased by 5%" }
  #   ])
