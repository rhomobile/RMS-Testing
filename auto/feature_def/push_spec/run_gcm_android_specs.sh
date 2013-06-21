#!/bin/bash
# Google Cloud Messaging specs for android device

mspec gcm_push_spec.rb
if (($?)) ; then echo "Google Cloud Messaging specs are failed "; exit 1; fi
