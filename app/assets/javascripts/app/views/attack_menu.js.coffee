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
    $(@container).append($(_.template('#attack_menu-template', {})).html())
    @$el = $('#attack_menu')
    @delegateEvents()
    @

  dual: (event)->
    alert('so you wanna dual eh?')


  close: (event)->
    @region_animation.close_attack_menu()

  charge: (event)->
    alert('so you wanna charge eh?')
    # path_id = parseInt($(event.currentTarget).attr('path_id'))

    # @destination = null

    # self = @

    # _.each( self.battlefield.movement_buttons, ((button) ->
    #   if button.path_id == path_id
    #     self.destination = button
    # ))

    # @destination.attack()

    # close menu
    # move to enemy location - 1
    # detuct points from each -> show sparkles?
    # App.battlefield.ally_unit.move_to_enemy_location_but_stop_one_before()
    # App.battlefield.ally_unit.move_to_enemy_location_but_stop_one_before()

  assault: (event)->
    alert('so you wanna assault eh?')

  bribe: (event)->
    alert('so you wanna bribe eh?')

  destroy: ->
    $('#attack_menu').slideToggle()
    @undelegateEvents()
    @$el.removeData().unbind()
    # @remove()
    Backbone.View.prototype.remove.call(@)
