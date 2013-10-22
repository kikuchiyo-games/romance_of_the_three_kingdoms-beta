class App.InfoView extends App.FormView
  el: 'body'

  events:
    'click .table-scroller': 'scroll_info'
 
  scroll_info: (event) ->
    $(event.currentTarget).parent().parent().parent().parent().parent().find('tbody').slideToggle('fast')
    $(event.currentTarget).parent().parent().parent().parent().parent().find('tfoot').toggleClass('closed')

  render: ->
    $('#view-content').html(_.template($('#info-index-template').html(), @fake_province ))

  initialize: ->
    _.bindAll @, ['render' ]
    @fake_province = {
      prefect: 'zhang Liao',
      advisor: 'xun yu',
      populace: '1,000,000',
      loyalty: '95/100',
      safety: '87/100',
      gold: '10,583',
      rice: '100,381',
      troops: '100,000',
      generals: '02',
      free_generals: '00',
      castle_defenses: '60/100',
      land: '90/100',
      flood: '10/100',
      earthquake: '01/100',
      fire: '00/100',
      merchants_present: 'yes',
    }
    @render()
    @
# http://www.dsw.com/shoe/sperry+top-sider+leeward+boat+shoe?prodId=263643&productRef=SEARCH
# Plaza de Northridge
# 19500 Plummer Street
# Northridge CA 91324
