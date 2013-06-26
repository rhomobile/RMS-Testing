#!/bin/bash
# Rhoconnect push specs for android

pushd rhoconnect_push_client
# rake clean:android
popd

mspec android_push_spec.rb

if (($?)) ; then echo "Rhoconnect push specs for android are failed "; exit 1; fi
