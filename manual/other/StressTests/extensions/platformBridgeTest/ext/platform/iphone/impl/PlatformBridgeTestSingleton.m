
#import "PlatformBridgeTestSingleton.h"


@implementation PlatformBridgeTestSingleton

@synthesize callback;

-(NSString*)getInitialDefaultID {
    return @"SCN1";
}


-(void) enumerate:(id<IMethodResult>)methodResult {
    NSMutableArray* ar = [NSMutableArray arrayWithCapacity:2];
    [ar addObject:@"SCN1"];
    [ar addObject:@"SCN2"];
    [methodResult setResult:ar];
}


////

// loopback function
-(void) testString:(NSString*)value methodResult:(id<IMethodResult>)methodResult {
    [methodResult setResult:value];
}

// should reverse string
-(void) processString:(NSString*)value methodResult:(id<IMethodResult>)methodResult {
    NSMutableString *reversedStr;
    int len = [value length];

    reversedStr = [NSMutableString stringWithCapacity:len];

    while ( len > 0 )
        [reversedStr appendString:[NSString stringWithFormat:@"%C",[value characterAtIndex:--len]]];
    
    [methodResult setResult:reversedStr];
}

// loopback function
-(void) testBool:(BOOL)value methodResult:(id<IMethodResult>)methodResult {
    [methodResult setResult:[NSNumber numberWithBool:(value)]];
}

// Should negate boolean value
-(void) processBool:(BOOL)value methodResult:(id<IMethodResult>)methodResult {
    [methodResult setResult:[NSNumber numberWithBool:(value == NO)]];
}

// loopback function
-(void) testInt:(int)value methodResult:(id<IMethodResult>)methodResult {
    [methodResult setResult:[NSNumber numberWithInt:(value)]];
}

-(void) processInt:(int)value methodResult:(id<IMethodResult>)methodResult {
    [methodResult setResult:[NSNumber numberWithInt:(-value)]];
}

// loopback function
-(void) testFloat:(float)value methodResult:(id<IMethodResult>)methodResult {
    [methodResult setResult:[NSNumber numberWithFloat:(value)]];
}

-(void) processFloat:(float)value methodResult:(id<IMethodResult>)methodResult {
    [methodResult setResult:[NSNumber numberWithFloat:(-value)]];
}

// loopback function
-(void) testArray:(NSArray*)value methodResult:(id<IMethodResult>)methodResult {
    [methodResult setResult:(value)];
}

-(void) processArray:(NSArray*)value methodResult:(id<IMethodResult>)methodResult {
    NSArray *sorted = [value sortedArrayUsingSelector:@selector(localizedCaseInsensitiveCompare:)];
    [methodResult setResult:(sorted)];
}

// loopback function
-(void) testHash:(NSDictionary*)value methodResult:(id<IMethodResult>)methodResult {
    [methodResult setResult:(value)];
}

// Should remove all hashes starting with vowels and reverse value characters
-(void) processHash:(NSDictionary*)value methodResult:(id<IMethodResult>)methodResult {
    NSCharacterSet *set = [NSCharacterSet characterSetWithCharactersInString:@"aeiouy"];
    NSEnumerator *enumerator = [value keyEnumerator];
    NSMutableDictionary *result = [NSMutableDictionary new];

    for(NSString *aKey in enumerator) {
        if ([[aKey lowercaseString] rangeOfCharacterFromSet:set].location != 0)
        {
            NSString *val = [value valueForKey:aKey];

            NSMutableString *reversedString = [NSMutableString string];
            NSInteger charIndex = [val length];
            while (charIndex > 0) {
                charIndex--;
                NSRange subStrRange = NSMakeRange(charIndex, 1);
                [reversedString appendString:[val substringWithRange:subStrRange]];
            }

            [result setObject:reversedString forKey:aKey];
        }
    }

    [methodResult setResult:(result)];
}

-(void) testNull:(id<IMethodResult>)methodResult {
    [methodResult setResult:([NSNull null])];
}

-(void) saveCallback:(id<IMethodResult>)methodResult {
    self.callback = methodResult;
}

-(void) fireCallback:(NSString*)value methodResult:(id<IMethodResult>)methodResult {
    [callback setResult:value];
}


@end