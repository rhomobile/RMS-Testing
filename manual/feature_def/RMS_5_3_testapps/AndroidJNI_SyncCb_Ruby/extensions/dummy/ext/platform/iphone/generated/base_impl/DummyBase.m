
#import "DummyBase.h"
#import "api_generator/iphone/CMethodResult.h"





@implementation DummyBase

- (void) resetAllPropertiesToDefault {
    mDeclaredProperties = [[NSSet setWithObjects:@"simpleStringProperty", nil] retain];

    mProperties = [[NSMutableDictionary dictionaryWithCapacity:3] retain];
    
    [self setProperty:@"simpleStringProperty" propertyValue:@"" methodResult:nil];

}

- (id) init {
    self = [super init];
    [self resetAllPropertiesToDefault];
    return self;
}



+(NSString*) applyAliasesToPropertyName:(NSString*)prop_name {
return prop_name;

}

+(NSDictionary*) applyAliasesToDictionary:(NSDictionary*)dict {
return dict;

}




-(void) getProperty:(NSString*)propertyName methodResult:(id<IMethodResult>)methodResult {
    NSObject* value = [mProperties objectForKey:[DummyBase applyAliasesToPropertyName:propertyName]];
    [methodResult setResult:value];
}

-(void) setProperty:(NSString*)propertyName propertyValue:(NSString*)propertyValue methodResult:(id<IMethodResult>)methodResult {
    NSObject* value = propertyValue;
    NSString* strValue = propertyValue;
    if ([propertyName isEqualToString:@"ID"] && [value isKindOfClass:[NSString class]] && [strValue isEqualToString:@""]) {
        NSLog(@"Clearing ID!");
    }
    if ([value isKindOfClass:[NSNumber class]]) {
        NSNumber* numValue = (NSNumber*)value;
        if ([CMethodResult isBoolInsideNumber:numValue]) {
            BOOL boolValue = [numValue boolValue];
            if (boolValue) {
                strValue = @"true";
            }
            else {
                strValue = @"false";
            }
        }
        else if ([CMethodResult isIntInsideNumber:numValue]) {
            strValue =  [NSString stringWithFormat:@"%@", numValue];
        }
        else if ([CMethodResult isFloatInsideNumber:numValue]) {
            strValue =  [NSString stringWithFormat:@"%@", numValue];
        }
        else {
            // error !
            NSLog(@"Dummy.setProperty(\"%@\", value) UNSUPPORTED VALUE TYPE ! MUST BE STRING !!!", propertyName);
        }
    }
    else if ([value isKindOfClass:[NSString class]]) {
        //is OK!
    }
    else {
        // error !
        NSLog(@"Dummy.setProperty(\"%@\", value) UNSUPPORTED VALUE TYPE ! MUST BE STRING !!!", propertyName);

    }

   [mProperties setObject:strValue forKey:[DummyBase applyAliasesToPropertyName:propertyName]];
}

-(void) getProperties:(NSArray*)arrayofNames methodResult:(id<IMethodResult>)methodResult {
    NSMutableDictionary* dict = [[NSMutableDictionary dictionaryWithCapacity:[arrayofNames count]] autorelease];
    CMethodResult_SimpleHolder* resultHolder = [CMethodResult_SimpleHolder makeEmptyHolder];
    for (NSString* key in arrayofNames) {        
      [resultHolder setResult:nil];
      [self getProperty:key methodResult:resultHolder];
      if ([resultHolder getResult] != nil) {
          NSString* value = (NSString*)[resultHolder getResult];
          [dict setObject:value forKey:key];
      } 
      else {
        [dict setObject:@"" forKey:key];
      }
    }

    [methodResult setResult:dict];
}

-(void) getAllProperties:(id<IMethodResult>)methodResult {
    [self getProperties:[mProperties allKeys] methodResult:methodResult];
}


-(void) setProperties:(NSDictionary*)propertyMap methodResult:(id<IMethodResult>)methodResult {
    for (NSString* key in propertyMap) {    
        NSString* value = (NSString*)[propertyMap objectForKey:key];
        [self setProperty:key propertyValue:value methodResult:methodResult];
    }
}

-(void) clearAllProperties:(id<IMethodResult>)methodResult {
   [mProperties removeAllObjects];
   [self resetAllPropertiesToDefault];
}










-(void) getSimpleStringProperty:(id<IMethodResult>)methodResult {

    CMethodResult_SimpleHolder* resultHolder = [CMethodResult_SimpleHolder makeEmptyHolder];
    [self getProperty:@"simpleStringProperty" methodResult:resultHolder];
    if ([resultHolder getResult] != nil) {
        NSString* strResult = (NSString*)[resultHolder getResult];
        NSString* typedResult = strResult;
        [methodResult setResult:typedResult];
    }
    else {
        [methodResult setResult:nil];
    }

}

-(void) setSimpleStringProperty:(NSString*)simpleStringProperty methodResult:(id<IMethodResult>)methodResult {

    NSString* strValue = [NSString stringWithFormat:@"%@", simpleStringProperty];
    [self setProperty:@"simpleStringProperty" propertyValue:strValue methodResult:methodResult];

}




-(void) dealloc {

    [mProperties release];
    [mDeclaredProperties release];

    [super dealloc];
}

@end