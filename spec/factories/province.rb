FactoryGirl.define do
  factory :province do
    factory :default_province do
      name 'Hei Fei'
      safety 10
      land 10
      fire 10
      flood 10
      population 10000
    end
  end
end
