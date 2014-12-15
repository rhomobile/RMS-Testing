#import "INativeBridgeTest.h"
//#import "api_generator/common/ruby_helpers.h"

#import "ruby/ext/rho/rhoruby.h"
#import "api_generator/iphone/CMethodResult.h"
#import "api_generator/iphone/CRubyConverter.h"

extern VALUE getRuby_NativeBridgeTest_Module();



@interface NativeBridgeTest_RubyValueFactory : NSObject<IMethodResult_RubyObjectFactory> {
}

- (VALUE) makeRubyValue:(NSObject*)obj;
+ (NativeBridgeTest_RubyValueFactory*) getSharedInstance;

@end

static NativeBridgeTest_RubyValueFactory* our_NativeBridgeTest_RubyValueFactory = nil;

@implementation NativeBridgeTest_RubyValueFactory

- (VALUE) makeRubyValue:(NSObject*)obj {
    VALUE v = rho_ruby_get_NIL();
    if ([obj isKindOfClass:[NSString class]]) {
        // single objects id
        NSString* strRes = (NSString*)obj;
        v = rho_ruby_create_object_with_id( getRuby_NativeBridgeTest_Module(), [strRes UTF8String] );
    }
    else if ([obj isKindOfClass:[NSArray class]]) {
        // list of IDs
        v = rho_ruby_create_array();
        NSArray* arrRes = (NSArray*)obj;
        int i;
        for (i = 0; i < [arrRes count]; i++) {
            NSString* strItem = (NSString*)[arrRes objectAtIndex:i];
            VALUE vItem = rho_ruby_create_object_with_id( getRuby_NativeBridgeTest_Module(), [strItem UTF8String] );
            rho_ruby_add_to_array(v, vItem);
        }
    }
    return v;
}

+ (NativeBridgeTest_RubyValueFactory*) getSharedInstance {
    if (our_NativeBridgeTest_RubyValueFactory == nil) {
        our_NativeBridgeTest_RubyValueFactory = [[NativeBridgeTest_RubyValueFactory alloc] init];
    }
    return our_NativeBridgeTest_RubyValueFactory;
}

@end


id<INativeBridgeTest> NativeBridgeTest_makeInstanceByRubyObject(VALUE obj) {
    const char* szID = rho_ruby_get_object_id( obj );
    id<INativeBridgeTestFactory> factory = [NativeBridgeTestFactorySingleton getNativeBridgeTestFactoryInstance];
    return [factory getNativeBridgeTestByID:[NSString stringWithUTF8String:szID]];
}









@interface rb_NativeBridgeTest_testBool_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<INativeBridgeTestSingleton> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(rb_NativeBridgeTest_testBool_caller_params*) makeParams:(NSArray*)_params _item:(id<INativeBridgeTestSingleton>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation rb_NativeBridgeTest_testBool_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(rb_NativeBridgeTest_testBool_caller_params*) makeParams:(NSArray*)_params _item:(id<INativeBridgeTestSingleton>)_item _methodResult:(CMethodResult*)_methodResult {
    rb_NativeBridgeTest_testBool_caller_params* par = [[rb_NativeBridgeTest_testBool_caller_params alloc] init];
    par.params = _params;
    par.item = _item;
    par.methodResult = _methodResult;
    return [par retain];
}

@end


@interface rb_NativeBridgeTest_testBool_caller : NSObject {

}
+(rb_NativeBridgeTest_testBool_caller*) getSharedInstance;
+(void) testBool:(rb_NativeBridgeTest_testBool_caller_params*)caller_params;
+(void) testBool_in_thread:(rb_NativeBridgeTest_testBool_caller_params*)caller_params;
+(void) testBool_in_UI_thread:(rb_NativeBridgeTest_testBool_caller_params*)caller_params;

@end

static rb_NativeBridgeTest_testBool_caller* our_NativeBridgeTest_testBool_caller = nil;

@implementation rb_NativeBridgeTest_testBool_caller

+(rb_NativeBridgeTest_testBool_caller*) getSharedInstance {
    if (our_NativeBridgeTest_testBool_caller == nil) {
        our_NativeBridgeTest_testBool_caller = [[rb_NativeBridgeTest_testBool_caller alloc] init];
    }
    return our_NativeBridgeTest_testBool_caller;
}

-(void) command_testBool:(rb_NativeBridgeTest_testBool_caller_params*)caller_params {

    NSArray* params = caller_params.params;

    id<INativeBridgeTestSingleton> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem testBool:(BOOL)[((NSNumber*)[params objectAtIndex:0]) boolValue] methodResult:methodResult ];
    [caller_params release];
}

