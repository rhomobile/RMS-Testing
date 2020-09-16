QT -= core

equals(QT_MAJOR_VERSION, 5) {
    lessThan(QT_MINOR_VERSION, 6): {
        DEFINES += RHODES_VERSION_1
    }
    equals(QT_MINOR_VERSION, 6): {
        DEFINES += OS_SAILFISH OS_LINUX
        CONFIG += sailfishapp c++14 sailfishapp_i18n
    }
    greaterThan(QT_MINOR_VERSION, 7): {
        CONFIG += c++14
        DEFINES += CPP_ELEVEN RHODES_VERSION_2
    }
}


TARGET = genPropBag
TEMPLATE = lib

CONFIG += staticlib warn_on

isEmpty(RHODES_ROOT) {
  RHODES_ROOT = ../../../../../../../../../rhodes
}

INCLUDEPATH += ../../shared\
../../shared/generated\
../../shared/generated/cpp\
$$RHODES_ROOT/platform/shared/common\
$$RHODES_ROOT/platform/shared/rubyext\
$$RHODES_ROOT/platform/shared/ruby/include\
$$RHODES_ROOT/platform/shared

macx {
  DESTDIR = $$RHODES_ROOT/platform/osx/bin/extensions
  OBJECTS_DIR = $$RHODES_ROOT/platform/osx/bin/extensions/genPropBag
  INCLUDEPATH += $$RHODES_ROOT/platform/shared/ruby/iphone
}
win32 {
  DESTDIR = $$RHODES_ROOT/platform/win32/bin/extensions
  OBJECTS_DIR = $$RHODES_ROOT/platform/win32/bin/extensions/genPropBag
  DEFINES += WIN32 _WINDOWS _LIB _UNICODE UNICODE _WINSOCKAPI_
  debug {
    DEFINES += _DEBUG DEBUG
  }
  release {
    DEFINES += _NDEBUG NDEBUG
  }
  INCLUDEPATH += $$RHODES_ROOT/platform/shared/ruby/win32
}


DEFINES += RHODES_QT_PLATFORM _XOPEN_SOURCE _DARWIN_C_SOURCE

!isEmpty(RHOSIMULATOR_BUILD) {
  DEFINES += RHODES_EMULATOR
}

!win32 {
  QMAKE_CFLAGS_WARN_ON += -Wno-extra -Wno-unused -Wno-sign-compare -Wno-format -Wno-parentheses
  QMAKE_CXXFLAGS_WARN_ON += -Wno-extra -Wno-unused -Wno-sign-compare -Wno-format -Wno-parentheses
  # QMAKE_CFLAGS += -fvisibility=hidden
  # QMAKE_CXXFLAGS += -fvisibility=hidden
}
win32 {
  QMAKE_CFLAGS_WARN_ON += /wd4996 /wd4100 /wd4005
  QMAKE_CXXFLAGS_WARN_ON += /wd4996 /wd4100 /wd4005
  QMAKE_CFLAGS_RELEASE += /O2
  QMAKE_CXXFLAGS_RELEASE += /O2
  QMAKE_CFLAGS_DEBUG += /Zi /MDd
}

HEADERS += \
../../shared/generated/cpp/IGenPropBag.h\
../../shared/generated/cpp/GenPropBagBase.h

SOURCES += \
../../shared/generated/genpropbag_ruby_api.c\
../../shared/generated/genpropbag_api_init.cpp\
../../shared/generated/genpropbag_js_api.cpp\
../../shared/generated/cpp/GenPropBagBase.cpp\
../../shared/generated/cpp/GenPropBag_js_wrap.cpp\
../../shared/generated/cpp/GenPropBag_ruby_wrap.cpp\
../../shared/GenPropBag_impl.cpp
