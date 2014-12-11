
#import "GenPropBagSingletonBase.h"

@implementation GenPropBagSingletonBase

-(id)init {
    self = [super init];
    mDefaultID= nil;
    return self;
}

-(NSString*) getDefaultID {
    if (mDefaultID == nil) {
        mDefaultID = [[self getInitialDefaultID] retain];
    }
    return mDefaultID;
}

-(void) setDefaultID:(NSString*)defaultID {
    mDefaultID = [defaultID retain];
}

-(NSString*)getInitialDefaultID {
    return nil;
}

-(void)dealloc {
    [mDefaultID release];
    [super dealloc];
}

@end