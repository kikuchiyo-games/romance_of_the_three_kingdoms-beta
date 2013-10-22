class App.MoveView extends App.FormView
  render: ->
    $('#view-content').html(_.template($('#move-index-template').html(), {}))
