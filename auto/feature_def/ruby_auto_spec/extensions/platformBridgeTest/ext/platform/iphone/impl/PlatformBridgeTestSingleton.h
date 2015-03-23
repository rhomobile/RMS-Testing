
#import "IPlatformBridgeTest.h"
#import "PlatformBridgeTestSingletonBase.h"

@interface PlatformBridgeTestSingleton : PlatformBridgeTestSingletonBase<IPlatformBridgeTestSingleton> {
}

@property (retain) id<IMethodResult> callback;


-(NSString*)getInitialDefaultID;


-(void) enumerate:(id<IMethodResult>)methodResult;

-(void) testString:(NSString*)value methodResult:(id<IMethodResult>)methodResult;
-(void) processString:(NSString*)value methodResult:(id<IMethodResult>)methodResult;
-(void) testBool:(BOOL)value methodResult:(id<IMethodResult>)methodResult;
-(void) processBool:(BOOL)value methodResult:(id<IMethodResult>)methodResult;
-(void) testInt:(int)value methodResult:(id<IMethodResult>)methodResult;
-(void) processInt:(int)value methodResult:(id<IMethodResult>)methodResult;
-(void) testFloat:(double)value methodResult:(id<IMethodResult>)methodResult;
-(void) processFloat:(double)value methodResult:(id<IMethodResult>)methodResult;
-(void) testArray:(NSArray*)value methodResult:(id<IMethodResult>)methodResult;
-(void) processArray:(NSArray*)value methodResult:(id<IMethodResult>)methodResult;
-(void) testHash:(NSDictionary*)value methodResult:(id<IMethodResult>)methodResult;
-(void) processHash:(NSDictionary*)value methodResult:(id<IMethodResult>)methodResult;
-(void) testNull:(id<IMethodResult>)methodResult;
-(void) saveCallback:(id<IMethodResult>)methodResult;
-(void) fireCallback:(NSString*)value methodResult:(id<IMethodResult>)methodResult;


@end