+(void) testBool:(rb_NativeBridgeTest_testBool_caller_params*)caller_params {
    [[rb_NativeBridgeTest_testBool_caller getSharedInstance] command_testBool:caller_params];
}

+(void) testBool_in_thread:(rb_NativeBridgeTest_testBool_caller_params*)caller_params {
    [[rb_NativeBridgeTest_testBool_caller getSharedInstance] performSelectorInBackground:@selector(command_testBool:) withObject:caller_params];
}

+(void) testBool_in_UI_thread:(rb_NativeBridgeTest_testBool_caller_params*)caller_params {
    [[rb_NativeBridgeTest_testBool_caller getSharedInstance] performSelectorOnMainThread:@selector(command_testBool:) withObject:caller_params waitUntilDone:NO];
}


@end


VALUE rb_NativeBridgeTest_testBool_Obj(int argc, VALUE *argv, id<INativeBridgeTestSingleton>objItem) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[1+1];
    NSString* callbackURL = nil;
    unsigned long callbackMethod = 0;
    NSString* callbackParam = nil;
    BOOL method_return_result = YES;

    [methodResult setMethodSignature:@"NativeBridgeTest::testBool"];

    
    BOOL is_factory_param[] = { NO, NO };

    int i;

    // init
    for (i = 0; i < (1); i++) {
        params[i] = [NSNull null];
    }

    

    // enumerate params
    for (int i = 0; i < (1); i++) {
        if (argc > i) {
            // we have a [i] param !
            if (is_factory_param[i]) {
                params[i] = NativeBridgeTest_makeInstanceByRubyObject(argv[i]);
            }
            else {
                params[i] = [[CRubyConverter convertFromRuby:argv[i]] retain];
            }
        }
    }

    NSMutableArray* params_array = [NSMutableArray arrayWithCapacity:(1)];
    for (i = 0 ; i < (1); i++) {
        [params_array addObject:params[i]];
    }

    
    // check callback
    if (argc >= (1+1)) {
        VALUE callback = argv[1];
        if (rho_ruby_is_string(callback)) {
            callbackURL = [((NSString*)[CRubyConverter convertFromRuby:callback]) retain];
        }
        else if (rho_ruby_is_proc(callback) || rho_ruby_is_method(callback)) {
            callbackMethod = callback;
        }
    }
    // check callback param
    if (argc >= (1+2)) {
        VALUE callback_param = argv[1+1];
        if (rho_ruby_is_string(callback_param)) {
            callbackParam = [((NSString*)[CRubyConverter convertFromRuby:callback_param]) retain];
        }
    }
    

    
    


    if ((callbackURL != nil) || (callbackMethod != 0)) {
        // we have callback - method should not call setResult if method execute from current thread - only later or in UI or separated threads !!!
        if (callbackURL != nil)
            [methodResult setRubyCallback:callbackURL];
        if (callbackMethod != 0)
            [methodResult setRubyCallbackMethod:callbackMethod];
        if (callbackParam != nil) {
            [methodResult setCallbackParam:callbackParam];
        }
        
        [rb_NativeBridgeTest_testBool_caller testBool_in_thread:[rb_NativeBridgeTest_testBool_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    else {
        // we do not have callback
        
        [rb_NativeBridgeTest_testBool_caller testBool:[rb_NativeBridgeTest_testBool_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    VALUE resValue = rho_ruby_get_NIL();
    if ((callbackURL == nil) && (callbackMethod == 0) && (method_return_result)) {
        resValue = [methodResult toRuby];
    }
    return resValue;
}


VALUE rb_s_NativeBridgeTest_testBool(int argc, VALUE *argv) {

    id<INativeBridgeTestFactory> factory = [NativeBridgeTestFactorySingleton getNativeBridgeTestFactoryInstance];
    id<INativeBridgeTestSingleton> singleton = [factory getNativeBridgeTestSingleton];
    return rb_NativeBridgeTest_testBool_Obj(argc, argv, singleton);

}







@interface rb_NativeBridgeTest_testInt_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<INativeBridgeTestSingleton> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(rb_NativeBridgeTest_testInt_caller_params*) makeParams:(NSArray*)_params _item:(id<INativeBridgeTestSingleton>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation rb_NativeBridgeTest_testInt_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(rb_NativeBridgeTest_testInt_caller_params*) makeParams:(NSArray*)_params _item:(id<INativeBridgeTestSingleton>)_item _methodResult:(CMethodResult*)_methodResult {
    rb_NativeBridgeTest_testInt_caller_params* par = [[rb_NativeBridgeTest_testInt_caller_params alloc] init];
    par.params = _params;
    par.item = _item;
    par.methodResult = _methodResult;
    return [par retain];
}

@end


@interface rb_NativeBridgeTest_testInt_caller : NSObject {

}
+(rb_NativeBridgeTest_testInt_caller*) getSharedInstance;
+(void) testInt:(rb_NativeBridgeTest_testInt_caller_params*)caller_params;
+(void) testInt_in_thread:(rb_NativeBridgeTest_testInt_caller_params*)caller_params;
+(void) testInt_in_UI_thread:(rb_NativeBridgeTest_testInt_caller_params*)caller_params;

@end

static rb_NativeBridgeTest_testInt_caller* our_NativeBridgeTest_testInt_caller = nil;

@implementation rb_NativeBridgeTest_testInt_caller

+(rb_NativeBridgeTest_testInt_caller*) getSharedInstance {
    if (our_NativeBridgeTest_testInt_caller == nil) {
        our_NativeBridgeTest_testInt_caller = [[rb_NativeBridgeTest_testInt_caller alloc] init];
    }
    return our_NativeBridgeTest_testInt_caller;
}

-(void) command_testInt:(rb_NativeBridgeTest_testInt_caller_params*)caller_params {

    NSArray* params = caller_params.params;

    id<INativeBridgeTestSingleton> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem testInt:(int)[((NSNumber*)[params objectAtIndex:0]) intValue] methodResult:methodResult ];
    [caller_params release];
}

+(void) testInt:(rb_NativeBridgeTest_testInt_caller_params*)caller_params {
    [[rb_NativeBridgeTest_testInt_caller getSharedInstance] command_testInt:caller_params];
}

+(void) testInt_in_thread:(rb_NativeBridgeTest_testInt_caller_params*)caller_params {
    [[rb_NativeBridgeTest_testInt_caller getSharedInstance] performSelectorInBackground:@selector(command_testInt:) withObject:caller_params];
}

+(void) testInt_in_UI_thread:(rb_NativeBridgeTest_testInt_caller_params*)caller_params {
    [[rb_NativeBridgeTest_testInt_caller getSharedInstance] performSelectorOnMainThread:@selector(command_testInt:) withObject:caller_params waitUntilDone:NO];
}


@end


VALUE rb_NativeBridgeTest_testInt_Obj(int argc, VALUE *argv, id<INativeBridgeTestSingleton>objItem) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[1+1];
    NSString* callbackURL = nil;
    unsigned long callbackMethod = 0;
    NSString* callbackParam = nil;
    BOOL method_return_result = YES;

    [methodResult setMethodSignature:@"NativeBridgeTest::testInt"];

    
    BOOL is_factory_param[] = { NO, NO };

    int i;

    // init
    for (i = 0; i < (1); i++) {
        params[i] = [NSNull null];
    }

    

    // enumerate params
    for (int i = 0; i < (1); i++) {
        if (argc > i) {
            // we have a [i] param !
            if (is_factory_param[i]) {
                params[i] = NativeBridgeTest_makeInstanceByRubyObject(argv[i]);
            }
            else {
                params[i] = [[CRubyConverter convertFromRuby:argv[i]] retain];
            }
        }
    }

    NSMutableArray* params_array = [NSMutableArray arrayWithCapacity:(1)];
    for (i = 0 ; i < (1); i++) {
        [params_array addObject:params[i]];
    }

    
    // check callback
    if (argc >= (1+1)) {
        VALUE callback = argv[1];
        if (rho_ruby_is_string(callback)) {
            callbackURL = [((NSString*)[CRubyConverter convertFromRuby:callback]) retain];
        }
        else if (rho_ruby_is_proc(callback) || rho_ruby_is_method(callback)) {
            callbackMethod = callback;
        }
    }
    // check callback param
    if (argc >= (1+2)) {
        VALUE callback_param = argv[1+1];
        if (rho_ruby_is_string(callback_param)) {
            callbackParam = [((NSString*)[CRubyConverter convertFromRuby:callback_param]) retain];
        }
    }
    

    
    


    if ((callbackURL != nil) || (callbackMethod != 0)) {
        // we have callback - method should not call setResult if method execute from current thread - only later or in UI or separated threads !!!
        if (callbackURL != nil)
            [methodResult setRubyCallback:callbackURL];
        if (callbackMethod != 0)
            [methodResult setRubyCallbackMethod:callbackMethod];
        if (callbackParam != nil) {
            [methodResult setCallbackParam:callbackParam];
        }
        
        [rb_NativeBridgeTest_testInt_caller testInt_in_thread:[rb_NativeBridgeTest_testInt_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    else {
        // we do not have callback
        
        [rb_NativeBridgeTest_testInt_caller testInt:[rb_NativeBridgeTest_testInt_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    VALUE resValue = rho_ruby_get_NIL();
    if ((callbackURL == nil) && (callbackMethod == 0) && (method_return_result)) {
        resValue = [methodResult toRuby];
    }
    return resValue;
}


VALUE rb_s_NativeBridgeTest_testInt(int argc, VALUE *argv) {

    id<INativeBridgeTestFactory> factory = [NativeBridgeTestFactorySingleton getNativeBridgeTestFactoryInstance];
    id<INativeBridgeTestSingleton> singleton = [factory getNativeBridgeTestSingleton];
    return rb_NativeBridgeTest_testInt_Obj(argc, argv, singleton);

}







@interface rb_NativeBridgeTest_testFloat_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<INativeBridgeTestSingleton> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(rb_NativeBridgeTest_testFloat_caller_params*) makeParams:(NSArray*)_params _item:(id<INativeBridgeTestSingleton>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation rb_NativeBridgeTest_testFloat_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(rb_NativeBridgeTest_testFloat_caller_params*) makeParams:(NSArray*)_params _item:(id<INativeBridgeTestSingleton>)_item _methodResult:(CMethodResult*)_methodResult {
    rb_NativeBridgeTest_testFloat_caller_params* par = [[rb_NativeBridgeTest_testFloat_caller_params alloc] init];
    par.params = _params;
    par.item = _item;
    par.methodResult = _methodResult;
    return [par retain];
}

@end


@interface rb_NativeBridgeTest_testFloat_caller : NSObject {

}
+(rb_NativeBridgeTest_testFloat_caller*) getSharedInstance;
+(void) testFloat:(rb_NativeBridgeTest_testFloat_caller_params*)caller_params;
+(void) testFloat_in_thread:(rb_NativeBridgeTest_testFloat_caller_params*)caller_params;
+(void) testFloat_in_UI_thread:(rb_NativeBridgeTest_testFloat_caller_params*)caller_params;

@end

static rb_NativeBridgeTest_testFloat_caller* our_NativeBridgeTest_testFloat_caller = nil;

@implementation rb_NativeBridgeTest_testFloat_caller

+(rb_NativeBridgeTest_testFloat_caller*) getSharedInstance {
    if (our_NativeBridgeTest_testFloat_caller == nil) {
        our_NativeBridgeTest_testFloat_caller = [[rb_NativeBridgeTest_testFloat_caller alloc] init];
    }
    return our_NativeBridgeTest_testFloat_caller;
}

-(void) command_testFloat:(rb_NativeBridgeTest_testFloat_caller_params*)caller_params {

    NSArray* params = caller_params.params;

    id<INativeBridgeTestSingleton> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem testFloat:(float)[((NSNumber*)[params objectAtIndex:0]) floatValue] methodResult:methodResult ];
    [caller_params release];
}

+(void) testFloat:(rb_NativeBridgeTest_testFloat_caller_params*)caller_params {
    [[rb_NativeBridgeTest_testFloat_caller getSharedInstance] command_testFloat:caller_params];
}

+(void) testFloat_in_thread:(rb_NativeBridgeTest_testFloat_caller_params*)caller_params {
    [[rb_NativeBridgeTest_testFloat_caller getSharedInstance] performSelectorInBackground:@selector(command_testFloat:) withObject:caller_params];
}

+(void) testFloat_in_UI_thread:(rb_NativeBridgeTest_testFloat_caller_params*)caller_params {
    [[rb_NativeBridgeTest_testFloat_caller getSharedInstance] performSelectorOnMainThread:@selector(command_testFloat:) withObject:caller_params waitUntilDone:NO];
}


@end


VALUE rb_NativeBridgeTest_testFloat_Obj(int argc, VALUE *argv, id<INativeBridgeTestSingleton>objItem) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[1+1];
    NSString* callbackURL = nil;
    unsigned long callbackMethod = 0;
    NSString* callbackParam = nil;
    BOOL method_return_result = YES;

    [methodResult setMethodSignature:@"NativeBridgeTest::testFloat"];

    
    BOOL is_factory_param[] = { NO, NO };

    int i;

    // init
    for (i = 0; i < (1); i++) {
        params[i] = [NSNull null];
    }

    

    // enumerate params
    for (int i = 0; i < (1); i++) {
        if (argc > i) {
            // we have a [i] param !
            if (is_factory_param[i]) {
                params[i] = NativeBridgeTest_makeInstanceByRubyObject(argv[i]);
            }
            else {
                params[i] = [[CRubyConverter convertFromRuby:argv[i]] retain];
            }
        }
    }

    NSMutableArray* params_array = [NSMutableArray arrayWithCapacity:(1)];
    for (i = 0 ; i < (1); i++) {
        [params_array addObject:params[i]];
    }

    
    // check callback
    if (argc >= (1+1)) {
        VALUE callback = argv[1];
        if (rho_ruby_is_string(callback)) {
            callbackURL = [((NSString*)[CRubyConverter convertFromRuby:callback]) retain];
        }
        else if (rho_ruby_is_proc(callback) || rho_ruby_is_method(callback)) {
            callbackMethod = callback;
        }
    }
    // check callback param
    if (argc >= (1+2)) {
        VALUE callback_param = argv[1+1];
        if (rho_ruby_is_string(callback_param)) {
            callbackParam = [((NSString*)[CRubyConverter convertFromRuby:callback_param]) retain];
        }
    }
    

    
    


    if ((callbackURL != nil) || (callbackMethod != 0)) {
        // we have callback - method should not call setResult if method execute from current thread - only later or in UI or separated threads !!!
        if (callbackURL != nil)
            [methodResult setRubyCallback:callbackURL];
        if (callbackMethod != 0)
            [methodResult setRubyCallbackMethod:callbackMethod];
        if (callbackParam != nil) {
            [methodResult setCallbackParam:callbackParam];
        }
        
        [rb_NativeBridgeTest_testFloat_caller testFloat_in_thread:[rb_NativeBridgeTest_testFloat_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    else {
        // we do not have callback
        
        [rb_NativeBridgeTest_testFloat_caller testFloat:[rb_NativeBridgeTest_testFloat_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    VALUE resValue = rho_ruby_get_NIL();
    if ((callbackURL == nil) && (callbackMethod == 0) && (method_return_result)) {
        resValue = [methodResult toRuby];
    }
    return resValue;
}


VALUE rb_s_NativeBridgeTest_testFloat(int argc, VALUE *argv) {

    id<INativeBridgeTestFactory> factory = [NativeBridgeTestFactorySingleton getNativeBridgeTestFactoryInstance];
    id<INativeBridgeTestSingleton> singleton = [factory getNativeBridgeTestSingleton];
    return rb_NativeBridgeTest_testFloat_Obj(argc, argv, singleton);

}







@interface rb_NativeBridgeTest_testString_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<INativeBridgeTestSingleton> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(rb_NativeBridgeTest_testString_caller_params*) makeParams:(NSArray*)_params _item:(id<INativeBridgeTestSingleton>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation rb_NativeBridgeTest_testString_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(rb_NativeBridgeTest_testString_caller_params*) makeParams:(NSArray*)_params _item:(id<INativeBridgeTestSingleton>)_item _methodResult:(CMethodResult*)_methodResult {
    rb_NativeBridgeTest_testString_caller_params* par = [[rb_NativeBridgeTest_testString_caller_params alloc] init];
    par.params = _params;
    par.item = _item;
    par.methodResult = _methodResult;
    return [par retain];
}

@end


@interface rb_NativeBridgeTest_testString_caller : NSObject {

}
+(rb_NativeBridgeTest_testString_caller*) getSharedInstance;
+(void) testString:(rb_NativeBridgeTest_testString_caller_params*)caller_params;
+(void) testString_in_thread:(rb_NativeBridgeTest_testString_caller_params*)caller_params;
+(void) testString_in_UI_thread:(rb_NativeBridgeTest_testString_caller_params*)caller_params;

@end

static rb_NativeBridgeTest_testString_caller* our_NativeBridgeTest_testString_caller = nil;

@implementation rb_NativeBridgeTest_testString_caller

+(rb_NativeBridgeTest_testString_caller*) getSharedInstance {
    if (our_NativeBridgeTest_testString_caller == nil) {
        our_NativeBridgeTest_testString_caller = [[rb_NativeBridgeTest_testString_caller alloc] init];
    }
    return our_NativeBridgeTest_testString_caller;
}

-(void) command_testString:(rb_NativeBridgeTest_testString_caller_params*)caller_params {

    NSArray* params = caller_params.params;

    id<INativeBridgeTestSingleton> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem testString:(NSString*)[params objectAtIndex:0] methodResult:methodResult ];
    [caller_params release];
}

+(void) testString:(rb_NativeBridgeTest_testString_caller_params*)caller_params {
    [[rb_NativeBridgeTest_testString_caller getSharedInstance] command_testString:caller_params];
}

+(void) testString_in_thread:(rb_NativeBridgeTest_testString_caller_params*)caller_params {
    [[rb_NativeBridgeTest_testString_caller getSharedInstance] performSelectorInBackground:@selector(command_testString:) withObject:caller_params];
}

+(void) testString_in_UI_thread:(rb_NativeBridgeTest_testString_caller_params*)caller_params {
    [[rb_NativeBridgeTest_testString_caller getSharedInstance] performSelectorOnMainThread:@selector(command_testString:) withObject:caller_params waitUntilDone:NO];
}


@end


VALUE rb_NativeBridgeTest_testString_Obj(int argc, VALUE *argv, id<INativeBridgeTestSingleton>objItem) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[1+1];
    NSString* callbackURL = nil;
    unsigned long callbackMethod = 0;
    NSString* callbackParam = nil;
    BOOL method_return_result = YES;

    [methodResult setMethodSignature:@"NativeBridgeTest::testString"];

    
    BOOL is_factory_param[] = { NO, NO };

    int i;

    // init
    for (i = 0; i < (1); i++) {
        params[i] = [NSNull null];
    }

    

    // enumerate params
    for (int i = 0; i < (1); i++) {
        if (argc > i) {
            // we have a [i] param !
            if (is_factory_param[i]) {
                params[i] = NativeBridgeTest_makeInstanceByRubyObject(argv[i]);
            }
            else {
                params[i] = [[CRubyConverter convertFromRuby:argv[i]] retain];
            }
        }
    }

    NSMutableArray* params_array = [NSMutableArray arrayWithCapacity:(1)];
    for (i = 0 ; i < (1); i++) {
        [params_array addObject:params[i]];
    }

    
    // check callback
    if (argc >= (1+1)) {
        VALUE callback = argv[1];
        if (rho_ruby_is_string(callback)) {
            callbackURL = [((NSString*)[CRubyConverter convertFromRuby:callback]) retain];
        }
        else if (rho_ruby_is_proc(callback) || rho_ruby_is_method(callback)) {
            callbackMethod = callback;
        }
    }
    // check callback param
    if (argc >= (1+2)) {
        VALUE callback_param = argv[1+1];
        if (rho_ruby_is_string(callback_param)) {
            callbackParam = [((NSString*)[CRubyConverter convertFromRuby:callback_param]) retain];
        }
    }
    

    
    


    if ((callbackURL != nil) || (callbackMethod != 0)) {
        // we have callback - method should not call setResult if method execute from current thread - only later or in UI or separated threads !!!
        if (callbackURL != nil)
            [methodResult setRubyCallback:callbackURL];
        if (callbackMethod != 0)
            [methodResult setRubyCallbackMethod:callbackMethod];
        if (callbackParam != nil) {
            [methodResult setCallbackParam:callbackParam];
        }
        
        [rb_NativeBridgeTest_testString_caller testString_in_thread:[rb_NativeBridgeTest_testString_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    else {
        // we do not have callback
        
        [rb_NativeBridgeTest_testString_caller testString:[rb_NativeBridgeTest_testString_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    VALUE resValue = rho_ruby_get_NIL();
    if ((callbackURL == nil) && (callbackMethod == 0) && (method_return_result)) {
        resValue = [methodResult toRuby];
    }
    return resValue;
}


VALUE rb_s_NativeBridgeTest_testString(int argc, VALUE *argv) {

    id<INativeBridgeTestFactory> factory = [NativeBridgeTestFactorySingleton getNativeBridgeTestFactoryInstance];
    id<INativeBridgeTestSingleton> singleton = [factory getNativeBridgeTestSingleton];
    return rb_NativeBridgeTest_testString_Obj(argc, argv, singleton);

}









