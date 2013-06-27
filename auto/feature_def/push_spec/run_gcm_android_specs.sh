#!/bin/bash
# Google Cloud Messaging specs for android device

# path to local rhodes workspace
pushd ../../../../rhodes
git pull origin master
popd

pushd gcm_push_client
rake clean:android
popd

mspec gcm_push_spec.rb
if (($?)) ; then echo "Google Cloud Messaging specs are failed "; exit 1; fi
