#import <Foundation/Foundation.h>
#include "common/app_build_capabilities.h"

extern void Init_PlatformBridgeTest_API();

void Init_PlatformBridgeTest_extension()
{
    Init_PlatformBridgeTest_API();
}