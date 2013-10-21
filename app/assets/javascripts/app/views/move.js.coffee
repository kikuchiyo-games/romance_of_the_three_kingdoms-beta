class window.MoveView extends window.FormView
  render: ->
    $('#view-content').html(_.template($('#move-index-template').html(), {}))
