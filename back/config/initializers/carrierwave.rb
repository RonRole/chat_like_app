CarrierWave.configure do |config|
    config.asset_host = ENV.fetch('FILE_UPLOAD_HOST'){'http://localhost:4000'}
    config.fog_provider = 'fog/google'
    config.fog_credentials = {
        :provider                         => 'Google',
        :google_storage_access_key_id     => Rails.application.secrets.google_storage_access_key_id,
        :google_storage_secret_access_key => Rails.application.secrets.google_storage_secret_access_key
    }
    config.fog_directory = ENV["FOG_DIRECTORY"]
end