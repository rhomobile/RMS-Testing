#!/bin/bash
# Rhoconnect push specs for windows mobile/CE

pushd push_client_rb
cp build.yml.rps build.yml
popd

mspec win_push_spec.rb

if (($?)) ; then echo "Rhoconnect push specs for windows mobile/CE failed "; exit 1; fi
