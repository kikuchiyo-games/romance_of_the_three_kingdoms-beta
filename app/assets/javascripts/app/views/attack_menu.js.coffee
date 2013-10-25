class App.AttackMenu extends Backbone.View
  el: '#attack_menu'
  events:
    'click [data-action="dual"]': 'dual'
    'click [data-action="charge"]': 'charge'
    'click [data-action="assault"]': 'assault'
    'click [data-action="bribe"]': 'bribe'

  initialize: ->
    @battlefield = App.battlefield
    @

  dual: (event)->
    alert('so you wanna dual eh?')

  charge: (event)->
    path_id = parseInt($(event.currentTarget).attr('path_id'))
    console.log "path_id = #{path_id}"

    @destination = null

    self = @

    _.each( self.battlefield.movement_buttons, ((button) ->
      console.log button.path_id
      if button.path_id == path_id
        self.destination = button
    ))

    @destination.attack()

    # close menu
    # move to enemy location - 1
    # detuct points from each -> show sparkles?
    # App.battlefield.ally_unit.move_to_enemy_location_but_stop_one_before()
    # App.battlefield.ally_unit.move_to_enemy_location_but_stop_one_before()

  assault: (event)->
    alert('so you wanna assault eh?')

  bribe: (event)->
    alert('so you wanna bribe eh?')
