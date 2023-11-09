
json.title 'Server Error'
json.message @message
json.stack_trace @stack unless Rails.env.production?
