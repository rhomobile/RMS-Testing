
#import "IDummy.h"
#import "DummyBase.h"

@interface Dummy : DummyBase<IDummy> {
}

-(void) getPlatformName:(id<IMethodResult>)methodResult;
-(void) calcSumm:(int)a b:(int)b methodResult:(id<IMethodResult>)methodResult;
-(void) joinStrings:(NSString*)a b:(NSString*)b methodResult:(id<IMethodResult>)methodResult;
-(void) enable:(int)firingInterval methodResult:(id<IMethodResult>)methodResult;
-(void) enableString:(int)firingInterval methodResult:(id<IMethodResult>)methodResult;
-(void) enableInt:(int)firingInterval methodResult:(id<IMethodResult>)methodResult;
-(void) enableBool:(int)firingInterval methodResult:(id<IMethodResult>)methodResult;
-(void) enableFloat:(int)firingInterval methodResult:(id<IMethodResult>)methodResult;
-(void) enableArray:(int)firingInterval methodResult:(id<IMethodResult>)methodResult;
-(void) stop:(id<IMethodResult>)methodResult;



@end