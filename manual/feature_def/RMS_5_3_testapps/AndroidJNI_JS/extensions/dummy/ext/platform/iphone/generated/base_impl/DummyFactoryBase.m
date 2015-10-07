
#import "DummyFactoryBase.h"
#import "Dummy.h"
#import "DummySingleton.h"



@implementation DummyFactoryBase

-(id)init {
    self = [super init];
    mDummyInstances = [[NSMutableDictionary dictionaryWithCapacity:4] retain];
    mDummySingleton = nil;
    return self;
}

-(id<IDummy>) getDummyByID:(NSString*)ID {
    id<IDummy> obj = (Dummy*)[mDummyInstances objectForKey:ID];
    if (obj == nil) {
        obj = [self createDummyByID:ID];
        [mDummyInstances setObject:obj forKey:ID];
    }
    return obj;
}

-(void) destroyObjectByID:(NSString*)ID {
    Dummy* obj = [mDummyInstances objectForKey:ID];
    if (obj != nil) {
        [mDummyInstances removeObjectForKey:ID];
    }
}


-(id<IDummy>)createDummyByID:(NSString*)ID {
    Dummy* obj = [[Dummy alloc] init];

    [obj setProperty:@"ID" propertyValue:ID methodResult:nil];

    return obj;
}


-(id<IDummySingleton>) getDummySingleton {
    if (mDummySingleton == nil) {
        mDummySingleton = [[DummySingleton alloc] init];
    }
    return mDummySingleton;
}

-(NSArray*) enumerateDummyInstances {
    return [mDummyInstances allKeys];
}

-(void)dealloc {
    [mDummyInstances release];
    [super dealloc];
}


@end