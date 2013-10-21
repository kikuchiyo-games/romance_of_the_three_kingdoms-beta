class window.FormView extends Backbone.View
  el: '#view-content'

  verify_input: (type, value) ->
    if type == 'integer'
      return value.match(/^\d+$/)
    return false

  list_generals_actions: (template, action, attribute)->
    if !attribute.match /intelligence|charm|war|politics/
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

  list_generals: (template, action, attribute)->
    for general in @fake_generals
      $('#view-content .well').append(
        _.template($(template).html(),
        { general: general, attribute: { name: attribute, value: general[attribute] } }
        )
      )

  open_info_dialog: (options)->
    action = options.action.split('_').join(' ')
    window.nav_view.sub_views['report'].request_info(subject: "#{action}", message: "who will #{action}?")
    if options.details?
      $("##{@view_name}_details").html(_.template($("##{@view_name}-details-template").html(), {details: options.details}))

  open_general_assignment_form: (event)->
    action = $(event.currentTarget).attr('data-action')
    details = $(event.currentTarget).attr('data-details')

    @open_container( {action:action, view_name: @view_name} )
    @open_info_dialog({action: action, details: details})

    if @view_name == 'civil'
      @list_generals_actions('#development-general-template', action, '')
    else
      @list_generals('#development-general-template', action, @view_attribute)

  open_container: (options) ->
    $('#view-content').html(_.template($("##{options.view_name}-container-template").html(), {button: options.action, action:"#{options.action.replace(/[aeiou]$/, '').replace( /\s/g, '_')}ing"}))

  render: ->
    $('#view-content').html(_.template($("##{@view_name}-index-template").html(), {}))

  generals: ->
    $('#view-content input:checked').each ->
      console.log($(this).attr('data-value'))
