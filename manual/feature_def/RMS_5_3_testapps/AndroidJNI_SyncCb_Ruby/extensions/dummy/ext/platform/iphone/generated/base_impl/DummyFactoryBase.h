
#import "IDummy.h"

@interface DummyFactoryBase : NSObject<IDummyFactory> {
    NSMutableDictionary* mDummyInstances;
    id<IDummySingleton> mDummySingleton;
}

-(id)init;

-(id<IDummySingleton>) getDummySingleton;
-(id<IDummy>) getDummyByID:(NSString*)ID;

-(void) destroyObjectByID:(NSString*)ID;

-(id<IDummy>)createDummyByID:(NSString*)ID;

-(NSArray*) enumerateDummyInstances;

-(void)dealloc;

@end