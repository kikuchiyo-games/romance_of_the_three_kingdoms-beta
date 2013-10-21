class Officer < ActiveRecord::Base
  # attr_accessible :title, :body
  belongs_to :province
end
