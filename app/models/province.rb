class Province < ActiveRecord::Base
  # attr_accessible :title, :body
  has_many :officers
end
