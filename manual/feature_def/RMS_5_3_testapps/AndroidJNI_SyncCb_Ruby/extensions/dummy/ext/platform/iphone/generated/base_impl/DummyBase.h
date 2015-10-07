

#import "IDummy.h"

@interface DummyBase : NSObject {

    NSMutableDictionary* mProperties;
    NSSet* mDeclaredProperties;

}

- (id) init;



+(NSString*) applyAliasesToPropertyName:(NSString*)prop_name;
+(NSDictionary*) applyAliasesToDictionary:(NSDictionary*)dict;
-(void) getProperty:(NSString*)propertyName methodResult:(id<IMethodResult>)methodResult;
-(void) getProperties:(NSArray*)arrayofNames methodResult:(id<IMethodResult>)methodResult;
-(void) getAllProperties:(id<IMethodResult>)methodResult;
-(void) setProperty:(NSString*)propertyName propertyValue:(NSString*)propertyValue methodResult:(id<IMethodResult>)methodResult;;
-(void) setProperties:(NSDictionary*)propertyMap methodResult:(id<IMethodResult>)methodResult;;
-(void) clearAllProperties:(id<IMethodResult>)methodResult;


-(void) getSimpleStringProperty:(id<IMethodResult>)methodResult;
-(void) setSimpleStringProperty:(NSString*)simpleStringProperty methodResult:(id<IMethodResult>)methodResult;


-(void) dealloc;

@end