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

    $('#view-content').prepend(_.template($('#report-request-info-template').html(), {type: type, subject: options.subject, message: options.message}))

  request_action: (options)->
    $('#report-index').remove()
    $('#view-content').prepend(_.template($('#report-action-required-template').html(), {type: 'danger', message: options.message}))
  
  standard_report: (options)->
    $('#report-index').remove()
    $('#view-content').prepend(_.template($('#report-index-template').html(), {type: options.type, message: options.message}))

  report_details: (options)->
    $('#report-details-container').remove()
    $('#view-content').prepend(_.template( $( '#report-details-container-template' ).html(), { } ) )

    for detail in options
      $('#report-details-container').prepend(_.template($('#report-details-item-template').html(), {type: detail.type, message: detail.message, subject: detail.subject}))

  close_details: ->
    $(@el).find('#report-details-container').addClass('bounceOut')

  close: ->
    $(@el).find('.report-view').addClass('flipOutX')

  invalid_input: (type, value)->
    @report_details([{ type: 'danger', subject: 'invalid input', message: "\"#{value}\" is not an #{type}" }])

  no_general_selected: ->
    @report_details([{ type: 'danger', subject: 'invalid input', message: "select one or more generals to carry out the task" }])

  report_resource_details: (options) ->
    @report_details([
      { type: 'warning', subject: "#{options.decrease} decreased!", message: "#{options.decrease} decreased by #{options.decreased_by}" },
      { type: 'success', subject: "#{options.increase} increased!", message: "#{options.increase} increased by #{options.increased_by}" }
    ])

