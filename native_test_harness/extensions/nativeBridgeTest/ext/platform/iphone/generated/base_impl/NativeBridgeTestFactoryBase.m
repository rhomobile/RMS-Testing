
#import "NativeBridgeTestFactoryBase.h"
#import "NativeBridgeTest.h"
#import "NativeBridgeTestSingleton.h"



@implementation NativeBridgeTestFactoryBase

-(id)init {
    self = [super init];
    mNativeBridgeTestInstances = [[NSMutableDictionary dictionaryWithCapacity:4] retain];
    mNativeBridgeTestSingleton = nil;
    return self;
}

-(id<INativeBridgeTest>) getNativeBridgeTestByID:(NSString*)ID {
    id<INativeBridgeTest> obj = (NativeBridgeTest*)[mNativeBridgeTestInstances objectForKey:ID];
    if (obj == nil) {
        obj = [self createNativeBridgeTestByID:ID];
        [mNativeBridgeTestInstances setObject:obj forKey:ID];
    }
    return obj;
}

-(void) destroyObjectByID:(NSString*)ID {
    NativeBridgeTest* obj = [mNativeBridgeTestInstances objectForKey:ID];
    if (obj != nil) {
        [mNativeBridgeTestInstances removeObjectForKey:ID];
    }
}


-(id<INativeBridgeTest>)createNativeBridgeTestByID:(NSString*)ID {
    NativeBridgeTest* obj = [[NativeBridgeTest alloc] init];

    return obj;
}


-(id<INativeBridgeTestSingleton>) getNativeBridgeTestSingleton {
    if (mNativeBridgeTestSingleton == nil) {
        mNativeBridgeTestSingleton = [[NativeBridgeTestSingleton alloc] init];
    }
    return mNativeBridgeTestSingleton;
}

-(NSArray*) enumerateNativeBridgeTestInstances {
    return [mNativeBridgeTestInstances allKeys];
}

-(void)dealloc {
    [mNativeBridgeTestInstances release];
    [super dealloc];
}


@end