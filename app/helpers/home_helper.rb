module HomeHelper
  def province
    {
      name: 'Hei Fei',
      rice: '100,000',
      gold: '100,000',
      water: '100,000',
      loyalty: '100%',
      tax: '1%',
      population: '1 million',
      troops: {
        horse: 100000,
        foot: 400000,
        bow: 10000
      },
      generals: [
        {name: 'Xiahou Dun'},
        {name: 'Cao Cao'}
      ]
    }
  end

  def navigation_buttons
    [
      { title: 'Province', 
        actions: [
          { name: 'Map', link: '#' }, 
          { name: 'Generals', link: '#' }
        ]
      },
      { title: 'Civil', 
        actions: [
          { name: 'Give Away Rice', link: '#' }, 
          { name: 'Tax The People', link: '#' }
        ]
      },
      { title: 'Military', 
        actions: [
          { name: 'Conscript Troops', link: '#' }, 
          { name: 'Draft Troops', link: '#' }
        ]
      },
      { title: 'Diplomacy', 
        actions: [
          { name: 'Ally', link: '#' }, 
          { name: 'Threat', link: '#' }
        ]
      },
      { title: 'Personal', 
        actions: [
          { name: 'Reward', link: '#' }, 
          { name: 'Punish', link: '#' },
          { name: 'Search', link: '#' },
          { name: 'Hire', link: '#' }
        ]
      },
      { title: 'Market', 
        actions: [
          { name: 'Buy Arms', link: '#' }, 
          { name: 'Sell Arms', link: '#' },
          { name: 'Buy Rice', link: '#' }, 
          { name: 'Sell Rice', link: '#' }
        ]
      },
      { title: 'Info', 
        actions: [
        ]
      },
      { title: 'Development', 
        actions: [
          { name: 'Land', link: '#' },
          { name: 'Flood', link: '#' },
          { name: 'Fire', link: '#' }
        ]
      },
      { title: 'Options', 
        actions: [
          { name: 'General', link: '#' }
        ]
      }
    ]
  end

  def main_navigation
    # content = '<div class="nav-container navbar navbar-inverse">'
    content = ''
    # navigation_buttons.each do |navigation_button|
    #   content <<  '  <div class="btn-group btn-group-xs ">'
    #   content <<  '    <p type="button" class="btn navbar navbar-inverse dropdown-toggle" data-toggle="dropdown">'
    #   content <<  "      #{navigation_button[:title]} <span class='caret'></span>"
    #   content <<  '    </p>'
    #   content <<  '    <ul class="dropdown-menu" role="menu">'
    #   navigation_button[:actions].each do |action|
    #     content << "        <li><a href='#{action[:link]}'> #{action[:name]} </a></li>"
    #   end

    #   content <<  '    </ul>'
    #   content << '  </div>'
    # end

    # content << '</div>'
    content.html_safe
  end

end
