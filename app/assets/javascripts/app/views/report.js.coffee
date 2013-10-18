class window.ReportView extends Backbone.View
  el: '#view-content'

  initialize: (options)->
    # _.bindAll @, ['sta']
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
    $('#view-content').prepend(_.template($('#report-action-required-template').html(), {type: 'danger', message: options.message}))
  
  # DRY THIS UP!!!!
  standard_report: (options)->
    $('#view-content').prepend(_.template($('#report-index-template').html(), {type: options.type, message: options.message}))

  report_details: (options)->
    # render container
    $('#view-content').prepend(_.template( $( '#report-details-container-template' ).html(), { } ) )

    for detail in options
      $('#report-details-container').prepend(_.template($('#report-details-item-template').html(), {type: detail.type, message: detail.message, subject: detail.subject}))

  close_details: ->
    $(@el).find('#report-details-container').addClass('bounceOut')

  close: ->
    $(@el).find('.report-view').addClass('flipOutX')
