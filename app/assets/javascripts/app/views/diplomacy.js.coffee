class window.DiplomacyView extends Backbone.View
  render: ->
    $('#view-content').html(_.template($('#diplomacy-index-template').html(), {}))

