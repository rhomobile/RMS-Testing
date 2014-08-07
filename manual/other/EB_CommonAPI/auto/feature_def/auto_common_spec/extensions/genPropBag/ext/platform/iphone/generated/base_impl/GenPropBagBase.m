
#import "GenPropBagBase.h"
#import "api_generator/iphone/CMethodResult.h"





@implementation GenPropBagBase

- (void) resetAllPropertiesToDefault {
    mDeclaredProperties = [[NSSet setWithObjects:@"boolProp", @"intProp", @"floatProp", @"stringProp", nil] retain];

    mProperties = [[NSMutableDictionary dictionaryWithCapacity:6] retain];
    
    [self setProperty:@"boolProp" propertyValue:@"false" methodResult:nil];
    [self setProperty:@"intProp" propertyValue:@"0" methodResult:nil];
    [self setProperty:@"floatProp" propertyValue:@"0" methodResult:nil];
    [self setProperty:@"stringProp" propertyValue:@"" methodResult:nil];

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
    [methodResult setResult:[mProperties objectForKey:[GenPropBagBase applyAliasesToPropertyName:propertyName]]];
}

-(void) setProperty:(NSString*)propertyName propertyValue:(NSString*)propertyValue methodResult:(id<IMethodResult>)methodResult {
    NSObject* value = propertyValue;
    NSString* strValue = propertyValue;
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
            NSLog(@"GenPropBag.setProperty(\"%@\", value) UNSUPPORTED VALUE TYPE ! MUST BE STRING !!!", propertyName);
        }
    }
    else if ([value isKindOfClass:[NSString class]]) {
        //is OK!
    }
    else {
        // error !
        NSLog(@"GenPropBag.setProperty(\"%@\", value) UNSUPPORTED VALUE TYPE ! MUST BE STRING !!!", propertyName);

    }

   [mProperties setObject:strValue forKey:[GenPropBagBase applyAliasesToPropertyName:propertyName]];
}

-(void) getProperties:(NSArray*)arrayofNames methodResult:(id<IMethodResult>)methodResult {
    NSMutableDictionary* dict = [NSMutableDictionary dictionaryWithCapacity:[arrayofNames count]];
    NSArray* keys = arrayofNames;
    CMethodResult_SimpleHolder* resultHolder = [CMethodResult_SimpleHolder makeEmptyHolder];
    int i;
    for (i = 0; i < [keys count]; i++) {
        NSString* key = (NSString*)[keys objectAtIndex:i];
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
    NSArray* keys = [propertyMap allKeys];
    int i;
    for (i = 0; i < [keys count]; i++) {
        NSString* key = (NSString*)[keys objectAtIndex:i];
        NSString* value = (NSString*)[propertyMap objectForKey:key];
        [self setProperty:key propertyValue:value methodResult:methodResult];
    }
}

-(void) clearAllProperties:(id<IMethodResult>)methodResult {
   [mProperties removeAllObjects];
   [self resetAllPropertiesToDefault];
}










-(void) getBoolProp:(id<IMethodResult>)methodResult {

    CMethodResult_SimpleHolder* resultHolder = [CMethodResult_SimpleHolder makeEmptyHolder];
    [self getProperty:@"boolProp" methodResult:resultHolder];
    if ([resultHolder getResult] != nil) {
        NSString* strResult = (NSString*)[resultHolder getResult];
        NSNumber* typedResult = [NSNumber numberWithBool:(([@"true" caseInsensitiveCompare:strResult] == NSOrderedSame)?YES:NO)];
        [methodResult setResult:typedResult];
    }
    else {
        [methodResult setResult:nil];
    }

}

-(void) setBoolProp:(BOOL)boolProp methodResult:(id<IMethodResult>)methodResult {

    NSString* strValue = boolProp?@"true":@"false";
    [self setProperty:@"boolProp" propertyValue:strValue methodResult:methodResult];

}

-(void) getIntProp:(id<IMethodResult>)methodResult {

    CMethodResult_SimpleHolder* resultHolder = [CMethodResult_SimpleHolder makeEmptyHolder];
    [self getProperty:@"intProp" methodResult:resultHolder];
    if ([resultHolder getResult] != nil) {
        NSString* strResult = (NSString*)[resultHolder getResult];
        NSNumber* typedResult = [NSNumber numberWithInt:[strResult intValue]];
        [methodResult setResult:typedResult];
    }
    else {
        [methodResult setResult:nil];
    }

}

-(void) setIntProp:(int)intProp methodResult:(id<IMethodResult>)methodResult {

    NSString* strValue = [NSString stringWithFormat:@"%@", [NSNumber numberWithInt:intProp]];
    [self setProperty:@"intProp" propertyValue:strValue methodResult:methodResult];

}

-(void) getFloatProp:(id<IMethodResult>)methodResult {

    CMethodResult_SimpleHolder* resultHolder = [CMethodResult_SimpleHolder makeEmptyHolder];
    [self getProperty:@"floatProp" methodResult:resultHolder];
    if ([resultHolder getResult] != nil) {
        NSString* strResult = (NSString*)[resultHolder getResult];
        NSNumber* typedResult = [NSNumber numberWithFloat:[strResult floatValue]];
        [methodResult setResult:typedResult];
    }
    else {
        [methodResult setResult:nil];
    }

}

-(void) setFloatProp:(float)floatProp methodResult:(id<IMethodResult>)methodResult {

    NSString* strValue = [NSString stringWithFormat:@"%@", [NSNumber numberWithFloat:floatProp]];
    [self setProperty:@"floatProp" propertyValue:strValue methodResult:methodResult];

}

-(void) getStringProp:(id<IMethodResult>)methodResult {

    CMethodResult_SimpleHolder* resultHolder = [CMethodResult_SimpleHolder makeEmptyHolder];
    [self getProperty:@"stringProp" methodResult:resultHolder];
    if ([resultHolder getResult] != nil) {
        NSString* strResult = (NSString*)[resultHolder getResult];
        NSString* typedResult = strResult;
        [methodResult setResult:typedResult];
    }
    else {
        [methodResult setResult:nil];
    }

}

-(void) setStringProp:(NSString*)stringProp methodResult:(id<IMethodResult>)methodResult {

    NSString* strValue = [NSString stringWithFormat:@"%@", stringProp];
    [self setProperty:@"stringProp" propertyValue:strValue methodResult:methodResult];

}




-(void) dealloc {

    [mProperties release];
    [mDeclaredProperties release];

    [super dealloc];
}

@end