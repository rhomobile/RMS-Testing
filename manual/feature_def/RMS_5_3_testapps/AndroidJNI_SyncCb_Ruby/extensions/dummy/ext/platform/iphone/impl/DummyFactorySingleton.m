
#import "IDummy.h"
#import "DummyFactoryBase.h"

static DummyFactoryBase* ourDummyFactory = nil;

@implementation DummyFactorySingleton

+(id<IDummyFactory>) getDummyFactoryInstance {
    if (ourDummyFactory == nil) {
        ourDummyFactory = [[DummyFactoryBase alloc] init];
    }
    return ourDummyFactory;
}

@end