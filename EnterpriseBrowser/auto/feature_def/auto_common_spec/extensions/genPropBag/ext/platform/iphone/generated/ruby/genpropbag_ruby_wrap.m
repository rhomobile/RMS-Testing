#import "IGenPropBag.h"
//#import "api_generator/common/ruby_helpers.h"

#import "ruby/ext/rho/rhoruby.h"
#import "api_generator/iphone/CMethodResult.h"
#import "api_generator/iphone/CRubyConverter.h"

extern VALUE getRuby_GenPropBag_Module();



@interface GenPropBag_RubyValueFactory : NSObject<IMethodResult_RubyObjectFactory> {
}

- (VALUE) makeRubyValue:(NSObject*)obj;
+ (GenPropBag_RubyValueFactory*) getSharedInstance;

@end

static GenPropBag_RubyValueFactory* our_GenPropBag_RubyValueFactory = nil;

@implementation GenPropBag_RubyValueFactory

- (VALUE) makeRubyValue:(NSObject*)obj {
    VALUE v = rho_ruby_get_NIL();
    if ([obj isKindOfClass:[NSString class]]) {
        // single objects id
        NSString* strRes = (NSString*)obj;
        v = rho_ruby_create_object_with_id( getRuby_GenPropBag_Module(), [strRes UTF8String] );
    }
    else if ([obj isKindOfClass:[NSArray class]]) {
        // list of IDs
        v = rho_ruby_create_array();
        NSArray* arrRes = (NSArray*)obj;
        int i;
        for (i = 0; i < [arrRes count]; i++) {
            NSString* strItem = (NSString*)[arrRes objectAtIndex:i];
            VALUE vItem = rho_ruby_create_object_with_id( getRuby_GenPropBag_Module(), [strItem UTF8String] );
            rho_ruby_add_to_array(v, vItem);
        }
    }
    return v;
}

+ (GenPropBag_RubyValueFactory*) getSharedInstance {
    if (our_GenPropBag_RubyValueFactory == nil) {
        our_GenPropBag_RubyValueFactory = [[GenPropBag_RubyValueFactory alloc] init];
    }
    return our_GenPropBag_RubyValueFactory;
}

@end


id<IGenPropBag> GenPropBag_makeInstanceByRubyObject(VALUE obj) {
    const char* szID = rho_ruby_get_object_id( obj );
    id<IGenPropBagFactory> factory = [GenPropBagFactorySingleton getGenPropBagFactoryInstance];
    return [factory getGenPropBagByID:[NSString stringWithUTF8String:szID]];
}









@interface rb_GenPropBag_getBoolProp_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<IGenPropBag> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(rb_GenPropBag_getBoolProp_caller_params*) makeParams:(NSArray*)_params _item:(id<IGenPropBag>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation rb_GenPropBag_getBoolProp_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(rb_GenPropBag_getBoolProp_caller_params*) makeParams:(NSArray*)_params _item:(id<IGenPropBag>)_item _methodResult:(CMethodResult*)_methodResult {
    rb_GenPropBag_getBoolProp_caller_params* par = [[rb_GenPropBag_getBoolProp_caller_params alloc] init];
    par.params = _params;
    par.item = _item;
    par.methodResult = _methodResult;
    return [par retain];
}

@end


@interface rb_GenPropBag_getBoolProp_caller : NSObject {

}
+(rb_GenPropBag_getBoolProp_caller*) getSharedInstance;
+(void) getBoolProp:(rb_GenPropBag_getBoolProp_caller_params*)caller_params;
+(void) getBoolProp_in_thread:(rb_GenPropBag_getBoolProp_caller_params*)caller_params;
+(void) getBoolProp_in_UI_thread:(rb_GenPropBag_getBoolProp_caller_params*)caller_params;

@end

static rb_GenPropBag_getBoolProp_caller* our_GenPropBag_getBoolProp_caller = nil;

@implementation rb_GenPropBag_getBoolProp_caller

+(rb_GenPropBag_getBoolProp_caller*) getSharedInstance {
    if (our_GenPropBag_getBoolProp_caller == nil) {
        our_GenPropBag_getBoolProp_caller = [[rb_GenPropBag_getBoolProp_caller alloc] init];
    }
    return our_GenPropBag_getBoolProp_caller;
}

-(void) command_getBoolProp:(rb_GenPropBag_getBoolProp_caller_params*)caller_params {

    id<IGenPropBag> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem getBoolProp:methodResult ];
    [caller_params release];
}

+(void) getBoolProp:(rb_GenPropBag_getBoolProp_caller_params*)caller_params {
    [[rb_GenPropBag_getBoolProp_caller getSharedInstance] command_getBoolProp:caller_params];
}

+(void) getBoolProp_in_thread:(rb_GenPropBag_getBoolProp_caller_params*)caller_params {
    [[rb_GenPropBag_getBoolProp_caller getSharedInstance] performSelectorInBackground:@selector(command_getBoolProp:) withObject:caller_params];
}

+(void) getBoolProp_in_UI_thread:(rb_GenPropBag_getBoolProp_caller_params*)caller_params {
    [[rb_GenPropBag_getBoolProp_caller getSharedInstance] performSelectorOnMainThread:@selector(command_getBoolProp:) withObject:caller_params waitUntilDone:NO];
}


@end


