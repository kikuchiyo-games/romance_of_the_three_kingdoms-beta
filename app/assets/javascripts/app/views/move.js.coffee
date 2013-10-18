class window.MoveView extends Backbone.View
  render: ->
    $('#view-content').html(_.template($('#move-index-template').html(), {}))
