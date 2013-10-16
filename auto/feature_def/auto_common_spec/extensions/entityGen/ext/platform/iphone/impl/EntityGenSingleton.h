
#import "IentityGen.h"
#import "entityGenSingletonBase.h"

@interface entityGenSingleton : entityGenSingletonBase<IentityGenSingleton> {
}


-(NSString*)getInitialDefaultID;


-(void) enumerate:(id<IMethodResult>)methodResult;




@end