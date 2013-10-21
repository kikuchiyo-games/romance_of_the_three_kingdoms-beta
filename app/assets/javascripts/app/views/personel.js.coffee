class window.PersonelView extends window.FormView
  render: ->
    $('#view-content').html(_.template($('#personel-index-template').html(), {}))
