
#import "GenPropBagFactoryBase.h"
#import "GenPropBag.h"
#import "GenPropBagSingleton.h"



@implementation GenPropBagFactoryBase

-(id)init {
    self = [super init];
    mGenPropBagInstances = [[NSMutableDictionary dictionaryWithCapacity:4] retain];
    mGenPropBagSingleton = nil;
    return self;
}

-(id<IGenPropBag>) getGenPropBagByID:(NSString*)ID {
    id<IGenPropBag> obj = (GenPropBag*)[mGenPropBagInstances objectForKey:ID];
    if (obj == nil) {
        obj = [self createGenPropBagByID:ID];
        [mGenPropBagInstances setObject:obj forKey:ID];
    }
    return obj;
}

-(void) destroyObjectByID:(NSString*)ID {
    GenPropBag* obj = [mGenPropBagInstances objectForKey:ID];
    if (obj != nil) {
        [mGenPropBagInstances removeObjectForKey:ID];
    }
}


-(id<IGenPropBag>)createGenPropBagByID:(NSString*)ID {
    GenPropBag* obj = [[GenPropBag alloc] init];

    [obj setProperty:@"ID" propertyValue:ID methodResult:nil];

    return obj;
}


-(id<IGenPropBagSingleton>) getGenPropBagSingleton {
    if (mGenPropBagSingleton == nil) {
        mGenPropBagSingleton = [[GenPropBagSingleton alloc] init];
    }
    return mGenPropBagSingleton;
}

-(NSArray*) enumerateGenPropBagInstances {
    return [mGenPropBagInstances allKeys];
}

-(void)dealloc {
    [mGenPropBagInstances release];
    [super dealloc];
}


@end