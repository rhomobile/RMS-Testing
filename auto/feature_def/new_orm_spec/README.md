How to run ORM ruby specs
===========

* Make sure that location of your rhodes sources matches settings used in `build.yml` file

* Checkout rhodes to branch `master`

```
  $ git checkout master
  $ git pull origin master
```

* Edit file `rhoconfig.txt` file and select which implementation to run:
set `use_new_orm = 0` property to run legacy Old ORM code,
otherwise set `use_new_orm = 1` to execute specs with New ORM code

* Run from `auto/feature_def/new_orm_spec` directory one of the following platform specific command

```
  $ rake run:android:spec
  $ rake run:iphone:spec
```

* spec results can be found in a bunch of xml files, rhodes emulator logs in RhoLogSpec.txt
