
#import "IDummy.h"
#import "DummyBase.h"

@interface Dummy : DummyBase<IDummy> {
}

-(void) getPlatformName:(id<IMethodResult>)methodResult;
-(void) calcSumm:(int)a b:(int)b methodResult:(id<IMethodResult>)methodResult;
-(void) joinStrings:(NSString*)a b:(NSString*)b methodResult:(id<IMethodResult>)methodResult;
-(void) enable:(int)firingInterval methodResult:(id<IMethodResult>)methodResult;
-(void) enable_Int:(int)firingInterval methodResult:(id<IMethodResult>)methodResult;
-(void) enable_str:(int)firingInterval methodResult:(id<IMethodResult>)methodResult;
-(void) enable_bool:(int)firingInterval methodResult:(id<IMethodResult>)methodResult;
-(void) enable_double:(int)firingInterval methodResult:(id<IMethodResult>)methodResult;
-(void) stop:(id<IMethodResult>)methodResult;



@end