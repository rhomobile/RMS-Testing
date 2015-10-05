How to run ORM js specs
===========

* make sure that location of your rhodes and rhoconnect-client sources matches settings used in build.yml file

* Checkout rhodes to branch "master"

```
  $ git checkout master
  $ git pull origin master
```

* Edit file "rhoconfig.txt" file to select which implementation to run:
  set 'use_new_orm = 0' property to run legacy Old ORM code,
  otherwise set 'use_new_orm = 1' to execute specs with New ORM code

* In addition, if you select to run specs with Old ORM, then edit
  public/app/specRunner.html file and enable script tag for rhoapi-modules-ORM.js, rhoapi-modules-ORMHelper.js, rhoapi-modules-Ruby-RunTime.js files

* Run from auto/feature_def/new_orm_spec_js directory one of the following platform specific command

```
  $ rake run:android:spec
  $ rake run:iphone:spec
```

* spec results can be found in a bunch of xml files, rhodes emulator logs in RhoLogSpec.txt


