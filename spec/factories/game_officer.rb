FactoryGirl.define do
  factory :game_officer do
    factory :zhang_liao do
      surname 'Zhang'
      given_name 'Liao'
      war 91 
      intelligence 90 
      politics 85
      avatar '/assets/avatar-zhang_liao.jpeg'
    end

    factory :zhang_fei do
      surname 'Zhang'
      given_name 'Fei'
      war 99
      intelligence 32
      politics 29
      avatar '/assets/avatar-zhang_fei.jpeg'
    end
  end
end
