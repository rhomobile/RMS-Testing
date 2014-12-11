
#import "INativeBridgeTest.h"
#import "NativeBridgeTestFactoryBase.h"

static NativeBridgeTestFactoryBase* ourNativeBridgeTestFactory = nil;

@implementation NativeBridgeTestFactorySingleton

+(id<INativeBridgeTestFactory>) getNativeBridgeTestFactoryInstance {
    if (ourNativeBridgeTestFactory == nil) {
        ourNativeBridgeTestFactory = [[NativeBridgeTestFactoryBase alloc] init];
    }
    return ourNativeBridgeTestFactory;
}

@end