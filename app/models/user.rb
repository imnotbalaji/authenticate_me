class User < ApplicationRecord

  has_secure_password
  
  validates :username, uniqueness: true, length: {in: 3..30}, format: {without: URI::MailTo::EMAIL_REGEXP, message: "Cannot be email"}
  validates :email, uniqueness: true, length: {in: 3..255}, format: {with: URI::MailTo::EMAIL_REGEXP, message: "Invalid email format"}
  validates :password, length: {in: 6..255, message:"Password must be between 6 and 255 characters long"}, allow_nil: true
  validates :session_token, presence: true, uniqueness: true

  before_validation :ensure_session_token

  def self.find_by_credentials(username,password) 

    # Can add some functionality later for regex matching of credential
    user = User.find_by(username: username)

    if (user && user.authenticate(password))
      return user
    else 
      return nil
    end 

  end


  def reset_session_token!

    self.session_token = generate_unique_session_token 
    self.save!
    session_token


  end 



  private
  def ensure_session_token
    self.session_token ||= generate_unique_session_token
    
  end 

  def generate_unique_session_token
 
    loop do 
       random_token = SecureRandom.urlsafe_base64
       return random_token if (!User.exists?(session_token: random_token)) 
    end 
  end



  
end
