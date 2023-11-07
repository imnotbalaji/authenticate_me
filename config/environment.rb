# Load the Rails application.
require_relative "application"

# Initialize the Rails application.
Rails.application.initialize!

Jbuilder.key_format_camelize: :lower
Jbuilder.deep_format_keys true
