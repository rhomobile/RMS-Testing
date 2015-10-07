
#import "IDummy.h"
//#import "api_generator/common/ruby_helpers.h"

#import "ruby/ext/rho/rhoruby.h"
#import "api_generator/iphone/CMethodResult.h"
#import "api_generator/iphone/CRubyConverter.h"

extern VALUE getRuby_Dummy_Module();



@interface Dummy_RubyValueFactory : NSObject<IMethodResult_RubyObjectFactory> {
}

- (VALUE) makeRubyValue:(NSObject*)obj;
+ (Dummy_RubyValueFactory*) getSharedInstance;

@end

static Dummy_RubyValueFactory* our_Dummy_RubyValueFactory = nil;

@implementation Dummy_RubyValueFactory

- (VALUE) makeRubyValue:(NSObject*)obj {
    VALUE v = rho_ruby_get_NIL();
    if ([obj isKindOfClass:[NSString class]]) {
        // single objects id
        NSString* strRes = (NSString*)obj;
        v = rho_ruby_create_object_with_id( getRuby_Dummy_Module(), [strRes UTF8String] );
    }
    else if ([obj isKindOfClass:[NSArray class]]) {
        // list of IDs
        v = rho_ruby_create_array();
        NSArray* arrRes = (NSArray*)obj;
        int i;
        for (i = 0; i < [arrRes count]; i++) {
            NSString* strItem = (NSString*)[arrRes objectAtIndex:i];
            VALUE vItem = rho_ruby_create_object_with_id( getRuby_Dummy_Module(), [strItem UTF8String] );
            rho_ruby_add_to_array(v, vItem);
        }
    }
    return v;
}

+ (Dummy_RubyValueFactory*) getSharedInstance {
    if (our_Dummy_RubyValueFactory == nil) {
        our_Dummy_RubyValueFactory = [[Dummy_RubyValueFactory alloc] init];
    }
    return our_Dummy_RubyValueFactory;
}

@end


id<IDummy> Dummy_makeInstanceByRubyObject(VALUE obj) {
    const char* szID = rho_ruby_get_object_id( obj );
    id<IDummyFactory> factory = [DummyFactorySingleton getDummyFactoryInstance];
    return [factory getDummyByID:[NSString stringWithUTF8String:szID]];
}









