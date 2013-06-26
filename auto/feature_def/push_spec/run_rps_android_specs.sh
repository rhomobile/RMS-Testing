#!/bin/bash
# Rhoconnect push specs for android

# path to local rhodes workspace
pushd ../../../../rhodes
git pull origin master
popd

# path to local rhoconnect workspace
pushd ../../../../rhoconnect
git pull origin master
popd

# path to rhoelements
pushd ../../../../Motorola-Extensions
git pull origin master
popd

pushd rhoconnect_push_client
echo -e "\nClean android rhodes app ..."
rake clean:android
# echo -e "\nBuilding rhodes app ..."
# rake device:android:debug
# if (($?)) ; then echo "Cannot build rhodes app"; exit 1; fi
popd

adb start-server
if (($?)) ; then echo "Android adb server failed to start"; exit 1; fi

mspec android_push_spec.rb
if (($?)) ; then echo "Rhoconnect push specs for android are failed"; exit 1; fi
