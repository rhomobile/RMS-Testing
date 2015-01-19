
#import "IGenPropBag.h"

@interface GenPropBagFactoryBase : NSObject<IGenPropBagFactory> {
    NSMutableDictionary* mGenPropBagInstances;
    id<IGenPropBagSingleton> mGenPropBagSingleton;
}

-(id)init;

-(id<IGenPropBagSingleton>) getGenPropBagSingleton;
-(id<IGenPropBag>) getGenPropBagByID:(NSString*)ID;

-(void) destroyObjectByID:(NSString*)ID;

-(id<IGenPropBag>)createGenPropBagByID:(NSString*)ID;

-(NSArray*) enumerateGenPropBagInstances;

-(void)dealloc;

@end