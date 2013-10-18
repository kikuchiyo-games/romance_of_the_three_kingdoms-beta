class window.PersonelView extends Backbone.View
  render: ->
    $('#view-content').html(_.template($('#personel-index-template').html(), {}))
