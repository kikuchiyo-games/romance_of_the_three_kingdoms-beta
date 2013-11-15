class App.ReportView extends Backbone.View
  el: '#view-content'

  initialize: (options)->
    @

  events:
    'click button.closer': 'close'
    'click button.details-closer': 'close_details'

  request_info: (options)->
    if options.type?
      type = options.type
    else
      type = 'info'

    $('#view-content').prepend(_.template($('#report-request-info-template').html(), {type: type, subject: options.subject, message: options.message, messenger: options.messenger}))

  request_action: (options)->
    $('#report-index').remove()
    $('#view-content').prepend(_.template($('#report-action-required-template').html(), {type: 'danger', message: options.message, messenger: options.messenger}))
  
  standard_report: (options)->
    $('#report-index').remove()
    $('#view-content').prepend(_.template($('#report-index-template').html(), {type: options.type, message: options.message, messenger: options.messenger}))

  report_details: (options)->
    $('#report-details-container').remove()
    $('#view-content').prepend(_.template( $( '#report-details-container-template' ).html(), { } ) )

    for detail in options
      $('#report-details-container').prepend(_.template($('#report-details-item-template').html(), {type: detail.type, message: detail.message, subject: detail.subject, messenger: detail.messenger}))

  close_details: ->
    $(@el).find('#report-details-container').addClass('bounceOut')

  close: ->
    $(@el).find('.report-view').addClass('flipOutX')

  invalid_input: (type, value, messenger)->
    @report_details([{ type: 'danger', subject: 'invalid input', message: "\"#{value}\" is not an #{type}", messenger: messenger }])

  no_general_selected: (messenger)->
    @report_details([{ type: 'danger', subject: 'invalid input', message: "select one or more generals to carry out the task", messenger: messenger }])

  report_resource_details: (options) ->
    @report_details([
      { type: 'warning', subject: "#{options.decrease} decreased!", message: "#{options.decrease} decreased by #{options.decreased_by}", messenger: options.messenger },
      { type: 'success', subject: "#{options.increase} increased!", message: "#{options.increase} increased by #{options.increased_by}", messenger: options.messenger }
    ])