@interface rb_Dummy_getSimpleStringProperty_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<IDummy> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(rb_Dummy_getSimpleStringProperty_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation rb_Dummy_getSimpleStringProperty_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(rb_Dummy_getSimpleStringProperty_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult {
    rb_Dummy_getSimpleStringProperty_caller_params* par = [[[rb_Dummy_getSimpleStringProperty_caller_params alloc] init] autorelease];
    par.params = _params;
    par.item = _item;
    par.methodResult = [_methodResult retain];
    return [par retain];
}

@end


@interface rb_Dummy_getSimpleStringProperty_caller : NSObject {

}
+(rb_Dummy_getSimpleStringProperty_caller*) getSharedInstance;
+(void) getSimpleStringProperty:(rb_Dummy_getSimpleStringProperty_caller_params*)caller_params;
+(void) getSimpleStringProperty_in_thread:(rb_Dummy_getSimpleStringProperty_caller_params*)caller_params;
+(void) getSimpleStringProperty_in_UI_thread:(rb_Dummy_getSimpleStringProperty_caller_params*)caller_params;

@end

static rb_Dummy_getSimpleStringProperty_caller* our_Dummy_getSimpleStringProperty_caller = nil;

@implementation rb_Dummy_getSimpleStringProperty_caller

+(rb_Dummy_getSimpleStringProperty_caller*) getSharedInstance {
    if (our_Dummy_getSimpleStringProperty_caller == nil) {
        our_Dummy_getSimpleStringProperty_caller = [[rb_Dummy_getSimpleStringProperty_caller alloc] init];
    }
    return our_Dummy_getSimpleStringProperty_caller;
}

-(void) command_getSimpleStringProperty:(rb_Dummy_getSimpleStringProperty_caller_params*)caller_params {

    id<IDummy> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem getSimpleStringProperty:methodResult ];
    [caller_params.methodResult release];
    [caller_params release];
}

+(void) getSimpleStringProperty:(rb_Dummy_getSimpleStringProperty_caller_params*)caller_params {
    [[rb_Dummy_getSimpleStringProperty_caller getSharedInstance] command_getSimpleStringProperty:caller_params];
}

+(void) getSimpleStringProperty_in_thread:(rb_Dummy_getSimpleStringProperty_caller_params*)caller_params {
    [[rb_Dummy_getSimpleStringProperty_caller getSharedInstance] performSelectorInBackground:@selector(command_getSimpleStringProperty:) withObject:caller_params];
}

+(void) getSimpleStringProperty_in_UI_thread:(rb_Dummy_getSimpleStringProperty_caller_params*)caller_params {
    [[rb_Dummy_getSimpleStringProperty_caller getSharedInstance] performSelectorOnMainThread:@selector(command_getSimpleStringProperty:) withObject:caller_params waitUntilDone:NO];
}


@end


VALUE rb_Dummy_getSimpleStringProperty_Obj(int argc, VALUE *argv, id<IDummy>objItem) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[0+1];
    NSString* callbackURL = nil;
    unsigned long callbackMethod = 0;
    NSString* callbackParam = nil;
    BOOL method_return_result = YES;

    [methodResult setMethodSignature:@"Dummy::simpleStringProperty"];

    
    BOOL is_factory_param[] = { NO };

    int i;

    // init
    for (i = 0; i < (0); i++) {
        params[i] = [NSNull null];
    }

    

    // enumerate params
    for (int i = 0; i < (0); i++) {
        if (argc > i) {
            // we have a [i] param !
            if (is_factory_param[i]) {
                params[i] = Dummy_makeInstanceByRubyObject(argv[i]);
            }
            else {
                params[i] = [[CRubyConverter convertFromRuby:argv[i]] retain];
            }
        }
    }

    NSMutableArray* params_array = [NSMutableArray arrayWithCapacity:(0)];
    for (i = 0 ; i < (0); i++) {
        [params_array addObject:params[i]];
    }

    
    // check callback
    if (argc >= (0+1)) {
        VALUE callback = argv[0];
        if (rho_ruby_is_string(callback)) {
            callbackURL = [((NSString*)[CRubyConverter convertFromRuby:callback]) retain];
        }
        else if (rho_ruby_is_proc(callback) || rho_ruby_is_method(callback)) {
            callbackMethod = callback;
        }
    }
    // check callback param
    if (argc >= (0+2)) {
        VALUE callback_param = argv[0+1];
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
        
        [rb_Dummy_getSimpleStringProperty_caller getSimpleStringProperty_in_thread:[rb_Dummy_getSimpleStringProperty_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        

        // FIXME: callback should not be retained, it must be saved outside of this call
        [methodResult retain];
    }
    else {
        // we do not have callback
        
        [rb_Dummy_getSimpleStringProperty_caller getSimpleStringProperty:[rb_Dummy_getSimpleStringProperty_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    VALUE resValue = rho_ruby_get_NIL();
    if ((callbackURL == nil) && (callbackMethod == 0) && (method_return_result)) {
        resValue = [methodResult toRuby];
    }
    [methodResult release];
    return resValue;
}


VALUE rb_Dummy_getSimpleStringProperty(int argc, VALUE *argv, VALUE obj) {

    id<IDummy> item = Dummy_makeInstanceByRubyObject(obj);
    return rb_Dummy_getSimpleStringProperty_Obj(argc, argv, item);

}

VALUE rb_s_Dummy_def_getSimpleStringProperty(int argc, VALUE *argv) {
    id<IDummyFactory> factory = [DummyFactorySingleton getDummyFactoryInstance];
    id<IDummySingleton> singleton = [factory getDummySingleton];

    NSString* defID = [singleton getDefaultID];

    id<IDummy> item = [factory getDummyByID:defID];
    return rb_Dummy_getSimpleStringProperty_Obj(argc, argv, item);
}







@interface rb_Dummy_setSimpleStringProperty_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<IDummy> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(rb_Dummy_setSimpleStringProperty_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation rb_Dummy_setSimpleStringProperty_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(rb_Dummy_setSimpleStringProperty_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult {
    rb_Dummy_setSimpleStringProperty_caller_params* par = [[[rb_Dummy_setSimpleStringProperty_caller_params alloc] init] autorelease];
    par.params = _params;
    par.item = _item;
    par.methodResult = [_methodResult retain];
    return [par retain];
}

@end


@interface rb_Dummy_setSimpleStringProperty_caller : NSObject {

}
+(rb_Dummy_setSimpleStringProperty_caller*) getSharedInstance;
+(void) setSimpleStringProperty:(rb_Dummy_setSimpleStringProperty_caller_params*)caller_params;
+(void) setSimpleStringProperty_in_thread:(rb_Dummy_setSimpleStringProperty_caller_params*)caller_params;
+(void) setSimpleStringProperty_in_UI_thread:(rb_Dummy_setSimpleStringProperty_caller_params*)caller_params;

@end

static rb_Dummy_setSimpleStringProperty_caller* our_Dummy_setSimpleStringProperty_caller = nil;

@implementation rb_Dummy_setSimpleStringProperty_caller

+(rb_Dummy_setSimpleStringProperty_caller*) getSharedInstance {
    if (our_Dummy_setSimpleStringProperty_caller == nil) {
        our_Dummy_setSimpleStringProperty_caller = [[rb_Dummy_setSimpleStringProperty_caller alloc] init];
    }
    return our_Dummy_setSimpleStringProperty_caller;
}

-(void) command_setSimpleStringProperty:(rb_Dummy_setSimpleStringProperty_caller_params*)caller_params {

    NSArray* params = caller_params.params;

    id<IDummy> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem setSimpleStringProperty:(NSString*)[params objectAtIndex:0] methodResult:methodResult ];
    [caller_params.methodResult release];
    [caller_params release];
}

+(void) setSimpleStringProperty:(rb_Dummy_setSimpleStringProperty_caller_params*)caller_params {
    [[rb_Dummy_setSimpleStringProperty_caller getSharedInstance] command_setSimpleStringProperty:caller_params];
}

+(void) setSimpleStringProperty_in_thread:(rb_Dummy_setSimpleStringProperty_caller_params*)caller_params {
    [[rb_Dummy_setSimpleStringProperty_caller getSharedInstance] performSelectorInBackground:@selector(command_setSimpleStringProperty:) withObject:caller_params];
}

+(void) setSimpleStringProperty_in_UI_thread:(rb_Dummy_setSimpleStringProperty_caller_params*)caller_params {
    [[rb_Dummy_setSimpleStringProperty_caller getSharedInstance] performSelectorOnMainThread:@selector(command_setSimpleStringProperty:) withObject:caller_params waitUntilDone:NO];
}


@end


VALUE rb_Dummy_setSimpleStringProperty_Obj(int argc, VALUE *argv, id<IDummy>objItem) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[1+1];
    NSString* callbackURL = nil;
    unsigned long callbackMethod = 0;
    NSString* callbackParam = nil;
    BOOL method_return_result = YES;

    [methodResult setMethodSignature:@"Dummy::simpleStringProperty="];

    
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
                params[i] = Dummy_makeInstanceByRubyObject(argv[i]);
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
        
        [rb_Dummy_setSimpleStringProperty_caller setSimpleStringProperty_in_thread:[rb_Dummy_setSimpleStringProperty_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        

        // FIXME: callback should not be retained, it must be saved outside of this call
        [methodResult retain];
    }
    else {
        // we do not have callback
        
        [rb_Dummy_setSimpleStringProperty_caller setSimpleStringProperty:[rb_Dummy_setSimpleStringProperty_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    VALUE resValue = rho_ruby_get_NIL();
    if ((callbackURL == nil) && (callbackMethod == 0) && (method_return_result)) {
        resValue = [methodResult toRuby];
    }
    [methodResult release];
    return resValue;
}


VALUE rb_Dummy_setSimpleStringProperty(int argc, VALUE *argv, VALUE obj) {

    id<IDummy> item = Dummy_makeInstanceByRubyObject(obj);
    return rb_Dummy_setSimpleStringProperty_Obj(argc, argv, item);

}

VALUE rb_s_Dummy_def_setSimpleStringProperty(int argc, VALUE *argv) {
    id<IDummyFactory> factory = [DummyFactorySingleton getDummyFactoryInstance];
    id<IDummySingleton> singleton = [factory getDummySingleton];

    NSString* defID = [singleton getDefaultID];

    id<IDummy> item = [factory getDummyByID:defID];
    return rb_Dummy_setSimpleStringProperty_Obj(argc, argv, item);
}







@interface rb_Dummy_enumerate_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<IDummySingleton> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(rb_Dummy_enumerate_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummySingleton>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation rb_Dummy_enumerate_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(rb_Dummy_enumerate_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummySingleton>)_item _methodResult:(CMethodResult*)_methodResult {
    rb_Dummy_enumerate_caller_params* par = [[[rb_Dummy_enumerate_caller_params alloc] init] autorelease];
    par.params = _params;
    par.item = _item;
    par.methodResult = [_methodResult retain];
    return [par retain];
}

@end


@interface rb_Dummy_enumerate_caller : NSObject {

}
+(rb_Dummy_enumerate_caller*) getSharedInstance;
+(void) enumerate:(rb_Dummy_enumerate_caller_params*)caller_params;
+(void) enumerate_in_thread:(rb_Dummy_enumerate_caller_params*)caller_params;
+(void) enumerate_in_UI_thread:(rb_Dummy_enumerate_caller_params*)caller_params;

@end

static rb_Dummy_enumerate_caller* our_Dummy_enumerate_caller = nil;

@implementation rb_Dummy_enumerate_caller

+(rb_Dummy_enumerate_caller*) getSharedInstance {
    if (our_Dummy_enumerate_caller == nil) {
        our_Dummy_enumerate_caller = [[rb_Dummy_enumerate_caller alloc] init];
    }
    return our_Dummy_enumerate_caller;
}

-(void) command_enumerate:(rb_Dummy_enumerate_caller_params*)caller_params {

    id<IDummySingleton> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem enumerate:methodResult ];
    [caller_params.methodResult release];
    [caller_params release];
}

+(void) enumerate:(rb_Dummy_enumerate_caller_params*)caller_params {
    [[rb_Dummy_enumerate_caller getSharedInstance] command_enumerate:caller_params];
}

+(void) enumerate_in_thread:(rb_Dummy_enumerate_caller_params*)caller_params {
    [[rb_Dummy_enumerate_caller getSharedInstance] performSelectorInBackground:@selector(command_enumerate:) withObject:caller_params];
}

+(void) enumerate_in_UI_thread:(rb_Dummy_enumerate_caller_params*)caller_params {
    [[rb_Dummy_enumerate_caller getSharedInstance] performSelectorOnMainThread:@selector(command_enumerate:) withObject:caller_params waitUntilDone:NO];
}


@end


VALUE rb_Dummy_enumerate_Obj(int argc, VALUE *argv, id<IDummySingleton>objItem) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[0+1];
    NSString* callbackURL = nil;
    unsigned long callbackMethod = 0;
    NSString* callbackParam = nil;
    BOOL method_return_result = YES;

    [methodResult setMethodSignature:@"Dummy::enumerate"];

    
    BOOL is_factory_param[] = { NO };

    int i;

    // init
    for (i = 0; i < (0); i++) {
        params[i] = [NSNull null];
    }

    

    // enumerate params
    for (int i = 0; i < (0); i++) {
        if (argc > i) {
            // we have a [i] param !
            if (is_factory_param[i]) {
                params[i] = Dummy_makeInstanceByRubyObject(argv[i]);
            }
            else {
                params[i] = [[CRubyConverter convertFromRuby:argv[i]] retain];
            }
        }
    }

    NSMutableArray* params_array = [NSMutableArray arrayWithCapacity:(0)];
    for (i = 0 ; i < (0); i++) {
        [params_array addObject:params[i]];
    }

    
    // check callback
    if (argc >= (0+1)) {
        VALUE callback = argv[0];
        if (rho_ruby_is_string(callback)) {
            callbackURL = [((NSString*)[CRubyConverter convertFromRuby:callback]) retain];
        }
        else if (rho_ruby_is_proc(callback) || rho_ruby_is_method(callback)) {
            callbackMethod = callback;
        }
    }
    // check callback param
    if (argc >= (0+2)) {
        VALUE callback_param = argv[0+1];
        if (rho_ruby_is_string(callback_param)) {
            callbackParam = [((NSString*)[CRubyConverter convertFromRuby:callback_param]) retain];
        }
    }
    

    
    [methodResult enableObjectCreationModeWithRubyClassPath:@"Rho::Dummy"];


    if ((callbackURL != nil) || (callbackMethod != 0)) {
        // we have callback - method should not call setResult if method execute from current thread - only later or in UI or separated threads !!!
        if (callbackURL != nil)
            [methodResult setRubyCallback:callbackURL];
        if (callbackMethod != 0)
            [methodResult setRubyCallbackMethod:callbackMethod];
        if (callbackParam != nil) {
            [methodResult setCallbackParam:callbackParam];
        }
        
        [rb_Dummy_enumerate_caller enumerate_in_thread:[rb_Dummy_enumerate_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        

        // FIXME: callback should not be retained, it must be saved outside of this call
        [methodResult retain];
    }
    else {
        // we do not have callback
        
        [rb_Dummy_enumerate_caller enumerate:[rb_Dummy_enumerate_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    VALUE resValue = rho_ruby_get_NIL();
    if ((callbackURL == nil) && (callbackMethod == 0) && (method_return_result)) {
        resValue = [methodResult toRuby];
    }
    [methodResult release];
    return resValue;
}


VALUE rb_s_Dummy_enumerate(int argc, VALUE *argv) {

    id<IDummyFactory> factory = [DummyFactorySingleton getDummyFactoryInstance];
    id<IDummySingleton> singleton = [factory getDummySingleton];
    return rb_Dummy_enumerate_Obj(argc, argv, singleton);

}







@interface rb_Dummy_getPlatformName_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<IDummy> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(rb_Dummy_getPlatformName_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation rb_Dummy_getPlatformName_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(rb_Dummy_getPlatformName_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult {
    rb_Dummy_getPlatformName_caller_params* par = [[[rb_Dummy_getPlatformName_caller_params alloc] init] autorelease];
    par.params = _params;
    par.item = _item;
    par.methodResult = [_methodResult retain];
    return [par retain];
}

@end


@interface rb_Dummy_getPlatformName_caller : NSObject {

}
+(rb_Dummy_getPlatformName_caller*) getSharedInstance;
+(void) getPlatformName:(rb_Dummy_getPlatformName_caller_params*)caller_params;
+(void) getPlatformName_in_thread:(rb_Dummy_getPlatformName_caller_params*)caller_params;
+(void) getPlatformName_in_UI_thread:(rb_Dummy_getPlatformName_caller_params*)caller_params;

@end

static rb_Dummy_getPlatformName_caller* our_Dummy_getPlatformName_caller = nil;

@implementation rb_Dummy_getPlatformName_caller

+(rb_Dummy_getPlatformName_caller*) getSharedInstance {
    if (our_Dummy_getPlatformName_caller == nil) {
        our_Dummy_getPlatformName_caller = [[rb_Dummy_getPlatformName_caller alloc] init];
    }
    return our_Dummy_getPlatformName_caller;
}

-(void) command_getPlatformName:(rb_Dummy_getPlatformName_caller_params*)caller_params {

    id<IDummy> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem getPlatformName:methodResult ];
    [caller_params.methodResult release];
    [caller_params release];
}

+(void) getPlatformName:(rb_Dummy_getPlatformName_caller_params*)caller_params {
    [[rb_Dummy_getPlatformName_caller getSharedInstance] command_getPlatformName:caller_params];
}

+(void) getPlatformName_in_thread:(rb_Dummy_getPlatformName_caller_params*)caller_params {
    [[rb_Dummy_getPlatformName_caller getSharedInstance] performSelectorInBackground:@selector(command_getPlatformName:) withObject:caller_params];
}

+(void) getPlatformName_in_UI_thread:(rb_Dummy_getPlatformName_caller_params*)caller_params {
    [[rb_Dummy_getPlatformName_caller getSharedInstance] performSelectorOnMainThread:@selector(command_getPlatformName:) withObject:caller_params waitUntilDone:NO];
}


@end


VALUE rb_Dummy_getPlatformName_Obj(int argc, VALUE *argv, id<IDummy>objItem) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[0+1];
    NSString* callbackURL = nil;
    unsigned long callbackMethod = 0;
    NSString* callbackParam = nil;
    BOOL method_return_result = YES;

    [methodResult setMethodSignature:@"Dummy::getPlatformName"];

    
    BOOL is_factory_param[] = { NO };

    int i;

    // init
    for (i = 0; i < (0); i++) {
        params[i] = [NSNull null];
    }

    

    // enumerate params
    for (int i = 0; i < (0); i++) {
        if (argc > i) {
            // we have a [i] param !
            if (is_factory_param[i]) {
                params[i] = Dummy_makeInstanceByRubyObject(argv[i]);
            }
            else {
                params[i] = [[CRubyConverter convertFromRuby:argv[i]] retain];
            }
        }
    }

    NSMutableArray* params_array = [NSMutableArray arrayWithCapacity:(0)];
    for (i = 0 ; i < (0); i++) {
        [params_array addObject:params[i]];
    }

    
    // check callback
    if (argc >= (0+1)) {
        VALUE callback = argv[0];
        if (rho_ruby_is_string(callback)) {
            callbackURL = [((NSString*)[CRubyConverter convertFromRuby:callback]) retain];
        }
        else if (rho_ruby_is_proc(callback) || rho_ruby_is_method(callback)) {
            callbackMethod = callback;
        }
    }
    // check callback param
    if (argc >= (0+2)) {
        VALUE callback_param = argv[0+1];
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
        
        [rb_Dummy_getPlatformName_caller getPlatformName_in_thread:[rb_Dummy_getPlatformName_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        

        // FIXME: callback should not be retained, it must be saved outside of this call
        [methodResult retain];
    }
    else {
        // we do not have callback
        
        [rb_Dummy_getPlatformName_caller getPlatformName:[rb_Dummy_getPlatformName_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    VALUE resValue = rho_ruby_get_NIL();
    if ((callbackURL == nil) && (callbackMethod == 0) && (method_return_result)) {
        resValue = [methodResult toRuby];
    }
    [methodResult release];
    return resValue;
}


VALUE rb_Dummy_getPlatformName(int argc, VALUE *argv, VALUE obj) {

    id<IDummy> item = Dummy_makeInstanceByRubyObject(obj);
    return rb_Dummy_getPlatformName_Obj(argc, argv, item);

}

VALUE rb_s_Dummy_def_getPlatformName(int argc, VALUE *argv) {
    id<IDummyFactory> factory = [DummyFactorySingleton getDummyFactoryInstance];
    id<IDummySingleton> singleton = [factory getDummySingleton];

    NSString* defID = [singleton getDefaultID];

    id<IDummy> item = [factory getDummyByID:defID];
    return rb_Dummy_getPlatformName_Obj(argc, argv, item);
}







@interface rb_Dummy_calcSumm_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<IDummy> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(rb_Dummy_calcSumm_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation rb_Dummy_calcSumm_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(rb_Dummy_calcSumm_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult {
    rb_Dummy_calcSumm_caller_params* par = [[[rb_Dummy_calcSumm_caller_params alloc] init] autorelease];
    par.params = _params;
    par.item = _item;
    par.methodResult = [_methodResult retain];
    return [par retain];
}

@end


@interface rb_Dummy_calcSumm_caller : NSObject {

}
+(rb_Dummy_calcSumm_caller*) getSharedInstance;
+(void) calcSumm:(rb_Dummy_calcSumm_caller_params*)caller_params;
+(void) calcSumm_in_thread:(rb_Dummy_calcSumm_caller_params*)caller_params;
+(void) calcSumm_in_UI_thread:(rb_Dummy_calcSumm_caller_params*)caller_params;

@end

static rb_Dummy_calcSumm_caller* our_Dummy_calcSumm_caller = nil;

@implementation rb_Dummy_calcSumm_caller

+(rb_Dummy_calcSumm_caller*) getSharedInstance {
    if (our_Dummy_calcSumm_caller == nil) {
        our_Dummy_calcSumm_caller = [[rb_Dummy_calcSumm_caller alloc] init];
    }
    return our_Dummy_calcSumm_caller;
}

-(void) command_calcSumm:(rb_Dummy_calcSumm_caller_params*)caller_params {

    NSArray* params = caller_params.params;

    id<IDummy> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem calcSumm:(int)[((NSNumber*)[params objectAtIndex:0]) intValue] b:(int)[((NSNumber*)[params objectAtIndex:1]) intValue] methodResult:methodResult ];
    [caller_params.methodResult release];
    [caller_params release];
}

+(void) calcSumm:(rb_Dummy_calcSumm_caller_params*)caller_params {
    [[rb_Dummy_calcSumm_caller getSharedInstance] command_calcSumm:caller_params];
}

+(void) calcSumm_in_thread:(rb_Dummy_calcSumm_caller_params*)caller_params {
    [[rb_Dummy_calcSumm_caller getSharedInstance] performSelectorInBackground:@selector(command_calcSumm:) withObject:caller_params];
}

+(void) calcSumm_in_UI_thread:(rb_Dummy_calcSumm_caller_params*)caller_params {
    [[rb_Dummy_calcSumm_caller getSharedInstance] performSelectorOnMainThread:@selector(command_calcSumm:) withObject:caller_params waitUntilDone:NO];
}


@end


VALUE rb_Dummy_calcSumm_Obj(int argc, VALUE *argv, id<IDummy>objItem) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[2+1];
    NSString* callbackURL = nil;
    unsigned long callbackMethod = 0;
    NSString* callbackParam = nil;
    BOOL method_return_result = YES;

    [methodResult setMethodSignature:@"Dummy::calcSumm"];

    
    BOOL is_factory_param[] = { NO, NO, NO };

    int i;

    // init
    for (i = 0; i < (2); i++) {
        params[i] = [NSNull null];
    }

    

    // enumerate params
    for (int i = 0; i < (2); i++) {
        if (argc > i) {
            // we have a [i] param !
            if (is_factory_param[i]) {
                params[i] = Dummy_makeInstanceByRubyObject(argv[i]);
            }
            else {
                params[i] = [[CRubyConverter convertFromRuby:argv[i]] retain];
            }
        }
    }

    NSMutableArray* params_array = [NSMutableArray arrayWithCapacity:(2)];
    for (i = 0 ; i < (2); i++) {
        [params_array addObject:params[i]];
    }

    
    // check callback
    if (argc >= (2+1)) {
        VALUE callback = argv[2];
        if (rho_ruby_is_string(callback)) {
            callbackURL = [((NSString*)[CRubyConverter convertFromRuby:callback]) retain];
        }
        else if (rho_ruby_is_proc(callback) || rho_ruby_is_method(callback)) {
            callbackMethod = callback;
        }
    }
    // check callback param
    if (argc >= (2+2)) {
        VALUE callback_param = argv[2+1];
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
        
        [rb_Dummy_calcSumm_caller calcSumm_in_thread:[rb_Dummy_calcSumm_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        

        // FIXME: callback should not be retained, it must be saved outside of this call
        [methodResult retain];
    }
    else {
        // we do not have callback
        
        [rb_Dummy_calcSumm_caller calcSumm:[rb_Dummy_calcSumm_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    VALUE resValue = rho_ruby_get_NIL();
    if ((callbackURL == nil) && (callbackMethod == 0) && (method_return_result)) {
        resValue = [methodResult toRuby];
    }
    [methodResult release];
    return resValue;
}


VALUE rb_Dummy_calcSumm(int argc, VALUE *argv, VALUE obj) {

    id<IDummy> item = Dummy_makeInstanceByRubyObject(obj);
    return rb_Dummy_calcSumm_Obj(argc, argv, item);

}

VALUE rb_s_Dummy_def_calcSumm(int argc, VALUE *argv) {
    id<IDummyFactory> factory = [DummyFactorySingleton getDummyFactoryInstance];
    id<IDummySingleton> singleton = [factory getDummySingleton];

    NSString* defID = [singleton getDefaultID];

    id<IDummy> item = [factory getDummyByID:defID];
    return rb_Dummy_calcSumm_Obj(argc, argv, item);
}







@interface rb_Dummy_joinStrings_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<IDummy> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(rb_Dummy_joinStrings_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation rb_Dummy_joinStrings_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(rb_Dummy_joinStrings_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult {
    rb_Dummy_joinStrings_caller_params* par = [[[rb_Dummy_joinStrings_caller_params alloc] init] autorelease];
    par.params = _params;
    par.item = _item;
    par.methodResult = [_methodResult retain];
    return [par retain];
}

@end


@interface rb_Dummy_joinStrings_caller : NSObject {

}
+(rb_Dummy_joinStrings_caller*) getSharedInstance;
+(void) joinStrings:(rb_Dummy_joinStrings_caller_params*)caller_params;
+(void) joinStrings_in_thread:(rb_Dummy_joinStrings_caller_params*)caller_params;
+(void) joinStrings_in_UI_thread:(rb_Dummy_joinStrings_caller_params*)caller_params;

@end

static rb_Dummy_joinStrings_caller* our_Dummy_joinStrings_caller = nil;

@implementation rb_Dummy_joinStrings_caller

+(rb_Dummy_joinStrings_caller*) getSharedInstance {
    if (our_Dummy_joinStrings_caller == nil) {
        our_Dummy_joinStrings_caller = [[rb_Dummy_joinStrings_caller alloc] init];
    }
    return our_Dummy_joinStrings_caller;
}

-(void) command_joinStrings:(rb_Dummy_joinStrings_caller_params*)caller_params {

    NSArray* params = caller_params.params;

    id<IDummy> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem joinStrings:(NSString*)[params objectAtIndex:0] b:(NSString*)[params objectAtIndex:1] methodResult:methodResult ];
    [caller_params.methodResult release];
    [caller_params release];
}

+(void) joinStrings:(rb_Dummy_joinStrings_caller_params*)caller_params {
    [[rb_Dummy_joinStrings_caller getSharedInstance] command_joinStrings:caller_params];
}

+(void) joinStrings_in_thread:(rb_Dummy_joinStrings_caller_params*)caller_params {
    [[rb_Dummy_joinStrings_caller getSharedInstance] performSelectorInBackground:@selector(command_joinStrings:) withObject:caller_params];
}

+(void) joinStrings_in_UI_thread:(rb_Dummy_joinStrings_caller_params*)caller_params {
    [[rb_Dummy_joinStrings_caller getSharedInstance] performSelectorOnMainThread:@selector(command_joinStrings:) withObject:caller_params waitUntilDone:NO];
}


@end


VALUE rb_Dummy_joinStrings_Obj(int argc, VALUE *argv, id<IDummy>objItem) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[2+1];
    NSString* callbackURL = nil;
    unsigned long callbackMethod = 0;
    NSString* callbackParam = nil;
    BOOL method_return_result = YES;

    [methodResult setMethodSignature:@"Dummy::joinStrings"];

    
    BOOL is_factory_param[] = { NO, NO, NO };

    int i;

    // init
    for (i = 0; i < (2); i++) {
        params[i] = [NSNull null];
    }

    

    // enumerate params
    for (int i = 0; i < (2); i++) {
        if (argc > i) {
            // we have a [i] param !
            if (is_factory_param[i]) {
                params[i] = Dummy_makeInstanceByRubyObject(argv[i]);
            }
            else {
                params[i] = [[CRubyConverter convertFromRuby:argv[i]] retain];
            }
        }
    }

    NSMutableArray* params_array = [NSMutableArray arrayWithCapacity:(2)];
    for (i = 0 ; i < (2); i++) {
        [params_array addObject:params[i]];
    }

    
    // check callback
    if (argc >= (2+1)) {
        VALUE callback = argv[2];
        if (rho_ruby_is_string(callback)) {
            callbackURL = [((NSString*)[CRubyConverter convertFromRuby:callback]) retain];
        }
        else if (rho_ruby_is_proc(callback) || rho_ruby_is_method(callback)) {
            callbackMethod = callback;
        }
    }
    // check callback param
    if (argc >= (2+2)) {
        VALUE callback_param = argv[2+1];
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
        
        [rb_Dummy_joinStrings_caller joinStrings_in_thread:[rb_Dummy_joinStrings_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        

        // FIXME: callback should not be retained, it must be saved outside of this call
        [methodResult retain];
    }
    else {
        // we do not have callback
        
        [rb_Dummy_joinStrings_caller joinStrings:[rb_Dummy_joinStrings_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    VALUE resValue = rho_ruby_get_NIL();
    if ((callbackURL == nil) && (callbackMethod == 0) && (method_return_result)) {
        resValue = [methodResult toRuby];
    }
    [methodResult release];
    return resValue;
}


VALUE rb_Dummy_joinStrings(int argc, VALUE *argv, VALUE obj) {

    id<IDummy> item = Dummy_makeInstanceByRubyObject(obj);
    return rb_Dummy_joinStrings_Obj(argc, argv, item);

}

VALUE rb_s_Dummy_def_joinStrings(int argc, VALUE *argv) {
    id<IDummyFactory> factory = [DummyFactorySingleton getDummyFactoryInstance];
    id<IDummySingleton> singleton = [factory getDummySingleton];

    NSString* defID = [singleton getDefaultID];

    id<IDummy> item = [factory getDummyByID:defID];
    return rb_Dummy_joinStrings_Obj(argc, argv, item);
}







@interface rb_Dummy_enable_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<IDummy> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(rb_Dummy_enable_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation rb_Dummy_enable_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(rb_Dummy_enable_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult {
    rb_Dummy_enable_caller_params* par = [[[rb_Dummy_enable_caller_params alloc] init] autorelease];
    par.params = _params;
    par.item = _item;
    par.methodResult = [_methodResult retain];
    return [par retain];
}

@end


@interface rb_Dummy_enable_caller : NSObject {

}
+(rb_Dummy_enable_caller*) getSharedInstance;
+(void) enable:(rb_Dummy_enable_caller_params*)caller_params;
+(void) enable_in_thread:(rb_Dummy_enable_caller_params*)caller_params;
+(void) enable_in_UI_thread:(rb_Dummy_enable_caller_params*)caller_params;

@end

static rb_Dummy_enable_caller* our_Dummy_enable_caller = nil;

@implementation rb_Dummy_enable_caller

+(rb_Dummy_enable_caller*) getSharedInstance {
    if (our_Dummy_enable_caller == nil) {
        our_Dummy_enable_caller = [[rb_Dummy_enable_caller alloc] init];
    }
    return our_Dummy_enable_caller;
}

-(void) command_enable:(rb_Dummy_enable_caller_params*)caller_params {

    NSArray* params = caller_params.params;

    id<IDummy> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem enable:(int)[((NSNumber*)[params objectAtIndex:0]) intValue] methodResult:methodResult ];
    [caller_params.methodResult release];
    [caller_params release];
}

+(void) enable:(rb_Dummy_enable_caller_params*)caller_params {
    [[rb_Dummy_enable_caller getSharedInstance] command_enable:caller_params];
}

+(void) enable_in_thread:(rb_Dummy_enable_caller_params*)caller_params {
    [[rb_Dummy_enable_caller getSharedInstance] performSelectorInBackground:@selector(command_enable:) withObject:caller_params];
}

+(void) enable_in_UI_thread:(rb_Dummy_enable_caller_params*)caller_params {
    [[rb_Dummy_enable_caller getSharedInstance] performSelectorOnMainThread:@selector(command_enable:) withObject:caller_params waitUntilDone:NO];
}


@end


VALUE rb_Dummy_enable_Obj(int argc, VALUE *argv, id<IDummy>objItem) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[1+1];
    NSString* callbackURL = nil;
    unsigned long callbackMethod = 0;
    NSString* callbackParam = nil;
    BOOL method_return_result = YES;

    [methodResult setMethodSignature:@"Dummy::enable"];

    
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
                params[i] = Dummy_makeInstanceByRubyObject(argv[i]);
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
        
        [rb_Dummy_enable_caller enable_in_thread:[rb_Dummy_enable_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        

        // FIXME: callback should not be retained, it must be saved outside of this call
        [methodResult retain];
    }
    else {
        // we do not have callback
        
        [rb_Dummy_enable_caller enable:[rb_Dummy_enable_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    VALUE resValue = rho_ruby_get_NIL();
    if ((callbackURL == nil) && (callbackMethod == 0) && (method_return_result)) {
        resValue = [methodResult toRuby];
    }
    [methodResult release];
    return resValue;
}


VALUE rb_Dummy_enable(int argc, VALUE *argv, VALUE obj) {

    id<IDummy> item = Dummy_makeInstanceByRubyObject(obj);
    return rb_Dummy_enable_Obj(argc, argv, item);

}

VALUE rb_s_Dummy_def_enable(int argc, VALUE *argv) {
    id<IDummyFactory> factory = [DummyFactorySingleton getDummyFactoryInstance];
    id<IDummySingleton> singleton = [factory getDummySingleton];

    NSString* defID = [singleton getDefaultID];

    id<IDummy> item = [factory getDummyByID:defID];
    return rb_Dummy_enable_Obj(argc, argv, item);
}







@interface rb_Dummy_enable_Int_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<IDummy> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(rb_Dummy_enable_Int_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation rb_Dummy_enable_Int_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(rb_Dummy_enable_Int_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult {
    rb_Dummy_enable_Int_caller_params* par = [[[rb_Dummy_enable_Int_caller_params alloc] init] autorelease];
    par.params = _params;
    par.item = _item;
    par.methodResult = [_methodResult retain];
    return [par retain];
}

@end


@interface rb_Dummy_enable_Int_caller : NSObject {

}
+(rb_Dummy_enable_Int_caller*) getSharedInstance;
+(void) enable_Int:(rb_Dummy_enable_Int_caller_params*)caller_params;
+(void) enable_Int_in_thread:(rb_Dummy_enable_Int_caller_params*)caller_params;
+(void) enable_Int_in_UI_thread:(rb_Dummy_enable_Int_caller_params*)caller_params;

@end

static rb_Dummy_enable_Int_caller* our_Dummy_enable_Int_caller = nil;

@implementation rb_Dummy_enable_Int_caller

+(rb_Dummy_enable_Int_caller*) getSharedInstance {
    if (our_Dummy_enable_Int_caller == nil) {
        our_Dummy_enable_Int_caller = [[rb_Dummy_enable_Int_caller alloc] init];
    }
    return our_Dummy_enable_Int_caller;
}

-(void) command_enable_Int:(rb_Dummy_enable_Int_caller_params*)caller_params {

    NSArray* params = caller_params.params;

    id<IDummy> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem enable_Int:(int)[((NSNumber*)[params objectAtIndex:0]) intValue] methodResult:methodResult ];
    [caller_params.methodResult release];
    [caller_params release];
}

+(void) enable_Int:(rb_Dummy_enable_Int_caller_params*)caller_params {
    [[rb_Dummy_enable_Int_caller getSharedInstance] command_enable_Int:caller_params];
}

+(void) enable_Int_in_thread:(rb_Dummy_enable_Int_caller_params*)caller_params {
    [[rb_Dummy_enable_Int_caller getSharedInstance] performSelectorInBackground:@selector(command_enable_Int:) withObject:caller_params];
}

+(void) enable_Int_in_UI_thread:(rb_Dummy_enable_Int_caller_params*)caller_params {
    [[rb_Dummy_enable_Int_caller getSharedInstance] performSelectorOnMainThread:@selector(command_enable_Int:) withObject:caller_params waitUntilDone:NO];
}


@end


VALUE rb_Dummy_enable_Int_Obj(int argc, VALUE *argv, id<IDummy>objItem) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[1+1];
    NSString* callbackURL = nil;
    unsigned long callbackMethod = 0;
    NSString* callbackParam = nil;
    BOOL method_return_result = YES;

    [methodResult setMethodSignature:@"Dummy::enable_Int"];

    
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
                params[i] = Dummy_makeInstanceByRubyObject(argv[i]);
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
        
        [rb_Dummy_enable_Int_caller enable_Int_in_thread:[rb_Dummy_enable_Int_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        

        // FIXME: callback should not be retained, it must be saved outside of this call
        [methodResult retain];
    }
    else {
        // we do not have callback
        
        [rb_Dummy_enable_Int_caller enable_Int:[rb_Dummy_enable_Int_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    VALUE resValue = rho_ruby_get_NIL();
    if ((callbackURL == nil) && (callbackMethod == 0) && (method_return_result)) {
        resValue = [methodResult toRuby];
    }
    [methodResult release];
    return resValue;
}


VALUE rb_Dummy_enable_Int(int argc, VALUE *argv, VALUE obj) {

    id<IDummy> item = Dummy_makeInstanceByRubyObject(obj);
    return rb_Dummy_enable_Int_Obj(argc, argv, item);

}

VALUE rb_s_Dummy_def_enable_Int(int argc, VALUE *argv) {
    id<IDummyFactory> factory = [DummyFactorySingleton getDummyFactoryInstance];
    id<IDummySingleton> singleton = [factory getDummySingleton];

    NSString* defID = [singleton getDefaultID];

    id<IDummy> item = [factory getDummyByID:defID];
    return rb_Dummy_enable_Int_Obj(argc, argv, item);
}







@interface rb_Dummy_enable_str_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<IDummy> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(rb_Dummy_enable_str_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation rb_Dummy_enable_str_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(rb_Dummy_enable_str_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult {
    rb_Dummy_enable_str_caller_params* par = [[[rb_Dummy_enable_str_caller_params alloc] init] autorelease];
    par.params = _params;
    par.item = _item;
    par.methodResult = [_methodResult retain];
    return [par retain];
}

@end


@interface rb_Dummy_enable_str_caller : NSObject {

}
+(rb_Dummy_enable_str_caller*) getSharedInstance;
+(void) enable_str:(rb_Dummy_enable_str_caller_params*)caller_params;
+(void) enable_str_in_thread:(rb_Dummy_enable_str_caller_params*)caller_params;
+(void) enable_str_in_UI_thread:(rb_Dummy_enable_str_caller_params*)caller_params;

@end

static rb_Dummy_enable_str_caller* our_Dummy_enable_str_caller = nil;

@implementation rb_Dummy_enable_str_caller

+(rb_Dummy_enable_str_caller*) getSharedInstance {
    if (our_Dummy_enable_str_caller == nil) {
        our_Dummy_enable_str_caller = [[rb_Dummy_enable_str_caller alloc] init];
    }
    return our_Dummy_enable_str_caller;
}

-(void) command_enable_str:(rb_Dummy_enable_str_caller_params*)caller_params {

    NSArray* params = caller_params.params;

    id<IDummy> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem enable_str:(int)[((NSNumber*)[params objectAtIndex:0]) intValue] methodResult:methodResult ];
    [caller_params.methodResult release];
    [caller_params release];
}

+(void) enable_str:(rb_Dummy_enable_str_caller_params*)caller_params {
    [[rb_Dummy_enable_str_caller getSharedInstance] command_enable_str:caller_params];
}

+(void) enable_str_in_thread:(rb_Dummy_enable_str_caller_params*)caller_params {
    [[rb_Dummy_enable_str_caller getSharedInstance] performSelectorInBackground:@selector(command_enable_str:) withObject:caller_params];
}

+(void) enable_str_in_UI_thread:(rb_Dummy_enable_str_caller_params*)caller_params {
    [[rb_Dummy_enable_str_caller getSharedInstance] performSelectorOnMainThread:@selector(command_enable_str:) withObject:caller_params waitUntilDone:NO];
}


@end


VALUE rb_Dummy_enable_str_Obj(int argc, VALUE *argv, id<IDummy>objItem) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[1+1];
    NSString* callbackURL = nil;
    unsigned long callbackMethod = 0;
    NSString* callbackParam = nil;
    BOOL method_return_result = YES;

    [methodResult setMethodSignature:@"Dummy::enable_str"];

    
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
                params[i] = Dummy_makeInstanceByRubyObject(argv[i]);
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
        
        [rb_Dummy_enable_str_caller enable_str_in_thread:[rb_Dummy_enable_str_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        

        // FIXME: callback should not be retained, it must be saved outside of this call
        [methodResult retain];
    }
    else {
        // we do not have callback
        
        [rb_Dummy_enable_str_caller enable_str:[rb_Dummy_enable_str_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    VALUE resValue = rho_ruby_get_NIL();
    if ((callbackURL == nil) && (callbackMethod == 0) && (method_return_result)) {
        resValue = [methodResult toRuby];
    }
    [methodResult release];
    return resValue;
}


VALUE rb_Dummy_enable_str(int argc, VALUE *argv, VALUE obj) {

    id<IDummy> item = Dummy_makeInstanceByRubyObject(obj);
    return rb_Dummy_enable_str_Obj(argc, argv, item);

}

VALUE rb_s_Dummy_def_enable_str(int argc, VALUE *argv) {
    id<IDummyFactory> factory = [DummyFactorySingleton getDummyFactoryInstance];
    id<IDummySingleton> singleton = [factory getDummySingleton];

    NSString* defID = [singleton getDefaultID];

    id<IDummy> item = [factory getDummyByID:defID];
    return rb_Dummy_enable_str_Obj(argc, argv, item);
}







@interface rb_Dummy_enable_bool_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<IDummy> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(rb_Dummy_enable_bool_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation rb_Dummy_enable_bool_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(rb_Dummy_enable_bool_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult {
    rb_Dummy_enable_bool_caller_params* par = [[[rb_Dummy_enable_bool_caller_params alloc] init] autorelease];
    par.params = _params;
    par.item = _item;
    par.methodResult = [_methodResult retain];
    return [par retain];
}

@end


@interface rb_Dummy_enable_bool_caller : NSObject {

}
+(rb_Dummy_enable_bool_caller*) getSharedInstance;
+(void) enable_bool:(rb_Dummy_enable_bool_caller_params*)caller_params;
+(void) enable_bool_in_thread:(rb_Dummy_enable_bool_caller_params*)caller_params;
+(void) enable_bool_in_UI_thread:(rb_Dummy_enable_bool_caller_params*)caller_params;

@end

static rb_Dummy_enable_bool_caller* our_Dummy_enable_bool_caller = nil;

@implementation rb_Dummy_enable_bool_caller

+(rb_Dummy_enable_bool_caller*) getSharedInstance {
    if (our_Dummy_enable_bool_caller == nil) {
        our_Dummy_enable_bool_caller = [[rb_Dummy_enable_bool_caller alloc] init];
    }
    return our_Dummy_enable_bool_caller;
}

-(void) command_enable_bool:(rb_Dummy_enable_bool_caller_params*)caller_params {

    NSArray* params = caller_params.params;

    id<IDummy> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem enable_bool:(int)[((NSNumber*)[params objectAtIndex:0]) intValue] methodResult:methodResult ];
    [caller_params.methodResult release];
    [caller_params release];
}

+(void) enable_bool:(rb_Dummy_enable_bool_caller_params*)caller_params {
    [[rb_Dummy_enable_bool_caller getSharedInstance] command_enable_bool:caller_params];
}

+(void) enable_bool_in_thread:(rb_Dummy_enable_bool_caller_params*)caller_params {
    [[rb_Dummy_enable_bool_caller getSharedInstance] performSelectorInBackground:@selector(command_enable_bool:) withObject:caller_params];
}

+(void) enable_bool_in_UI_thread:(rb_Dummy_enable_bool_caller_params*)caller_params {
    [[rb_Dummy_enable_bool_caller getSharedInstance] performSelectorOnMainThread:@selector(command_enable_bool:) withObject:caller_params waitUntilDone:NO];
}


@end


VALUE rb_Dummy_enable_bool_Obj(int argc, VALUE *argv, id<IDummy>objItem) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[1+1];
    NSString* callbackURL = nil;
    unsigned long callbackMethod = 0;
    NSString* callbackParam = nil;
    BOOL method_return_result = YES;

    [methodResult setMethodSignature:@"Dummy::enable_bool"];

    
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
                params[i] = Dummy_makeInstanceByRubyObject(argv[i]);
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
        
        [rb_Dummy_enable_bool_caller enable_bool_in_thread:[rb_Dummy_enable_bool_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        

        // FIXME: callback should not be retained, it must be saved outside of this call
        [methodResult retain];
    }
    else {
        // we do not have callback
        
        [rb_Dummy_enable_bool_caller enable_bool:[rb_Dummy_enable_bool_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    VALUE resValue = rho_ruby_get_NIL();
    if ((callbackURL == nil) && (callbackMethod == 0) && (method_return_result)) {
        resValue = [methodResult toRuby];
    }
    [methodResult release];
    return resValue;
}


VALUE rb_Dummy_enable_bool(int argc, VALUE *argv, VALUE obj) {

    id<IDummy> item = Dummy_makeInstanceByRubyObject(obj);
    return rb_Dummy_enable_bool_Obj(argc, argv, item);

}

VALUE rb_s_Dummy_def_enable_bool(int argc, VALUE *argv) {
    id<IDummyFactory> factory = [DummyFactorySingleton getDummyFactoryInstance];
    id<IDummySingleton> singleton = [factory getDummySingleton];

    NSString* defID = [singleton getDefaultID];

    id<IDummy> item = [factory getDummyByID:defID];
    return rb_Dummy_enable_bool_Obj(argc, argv, item);
}







@interface rb_Dummy_enable_double_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<IDummy> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(rb_Dummy_enable_double_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation rb_Dummy_enable_double_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(rb_Dummy_enable_double_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult {
    rb_Dummy_enable_double_caller_params* par = [[[rb_Dummy_enable_double_caller_params alloc] init] autorelease];
    par.params = _params;
    par.item = _item;
    par.methodResult = [_methodResult retain];
    return [par retain];
}

@end


@interface rb_Dummy_enable_double_caller : NSObject {

}
+(rb_Dummy_enable_double_caller*) getSharedInstance;
+(void) enable_double:(rb_Dummy_enable_double_caller_params*)caller_params;
+(void) enable_double_in_thread:(rb_Dummy_enable_double_caller_params*)caller_params;
+(void) enable_double_in_UI_thread:(rb_Dummy_enable_double_caller_params*)caller_params;

@end

static rb_Dummy_enable_double_caller* our_Dummy_enable_double_caller = nil;

@implementation rb_Dummy_enable_double_caller

+(rb_Dummy_enable_double_caller*) getSharedInstance {
    if (our_Dummy_enable_double_caller == nil) {
        our_Dummy_enable_double_caller = [[rb_Dummy_enable_double_caller alloc] init];
    }
    return our_Dummy_enable_double_caller;
}

-(void) command_enable_double:(rb_Dummy_enable_double_caller_params*)caller_params {

    NSArray* params = caller_params.params;

    id<IDummy> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem enable_double:(int)[((NSNumber*)[params objectAtIndex:0]) intValue] methodResult:methodResult ];
    [caller_params.methodResult release];
    [caller_params release];
}

+(void) enable_double:(rb_Dummy_enable_double_caller_params*)caller_params {
    [[rb_Dummy_enable_double_caller getSharedInstance] command_enable_double:caller_params];
}

+(void) enable_double_in_thread:(rb_Dummy_enable_double_caller_params*)caller_params {
    [[rb_Dummy_enable_double_caller getSharedInstance] performSelectorInBackground:@selector(command_enable_double:) withObject:caller_params];
}

+(void) enable_double_in_UI_thread:(rb_Dummy_enable_double_caller_params*)caller_params {
    [[rb_Dummy_enable_double_caller getSharedInstance] performSelectorOnMainThread:@selector(command_enable_double:) withObject:caller_params waitUntilDone:NO];
}


@end


VALUE rb_Dummy_enable_double_Obj(int argc, VALUE *argv, id<IDummy>objItem) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[1+1];
    NSString* callbackURL = nil;
    unsigned long callbackMethod = 0;
    NSString* callbackParam = nil;
    BOOL method_return_result = YES;

    [methodResult setMethodSignature:@"Dummy::enable_double"];

    
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
                params[i] = Dummy_makeInstanceByRubyObject(argv[i]);
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
    

    
    [methodResult enableObjectCreationModeWithRubyClassPath:@"DOUBLE"];


    if ((callbackURL != nil) || (callbackMethod != 0)) {
        // we have callback - method should not call setResult if method execute from current thread - only later or in UI or separated threads !!!
        if (callbackURL != nil)
            [methodResult setRubyCallback:callbackURL];
        if (callbackMethod != 0)
            [methodResult setRubyCallbackMethod:callbackMethod];
        if (callbackParam != nil) {
            [methodResult setCallbackParam:callbackParam];
        }
        
        [rb_Dummy_enable_double_caller enable_double_in_thread:[rb_Dummy_enable_double_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        

        // FIXME: callback should not be retained, it must be saved outside of this call
        [methodResult retain];
    }
    else {
        // we do not have callback
        
        [rb_Dummy_enable_double_caller enable_double:[rb_Dummy_enable_double_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    VALUE resValue = rho_ruby_get_NIL();
    if ((callbackURL == nil) && (callbackMethod == 0) && (method_return_result)) {
        resValue = [methodResult toRuby];
    }
    [methodResult release];
    return resValue;
}


VALUE rb_Dummy_enable_double(int argc, VALUE *argv, VALUE obj) {

    id<IDummy> item = Dummy_makeInstanceByRubyObject(obj);
    return rb_Dummy_enable_double_Obj(argc, argv, item);

}

VALUE rb_s_Dummy_def_enable_double(int argc, VALUE *argv) {
    id<IDummyFactory> factory = [DummyFactorySingleton getDummyFactoryInstance];
    id<IDummySingleton> singleton = [factory getDummySingleton];

    NSString* defID = [singleton getDefaultID];

    id<IDummy> item = [factory getDummyByID:defID];
    return rb_Dummy_enable_double_Obj(argc, argv, item);
}







@interface rb_Dummy_stop_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<IDummy> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(rb_Dummy_stop_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation rb_Dummy_stop_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(rb_Dummy_stop_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult {
    rb_Dummy_stop_caller_params* par = [[[rb_Dummy_stop_caller_params alloc] init] autorelease];
    par.params = _params;
    par.item = _item;
    par.methodResult = [_methodResult retain];
    return [par retain];
}

@end


@interface rb_Dummy_stop_caller : NSObject {

}
+(rb_Dummy_stop_caller*) getSharedInstance;
+(void) stop:(rb_Dummy_stop_caller_params*)caller_params;
+(void) stop_in_thread:(rb_Dummy_stop_caller_params*)caller_params;
+(void) stop_in_UI_thread:(rb_Dummy_stop_caller_params*)caller_params;

@end

static rb_Dummy_stop_caller* our_Dummy_stop_caller = nil;

@implementation rb_Dummy_stop_caller

+(rb_Dummy_stop_caller*) getSharedInstance {
    if (our_Dummy_stop_caller == nil) {
        our_Dummy_stop_caller = [[rb_Dummy_stop_caller alloc] init];
    }
    return our_Dummy_stop_caller;
}

-(void) command_stop:(rb_Dummy_stop_caller_params*)caller_params {

    id<IDummy> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem stop:methodResult ];
    [caller_params.methodResult release];
    [caller_params release];
}

+(void) stop:(rb_Dummy_stop_caller_params*)caller_params {
    [[rb_Dummy_stop_caller getSharedInstance] command_stop:caller_params];
}

+(void) stop_in_thread:(rb_Dummy_stop_caller_params*)caller_params {
    [[rb_Dummy_stop_caller getSharedInstance] performSelectorInBackground:@selector(command_stop:) withObject:caller_params];
}

+(void) stop_in_UI_thread:(rb_Dummy_stop_caller_params*)caller_params {
    [[rb_Dummy_stop_caller getSharedInstance] performSelectorOnMainThread:@selector(command_stop:) withObject:caller_params waitUntilDone:NO];
}


@end


VALUE rb_Dummy_stop_Obj(int argc, VALUE *argv, id<IDummy>objItem) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[0+1];
    NSString* callbackURL = nil;
    unsigned long callbackMethod = 0;
    NSString* callbackParam = nil;
    BOOL method_return_result = YES;

    [methodResult setMethodSignature:@"Dummy::stop"];

    
    BOOL is_factory_param[] = { NO };

    int i;

    // init
    for (i = 0; i < (0); i++) {
        params[i] = [NSNull null];
    }

    

    // enumerate params
    for (int i = 0; i < (0); i++) {
        if (argc > i) {
            // we have a [i] param !
            if (is_factory_param[i]) {
                params[i] = Dummy_makeInstanceByRubyObject(argv[i]);
            }
            else {
                params[i] = [[CRubyConverter convertFromRuby:argv[i]] retain];
            }
        }
    }

    NSMutableArray* params_array = [NSMutableArray arrayWithCapacity:(0)];
    for (i = 0 ; i < (0); i++) {
        [params_array addObject:params[i]];
    }

    
    // check callback
    if (argc >= (0+1)) {
        VALUE callback = argv[0];
        if (rho_ruby_is_string(callback)) {
            callbackURL = [((NSString*)[CRubyConverter convertFromRuby:callback]) retain];
        }
        else if (rho_ruby_is_proc(callback) || rho_ruby_is_method(callback)) {
            callbackMethod = callback;
        }
    }
    // check callback param
    if (argc >= (0+2)) {
        VALUE callback_param = argv[0+1];
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
        
        [rb_Dummy_stop_caller stop_in_thread:[rb_Dummy_stop_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        

        // FIXME: callback should not be retained, it must be saved outside of this call
        [methodResult retain];
    }
    else {
        // we do not have callback
        
        [rb_Dummy_stop_caller stop:[rb_Dummy_stop_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    VALUE resValue = rho_ruby_get_NIL();
    if ((callbackURL == nil) && (callbackMethod == 0) && (method_return_result)) {
        resValue = [methodResult toRuby];
    }
    [methodResult release];
    return resValue;
}


VALUE rb_Dummy_stop(int argc, VALUE *argv, VALUE obj) {

    id<IDummy> item = Dummy_makeInstanceByRubyObject(obj);
    return rb_Dummy_stop_Obj(argc, argv, item);

}

VALUE rb_s_Dummy_def_stop(int argc, VALUE *argv) {
    id<IDummyFactory> factory = [DummyFactorySingleton getDummyFactoryInstance];
    id<IDummySingleton> singleton = [factory getDummySingleton];

    NSString* defID = [singleton getDefaultID];

    id<IDummy> item = [factory getDummyByID:defID];
    return rb_Dummy_stop_Obj(argc, argv, item);
}







@interface rb_Dummy_getProperty_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<IDummy> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(rb_Dummy_getProperty_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation rb_Dummy_getProperty_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(rb_Dummy_getProperty_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult {
    rb_Dummy_getProperty_caller_params* par = [[[rb_Dummy_getProperty_caller_params alloc] init] autorelease];
    par.params = _params;
    par.item = _item;
    par.methodResult = [_methodResult retain];
    return [par retain];
}

@end


@interface rb_Dummy_getProperty_caller : NSObject {

}
+(rb_Dummy_getProperty_caller*) getSharedInstance;
+(void) getProperty:(rb_Dummy_getProperty_caller_params*)caller_params;
+(void) getProperty_in_thread:(rb_Dummy_getProperty_caller_params*)caller_params;
+(void) getProperty_in_UI_thread:(rb_Dummy_getProperty_caller_params*)caller_params;

@end

static rb_Dummy_getProperty_caller* our_Dummy_getProperty_caller = nil;

@implementation rb_Dummy_getProperty_caller

+(rb_Dummy_getProperty_caller*) getSharedInstance {
    if (our_Dummy_getProperty_caller == nil) {
        our_Dummy_getProperty_caller = [[rb_Dummy_getProperty_caller alloc] init];
    }
    return our_Dummy_getProperty_caller;
}

-(void) command_getProperty:(rb_Dummy_getProperty_caller_params*)caller_params {

    NSArray* params = caller_params.params;

    id<IDummy> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem getProperty:(NSString*)[params objectAtIndex:0] methodResult:methodResult ];
    [caller_params.methodResult release];
    [caller_params release];
}

+(void) getProperty:(rb_Dummy_getProperty_caller_params*)caller_params {
    [[rb_Dummy_getProperty_caller getSharedInstance] command_getProperty:caller_params];
}

+(void) getProperty_in_thread:(rb_Dummy_getProperty_caller_params*)caller_params {
    [[rb_Dummy_getProperty_caller getSharedInstance] performSelectorInBackground:@selector(command_getProperty:) withObject:caller_params];
}

+(void) getProperty_in_UI_thread:(rb_Dummy_getProperty_caller_params*)caller_params {
    [[rb_Dummy_getProperty_caller getSharedInstance] performSelectorOnMainThread:@selector(command_getProperty:) withObject:caller_params waitUntilDone:NO];
}


@end


VALUE rb_Dummy_getProperty_Obj(int argc, VALUE *argv, id<IDummy>objItem) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[1+1];
    NSString* callbackURL = nil;
    unsigned long callbackMethod = 0;
    NSString* callbackParam = nil;
    BOOL method_return_result = YES;

    [methodResult setMethodSignature:@"Dummy::getProperty"];

    
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
                params[i] = Dummy_makeInstanceByRubyObject(argv[i]);
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
        
        [rb_Dummy_getProperty_caller getProperty_in_thread:[rb_Dummy_getProperty_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        

        // FIXME: callback should not be retained, it must be saved outside of this call
        [methodResult retain];
    }
    else {
        // we do not have callback
        
        [rb_Dummy_getProperty_caller getProperty:[rb_Dummy_getProperty_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    VALUE resValue = rho_ruby_get_NIL();
    if ((callbackURL == nil) && (callbackMethod == 0) && (method_return_result)) {
        resValue = [methodResult toRuby];
    }
    [methodResult release];
    return resValue;
}


VALUE rb_Dummy_getProperty(int argc, VALUE *argv, VALUE obj) {

    id<IDummy> item = Dummy_makeInstanceByRubyObject(obj);
    return rb_Dummy_getProperty_Obj(argc, argv, item);

}

VALUE rb_s_Dummy_def_getProperty(int argc, VALUE *argv) {
    id<IDummyFactory> factory = [DummyFactorySingleton getDummyFactoryInstance];
    id<IDummySingleton> singleton = [factory getDummySingleton];

    NSString* defID = [singleton getDefaultID];

    id<IDummy> item = [factory getDummyByID:defID];
    return rb_Dummy_getProperty_Obj(argc, argv, item);
}







@interface rb_Dummy_getProperties_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<IDummy> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(rb_Dummy_getProperties_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation rb_Dummy_getProperties_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(rb_Dummy_getProperties_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult {
    rb_Dummy_getProperties_caller_params* par = [[[rb_Dummy_getProperties_caller_params alloc] init] autorelease];
    par.params = _params;
    par.item = _item;
    par.methodResult = [_methodResult retain];
    return [par retain];
}

@end


@interface rb_Dummy_getProperties_caller : NSObject {

}
+(rb_Dummy_getProperties_caller*) getSharedInstance;
+(void) getProperties:(rb_Dummy_getProperties_caller_params*)caller_params;
+(void) getProperties_in_thread:(rb_Dummy_getProperties_caller_params*)caller_params;
+(void) getProperties_in_UI_thread:(rb_Dummy_getProperties_caller_params*)caller_params;

@end

static rb_Dummy_getProperties_caller* our_Dummy_getProperties_caller = nil;

@implementation rb_Dummy_getProperties_caller

+(rb_Dummy_getProperties_caller*) getSharedInstance {
    if (our_Dummy_getProperties_caller == nil) {
        our_Dummy_getProperties_caller = [[rb_Dummy_getProperties_caller alloc] init];
    }
    return our_Dummy_getProperties_caller;
}

-(void) command_getProperties:(rb_Dummy_getProperties_caller_params*)caller_params {

    NSArray* params = caller_params.params;

    id<IDummy> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem getProperties:(NSArray*)[params objectAtIndex:0] methodResult:methodResult ];
    [caller_params.methodResult release];
    [caller_params release];
}

+(void) getProperties:(rb_Dummy_getProperties_caller_params*)caller_params {
    [[rb_Dummy_getProperties_caller getSharedInstance] command_getProperties:caller_params];
}

+(void) getProperties_in_thread:(rb_Dummy_getProperties_caller_params*)caller_params {
    [[rb_Dummy_getProperties_caller getSharedInstance] performSelectorInBackground:@selector(command_getProperties:) withObject:caller_params];
}

+(void) getProperties_in_UI_thread:(rb_Dummy_getProperties_caller_params*)caller_params {
    [[rb_Dummy_getProperties_caller getSharedInstance] performSelectorOnMainThread:@selector(command_getProperties:) withObject:caller_params waitUntilDone:NO];
}


@end


VALUE rb_Dummy_getProperties_Obj(int argc, VALUE *argv, id<IDummy>objItem) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[1+1];
    NSString* callbackURL = nil;
    unsigned long callbackMethod = 0;
    NSString* callbackParam = nil;
    BOOL method_return_result = YES;

    [methodResult setMethodSignature:@"Dummy::getProperties"];

    
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
                params[i] = Dummy_makeInstanceByRubyObject(argv[i]);
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
        
        [rb_Dummy_getProperties_caller getProperties_in_thread:[rb_Dummy_getProperties_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        

        // FIXME: callback should not be retained, it must be saved outside of this call
        [methodResult retain];
    }
    else {
        // we do not have callback
        
        [rb_Dummy_getProperties_caller getProperties:[rb_Dummy_getProperties_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    VALUE resValue = rho_ruby_get_NIL();
    if ((callbackURL == nil) && (callbackMethod == 0) && (method_return_result)) {
        resValue = [methodResult toRuby];
    }
    [methodResult release];
    return resValue;
}


VALUE rb_Dummy_getProperties(int argc, VALUE *argv, VALUE obj) {

    id<IDummy> item = Dummy_makeInstanceByRubyObject(obj);
    return rb_Dummy_getProperties_Obj(argc, argv, item);

}

VALUE rb_s_Dummy_def_getProperties(int argc, VALUE *argv) {
    id<IDummyFactory> factory = [DummyFactorySingleton getDummyFactoryInstance];
    id<IDummySingleton> singleton = [factory getDummySingleton];

    NSString* defID = [singleton getDefaultID];

    id<IDummy> item = [factory getDummyByID:defID];
    return rb_Dummy_getProperties_Obj(argc, argv, item);
}







@interface rb_Dummy_getAllProperties_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<IDummy> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(rb_Dummy_getAllProperties_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation rb_Dummy_getAllProperties_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(rb_Dummy_getAllProperties_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult {
    rb_Dummy_getAllProperties_caller_params* par = [[[rb_Dummy_getAllProperties_caller_params alloc] init] autorelease];
    par.params = _params;
    par.item = _item;
    par.methodResult = [_methodResult retain];
    return [par retain];
}

@end


@interface rb_Dummy_getAllProperties_caller : NSObject {

}
+(rb_Dummy_getAllProperties_caller*) getSharedInstance;
+(void) getAllProperties:(rb_Dummy_getAllProperties_caller_params*)caller_params;
+(void) getAllProperties_in_thread:(rb_Dummy_getAllProperties_caller_params*)caller_params;
+(void) getAllProperties_in_UI_thread:(rb_Dummy_getAllProperties_caller_params*)caller_params;

@end

static rb_Dummy_getAllProperties_caller* our_Dummy_getAllProperties_caller = nil;

@implementation rb_Dummy_getAllProperties_caller

+(rb_Dummy_getAllProperties_caller*) getSharedInstance {
    if (our_Dummy_getAllProperties_caller == nil) {
        our_Dummy_getAllProperties_caller = [[rb_Dummy_getAllProperties_caller alloc] init];
    }
    return our_Dummy_getAllProperties_caller;
}

-(void) command_getAllProperties:(rb_Dummy_getAllProperties_caller_params*)caller_params {

    id<IDummy> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem getAllProperties:methodResult ];
    [caller_params.methodResult release];
    [caller_params release];
}

+(void) getAllProperties:(rb_Dummy_getAllProperties_caller_params*)caller_params {
    [[rb_Dummy_getAllProperties_caller getSharedInstance] command_getAllProperties:caller_params];
}

+(void) getAllProperties_in_thread:(rb_Dummy_getAllProperties_caller_params*)caller_params {
    [[rb_Dummy_getAllProperties_caller getSharedInstance] performSelectorInBackground:@selector(command_getAllProperties:) withObject:caller_params];
}

+(void) getAllProperties_in_UI_thread:(rb_Dummy_getAllProperties_caller_params*)caller_params {
    [[rb_Dummy_getAllProperties_caller getSharedInstance] performSelectorOnMainThread:@selector(command_getAllProperties:) withObject:caller_params waitUntilDone:NO];
}


@end


VALUE rb_Dummy_getAllProperties_Obj(int argc, VALUE *argv, id<IDummy>objItem) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[0+1];
    NSString* callbackURL = nil;
    unsigned long callbackMethod = 0;
    NSString* callbackParam = nil;
    BOOL method_return_result = YES;

    [methodResult setMethodSignature:@"Dummy::getAllProperties"];

    
    BOOL is_factory_param[] = { NO };

    int i;

    // init
    for (i = 0; i < (0); i++) {
        params[i] = [NSNull null];
    }

    

    // enumerate params
    for (int i = 0; i < (0); i++) {
        if (argc > i) {
            // we have a [i] param !
            if (is_factory_param[i]) {
                params[i] = Dummy_makeInstanceByRubyObject(argv[i]);
            }
            else {
                params[i] = [[CRubyConverter convertFromRuby:argv[i]] retain];
            }
        }
    }

    NSMutableArray* params_array = [NSMutableArray arrayWithCapacity:(0)];
    for (i = 0 ; i < (0); i++) {
        [params_array addObject:params[i]];
    }

    
    // check callback
    if (argc >= (0+1)) {
        VALUE callback = argv[0];
        if (rho_ruby_is_string(callback)) {
            callbackURL = [((NSString*)[CRubyConverter convertFromRuby:callback]) retain];
        }
        else if (rho_ruby_is_proc(callback) || rho_ruby_is_method(callback)) {
            callbackMethod = callback;
        }
    }
    // check callback param
    if (argc >= (0+2)) {
        VALUE callback_param = argv[0+1];
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
        
        [rb_Dummy_getAllProperties_caller getAllProperties_in_thread:[rb_Dummy_getAllProperties_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        

        // FIXME: callback should not be retained, it must be saved outside of this call
        [methodResult retain];
    }
    else {
        // we do not have callback
        
        [rb_Dummy_getAllProperties_caller getAllProperties:[rb_Dummy_getAllProperties_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    VALUE resValue = rho_ruby_get_NIL();
    if ((callbackURL == nil) && (callbackMethod == 0) && (method_return_result)) {
        resValue = [methodResult toRuby];
    }
    [methodResult release];
    return resValue;
}


VALUE rb_Dummy_getAllProperties(int argc, VALUE *argv, VALUE obj) {

    id<IDummy> item = Dummy_makeInstanceByRubyObject(obj);
    return rb_Dummy_getAllProperties_Obj(argc, argv, item);

}

VALUE rb_s_Dummy_def_getAllProperties(int argc, VALUE *argv) {
    id<IDummyFactory> factory = [DummyFactorySingleton getDummyFactoryInstance];
    id<IDummySingleton> singleton = [factory getDummySingleton];

    NSString* defID = [singleton getDefaultID];

    id<IDummy> item = [factory getDummyByID:defID];
    return rb_Dummy_getAllProperties_Obj(argc, argv, item);
}







@interface rb_Dummy_setProperty_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<IDummy> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(rb_Dummy_setProperty_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation rb_Dummy_setProperty_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(rb_Dummy_setProperty_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult {
    rb_Dummy_setProperty_caller_params* par = [[[rb_Dummy_setProperty_caller_params alloc] init] autorelease];
    par.params = _params;
    par.item = _item;
    par.methodResult = [_methodResult retain];
    return [par retain];
}

@end


@interface rb_Dummy_setProperty_caller : NSObject {

}
+(rb_Dummy_setProperty_caller*) getSharedInstance;
+(void) setProperty:(rb_Dummy_setProperty_caller_params*)caller_params;
+(void) setProperty_in_thread:(rb_Dummy_setProperty_caller_params*)caller_params;
+(void) setProperty_in_UI_thread:(rb_Dummy_setProperty_caller_params*)caller_params;

@end

static rb_Dummy_setProperty_caller* our_Dummy_setProperty_caller = nil;

@implementation rb_Dummy_setProperty_caller

+(rb_Dummy_setProperty_caller*) getSharedInstance {
    if (our_Dummy_setProperty_caller == nil) {
        our_Dummy_setProperty_caller = [[rb_Dummy_setProperty_caller alloc] init];
    }
    return our_Dummy_setProperty_caller;
}

-(void) command_setProperty:(rb_Dummy_setProperty_caller_params*)caller_params {

    NSArray* params = caller_params.params;

    id<IDummy> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem setProperty:(NSString*)[params objectAtIndex:0] propertyValue:(NSString*)[params objectAtIndex:1] methodResult:methodResult ];
    [caller_params.methodResult release];
    [caller_params release];
}

+(void) setProperty:(rb_Dummy_setProperty_caller_params*)caller_params {
    [[rb_Dummy_setProperty_caller getSharedInstance] command_setProperty:caller_params];
}

+(void) setProperty_in_thread:(rb_Dummy_setProperty_caller_params*)caller_params {
    [[rb_Dummy_setProperty_caller getSharedInstance] performSelectorInBackground:@selector(command_setProperty:) withObject:caller_params];
}

+(void) setProperty_in_UI_thread:(rb_Dummy_setProperty_caller_params*)caller_params {
    [[rb_Dummy_setProperty_caller getSharedInstance] performSelectorOnMainThread:@selector(command_setProperty:) withObject:caller_params waitUntilDone:NO];
}


@end


VALUE rb_Dummy_setProperty_Obj(int argc, VALUE *argv, id<IDummy>objItem) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[2+1];
    NSString* callbackURL = nil;
    unsigned long callbackMethod = 0;
    NSString* callbackParam = nil;
    BOOL method_return_result = YES;

    [methodResult setMethodSignature:@"Dummy::setProperty"];

    
    BOOL is_factory_param[] = { NO, NO, NO };

    int i;

    // init
    for (i = 0; i < (2); i++) {
        params[i] = [NSNull null];
    }

    

    // enumerate params
    for (int i = 0; i < (2); i++) {
        if (argc > i) {
            // we have a [i] param !
            if (is_factory_param[i]) {
                params[i] = Dummy_makeInstanceByRubyObject(argv[i]);
            }
            else {
                params[i] = [[CRubyConverter convertFromRuby:argv[i]] retain];
            }
        }
    }

    NSMutableArray* params_array = [NSMutableArray arrayWithCapacity:(2)];
    for (i = 0 ; i < (2); i++) {
        [params_array addObject:params[i]];
    }

    
    // check callback
    if (argc >= (2+1)) {
        VALUE callback = argv[2];
        if (rho_ruby_is_string(callback)) {
            callbackURL = [((NSString*)[CRubyConverter convertFromRuby:callback]) retain];
        }
        else if (rho_ruby_is_proc(callback) || rho_ruby_is_method(callback)) {
            callbackMethod = callback;
        }
    }
    // check callback param
    if (argc >= (2+2)) {
        VALUE callback_param = argv[2+1];
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
        
        [rb_Dummy_setProperty_caller setProperty_in_thread:[rb_Dummy_setProperty_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        

        // FIXME: callback should not be retained, it must be saved outside of this call
        [methodResult retain];
    }
    else {
        // we do not have callback
        
        [rb_Dummy_setProperty_caller setProperty:[rb_Dummy_setProperty_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    VALUE resValue = rho_ruby_get_NIL();
    if ((callbackURL == nil) && (callbackMethod == 0) && (method_return_result)) {
        resValue = [methodResult toRuby];
    }
    [methodResult release];
    return resValue;
}


VALUE rb_Dummy_setProperty(int argc, VALUE *argv, VALUE obj) {

    id<IDummy> item = Dummy_makeInstanceByRubyObject(obj);
    return rb_Dummy_setProperty_Obj(argc, argv, item);

}

VALUE rb_s_Dummy_def_setProperty(int argc, VALUE *argv) {
    id<IDummyFactory> factory = [DummyFactorySingleton getDummyFactoryInstance];
    id<IDummySingleton> singleton = [factory getDummySingleton];

    NSString* defID = [singleton getDefaultID];

    id<IDummy> item = [factory getDummyByID:defID];
    return rb_Dummy_setProperty_Obj(argc, argv, item);
}







@interface rb_Dummy_setProperties_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<IDummy> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(rb_Dummy_setProperties_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation rb_Dummy_setProperties_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(rb_Dummy_setProperties_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult {
    rb_Dummy_setProperties_caller_params* par = [[[rb_Dummy_setProperties_caller_params alloc] init] autorelease];
    par.params = _params;
    par.item = _item;
    par.methodResult = [_methodResult retain];
    return [par retain];
}

@end


@interface rb_Dummy_setProperties_caller : NSObject {

}
+(rb_Dummy_setProperties_caller*) getSharedInstance;
+(void) setProperties:(rb_Dummy_setProperties_caller_params*)caller_params;
+(void) setProperties_in_thread:(rb_Dummy_setProperties_caller_params*)caller_params;
+(void) setProperties_in_UI_thread:(rb_Dummy_setProperties_caller_params*)caller_params;

@end

static rb_Dummy_setProperties_caller* our_Dummy_setProperties_caller = nil;

@implementation rb_Dummy_setProperties_caller

+(rb_Dummy_setProperties_caller*) getSharedInstance {
    if (our_Dummy_setProperties_caller == nil) {
        our_Dummy_setProperties_caller = [[rb_Dummy_setProperties_caller alloc] init];
    }
    return our_Dummy_setProperties_caller;
}

-(void) command_setProperties:(rb_Dummy_setProperties_caller_params*)caller_params {

    NSArray* params = caller_params.params;

    id<IDummy> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem setProperties:(NSDictionary*)[params objectAtIndex:0] methodResult:methodResult ];
    [caller_params.methodResult release];
    [caller_params release];
}

+(void) setProperties:(rb_Dummy_setProperties_caller_params*)caller_params {
    [[rb_Dummy_setProperties_caller getSharedInstance] command_setProperties:caller_params];
}

+(void) setProperties_in_thread:(rb_Dummy_setProperties_caller_params*)caller_params {
    [[rb_Dummy_setProperties_caller getSharedInstance] performSelectorInBackground:@selector(command_setProperties:) withObject:caller_params];
}

+(void) setProperties_in_UI_thread:(rb_Dummy_setProperties_caller_params*)caller_params {
    [[rb_Dummy_setProperties_caller getSharedInstance] performSelectorOnMainThread:@selector(command_setProperties:) withObject:caller_params waitUntilDone:NO];
}


@end


VALUE rb_Dummy_setProperties_Obj(int argc, VALUE *argv, id<IDummy>objItem) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[1+1];
    NSString* callbackURL = nil;
    unsigned long callbackMethod = 0;
    NSString* callbackParam = nil;
    BOOL method_return_result = YES;

    [methodResult setMethodSignature:@"Dummy::setProperties"];

    
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
                params[i] = Dummy_makeInstanceByRubyObject(argv[i]);
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
        
        [rb_Dummy_setProperties_caller setProperties_in_thread:[rb_Dummy_setProperties_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        

        // FIXME: callback should not be retained, it must be saved outside of this call
        [methodResult retain];
    }
    else {
        // we do not have callback
        
        [rb_Dummy_setProperties_caller setProperties:[rb_Dummy_setProperties_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    VALUE resValue = rho_ruby_get_NIL();
    if ((callbackURL == nil) && (callbackMethod == 0) && (method_return_result)) {
        resValue = [methodResult toRuby];
    }
    [methodResult release];
    return resValue;
}


VALUE rb_Dummy_setProperties(int argc, VALUE *argv, VALUE obj) {

    id<IDummy> item = Dummy_makeInstanceByRubyObject(obj);
    return rb_Dummy_setProperties_Obj(argc, argv, item);

}

VALUE rb_s_Dummy_def_setProperties(int argc, VALUE *argv) {
    id<IDummyFactory> factory = [DummyFactorySingleton getDummyFactoryInstance];
    id<IDummySingleton> singleton = [factory getDummySingleton];

    NSString* defID = [singleton getDefaultID];

    id<IDummy> item = [factory getDummyByID:defID];
    return rb_Dummy_setProperties_Obj(argc, argv, item);
}







VALUE rb_Dummy_s_default(VALUE klass)
{
    id<IDummyFactory> factory = [DummyFactorySingleton getDummyFactoryInstance];
    id<IDummySingleton> singleton = [factory getDummySingleton];

    NSString* defID = [singleton getDefaultID];

    return rho_ruby_create_object_with_id( klass, [defID UTF8String] );
}

VALUE rb_Dummy_s_setDefault(VALUE klass, VALUE valObj)
{
    const char* szID = rho_ruby_get_object_id( valObj );
    id<IDummyFactory> factory = [DummyFactorySingleton getDummyFactoryInstance];
    id<IDummySingleton> singleton = [factory getDummySingleton];

    [singleton setDefaultID:[NSString stringWithUTF8String:szID]];

    return rho_ruby_get_NIL();
}



