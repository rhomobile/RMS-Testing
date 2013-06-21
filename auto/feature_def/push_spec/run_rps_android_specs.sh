#!/bin/bash
# Rhoconnect push specs for android

pushd rhoconnect_push_client
rake clean:android
popd

mspec android_push_spec.rb
