class App.AttackMenu extends Backbone.View
  el: '#attack_menu'
  events:
    'click [data-action="dual"]': 'dual'
    'click [data-action="charge"]': 'charge'
    'click [data-action="assault"]': 'assault'
    'click [data-action="bribe"]': 'bribe'
    'click [data-action="close"]': 'close'

  initialize: (options)->
    @unit = options.unit
    @container = '#attack_menu-container'
    @region_animation = options.region_animation
    $(@container).append($(_.template('#attack_menu-template', {general:options.unit.general})).html())
    @$el = $('#attack_menu')
    @delegateEvents()
    @

  dual: (event)->
    alert('so you wanna dual eh?')

  close: (event)->
    @region_animation.close_attack_menu()

  charge: (event)->
    @region_animation.skirmish()

  assault: (event)->
    alert('so you wanna assault eh?')

  bribe: (event)->
    alert('so you wanna bribe eh?')

  destroy: ->
    $('#attack_menu').slideToggle()
    @undelegateEvents()
    @$el.removeData().unbind()
    Backbone.View.prototype.remove.call(@)
