#!/bin/bash
# Rhoconnect push specs for windows mobile/CE

mspec win_push_spec.rb

if (($?)) ; then echo "Rhoconnect push specs for windows mobile/CE failed "; exit 1; fi
