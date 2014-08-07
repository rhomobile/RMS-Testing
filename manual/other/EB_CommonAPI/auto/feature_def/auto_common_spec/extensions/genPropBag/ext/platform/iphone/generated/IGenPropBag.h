
#import <Foundation/Foundation.h>

#import "api_generator/iphone/IMethodResult.h"


// hash keys used in properties and parameters

#define PROPERTY_BOOL_PROP @"boolProp"

#define PROPERTY_FLOAT_PROP @"floatProp"

#define PROPERTY_INT_PROP @"intProp"

#define PROPERTY_STRING_PROP @"stringProp"


@protocol IGenPropBag <NSObject>


/* getter for "boolProp" property */
-(void) getBoolProp:(id<IMethodResult>)methodResult;

/* setter for "boolProp" property */
-(void) setBoolProp:(BOOL)boolProp methodResult:(id<IMethodResult>)methodResult;

/* getter for "intProp" property */
-(void) getIntProp:(id<IMethodResult>)methodResult;

/* setter for "intProp" property */
-(void) setIntProp:(int)intProp methodResult:(id<IMethodResult>)methodResult;

/* getter for "floatProp" property */
-(void) getFloatProp:(id<IMethodResult>)methodResult;

/* setter for "floatProp" property */
-(void) setFloatProp:(float)floatProp methodResult:(id<IMethodResult>)methodResult;

/* getter for "stringProp" property */
-(void) getStringProp:(id<IMethodResult>)methodResult;

/* setter for "stringProp" property */
-(void) setStringProp:(NSString*)stringProp methodResult:(id<IMethodResult>)methodResult;

/* This method will return the value of the propertyName that is passed in. The propertyName must be a valid property of the API class. */
-(void) getProperty:(NSString*)propertyName methodResult:(id<IMethodResult>)methodResult;

/* This method will return a set of object/value pairs for the list of the propertyName that is passed in. The propertyNames must be a valid property of the API class. */
-(void) getProperties:(NSArray*)arrayofNames methodResult:(id<IMethodResult>)methodResult;

/* This method will return all of object/value pairs for the propertyNames of the API class. */
-(void) getAllProperties:(id<IMethodResult>)methodResult;

/* This method will set the value of a property for the API class. The propertyName must be a valid property for the class and must also not be read only. */
-(void) setProperty:(NSString*)propertyName propertyValue:(NSString*)propertyValue methodResult:(id<IMethodResult>)methodResult;

/* This method will set the values of a list of properties for the API class. The propertyName must be a valid property for the class and must also not be read only. */
-(void) setProperties:(NSDictionary*)propertyMap methodResult:(id<IMethodResult>)methodResult;


// NOTE: if you want to hold methodResult(for example periodically call callbacks) you should release it manually when you stop using it!
@end


@protocol IGenPropBagSingleton <NSObject>


-(NSString*) getDefaultID;
-(void) setDefaultID:(NSString*)defaultID;
-(NSString*)getInitialDefaultID;
    


-(void) enumerate:(id<IMethodResult>)methodResult;


@end


@protocol IGenPropBagFactory <NSObject>
-(id<IGenPropBagSingleton>) getGenPropBagSingleton;
-(id<IGenPropBag>) getGenPropBagByID:(NSString*)ID;
-(void) destroyObjectByID:(NSString*)ID;
-(NSArray*) enumerateGenPropBagInstances;
@end


@interface GenPropBagFactorySingleton : NSObject {
}
+(id<IGenPropBagFactory>) getGenPropBagFactoryInstance;
@end


