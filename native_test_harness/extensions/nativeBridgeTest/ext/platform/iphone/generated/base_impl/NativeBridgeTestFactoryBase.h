
#import "INativeBridgeTest.h"

@interface NativeBridgeTestFactoryBase : NSObject<INativeBridgeTestFactory> {
    NSMutableDictionary* mNativeBridgeTestInstances;
    id<INativeBridgeTestSingleton> mNativeBridgeTestSingleton;
}

-(id)init;

-(id<INativeBridgeTestSingleton>) getNativeBridgeTestSingleton;
-(id<INativeBridgeTest>) getNativeBridgeTestByID:(NSString*)ID;

-(void) destroyObjectByID:(NSString*)ID;

-(id<INativeBridgeTest>)createNativeBridgeTestByID:(NSString*)ID;

-(NSArray*) enumerateNativeBridgeTestInstances;

-(void)dealloc;

@end