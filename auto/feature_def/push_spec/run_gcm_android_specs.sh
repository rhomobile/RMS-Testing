#!/bin/bash
# Google Cloud Messaging specs for android device

# path to local rhodes workspace
pushd ../../../../rhodes
echo "Pull latest rhodes sources ..."
git pull origin master
popd

pushd ../../../../rhoconnect-client
echo "Pull latest rhoconnect-client sources ..."
git pull origin master
popd

# pushd rhoconnect_push_client
# cp build.yml.gcm build.yml
# echo -e "\nClean rhodes app ..."
# rake clean:android
# popd

# pushd gcm_push_client
pushd rhoconnect_push_client
cp build.yml.gcm build.yml
# echo -e "\nClean rhodes app ..."
# rake clean:android
popd


mspec gcm_push_spec.rb
if (($?)) ; then echo "Google Cloud Messaging specs are failed "; exit 1; fi
