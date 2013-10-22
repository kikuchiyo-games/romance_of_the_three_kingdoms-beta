class App.PersonelView extends App.FormView
  render: ->
    $('#view-content').html(_.template($('#personel-index-template').html(), {}))
