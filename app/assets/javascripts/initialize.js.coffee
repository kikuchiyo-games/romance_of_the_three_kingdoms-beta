jQuery.ajaxSetup({
  'beforeSend': ( (xhr) -> xhr.setRequestHeader("Accept", "text/javascript") )
})

$(document).ready ->
  _.templateSettings = { interpolate: /\{\{([\s\S]+?)\}\}/g }

  views = {
    'civil': new App.CivilView,
    'development': new App.DevelopmentView,
    'diplomacy': new App.DiplomacyView,
    'info': new App.InfoView,
    'market': new App.MarketView,
    'military': new App.MilitaryView,
    'move': new App.MoveView,
    'personel': new App.PersonelView,
    'report': new App.ReportView
  }

  App.nav_view = new App.NavigationView({el: '#navigation_view', subviews: views})
  $('[data-toggle="tooltip"]').tooltip()