VALUE rb_GenPropBag_getBoolProp_Obj(int argc, VALUE *argv, id<IGenPropBag>objItem) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[0+1];
    NSString* callbackURL = nil;
    unsigned long callbackMethod = 0;
    NSString* callbackParam = nil;
    BOOL method_return_result = YES;

    [methodResult setMethodSignature:@"GenPropBag::boolProp"];

    
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
                params[i] = GenPropBag_makeInstanceByRubyObject(argv[i]);
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
        
        [rb_GenPropBag_getBoolProp_caller getBoolProp_in_thread:[rb_GenPropBag_getBoolProp_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    else {
        // we do not have callback
        
        [rb_GenPropBag_getBoolProp_caller getBoolProp:[rb_GenPropBag_getBoolProp_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    VALUE resValue = rho_ruby_get_NIL();
    if ((callbackURL == nil) && (callbackMethod == 0) && (method_return_result)) {
        resValue = [methodResult toRuby];
    }
    return resValue;
}


VALUE rb_GenPropBag_getBoolProp(int argc, VALUE *argv, VALUE obj) {

    id<IGenPropBag> item = GenPropBag_makeInstanceByRubyObject(obj);
    return rb_GenPropBag_getBoolProp_Obj(argc, argv, item);

}

VALUE rb_s_GenPropBag_def_getBoolProp(int argc, VALUE *argv) {
    id<IGenPropBagFactory> factory = [GenPropBagFactorySingleton getGenPropBagFactoryInstance];
    id<IGenPropBagSingleton> singleton = [factory getGenPropBagSingleton];

    NSString* defID = [singleton getDefaultID];

    id<IGenPropBag> item = [factory getGenPropBagByID:defID];
    return rb_GenPropBag_getBoolProp_Obj(argc, argv, item);
}







@interface rb_GenPropBag_setBoolProp_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<IGenPropBag> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(rb_GenPropBag_setBoolProp_caller_params*) makeParams:(NSArray*)_params _item:(id<IGenPropBag>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation rb_GenPropBag_setBoolProp_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(rb_GenPropBag_setBoolProp_caller_params*) makeParams:(NSArray*)_params _item:(id<IGenPropBag>)_item _methodResult:(CMethodResult*)_methodResult {
    rb_GenPropBag_setBoolProp_caller_params* par = [[rb_GenPropBag_setBoolProp_caller_params alloc] init];
    par.params = _params;
    par.item = _item;
    par.methodResult = _methodResult;
    return [par retain];
}

@end


@interface rb_GenPropBag_setBoolProp_caller : NSObject {

}
+(rb_GenPropBag_setBoolProp_caller*) getSharedInstance;
+(void) setBoolProp:(rb_GenPropBag_setBoolProp_caller_params*)caller_params;
+(void) setBoolProp_in_thread:(rb_GenPropBag_setBoolProp_caller_params*)caller_params;
+(void) setBoolProp_in_UI_thread:(rb_GenPropBag_setBoolProp_caller_params*)caller_params;

@end

static rb_GenPropBag_setBoolProp_caller* our_GenPropBag_setBoolProp_caller = nil;

@implementation rb_GenPropBag_setBoolProp_caller

+(rb_GenPropBag_setBoolProp_caller*) getSharedInstance {
    if (our_GenPropBag_setBoolProp_caller == nil) {
        our_GenPropBag_setBoolProp_caller = [[rb_GenPropBag_setBoolProp_caller alloc] init];
    }
    return our_GenPropBag_setBoolProp_caller;
}

-(void) command_setBoolProp:(rb_GenPropBag_setBoolProp_caller_params*)caller_params {

    NSArray* params = caller_params.params;

    id<IGenPropBag> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem setBoolProp:(BOOL)[((NSNumber*)[params objectAtIndex:0]) boolValue] methodResult:methodResult ];
    [caller_params release];
}

+(void) setBoolProp:(rb_GenPropBag_setBoolProp_caller_params*)caller_params {
    [[rb_GenPropBag_setBoolProp_caller getSharedInstance] command_setBoolProp:caller_params];
}

+(void) setBoolProp_in_thread:(rb_GenPropBag_setBoolProp_caller_params*)caller_params {
    [[rb_GenPropBag_setBoolProp_caller getSharedInstance] performSelectorInBackground:@selector(command_setBoolProp:) withObject:caller_params];
}

+(void) setBoolProp_in_UI_thread:(rb_GenPropBag_setBoolProp_caller_params*)caller_params {
    [[rb_GenPropBag_setBoolProp_caller getSharedInstance] performSelectorOnMainThread:@selector(command_setBoolProp:) withObject:caller_params waitUntilDone:NO];
}


@end


VALUE rb_GenPropBag_setBoolProp_Obj(int argc, VALUE *argv, id<IGenPropBag>objItem) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[1+1];
    NSString* callbackURL = nil;
    unsigned long callbackMethod = 0;
    NSString* callbackParam = nil;
    BOOL method_return_result = YES;

    [methodResult setMethodSignature:@"GenPropBag::boolProp="];

    
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
                params[i] = GenPropBag_makeInstanceByRubyObject(argv[i]);
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
        
        [rb_GenPropBag_setBoolProp_caller setBoolProp_in_thread:[rb_GenPropBag_setBoolProp_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    else {
        // we do not have callback
        
        [rb_GenPropBag_setBoolProp_caller setBoolProp:[rb_GenPropBag_setBoolProp_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    VALUE resValue = rho_ruby_get_NIL();
    if ((callbackURL == nil) && (callbackMethod == 0) && (method_return_result)) {
        resValue = [methodResult toRuby];
    }
    return resValue;
}


VALUE rb_GenPropBag_setBoolProp(int argc, VALUE *argv, VALUE obj) {

    id<IGenPropBag> item = GenPropBag_makeInstanceByRubyObject(obj);
    return rb_GenPropBag_setBoolProp_Obj(argc, argv, item);

}

VALUE rb_s_GenPropBag_def_setBoolProp(int argc, VALUE *argv) {
    id<IGenPropBagFactory> factory = [GenPropBagFactorySingleton getGenPropBagFactoryInstance];
    id<IGenPropBagSingleton> singleton = [factory getGenPropBagSingleton];

    NSString* defID = [singleton getDefaultID];

    id<IGenPropBag> item = [factory getGenPropBagByID:defID];
    return rb_GenPropBag_setBoolProp_Obj(argc, argv, item);
}







@interface rb_GenPropBag_getIntProp_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<IGenPropBag> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(rb_GenPropBag_getIntProp_caller_params*) makeParams:(NSArray*)_params _item:(id<IGenPropBag>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation rb_GenPropBag_getIntProp_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(rb_GenPropBag_getIntProp_caller_params*) makeParams:(NSArray*)_params _item:(id<IGenPropBag>)_item _methodResult:(CMethodResult*)_methodResult {
    rb_GenPropBag_getIntProp_caller_params* par = [[rb_GenPropBag_getIntProp_caller_params alloc] init];
    par.params = _params;
    par.item = _item;
    par.methodResult = _methodResult;
    return [par retain];
}

@end


@interface rb_GenPropBag_getIntProp_caller : NSObject {

}
+(rb_GenPropBag_getIntProp_caller*) getSharedInstance;
+(void) getIntProp:(rb_GenPropBag_getIntProp_caller_params*)caller_params;
+(void) getIntProp_in_thread:(rb_GenPropBag_getIntProp_caller_params*)caller_params;
+(void) getIntProp_in_UI_thread:(rb_GenPropBag_getIntProp_caller_params*)caller_params;

@end

static rb_GenPropBag_getIntProp_caller* our_GenPropBag_getIntProp_caller = nil;

@implementation rb_GenPropBag_getIntProp_caller

+(rb_GenPropBag_getIntProp_caller*) getSharedInstance {
    if (our_GenPropBag_getIntProp_caller == nil) {
        our_GenPropBag_getIntProp_caller = [[rb_GenPropBag_getIntProp_caller alloc] init];
    }
    return our_GenPropBag_getIntProp_caller;
}

-(void) command_getIntProp:(rb_GenPropBag_getIntProp_caller_params*)caller_params {

    id<IGenPropBag> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem getIntProp:methodResult ];
    [caller_params release];
}

+(void) getIntProp:(rb_GenPropBag_getIntProp_caller_params*)caller_params {
    [[rb_GenPropBag_getIntProp_caller getSharedInstance] command_getIntProp:caller_params];
}

+(void) getIntProp_in_thread:(rb_GenPropBag_getIntProp_caller_params*)caller_params {
    [[rb_GenPropBag_getIntProp_caller getSharedInstance] performSelectorInBackground:@selector(command_getIntProp:) withObject:caller_params];
}

+(void) getIntProp_in_UI_thread:(rb_GenPropBag_getIntProp_caller_params*)caller_params {
    [[rb_GenPropBag_getIntProp_caller getSharedInstance] performSelectorOnMainThread:@selector(command_getIntProp:) withObject:caller_params waitUntilDone:NO];
}


@end


VALUE rb_GenPropBag_getIntProp_Obj(int argc, VALUE *argv, id<IGenPropBag>objItem) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[0+1];
    NSString* callbackURL = nil;
    unsigned long callbackMethod = 0;
    NSString* callbackParam = nil;
    BOOL method_return_result = YES;

    [methodResult setMethodSignature:@"GenPropBag::intProp"];

    
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
                params[i] = GenPropBag_makeInstanceByRubyObject(argv[i]);
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
        
        [rb_GenPropBag_getIntProp_caller getIntProp_in_thread:[rb_GenPropBag_getIntProp_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    else {
        // we do not have callback
        
        [rb_GenPropBag_getIntProp_caller getIntProp:[rb_GenPropBag_getIntProp_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    VALUE resValue = rho_ruby_get_NIL();
    if ((callbackURL == nil) && (callbackMethod == 0) && (method_return_result)) {
        resValue = [methodResult toRuby];
    }
    return resValue;
}


VALUE rb_GenPropBag_getIntProp(int argc, VALUE *argv, VALUE obj) {

    id<IGenPropBag> item = GenPropBag_makeInstanceByRubyObject(obj);
    return rb_GenPropBag_getIntProp_Obj(argc, argv, item);

}

VALUE rb_s_GenPropBag_def_getIntProp(int argc, VALUE *argv) {
    id<IGenPropBagFactory> factory = [GenPropBagFactorySingleton getGenPropBagFactoryInstance];
    id<IGenPropBagSingleton> singleton = [factory getGenPropBagSingleton];

    NSString* defID = [singleton getDefaultID];

    id<IGenPropBag> item = [factory getGenPropBagByID:defID];
    return rb_GenPropBag_getIntProp_Obj(argc, argv, item);
}







@interface rb_GenPropBag_setIntProp_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<IGenPropBag> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(rb_GenPropBag_setIntProp_caller_params*) makeParams:(NSArray*)_params _item:(id<IGenPropBag>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation rb_GenPropBag_setIntProp_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(rb_GenPropBag_setIntProp_caller_params*) makeParams:(NSArray*)_params _item:(id<IGenPropBag>)_item _methodResult:(CMethodResult*)_methodResult {
    rb_GenPropBag_setIntProp_caller_params* par = [[rb_GenPropBag_setIntProp_caller_params alloc] init];
    par.params = _params;
    par.item = _item;
    par.methodResult = _methodResult;
    return [par retain];
}

@end


@interface rb_GenPropBag_setIntProp_caller : NSObject {

}
+(rb_GenPropBag_setIntProp_caller*) getSharedInstance;
+(void) setIntProp:(rb_GenPropBag_setIntProp_caller_params*)caller_params;
+(void) setIntProp_in_thread:(rb_GenPropBag_setIntProp_caller_params*)caller_params;
+(void) setIntProp_in_UI_thread:(rb_GenPropBag_setIntProp_caller_params*)caller_params;

@end

static rb_GenPropBag_setIntProp_caller* our_GenPropBag_setIntProp_caller = nil;

@implementation rb_GenPropBag_setIntProp_caller

+(rb_GenPropBag_setIntProp_caller*) getSharedInstance {
    if (our_GenPropBag_setIntProp_caller == nil) {
        our_GenPropBag_setIntProp_caller = [[rb_GenPropBag_setIntProp_caller alloc] init];
    }
    return our_GenPropBag_setIntProp_caller;
}

-(void) command_setIntProp:(rb_GenPropBag_setIntProp_caller_params*)caller_params {

    NSArray* params = caller_params.params;

    id<IGenPropBag> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem setIntProp:(int)[((NSNumber*)[params objectAtIndex:0]) intValue] methodResult:methodResult ];
    [caller_params release];
}

+(void) setIntProp:(rb_GenPropBag_setIntProp_caller_params*)caller_params {
    [[rb_GenPropBag_setIntProp_caller getSharedInstance] command_setIntProp:caller_params];
}

+(void) setIntProp_in_thread:(rb_GenPropBag_setIntProp_caller_params*)caller_params {
    [[rb_GenPropBag_setIntProp_caller getSharedInstance] performSelectorInBackground:@selector(command_setIntProp:) withObject:caller_params];
}

+(void) setIntProp_in_UI_thread:(rb_GenPropBag_setIntProp_caller_params*)caller_params {
    [[rb_GenPropBag_setIntProp_caller getSharedInstance] performSelectorOnMainThread:@selector(command_setIntProp:) withObject:caller_params waitUntilDone:NO];
}


@end


VALUE rb_GenPropBag_setIntProp_Obj(int argc, VALUE *argv, id<IGenPropBag>objItem) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[1+1];
    NSString* callbackURL = nil;
    unsigned long callbackMethod = 0;
    NSString* callbackParam = nil;
    BOOL method_return_result = YES;

    [methodResult setMethodSignature:@"GenPropBag::intProp="];

    
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
                params[i] = GenPropBag_makeInstanceByRubyObject(argv[i]);
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
        
        [rb_GenPropBag_setIntProp_caller setIntProp_in_thread:[rb_GenPropBag_setIntProp_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    else {
        // we do not have callback
        
        [rb_GenPropBag_setIntProp_caller setIntProp:[rb_GenPropBag_setIntProp_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    VALUE resValue = rho_ruby_get_NIL();
    if ((callbackURL == nil) && (callbackMethod == 0) && (method_return_result)) {
        resValue = [methodResult toRuby];
    }
    return resValue;
}


VALUE rb_GenPropBag_setIntProp(int argc, VALUE *argv, VALUE obj) {

    id<IGenPropBag> item = GenPropBag_makeInstanceByRubyObject(obj);
    return rb_GenPropBag_setIntProp_Obj(argc, argv, item);

}

VALUE rb_s_GenPropBag_def_setIntProp(int argc, VALUE *argv) {
    id<IGenPropBagFactory> factory = [GenPropBagFactorySingleton getGenPropBagFactoryInstance];
    id<IGenPropBagSingleton> singleton = [factory getGenPropBagSingleton];

    NSString* defID = [singleton getDefaultID];

    id<IGenPropBag> item = [factory getGenPropBagByID:defID];
    return rb_GenPropBag_setIntProp_Obj(argc, argv, item);
}







@interface rb_GenPropBag_getFloatProp_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<IGenPropBag> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(rb_GenPropBag_getFloatProp_caller_params*) makeParams:(NSArray*)_params _item:(id<IGenPropBag>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation rb_GenPropBag_getFloatProp_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(rb_GenPropBag_getFloatProp_caller_params*) makeParams:(NSArray*)_params _item:(id<IGenPropBag>)_item _methodResult:(CMethodResult*)_methodResult {
    rb_GenPropBag_getFloatProp_caller_params* par = [[rb_GenPropBag_getFloatProp_caller_params alloc] init];
    par.params = _params;
    par.item = _item;
    par.methodResult = _methodResult;
    return [par retain];
}

@end


@interface rb_GenPropBag_getFloatProp_caller : NSObject {

}
+(rb_GenPropBag_getFloatProp_caller*) getSharedInstance;
+(void) getFloatProp:(rb_GenPropBag_getFloatProp_caller_params*)caller_params;
+(void) getFloatProp_in_thread:(rb_GenPropBag_getFloatProp_caller_params*)caller_params;
+(void) getFloatProp_in_UI_thread:(rb_GenPropBag_getFloatProp_caller_params*)caller_params;

@end

static rb_GenPropBag_getFloatProp_caller* our_GenPropBag_getFloatProp_caller = nil;

@implementation rb_GenPropBag_getFloatProp_caller

+(rb_GenPropBag_getFloatProp_caller*) getSharedInstance {
    if (our_GenPropBag_getFloatProp_caller == nil) {
        our_GenPropBag_getFloatProp_caller = [[rb_GenPropBag_getFloatProp_caller alloc] init];
    }
    return our_GenPropBag_getFloatProp_caller;
}

-(void) command_getFloatProp:(rb_GenPropBag_getFloatProp_caller_params*)caller_params {

    id<IGenPropBag> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem getFloatProp:methodResult ];
    [caller_params release];
}

+(void) getFloatProp:(rb_GenPropBag_getFloatProp_caller_params*)caller_params {
    [[rb_GenPropBag_getFloatProp_caller getSharedInstance] command_getFloatProp:caller_params];
}

+(void) getFloatProp_in_thread:(rb_GenPropBag_getFloatProp_caller_params*)caller_params {
    [[rb_GenPropBag_getFloatProp_caller getSharedInstance] performSelectorInBackground:@selector(command_getFloatProp:) withObject:caller_params];
}

+(void) getFloatProp_in_UI_thread:(rb_GenPropBag_getFloatProp_caller_params*)caller_params {
    [[rb_GenPropBag_getFloatProp_caller getSharedInstance] performSelectorOnMainThread:@selector(command_getFloatProp:) withObject:caller_params waitUntilDone:NO];
}


@end


VALUE rb_GenPropBag_getFloatProp_Obj(int argc, VALUE *argv, id<IGenPropBag>objItem) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[0+1];
    NSString* callbackURL = nil;
    unsigned long callbackMethod = 0;
    NSString* callbackParam = nil;
    BOOL method_return_result = YES;

    [methodResult setMethodSignature:@"GenPropBag::floatProp"];

    
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
                params[i] = GenPropBag_makeInstanceByRubyObject(argv[i]);
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
        
        [rb_GenPropBag_getFloatProp_caller getFloatProp_in_thread:[rb_GenPropBag_getFloatProp_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    else {
        // we do not have callback
        
        [rb_GenPropBag_getFloatProp_caller getFloatProp:[rb_GenPropBag_getFloatProp_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    VALUE resValue = rho_ruby_get_NIL();
    if ((callbackURL == nil) && (callbackMethod == 0) && (method_return_result)) {
        resValue = [methodResult toRuby];
    }
    return resValue;
}


VALUE rb_GenPropBag_getFloatProp(int argc, VALUE *argv, VALUE obj) {

    id<IGenPropBag> item = GenPropBag_makeInstanceByRubyObject(obj);
    return rb_GenPropBag_getFloatProp_Obj(argc, argv, item);

}

VALUE rb_s_GenPropBag_def_getFloatProp(int argc, VALUE *argv) {
    id<IGenPropBagFactory> factory = [GenPropBagFactorySingleton getGenPropBagFactoryInstance];
    id<IGenPropBagSingleton> singleton = [factory getGenPropBagSingleton];

    NSString* defID = [singleton getDefaultID];

    id<IGenPropBag> item = [factory getGenPropBagByID:defID];
    return rb_GenPropBag_getFloatProp_Obj(argc, argv, item);
}







@interface rb_GenPropBag_setFloatProp_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<IGenPropBag> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(rb_GenPropBag_setFloatProp_caller_params*) makeParams:(NSArray*)_params _item:(id<IGenPropBag>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation rb_GenPropBag_setFloatProp_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(rb_GenPropBag_setFloatProp_caller_params*) makeParams:(NSArray*)_params _item:(id<IGenPropBag>)_item _methodResult:(CMethodResult*)_methodResult {
    rb_GenPropBag_setFloatProp_caller_params* par = [[rb_GenPropBag_setFloatProp_caller_params alloc] init];
    par.params = _params;
    par.item = _item;
    par.methodResult = _methodResult;
    return [par retain];
}

@end


@interface rb_GenPropBag_setFloatProp_caller : NSObject {

}
+(rb_GenPropBag_setFloatProp_caller*) getSharedInstance;
+(void) setFloatProp:(rb_GenPropBag_setFloatProp_caller_params*)caller_params;
+(void) setFloatProp_in_thread:(rb_GenPropBag_setFloatProp_caller_params*)caller_params;
+(void) setFloatProp_in_UI_thread:(rb_GenPropBag_setFloatProp_caller_params*)caller_params;

@end

static rb_GenPropBag_setFloatProp_caller* our_GenPropBag_setFloatProp_caller = nil;

@implementation rb_GenPropBag_setFloatProp_caller

+(rb_GenPropBag_setFloatProp_caller*) getSharedInstance {
    if (our_GenPropBag_setFloatProp_caller == nil) {
        our_GenPropBag_setFloatProp_caller = [[rb_GenPropBag_setFloatProp_caller alloc] init];
    }
    return our_GenPropBag_setFloatProp_caller;
}

-(void) command_setFloatProp:(rb_GenPropBag_setFloatProp_caller_params*)caller_params {

    NSArray* params = caller_params.params;

    id<IGenPropBag> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem setFloatProp:(float)[((NSNumber*)[params objectAtIndex:0]) floatValue] methodResult:methodResult ];
    [caller_params release];
}

+(void) setFloatProp:(rb_GenPropBag_setFloatProp_caller_params*)caller_params {
    [[rb_GenPropBag_setFloatProp_caller getSharedInstance] command_setFloatProp:caller_params];
}

+(void) setFloatProp_in_thread:(rb_GenPropBag_setFloatProp_caller_params*)caller_params {
    [[rb_GenPropBag_setFloatProp_caller getSharedInstance] performSelectorInBackground:@selector(command_setFloatProp:) withObject:caller_params];
}

+(void) setFloatProp_in_UI_thread:(rb_GenPropBag_setFloatProp_caller_params*)caller_params {
    [[rb_GenPropBag_setFloatProp_caller getSharedInstance] performSelectorOnMainThread:@selector(command_setFloatProp:) withObject:caller_params waitUntilDone:NO];
}


@end


VALUE rb_GenPropBag_setFloatProp_Obj(int argc, VALUE *argv, id<IGenPropBag>objItem) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[1+1];
    NSString* callbackURL = nil;
    unsigned long callbackMethod = 0;
    NSString* callbackParam = nil;
    BOOL method_return_result = YES;

    [methodResult setMethodSignature:@"GenPropBag::floatProp="];

    
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
                params[i] = GenPropBag_makeInstanceByRubyObject(argv[i]);
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
        
        [rb_GenPropBag_setFloatProp_caller setFloatProp_in_thread:[rb_GenPropBag_setFloatProp_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    else {
        // we do not have callback
        
        [rb_GenPropBag_setFloatProp_caller setFloatProp:[rb_GenPropBag_setFloatProp_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    VALUE resValue = rho_ruby_get_NIL();
    if ((callbackURL == nil) && (callbackMethod == 0) && (method_return_result)) {
        resValue = [methodResult toRuby];
    }
    return resValue;
}


VALUE rb_GenPropBag_setFloatProp(int argc, VALUE *argv, VALUE obj) {

    id<IGenPropBag> item = GenPropBag_makeInstanceByRubyObject(obj);
    return rb_GenPropBag_setFloatProp_Obj(argc, argv, item);

}

VALUE rb_s_GenPropBag_def_setFloatProp(int argc, VALUE *argv) {
    id<IGenPropBagFactory> factory = [GenPropBagFactorySingleton getGenPropBagFactoryInstance];
    id<IGenPropBagSingleton> singleton = [factory getGenPropBagSingleton];

    NSString* defID = [singleton getDefaultID];

    id<IGenPropBag> item = [factory getGenPropBagByID:defID];
    return rb_GenPropBag_setFloatProp_Obj(argc, argv, item);
}







@interface rb_GenPropBag_getStringProp_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<IGenPropBag> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(rb_GenPropBag_getStringProp_caller_params*) makeParams:(NSArray*)_params _item:(id<IGenPropBag>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation rb_GenPropBag_getStringProp_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(rb_GenPropBag_getStringProp_caller_params*) makeParams:(NSArray*)_params _item:(id<IGenPropBag>)_item _methodResult:(CMethodResult*)_methodResult {
    rb_GenPropBag_getStringProp_caller_params* par = [[rb_GenPropBag_getStringProp_caller_params alloc] init];
    par.params = _params;
    par.item = _item;
    par.methodResult = _methodResult;
    return [par retain];
}

@end


@interface rb_GenPropBag_getStringProp_caller : NSObject {

}
+(rb_GenPropBag_getStringProp_caller*) getSharedInstance;
+(void) getStringProp:(rb_GenPropBag_getStringProp_caller_params*)caller_params;
+(void) getStringProp_in_thread:(rb_GenPropBag_getStringProp_caller_params*)caller_params;
+(void) getStringProp_in_UI_thread:(rb_GenPropBag_getStringProp_caller_params*)caller_params;

@end

static rb_GenPropBag_getStringProp_caller* our_GenPropBag_getStringProp_caller = nil;

@implementation rb_GenPropBag_getStringProp_caller

+(rb_GenPropBag_getStringProp_caller*) getSharedInstance {
    if (our_GenPropBag_getStringProp_caller == nil) {
        our_GenPropBag_getStringProp_caller = [[rb_GenPropBag_getStringProp_caller alloc] init];
    }
    return our_GenPropBag_getStringProp_caller;
}

-(void) command_getStringProp:(rb_GenPropBag_getStringProp_caller_params*)caller_params {

    id<IGenPropBag> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem getStringProp:methodResult ];
    [caller_params release];
}

+(void) getStringProp:(rb_GenPropBag_getStringProp_caller_params*)caller_params {
    [[rb_GenPropBag_getStringProp_caller getSharedInstance] command_getStringProp:caller_params];
}

+(void) getStringProp_in_thread:(rb_GenPropBag_getStringProp_caller_params*)caller_params {
    [[rb_GenPropBag_getStringProp_caller getSharedInstance] performSelectorInBackground:@selector(command_getStringProp:) withObject:caller_params];
}

+(void) getStringProp_in_UI_thread:(rb_GenPropBag_getStringProp_caller_params*)caller_params {
    [[rb_GenPropBag_getStringProp_caller getSharedInstance] performSelectorOnMainThread:@selector(command_getStringProp:) withObject:caller_params waitUntilDone:NO];
}


@end


VALUE rb_GenPropBag_getStringProp_Obj(int argc, VALUE *argv, id<IGenPropBag>objItem) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[0+1];
    NSString* callbackURL = nil;
    unsigned long callbackMethod = 0;
    NSString* callbackParam = nil;
    BOOL method_return_result = YES;

    [methodResult setMethodSignature:@"GenPropBag::stringProp"];

    
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
                params[i] = GenPropBag_makeInstanceByRubyObject(argv[i]);
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
        
        [rb_GenPropBag_getStringProp_caller getStringProp_in_thread:[rb_GenPropBag_getStringProp_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    else {
        // we do not have callback
        
        [rb_GenPropBag_getStringProp_caller getStringProp:[rb_GenPropBag_getStringProp_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    VALUE resValue = rho_ruby_get_NIL();
    if ((callbackURL == nil) && (callbackMethod == 0) && (method_return_result)) {
        resValue = [methodResult toRuby];
    }
    return resValue;
}


VALUE rb_GenPropBag_getStringProp(int argc, VALUE *argv, VALUE obj) {

    id<IGenPropBag> item = GenPropBag_makeInstanceByRubyObject(obj);
    return rb_GenPropBag_getStringProp_Obj(argc, argv, item);

}

VALUE rb_s_GenPropBag_def_getStringProp(int argc, VALUE *argv) {
    id<IGenPropBagFactory> factory = [GenPropBagFactorySingleton getGenPropBagFactoryInstance];
    id<IGenPropBagSingleton> singleton = [factory getGenPropBagSingleton];

    NSString* defID = [singleton getDefaultID];

    id<IGenPropBag> item = [factory getGenPropBagByID:defID];
    return rb_GenPropBag_getStringProp_Obj(argc, argv, item);
}







@interface rb_GenPropBag_setStringProp_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<IGenPropBag> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(rb_GenPropBag_setStringProp_caller_params*) makeParams:(NSArray*)_params _item:(id<IGenPropBag>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation rb_GenPropBag_setStringProp_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(rb_GenPropBag_setStringProp_caller_params*) makeParams:(NSArray*)_params _item:(id<IGenPropBag>)_item _methodResult:(CMethodResult*)_methodResult {
    rb_GenPropBag_setStringProp_caller_params* par = [[rb_GenPropBag_setStringProp_caller_params alloc] init];
    par.params = _params;
    par.item = _item;
    par.methodResult = _methodResult;
    return [par retain];
}

@end


@interface rb_GenPropBag_setStringProp_caller : NSObject {

}
+(rb_GenPropBag_setStringProp_caller*) getSharedInstance;
+(void) setStringProp:(rb_GenPropBag_setStringProp_caller_params*)caller_params;
+(void) setStringProp_in_thread:(rb_GenPropBag_setStringProp_caller_params*)caller_params;
+(void) setStringProp_in_UI_thread:(rb_GenPropBag_setStringProp_caller_params*)caller_params;

@end

static rb_GenPropBag_setStringProp_caller* our_GenPropBag_setStringProp_caller = nil;

@implementation rb_GenPropBag_setStringProp_caller

+(rb_GenPropBag_setStringProp_caller*) getSharedInstance {
    if (our_GenPropBag_setStringProp_caller == nil) {
        our_GenPropBag_setStringProp_caller = [[rb_GenPropBag_setStringProp_caller alloc] init];
    }
    return our_GenPropBag_setStringProp_caller;
}

-(void) command_setStringProp:(rb_GenPropBag_setStringProp_caller_params*)caller_params {

    NSArray* params = caller_params.params;

    id<IGenPropBag> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem setStringProp:(NSString*)[params objectAtIndex:0] methodResult:methodResult ];
    [caller_params release];
}

+(void) setStringProp:(rb_GenPropBag_setStringProp_caller_params*)caller_params {
    [[rb_GenPropBag_setStringProp_caller getSharedInstance] command_setStringProp:caller_params];
}

+(void) setStringProp_in_thread:(rb_GenPropBag_setStringProp_caller_params*)caller_params {
    [[rb_GenPropBag_setStringProp_caller getSharedInstance] performSelectorInBackground:@selector(command_setStringProp:) withObject:caller_params];
}

+(void) setStringProp_in_UI_thread:(rb_GenPropBag_setStringProp_caller_params*)caller_params {
    [[rb_GenPropBag_setStringProp_caller getSharedInstance] performSelectorOnMainThread:@selector(command_setStringProp:) withObject:caller_params waitUntilDone:NO];
}


@end


VALUE rb_GenPropBag_setStringProp_Obj(int argc, VALUE *argv, id<IGenPropBag>objItem) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[1+1];
    NSString* callbackURL = nil;
    unsigned long callbackMethod = 0;
    NSString* callbackParam = nil;
    BOOL method_return_result = YES;

    [methodResult setMethodSignature:@"GenPropBag::stringProp="];

    
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
                params[i] = GenPropBag_makeInstanceByRubyObject(argv[i]);
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
        
        [rb_GenPropBag_setStringProp_caller setStringProp_in_thread:[rb_GenPropBag_setStringProp_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    else {
        // we do not have callback
        
        [rb_GenPropBag_setStringProp_caller setStringProp:[rb_GenPropBag_setStringProp_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    VALUE resValue = rho_ruby_get_NIL();
    if ((callbackURL == nil) && (callbackMethod == 0) && (method_return_result)) {
        resValue = [methodResult toRuby];
    }
    return resValue;
}


VALUE rb_GenPropBag_setStringProp(int argc, VALUE *argv, VALUE obj) {

    id<IGenPropBag> item = GenPropBag_makeInstanceByRubyObject(obj);
    return rb_GenPropBag_setStringProp_Obj(argc, argv, item);

}

VALUE rb_s_GenPropBag_def_setStringProp(int argc, VALUE *argv) {
    id<IGenPropBagFactory> factory = [GenPropBagFactorySingleton getGenPropBagFactoryInstance];
    id<IGenPropBagSingleton> singleton = [factory getGenPropBagSingleton];

    NSString* defID = [singleton getDefaultID];

    id<IGenPropBag> item = [factory getGenPropBagByID:defID];
    return rb_GenPropBag_setStringProp_Obj(argc, argv, item);
}







@interface rb_GenPropBag_enumerate_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<IGenPropBagSingleton> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(rb_GenPropBag_enumerate_caller_params*) makeParams:(NSArray*)_params _item:(id<IGenPropBagSingleton>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation rb_GenPropBag_enumerate_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(rb_GenPropBag_enumerate_caller_params*) makeParams:(NSArray*)_params _item:(id<IGenPropBagSingleton>)_item _methodResult:(CMethodResult*)_methodResult {
    rb_GenPropBag_enumerate_caller_params* par = [[rb_GenPropBag_enumerate_caller_params alloc] init];
    par.params = _params;
    par.item = _item;
    par.methodResult = _methodResult;
    return [par retain];
}

@end


@interface rb_GenPropBag_enumerate_caller : NSObject {

}
+(rb_GenPropBag_enumerate_caller*) getSharedInstance;
+(void) enumerate:(rb_GenPropBag_enumerate_caller_params*)caller_params;
+(void) enumerate_in_thread:(rb_GenPropBag_enumerate_caller_params*)caller_params;
+(void) enumerate_in_UI_thread:(rb_GenPropBag_enumerate_caller_params*)caller_params;

@end

static rb_GenPropBag_enumerate_caller* our_GenPropBag_enumerate_caller = nil;

@implementation rb_GenPropBag_enumerate_caller

+(rb_GenPropBag_enumerate_caller*) getSharedInstance {
    if (our_GenPropBag_enumerate_caller == nil) {
        our_GenPropBag_enumerate_caller = [[rb_GenPropBag_enumerate_caller alloc] init];
    }
    return our_GenPropBag_enumerate_caller;
}

-(void) command_enumerate:(rb_GenPropBag_enumerate_caller_params*)caller_params {

    id<IGenPropBagSingleton> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem enumerate:methodResult ];
    [caller_params release];
}

+(void) enumerate:(rb_GenPropBag_enumerate_caller_params*)caller_params {
    [[rb_GenPropBag_enumerate_caller getSharedInstance] command_enumerate:caller_params];
}

+(void) enumerate_in_thread:(rb_GenPropBag_enumerate_caller_params*)caller_params {
    [[rb_GenPropBag_enumerate_caller getSharedInstance] performSelectorInBackground:@selector(command_enumerate:) withObject:caller_params];
}

+(void) enumerate_in_UI_thread:(rb_GenPropBag_enumerate_caller_params*)caller_params {
    [[rb_GenPropBag_enumerate_caller getSharedInstance] performSelectorOnMainThread:@selector(command_enumerate:) withObject:caller_params waitUntilDone:NO];
}


@end


VALUE rb_GenPropBag_enumerate_Obj(int argc, VALUE *argv, id<IGenPropBagSingleton>objItem) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[0+1];
    NSString* callbackURL = nil;
    unsigned long callbackMethod = 0;
    NSString* callbackParam = nil;
    BOOL method_return_result = YES;

    [methodResult setMethodSignature:@"GenPropBag::enumerate"];

    
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
                params[i] = GenPropBag_makeInstanceByRubyObject(argv[i]);
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
    

    
    [methodResult enableObjectCreationModeWithRubyClassPath:@"Rho::GenPropBag"];


    if ((callbackURL != nil) || (callbackMethod != 0)) {
        // we have callback - method should not call setResult if method execute from current thread - only later or in UI or separated threads !!!
        if (callbackURL != nil)
            [methodResult setRubyCallback:callbackURL];
        if (callbackMethod != 0)
            [methodResult setRubyCallbackMethod:callbackMethod];
        if (callbackParam != nil) {
            [methodResult setCallbackParam:callbackParam];
        }
        
        [rb_GenPropBag_enumerate_caller enumerate_in_thread:[rb_GenPropBag_enumerate_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    else {
        // we do not have callback
        
        [rb_GenPropBag_enumerate_caller enumerate:[rb_GenPropBag_enumerate_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    VALUE resValue = rho_ruby_get_NIL();
    if ((callbackURL == nil) && (callbackMethod == 0) && (method_return_result)) {
        resValue = [methodResult toRuby];
    }
    return resValue;
}


VALUE rb_s_GenPropBag_enumerate(int argc, VALUE *argv) {

    id<IGenPropBagFactory> factory = [GenPropBagFactorySingleton getGenPropBagFactoryInstance];
    id<IGenPropBagSingleton> singleton = [factory getGenPropBagSingleton];
    return rb_GenPropBag_enumerate_Obj(argc, argv, singleton);

}







@interface rb_GenPropBag_getProperty_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<IGenPropBag> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(rb_GenPropBag_getProperty_caller_params*) makeParams:(NSArray*)_params _item:(id<IGenPropBag>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation rb_GenPropBag_getProperty_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(rb_GenPropBag_getProperty_caller_params*) makeParams:(NSArray*)_params _item:(id<IGenPropBag>)_item _methodResult:(CMethodResult*)_methodResult {
    rb_GenPropBag_getProperty_caller_params* par = [[rb_GenPropBag_getProperty_caller_params alloc] init];
    par.params = _params;
    par.item = _item;
    par.methodResult = _methodResult;
    return [par retain];
}

@end


@interface rb_GenPropBag_getProperty_caller : NSObject {

}
+(rb_GenPropBag_getProperty_caller*) getSharedInstance;
+(void) getProperty:(rb_GenPropBag_getProperty_caller_params*)caller_params;
+(void) getProperty_in_thread:(rb_GenPropBag_getProperty_caller_params*)caller_params;
+(void) getProperty_in_UI_thread:(rb_GenPropBag_getProperty_caller_params*)caller_params;

@end

static rb_GenPropBag_getProperty_caller* our_GenPropBag_getProperty_caller = nil;

@implementation rb_GenPropBag_getProperty_caller

+(rb_GenPropBag_getProperty_caller*) getSharedInstance {
    if (our_GenPropBag_getProperty_caller == nil) {
        our_GenPropBag_getProperty_caller = [[rb_GenPropBag_getProperty_caller alloc] init];
    }
    return our_GenPropBag_getProperty_caller;
}

-(void) command_getProperty:(rb_GenPropBag_getProperty_caller_params*)caller_params {

    NSArray* params = caller_params.params;

    id<IGenPropBag> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem getProperty:(NSString*)[params objectAtIndex:0] methodResult:methodResult ];
    [caller_params release];
}

+(void) getProperty:(rb_GenPropBag_getProperty_caller_params*)caller_params {
    [[rb_GenPropBag_getProperty_caller getSharedInstance] command_getProperty:caller_params];
}

+(void) getProperty_in_thread:(rb_GenPropBag_getProperty_caller_params*)caller_params {
    [[rb_GenPropBag_getProperty_caller getSharedInstance] performSelectorInBackground:@selector(command_getProperty:) withObject:caller_params];
}

+(void) getProperty_in_UI_thread:(rb_GenPropBag_getProperty_caller_params*)caller_params {
    [[rb_GenPropBag_getProperty_caller getSharedInstance] performSelectorOnMainThread:@selector(command_getProperty:) withObject:caller_params waitUntilDone:NO];
}


@end


VALUE rb_GenPropBag_getProperty_Obj(int argc, VALUE *argv, id<IGenPropBag>objItem) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[1+1];
    NSString* callbackURL = nil;
    unsigned long callbackMethod = 0;
    NSString* callbackParam = nil;
    BOOL method_return_result = YES;

    [methodResult setMethodSignature:@"GenPropBag::getProperty"];

    
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
                params[i] = GenPropBag_makeInstanceByRubyObject(argv[i]);
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
        
        [rb_GenPropBag_getProperty_caller getProperty_in_thread:[rb_GenPropBag_getProperty_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    else {
        // we do not have callback
        
        [rb_GenPropBag_getProperty_caller getProperty:[rb_GenPropBag_getProperty_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    VALUE resValue = rho_ruby_get_NIL();
    if ((callbackURL == nil) && (callbackMethod == 0) && (method_return_result)) {
        resValue = [methodResult toRuby];
    }
    return resValue;
}


VALUE rb_GenPropBag_getProperty(int argc, VALUE *argv, VALUE obj) {

    id<IGenPropBag> item = GenPropBag_makeInstanceByRubyObject(obj);
    return rb_GenPropBag_getProperty_Obj(argc, argv, item);

}

VALUE rb_s_GenPropBag_def_getProperty(int argc, VALUE *argv) {
    id<IGenPropBagFactory> factory = [GenPropBagFactorySingleton getGenPropBagFactoryInstance];
    id<IGenPropBagSingleton> singleton = [factory getGenPropBagSingleton];

    NSString* defID = [singleton getDefaultID];

    id<IGenPropBag> item = [factory getGenPropBagByID:defID];
    return rb_GenPropBag_getProperty_Obj(argc, argv, item);
}







@interface rb_GenPropBag_getProperties_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<IGenPropBag> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(rb_GenPropBag_getProperties_caller_params*) makeParams:(NSArray*)_params _item:(id<IGenPropBag>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation rb_GenPropBag_getProperties_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(rb_GenPropBag_getProperties_caller_params*) makeParams:(NSArray*)_params _item:(id<IGenPropBag>)_item _methodResult:(CMethodResult*)_methodResult {
    rb_GenPropBag_getProperties_caller_params* par = [[rb_GenPropBag_getProperties_caller_params alloc] init];
    par.params = _params;
    par.item = _item;
    par.methodResult = _methodResult;
    return [par retain];
}

@end


@interface rb_GenPropBag_getProperties_caller : NSObject {

}
+(rb_GenPropBag_getProperties_caller*) getSharedInstance;
+(void) getProperties:(rb_GenPropBag_getProperties_caller_params*)caller_params;
+(void) getProperties_in_thread:(rb_GenPropBag_getProperties_caller_params*)caller_params;
+(void) getProperties_in_UI_thread:(rb_GenPropBag_getProperties_caller_params*)caller_params;

@end

static rb_GenPropBag_getProperties_caller* our_GenPropBag_getProperties_caller = nil;

@implementation rb_GenPropBag_getProperties_caller

+(rb_GenPropBag_getProperties_caller*) getSharedInstance {
    if (our_GenPropBag_getProperties_caller == nil) {
        our_GenPropBag_getProperties_caller = [[rb_GenPropBag_getProperties_caller alloc] init];
    }
    return our_GenPropBag_getProperties_caller;
}

-(void) command_getProperties:(rb_GenPropBag_getProperties_caller_params*)caller_params {

    NSArray* params = caller_params.params;

    id<IGenPropBag> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem getProperties:(NSArray*)[params objectAtIndex:0] methodResult:methodResult ];
    [caller_params release];
}

+(void) getProperties:(rb_GenPropBag_getProperties_caller_params*)caller_params {
    [[rb_GenPropBag_getProperties_caller getSharedInstance] command_getProperties:caller_params];
}

+(void) getProperties_in_thread:(rb_GenPropBag_getProperties_caller_params*)caller_params {
    [[rb_GenPropBag_getProperties_caller getSharedInstance] performSelectorInBackground:@selector(command_getProperties:) withObject:caller_params];
}

+(void) getProperties_in_UI_thread:(rb_GenPropBag_getProperties_caller_params*)caller_params {
    [[rb_GenPropBag_getProperties_caller getSharedInstance] performSelectorOnMainThread:@selector(command_getProperties:) withObject:caller_params waitUntilDone:NO];
}


@end


VALUE rb_GenPropBag_getProperties_Obj(int argc, VALUE *argv, id<IGenPropBag>objItem) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[1+1];
    NSString* callbackURL = nil;
    unsigned long callbackMethod = 0;
    NSString* callbackParam = nil;
    BOOL method_return_result = YES;

    [methodResult setMethodSignature:@"GenPropBag::getProperties"];

    
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
                params[i] = GenPropBag_makeInstanceByRubyObject(argv[i]);
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
        
        [rb_GenPropBag_getProperties_caller getProperties_in_thread:[rb_GenPropBag_getProperties_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    else {
        // we do not have callback
        
        [rb_GenPropBag_getProperties_caller getProperties:[rb_GenPropBag_getProperties_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    VALUE resValue = rho_ruby_get_NIL();
    if ((callbackURL == nil) && (callbackMethod == 0) && (method_return_result)) {
        resValue = [methodResult toRuby];
    }
    return resValue;
}


VALUE rb_GenPropBag_getProperties(int argc, VALUE *argv, VALUE obj) {

    id<IGenPropBag> item = GenPropBag_makeInstanceByRubyObject(obj);
    return rb_GenPropBag_getProperties_Obj(argc, argv, item);

}

VALUE rb_s_GenPropBag_def_getProperties(int argc, VALUE *argv) {
    id<IGenPropBagFactory> factory = [GenPropBagFactorySingleton getGenPropBagFactoryInstance];
    id<IGenPropBagSingleton> singleton = [factory getGenPropBagSingleton];

    NSString* defID = [singleton getDefaultID];

    id<IGenPropBag> item = [factory getGenPropBagByID:defID];
    return rb_GenPropBag_getProperties_Obj(argc, argv, item);
}







@interface rb_GenPropBag_getAllProperties_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<IGenPropBag> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(rb_GenPropBag_getAllProperties_caller_params*) makeParams:(NSArray*)_params _item:(id<IGenPropBag>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation rb_GenPropBag_getAllProperties_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(rb_GenPropBag_getAllProperties_caller_params*) makeParams:(NSArray*)_params _item:(id<IGenPropBag>)_item _methodResult:(CMethodResult*)_methodResult {
    rb_GenPropBag_getAllProperties_caller_params* par = [[rb_GenPropBag_getAllProperties_caller_params alloc] init];
    par.params = _params;
    par.item = _item;
    par.methodResult = _methodResult;
    return [par retain];
}

@end


@interface rb_GenPropBag_getAllProperties_caller : NSObject {

}
+(rb_GenPropBag_getAllProperties_caller*) getSharedInstance;
+(void) getAllProperties:(rb_GenPropBag_getAllProperties_caller_params*)caller_params;
+(void) getAllProperties_in_thread:(rb_GenPropBag_getAllProperties_caller_params*)caller_params;
+(void) getAllProperties_in_UI_thread:(rb_GenPropBag_getAllProperties_caller_params*)caller_params;

@end

static rb_GenPropBag_getAllProperties_caller* our_GenPropBag_getAllProperties_caller = nil;

@implementation rb_GenPropBag_getAllProperties_caller

+(rb_GenPropBag_getAllProperties_caller*) getSharedInstance {
    if (our_GenPropBag_getAllProperties_caller == nil) {
        our_GenPropBag_getAllProperties_caller = [[rb_GenPropBag_getAllProperties_caller alloc] init];
    }
    return our_GenPropBag_getAllProperties_caller;
}

-(void) command_getAllProperties:(rb_GenPropBag_getAllProperties_caller_params*)caller_params {

    id<IGenPropBag> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem getAllProperties:methodResult ];
    [caller_params release];
}

+(void) getAllProperties:(rb_GenPropBag_getAllProperties_caller_params*)caller_params {
    [[rb_GenPropBag_getAllProperties_caller getSharedInstance] command_getAllProperties:caller_params];
}

+(void) getAllProperties_in_thread:(rb_GenPropBag_getAllProperties_caller_params*)caller_params {
    [[rb_GenPropBag_getAllProperties_caller getSharedInstance] performSelectorInBackground:@selector(command_getAllProperties:) withObject:caller_params];
}

+(void) getAllProperties_in_UI_thread:(rb_GenPropBag_getAllProperties_caller_params*)caller_params {
    [[rb_GenPropBag_getAllProperties_caller getSharedInstance] performSelectorOnMainThread:@selector(command_getAllProperties:) withObject:caller_params waitUntilDone:NO];
}


@end


VALUE rb_GenPropBag_getAllProperties_Obj(int argc, VALUE *argv, id<IGenPropBag>objItem) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[0+1];
    NSString* callbackURL = nil;
    unsigned long callbackMethod = 0;
    NSString* callbackParam = nil;
    BOOL method_return_result = YES;

    [methodResult setMethodSignature:@"GenPropBag::getAllProperties"];

    
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
                params[i] = GenPropBag_makeInstanceByRubyObject(argv[i]);
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
        
        [rb_GenPropBag_getAllProperties_caller getAllProperties_in_thread:[rb_GenPropBag_getAllProperties_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    else {
        // we do not have callback
        
        [rb_GenPropBag_getAllProperties_caller getAllProperties:[rb_GenPropBag_getAllProperties_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    VALUE resValue = rho_ruby_get_NIL();
    if ((callbackURL == nil) && (callbackMethod == 0) && (method_return_result)) {
        resValue = [methodResult toRuby];
    }
    return resValue;
}


VALUE rb_GenPropBag_getAllProperties(int argc, VALUE *argv, VALUE obj) {

    id<IGenPropBag> item = GenPropBag_makeInstanceByRubyObject(obj);
    return rb_GenPropBag_getAllProperties_Obj(argc, argv, item);

}

VALUE rb_s_GenPropBag_def_getAllProperties(int argc, VALUE *argv) {
    id<IGenPropBagFactory> factory = [GenPropBagFactorySingleton getGenPropBagFactoryInstance];
    id<IGenPropBagSingleton> singleton = [factory getGenPropBagSingleton];

    NSString* defID = [singleton getDefaultID];

    id<IGenPropBag> item = [factory getGenPropBagByID:defID];
    return rb_GenPropBag_getAllProperties_Obj(argc, argv, item);
}







@interface rb_GenPropBag_setProperty_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<IGenPropBag> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(rb_GenPropBag_setProperty_caller_params*) makeParams:(NSArray*)_params _item:(id<IGenPropBag>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation rb_GenPropBag_setProperty_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(rb_GenPropBag_setProperty_caller_params*) makeParams:(NSArray*)_params _item:(id<IGenPropBag>)_item _methodResult:(CMethodResult*)_methodResult {
    rb_GenPropBag_setProperty_caller_params* par = [[rb_GenPropBag_setProperty_caller_params alloc] init];
    par.params = _params;
    par.item = _item;
    par.methodResult = _methodResult;
    return [par retain];
}

@end


@interface rb_GenPropBag_setProperty_caller : NSObject {

}
+(rb_GenPropBag_setProperty_caller*) getSharedInstance;
+(void) setProperty:(rb_GenPropBag_setProperty_caller_params*)caller_params;
+(void) setProperty_in_thread:(rb_GenPropBag_setProperty_caller_params*)caller_params;
+(void) setProperty_in_UI_thread:(rb_GenPropBag_setProperty_caller_params*)caller_params;

@end

static rb_GenPropBag_setProperty_caller* our_GenPropBag_setProperty_caller = nil;

@implementation rb_GenPropBag_setProperty_caller

+(rb_GenPropBag_setProperty_caller*) getSharedInstance {
    if (our_GenPropBag_setProperty_caller == nil) {
        our_GenPropBag_setProperty_caller = [[rb_GenPropBag_setProperty_caller alloc] init];
    }
    return our_GenPropBag_setProperty_caller;
}

-(void) command_setProperty:(rb_GenPropBag_setProperty_caller_params*)caller_params {

    NSArray* params = caller_params.params;

    id<IGenPropBag> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem setProperty:(NSString*)[params objectAtIndex:0] propertyValue:(NSString*)[params objectAtIndex:1] methodResult:methodResult ];
    [caller_params release];
}

+(void) setProperty:(rb_GenPropBag_setProperty_caller_params*)caller_params {
    [[rb_GenPropBag_setProperty_caller getSharedInstance] command_setProperty:caller_params];
}

+(void) setProperty_in_thread:(rb_GenPropBag_setProperty_caller_params*)caller_params {
    [[rb_GenPropBag_setProperty_caller getSharedInstance] performSelectorInBackground:@selector(command_setProperty:) withObject:caller_params];
}

+(void) setProperty_in_UI_thread:(rb_GenPropBag_setProperty_caller_params*)caller_params {
    [[rb_GenPropBag_setProperty_caller getSharedInstance] performSelectorOnMainThread:@selector(command_setProperty:) withObject:caller_params waitUntilDone:NO];
}


@end


VALUE rb_GenPropBag_setProperty_Obj(int argc, VALUE *argv, id<IGenPropBag>objItem) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[2+1];
    NSString* callbackURL = nil;
    unsigned long callbackMethod = 0;
    NSString* callbackParam = nil;
    BOOL method_return_result = YES;

    [methodResult setMethodSignature:@"GenPropBag::setProperty"];

    
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
                params[i] = GenPropBag_makeInstanceByRubyObject(argv[i]);
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
        
        [rb_GenPropBag_setProperty_caller setProperty_in_thread:[rb_GenPropBag_setProperty_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    else {
        // we do not have callback
        
        [rb_GenPropBag_setProperty_caller setProperty:[rb_GenPropBag_setProperty_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    VALUE resValue = rho_ruby_get_NIL();
    if ((callbackURL == nil) && (callbackMethod == 0) && (method_return_result)) {
        resValue = [methodResult toRuby];
    }
    return resValue;
}


VALUE rb_GenPropBag_setProperty(int argc, VALUE *argv, VALUE obj) {

    id<IGenPropBag> item = GenPropBag_makeInstanceByRubyObject(obj);
    return rb_GenPropBag_setProperty_Obj(argc, argv, item);

}

VALUE rb_s_GenPropBag_def_setProperty(int argc, VALUE *argv) {
    id<IGenPropBagFactory> factory = [GenPropBagFactorySingleton getGenPropBagFactoryInstance];
    id<IGenPropBagSingleton> singleton = [factory getGenPropBagSingleton];

    NSString* defID = [singleton getDefaultID];

    id<IGenPropBag> item = [factory getGenPropBagByID:defID];
    return rb_GenPropBag_setProperty_Obj(argc, argv, item);
}







@interface rb_GenPropBag_setProperties_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<IGenPropBag> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(rb_GenPropBag_setProperties_caller_params*) makeParams:(NSArray*)_params _item:(id<IGenPropBag>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation rb_GenPropBag_setProperties_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(rb_GenPropBag_setProperties_caller_params*) makeParams:(NSArray*)_params _item:(id<IGenPropBag>)_item _methodResult:(CMethodResult*)_methodResult {
    rb_GenPropBag_setProperties_caller_params* par = [[rb_GenPropBag_setProperties_caller_params alloc] init];
    par.params = _params;
    par.item = _item;
    par.methodResult = _methodResult;
    return [par retain];
}

@end


@interface rb_GenPropBag_setProperties_caller : NSObject {

}
+(rb_GenPropBag_setProperties_caller*) getSharedInstance;
+(void) setProperties:(rb_GenPropBag_setProperties_caller_params*)caller_params;
+(void) setProperties_in_thread:(rb_GenPropBag_setProperties_caller_params*)caller_params;
+(void) setProperties_in_UI_thread:(rb_GenPropBag_setProperties_caller_params*)caller_params;

@end

static rb_GenPropBag_setProperties_caller* our_GenPropBag_setProperties_caller = nil;

@implementation rb_GenPropBag_setProperties_caller

+(rb_GenPropBag_setProperties_caller*) getSharedInstance {
    if (our_GenPropBag_setProperties_caller == nil) {
        our_GenPropBag_setProperties_caller = [[rb_GenPropBag_setProperties_caller alloc] init];
    }
    return our_GenPropBag_setProperties_caller;
}

-(void) command_setProperties:(rb_GenPropBag_setProperties_caller_params*)caller_params {

    NSArray* params = caller_params.params;

    id<IGenPropBag> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem setProperties:(NSDictionary*)[params objectAtIndex:0] methodResult:methodResult ];
    [caller_params release];
}

+(void) setProperties:(rb_GenPropBag_setProperties_caller_params*)caller_params {
    [[rb_GenPropBag_setProperties_caller getSharedInstance] command_setProperties:caller_params];
}

+(void) setProperties_in_thread:(rb_GenPropBag_setProperties_caller_params*)caller_params {
    [[rb_GenPropBag_setProperties_caller getSharedInstance] performSelectorInBackground:@selector(command_setProperties:) withObject:caller_params];
}

+(void) setProperties_in_UI_thread:(rb_GenPropBag_setProperties_caller_params*)caller_params {
    [[rb_GenPropBag_setProperties_caller getSharedInstance] performSelectorOnMainThread:@selector(command_setProperties:) withObject:caller_params waitUntilDone:NO];
}


@end


VALUE rb_GenPropBag_setProperties_Obj(int argc, VALUE *argv, id<IGenPropBag>objItem) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[1+1];
    NSString* callbackURL = nil;
    unsigned long callbackMethod = 0;
    NSString* callbackParam = nil;
    BOOL method_return_result = YES;

    [methodResult setMethodSignature:@"GenPropBag::setProperties"];

    
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
                params[i] = GenPropBag_makeInstanceByRubyObject(argv[i]);
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
        
        [rb_GenPropBag_setProperties_caller setProperties_in_thread:[rb_GenPropBag_setProperties_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    else {
        // we do not have callback
        
        [rb_GenPropBag_setProperties_caller setProperties:[rb_GenPropBag_setProperties_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    VALUE resValue = rho_ruby_get_NIL();
    if ((callbackURL == nil) && (callbackMethod == 0) && (method_return_result)) {
        resValue = [methodResult toRuby];
    }
    return resValue;
}


VALUE rb_GenPropBag_setProperties(int argc, VALUE *argv, VALUE obj) {

    id<IGenPropBag> item = GenPropBag_makeInstanceByRubyObject(obj);
    return rb_GenPropBag_setProperties_Obj(argc, argv, item);

}

VALUE rb_s_GenPropBag_def_setProperties(int argc, VALUE *argv) {
    id<IGenPropBagFactory> factory = [GenPropBagFactorySingleton getGenPropBagFactoryInstance];
    id<IGenPropBagSingleton> singleton = [factory getGenPropBagSingleton];

    NSString* defID = [singleton getDefaultID];

    id<IGenPropBag> item = [factory getGenPropBagByID:defID];
    return rb_GenPropBag_setProperties_Obj(argc, argv, item);
}







VALUE rb_GenPropBag_s_default(VALUE klass)
{
    id<IGenPropBagFactory> factory = [GenPropBagFactorySingleton getGenPropBagFactoryInstance];
    id<IGenPropBagSingleton> singleton = [factory getGenPropBagSingleton];

    NSString* defID = [singleton getDefaultID];

    return rho_ruby_create_object_with_id( klass, [defID UTF8String] );
}

VALUE rb_GenPropBag_s_setDefault(VALUE klass, VALUE valObj)
{
    const char* szID = rho_ruby_get_object_id( valObj );
    id<IGenPropBagFactory> factory = [GenPropBagFactorySingleton getGenPropBagFactoryInstance];
    id<IGenPropBagSingleton> singleton = [factory getGenPropBagSingleton];

    [singleton setDefaultID:[NSString stringWithUTF8String:szID]];

    return rho_ruby_get_NIL();
}



