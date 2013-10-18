jQuery.ajaxSetup({
  'beforeSend': ( (xhr) -> xhr.setRequestHeader("Accept", "text/javascript") )
})

$(document).ready ->

  _.templateSettings = { interpolate: /\{\{([\s\S]+?)\}\}/g }

  views = {
    'civil': new CivilView,
    'development': new DevelopmentView,
    'diplomacy': new DiplomacyView,
    'info': new InfoView,
    'market': new MarketView,
    'military': new MilitaryView,
    'move': new MoveView,
    'personel': new PersonelView,
    'report': new ReportView
  }

  window.nav_view = new window.NavigationView({el: '#navigation_view', subviews: views})
  $('[data-toggle="tooltip"]').tooltip()
