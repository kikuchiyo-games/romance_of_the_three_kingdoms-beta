class window.NavigationView extends Backbone.View

  el: '#navigation_view'

  initialize: (options)->
    @sub_views = options.subviews
    @

  events:
    'click .new-view': 'render'
 
  hide_details: ->
    $('#view-content').removeClass('slideInRight').addClass('fadeOut')

  show_details: ->
    $('#view-content').removeClass('fadeOut').addClass('fadeIn')

  reset_active_nav: (target) ->
    $(target).parent().find('li.active').removeClass('active')
    $(target).addClass('active')
    @hide_details()

  render: (event) ->
    @reset_active_nav(event.currentTarget)
    setTimeout(@sub_views[$(event.currentTarget).attr('data-view')].render, 900)
    setTimeout(@show_details, 1100)
