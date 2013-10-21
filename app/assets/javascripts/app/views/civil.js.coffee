class window.CivilView extends window.FormView
  events:
    'click .general_assignment_form-civil': 'open_general_assignment_form'
    'click .implement-give_rice_to_the_peopling': 'give_rice'
    'click .implement-give_gold_to_the_peopling': 'give_gold'
    'click .implement-tax_the_peopling': 'tax'
    'click .implement-patrol_for_the_peopling': 'patrol'

  initialize: ->
    _.bindAll @, ['render']
    @view_name = 'civil'
    @view_attribute = 'charm'

    @fake_generals = [
      { id: 1, charm: '18%', leadership: '95%', name: 'lu bu', war: '100%', avatar: 'assets/avatar-lu_bu.jpeg' },
      { id: 2, charm: '95%', leadership: '98%', name: 'cao cao', war: '90%', avatar: 'assets/avatar-cao_cao.jpg' },
      { id: 3, charm: '80%', leadership: '95%', name: 'zhang liao', war: '91%', avatar: 'assets/avatar-zhang_liao.jpeg' },
      { id: 8, charm: '90%', leadership: '90%', name: 'xun yu', war: '50%', avatar: 'assets/avatar-xun-yu.jpeg'  }
    ]
    @

  give_rice: ->
    value = $('#civil_value').val()
    if @verify_input('integer', value)
      @render()
      window.nav_view.sub_views['report'].report_details([
        { type: 'success', subject: 'the peoples loyalty increased!', message: 'the people have gained trust in you.  loyalty has increased by 10%!' },
        { type: 'warning', subject: 'rice reserves decreased!', message: "rice has decreased by #{value}" }
      ])
    else
      window.nav_view.sub_views['report'].invalid_input('integer', value)

  give_gold: ->
    value = $('#civil_value').val()
    @generals()
    if @verify_input('integer', value)
      @render()
      window.nav_view.sub_views['report'].report_details([
        { type: 'success', subject: 'the peoples loyalty increased!', message: 'the people have gained trust in you.  loyalty has increased by 10%!' },
        { type: 'warning', subject: 'gold reserves decreased!', message: "gold has decreased by #{value}" }
      ])
    else
      window.nav_view.sub_views['report'].invalid_input('integer', value)

  tax: ->
    value = $('#civil_value').val()
    if @verify_input('integer', value)
      @render()
      window.nav_view.sub_views['report'].report_details([
        { type: 'success', subject: 'gold reserves increased!', message: "gold has increased by #{value}" },
        { type: 'warning', subject: 'the peoples loyalty decreased!', message: "the people have lost trust in you.  loyalty has decreased by 10%!" }
      ])
    else
      window.nav_view.sub_views['report'].invalid_input('integer', value)

  patrol: ->
    @render()
    window.nav_view.sub_views['report'].standard_report(type: 'success', subject: 'patroling for the people was successful!', message: "public safety has increased by 10%")
