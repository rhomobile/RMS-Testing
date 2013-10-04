
#import "IentityGen.h"
#import "entityGenFactoryBase.h"

static entityGenFactoryBase* ourentityGenFactory = nil;

@implementation entityGenFactorySingleton

+(id<IentityGenFactory>) getentityGenFactoryInstance {
    if (ourentityGenFactory == nil) {
        ourentityGenFactory = [[entityGenFactoryBase alloc] init];
    }
    return ourentityGenFactory;
}

@end