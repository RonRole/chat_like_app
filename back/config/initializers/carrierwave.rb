CarrierWave.configure do |config|
    config.asset_host = ENV.fetch('FILE_UPLOAD_HOST'){'http://localhost:4000'}
end