
#import "IPlatformBridgeTest.h"
#import "PlatformBridgeTestFactoryBase.h"

static PlatformBridgeTestFactoryBase* ourPlatformBridgeTestFactory = nil;

@implementation PlatformBridgeTestFactorySingleton

+(id<IPlatformBridgeTestFactory>) getPlatformBridgeTestFactoryInstance {
    if (ourPlatformBridgeTestFactory == nil) {
        ourPlatformBridgeTestFactory = [[PlatformBridgeTestFactoryBase alloc] init];
    }
    return ourPlatformBridgeTestFactory;
}

@end