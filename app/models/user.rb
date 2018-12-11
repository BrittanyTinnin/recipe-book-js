class User < ApplicationRecord
  has_many :recipes

  validates :email, presence: true
  validates :email, uniqueness: true
  validates :password, presence: true, length: { in: 6..20 }

  has_secure_password

  def self.find_or_create_by_omniauth(auth_hash)
    self.where(:email => auth_hash["info"]["email"]).first_or_create do |user|
        user.password = SecureRandom.hex
    end
  end
  
end
