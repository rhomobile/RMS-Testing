// WARNING! THIS FILE IS GENERATED AUTOMATICALLY! DO NOT EDIT IT MANUALLY!

#include <string.h>
#include <common/RhoConf.h>

//#include "app_build_configs.h"

static const char* keys[] = { ""
};

static const char* values[] = { ""
};

#define APP_BUILD_CONFIG_COUNT 1

const char* get_app_build_config_item(const char* key) {
  int i;
  const char* szValue;

  szValue = rho_conf_getString(key);
  if (strcmp(szValue, "") != 0)
    return szValue;

  for (i = 1; i < APP_BUILD_CONFIG_COUNT; i++) {
    if (strcmp(key, keys[i]) == 0) {
      return values[i];
    }
  }
  return 0;
}

