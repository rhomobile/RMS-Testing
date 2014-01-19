How to run ORM js specs
===========

* make sure that location of your rhodes and rhoconnect-client sources matches settings used in build.yml file

* Checkout rhodes to branch "neworm_dev"

* Edit file "rhoconfig.txt" file to select which implementation to run:
  'use_new_orm = 0' property to run legacy old orm code,
  otherwise 'use_new_orm = 1' to exec a new orm code

* Run from auto/feature_def/new_orm_spec_js directory the following command

  rake run:android:spec

* spec results are in a bunch of xml files, emulator logs in RhoLogSpec.txt

