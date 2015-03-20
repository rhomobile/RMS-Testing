
#import "IAppEvents.h"
#import "AppEventsSingletonBase.h"

@interface AppEventsSingleton : AppEventsSingletonBase<IAppEventsSingleton> {
}



-(void) simulateEvent:(NSString*)applicationEvent methodResult:(id<IMethodResult>)methodResult;

/* Simulate APP Event */
-(void) addConflictInt:(NSString*)valueName savedValue:(int)savedValue newValue:(int)newValue methodResult:(id<IMethodResult>)methodResult;

/* Simulate APP Event */
-(void) addConflictString:(NSString*)valueName savedValue:(NSString*)savedValue newValue:(NSString*)newValue methodResult:(id<IMethodResult>)methodResult;

/* Simulate Conflicts event */
-(void) simulateConflicts:(id<IMethodResult>)methodResult;


@end