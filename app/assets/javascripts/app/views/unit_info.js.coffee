class App.UnitMenu extends Backbone.View
  el: '#unit_menu'
  events:
    'click [data-action="skip-turn"]': 'wait'
    'click [data-action="close"]': 'close'

  initialize: (options)->
    @unit = options.unit
    @container = '#unit_menu-container'
    @region_animation = options.region_animation
    $(@container).append($(_.template('#unit_menu-template', {general:options.unit.general})).html())
    @$el = $('#unit_menu')
    @delegateEvents()
    @

  wait: (event)->
    @close()
    @region_animation.residing_ally.animation.world.active_unit.scout.rest()
    @region_animation.residing_ally.animation.world.next()

  close: (event)->
    @region_animation.close_unit_info_menu()

  destroy: ->
    $('#unit_menu').slideToggle()
    @undelegateEvents()
    @$el.removeData().unbind()
    Backbone.View.prototype.remove.call(@)
