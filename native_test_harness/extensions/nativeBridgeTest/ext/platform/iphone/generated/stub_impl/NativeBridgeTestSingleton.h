
#import "INativeBridgeTest.h"
#import "NativeBridgeTestSingletonBase.h"

@interface NativeBridgeTestSingleton : NativeBridgeTestSingletonBase<INativeBridgeTestSingleton> {
}



-(void) testBool:(BOOL)val methodResult:(id<IMethodResult>)methodResult;
-(void) testInt:(int)val methodResult:(id<IMethodResult>)methodResult;
-(void) testFloat:(float)val methodResult:(id<IMethodResult>)methodResult;
-(void) testString:(NSString*)val methodResult:(id<IMethodResult>)methodResult;
-(void) testApi:(NSArray*)arrHashStr hashHashStr:(NSDictionary*)hashHashStr hashArrStr:(NSDictionary*)hashArrStr arrArrStr:(NSArray*)arrArrStr methodResult:(id<IMethodResult>)methodResult;




@end