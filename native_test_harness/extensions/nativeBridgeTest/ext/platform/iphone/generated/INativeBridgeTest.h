
#import <Foundation/Foundation.h>

#import "api_generator/iphone/IMethodResult.h"


// hash keys used in properties and parameters


@protocol INativeBridgeTest <NSObject>



// NOTE: if you want to hold methodResult(for example periodically call callbacks) you should release it manually when you stop using it!
@end


@protocol INativeBridgeTestSingleton <NSObject>




-(void) testBool:(BOOL)val methodResult:(id<IMethodResult>)methodResult;

-(void) testInt:(int)val methodResult:(id<IMethodResult>)methodResult;

-(void) testFloat:(float)val methodResult:(id<IMethodResult>)methodResult;

-(void) testString:(NSString*)val methodResult:(id<IMethodResult>)methodResult;

-(void) testApi:(NSArray*)arrHashStr hashHashStr:(NSDictionary*)hashHashStr hashArrStr:(NSDictionary*)hashArrStr arrArrStr:(NSArray*)arrArrStr methodResult:(id<IMethodResult>)methodResult;


@end


@protocol INativeBridgeTestFactory <NSObject>
-(id<INativeBridgeTestSingleton>) getNativeBridgeTestSingleton;
-(id<INativeBridgeTest>) getNativeBridgeTestByID:(NSString*)ID;
-(void) destroyObjectByID:(NSString*)ID;
-(NSArray*) enumerateNativeBridgeTestInstances;
@end


@interface NativeBridgeTestFactorySingleton : NSObject {
}
+(id<INativeBridgeTestFactory>) getNativeBridgeTestFactoryInstance;
@end


