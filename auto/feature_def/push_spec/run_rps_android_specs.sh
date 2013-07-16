#!/bin/bash
# Rhoconnect push specs for android

# path to local rhodes workspace
pushd ../../../../rhodes
echo "Pull latest rhodes sources ..."
git pull origin master
popd

# path to local rhoconnect workspace
pushd ../../../../rhoconnect
echo "Pull latest rhoconnect sources ..."
git pull origin master
popd

# path to rhoelements
pushd ../../../../Motorola-Extensions
echo "Pull latest Motorola-Extensions sources ..."
git pull origin master
popd

# path to rhoconnect-client
pushd ../../../../rhoconnect-client
echo "Pull latest rhoconnect-client sources ..."
git pull origin master
popd

pushd push_client_rb
cp build.yml.rps build.yml
# echo -e "\nClean android rhodes app ..."
# rake clean:android
popd

adb start-server
if (($?)) ; then echo "Android adb server failed to start"; exit 1; fi

mspec android_push_spec.rb
if (($?)) ; then echo "Rhoconnect push specs for android are failed"; exit 1; fi
