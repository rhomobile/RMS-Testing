

#import "IGenPropBag.h"

@interface GenPropBagBase : NSObject {

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


-(void) getBoolProp:(id<IMethodResult>)methodResult;
-(void) setBoolProp:(BOOL)boolProp methodResult:(id<IMethodResult>)methodResult;
-(void) getIntProp:(id<IMethodResult>)methodResult;
-(void) setIntProp:(int)intProp methodResult:(id<IMethodResult>)methodResult;
-(void) getFloatProp:(id<IMethodResult>)methodResult;
-(void) setFloatProp:(float)floatProp methodResult:(id<IMethodResult>)methodResult;
-(void) getStringProp:(id<IMethodResult>)methodResult;
-(void) setStringProp:(NSString*)stringProp methodResult:(id<IMethodResult>)methodResult;


-(void) dealloc;

@end