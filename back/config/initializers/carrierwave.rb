CarrierWave.configure do |config|
    config.asset_host = ENV.fetch('STORAGE_ADDRESS'){'http://localhost:4000'}
end