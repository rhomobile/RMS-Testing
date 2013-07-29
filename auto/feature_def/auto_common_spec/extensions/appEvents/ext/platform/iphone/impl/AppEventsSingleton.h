
#import "IAppEvents.h"
#import "AppEventsSingletonBase.h"

@interface AppEventsSingleton : AppEventsSingletonBase<IAppEventsSingleton> {
}



-(void) simulateEvent:(NSString*)applicationEvent methodResult:(id<IMethodResult>)methodResult;




@end