
#import "IDummy.h"
#import "DummySingletonBase.h"

@interface DummySingleton : DummySingletonBase<IDummySingleton> {
}


-(NSString*)getInitialDefaultID;


-(void) enumerate:(id<IMethodResult>)methodResult;




@end