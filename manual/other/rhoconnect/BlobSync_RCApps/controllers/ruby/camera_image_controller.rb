class CameraImageController < Rhoconnect::Controller::Base
  register Rhoconnect::EndPoint

  # register SYNC routes
  register Rhoconnect::Handler::Sync

  # add your custom routes here
end