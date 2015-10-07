
#import "IDummy.h"
//#import "api_generator/common/ruby_helpers.h"

#include "api_generator/js_helpers.h"

#import "api_generator/iphone/CMethodResult.h"
#import "api_generator/iphone/CJSConverter.h"

extern VALUE getRuby_Dummy_Module();



id<IDummy> Dummy_makeInstanceByJSObject(rho::String sid) {
    const char* szID = sid.c_str();
    id<IDummyFactory> factory = [DummyFactorySingleton getDummyFactoryInstance];
    return [factory getDummyByID:[NSString stringWithUTF8String:szID]];
}









@interface Dummy_getSimpleStringProperty_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<IDummy> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(Dummy_getSimpleStringProperty_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation Dummy_getSimpleStringProperty_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(Dummy_getSimpleStringProperty_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult {
    Dummy_getSimpleStringProperty_caller_params* par = [[[Dummy_getSimpleStringProperty_caller_params alloc] init] autorelease];
    par.params = _params;
    par.item = _item;
    par.methodResult = [_methodResult retain];
    return [par retain];
}

@end


@interface Dummy_getSimpleStringProperty_caller : NSObject {

}
+(Dummy_getSimpleStringProperty_caller*) getSharedInstance;
+(void) getSimpleStringProperty:(Dummy_getSimpleStringProperty_caller_params*)caller_params;
+(void) getSimpleStringProperty_in_thread:(Dummy_getSimpleStringProperty_caller_params*)caller_params;
+(void) getSimpleStringProperty_in_UI_thread:(Dummy_getSimpleStringProperty_caller_params*)caller_params;

@end

static Dummy_getSimpleStringProperty_caller* our_Dummy_getSimpleStringProperty_caller = nil;

@implementation Dummy_getSimpleStringProperty_caller

+(Dummy_getSimpleStringProperty_caller*) getSharedInstance {
    if (our_Dummy_getSimpleStringProperty_caller == nil) {
        our_Dummy_getSimpleStringProperty_caller = [[Dummy_getSimpleStringProperty_caller alloc] init];
    }
    return our_Dummy_getSimpleStringProperty_caller;
}

-(void) command_getSimpleStringProperty:(Dummy_getSimpleStringProperty_caller_params*)caller_params {

    id<IDummy> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem getSimpleStringProperty:methodResult ];
    [caller_params.methodResult release];
    [caller_params release];
}


+(void) getSimpleStringProperty:(Dummy_getSimpleStringProperty_caller_params*)caller_params {
    [[Dummy_getSimpleStringProperty_caller getSharedInstance] command_getSimpleStringProperty:caller_params];
}

+(void) getSimpleStringProperty_in_thread:(Dummy_getSimpleStringProperty_caller_params*)caller_params {
    [[Dummy_getSimpleStringProperty_caller getSharedInstance] performSelectorInBackground:@selector(command_getSimpleStringProperty:) withObject:caller_params];
}

+(void) getSimpleStringProperty_in_UI_thread:(Dummy_getSimpleStringProperty_caller_params*)caller_params {
    [[Dummy_getSimpleStringProperty_caller getSharedInstance] performSelectorOnMainThread:@selector(command_getSimpleStringProperty:) withObject:caller_params waitUntilDone:NO];
}


@end


rho::String js_Dummy_getSimpleStringProperty_Obj(rho::json::CJSONArray& argv, id<IDummy>objItem, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[0+1];
    BOOL method_return_result = YES;
    BOOL method_receive_callback = NO;
    int argc = argv.getSize();


    [methodResult setMethodSignature:@"Dummy::simpleStringProperty"];

    
    static RHO_API_PARAM rho_api_params[] = {  };

    
    BOOL is_factory_param[] = { NO };

    int i;

    // init
    for (i = 0; i < (0); i++) {
        params[i] = [CJSConverter getObjectiveCNULL];
    }

    

    // enumerate params
    for (int i = 0; i < (0); i++) {
        if (argc > i) {
            // we have a [i] param !
            if (is_factory_param[i]) {
                params[i] = Dummy_makeInstanceByJSObject(argv.getItem(i).getString());
            }
            else {
                rho::json::CJSONEntry entry = argv.getItem(i);
                params[i] = [[CJSConverter convertFromJS:&entry rho_api_param:&(rho_api_params[i])] retain];
            }
            // TODO: Handle CMethodResultError
            if (params[i] == nil) {
                NSLog(@"Dummy::getSimpleStringProperty parameter %d is nil!", i);
                rho::String resValue = rho::String("\"result\":null,\"error\":\"Method parameter is nil!\"");
                return resValue;
            }
        }
    }

    NSMutableArray* params_array = [NSMutableArray arrayWithCapacity:(0)];
    for (i = 0 ; i < (0); i++) {
        [params_array addObject:params[i]];
    }

    
        if (strCallbackID.size() > 0) {
            method_receive_callback = YES;
        }
    

    

    if (method_receive_callback) {
        // we have callback - method should not call setResult if method execute from current thread - only later or in UI or separated threads !!!
        [methodResult setJSCallback:[NSString stringWithUTF8String:strCallbackID.c_str()] webViewUID:[NSString stringWithUTF8String:strJsVmID.c_str()]];
        [methodResult setCallbackParam:[NSString stringWithUTF8String:strCallbackParam.c_str()]];
        
        [Dummy_getSimpleStringProperty_caller getSimpleStringProperty_in_thread:[Dummy_getSimpleStringProperty_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        

        // FIXME: callback should not be retained, it must be saved outside of this call
        [methodResult retain];
    }
    else {
        // we do not have callback
        
        [Dummy_getSimpleStringProperty_caller getSimpleStringProperty:[Dummy_getSimpleStringProperty_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    rho::String resValue = rho::String("\"result\":null");
    if ((!method_receive_callback) && (method_return_result)) {
        resValue = [[methodResult toJSON] UTF8String];
    }
    [methodResult release];
    return resValue;
}


rho::String js_Dummy_getSimpleStringProperty(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    id<IDummy> item = Dummy_makeInstanceByJSObject(strObjID);
    return js_Dummy_getSimpleStringProperty_Obj(argv, item, strCallbackID, strJsVmID, strCallbackParam);

}

rho::String js_s_Dummy_def_getSimpleStringProperty(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {
    id<IDummyFactory> factory = [DummyFactorySingleton getDummyFactoryInstance];
    id<IDummySingleton> singleton = [factory getDummySingleton];

    NSString* defID = [singleton getDefaultID];

    id<IDummy> item = [factory getDummyByID:defID];
    return js_Dummy_getSimpleStringProperty_Obj(argv, item, strCallbackID, strJsVmID, strCallbackParam);
}







@interface Dummy_setSimpleStringProperty_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<IDummy> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(Dummy_setSimpleStringProperty_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation Dummy_setSimpleStringProperty_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(Dummy_setSimpleStringProperty_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult {
    Dummy_setSimpleStringProperty_caller_params* par = [[[Dummy_setSimpleStringProperty_caller_params alloc] init] autorelease];
    par.params = _params;
    par.item = _item;
    par.methodResult = [_methodResult retain];
    return [par retain];
}

@end


@interface Dummy_setSimpleStringProperty_caller : NSObject {

}
+(Dummy_setSimpleStringProperty_caller*) getSharedInstance;
+(void) setSimpleStringProperty:(Dummy_setSimpleStringProperty_caller_params*)caller_params;
+(void) setSimpleStringProperty_in_thread:(Dummy_setSimpleStringProperty_caller_params*)caller_params;
+(void) setSimpleStringProperty_in_UI_thread:(Dummy_setSimpleStringProperty_caller_params*)caller_params;

@end

static Dummy_setSimpleStringProperty_caller* our_Dummy_setSimpleStringProperty_caller = nil;

@implementation Dummy_setSimpleStringProperty_caller

+(Dummy_setSimpleStringProperty_caller*) getSharedInstance {
    if (our_Dummy_setSimpleStringProperty_caller == nil) {
        our_Dummy_setSimpleStringProperty_caller = [[Dummy_setSimpleStringProperty_caller alloc] init];
    }
    return our_Dummy_setSimpleStringProperty_caller;
}

-(void) command_setSimpleStringProperty:(Dummy_setSimpleStringProperty_caller_params*)caller_params {

    NSArray* params = caller_params.params;

    id<IDummy> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem setSimpleStringProperty:(NSString*)[params objectAtIndex:0] methodResult:methodResult ];
    [caller_params.methodResult release];
    [caller_params release];
}


+(void) setSimpleStringProperty:(Dummy_setSimpleStringProperty_caller_params*)caller_params {
    [[Dummy_setSimpleStringProperty_caller getSharedInstance] command_setSimpleStringProperty:caller_params];
}

+(void) setSimpleStringProperty_in_thread:(Dummy_setSimpleStringProperty_caller_params*)caller_params {
    [[Dummy_setSimpleStringProperty_caller getSharedInstance] performSelectorInBackground:@selector(command_setSimpleStringProperty:) withObject:caller_params];
}

+(void) setSimpleStringProperty_in_UI_thread:(Dummy_setSimpleStringProperty_caller_params*)caller_params {
    [[Dummy_setSimpleStringProperty_caller getSharedInstance] performSelectorOnMainThread:@selector(command_setSimpleStringProperty:) withObject:caller_params waitUntilDone:NO];
}


@end


rho::String js_Dummy_setSimpleStringProperty_Obj(rho::json::CJSONArray& argv, id<IDummy>objItem, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[1+1];
    BOOL method_return_result = YES;
    BOOL method_receive_callback = NO;
    int argc = argv.getSize();


    [methodResult setMethodSignature:@"Dummy::simpleStringProperty="];

    
    static RHO_API_PARAM rho_api_params[] = { {RHO_API_STRING, 0, "simpleStringProperty", 0, 0 } };

    
    BOOL is_factory_param[] = { NO, NO };

    int i;

    // init
    for (i = 0; i < (1); i++) {
        params[i] = [CJSConverter getObjectiveCNULL];
    }

    

    // enumerate params
    for (int i = 0; i < (1); i++) {
        if (argc > i) {
            // we have a [i] param !
            if (is_factory_param[i]) {
                params[i] = Dummy_makeInstanceByJSObject(argv.getItem(i).getString());
            }
            else {
                rho::json::CJSONEntry entry = argv.getItem(i);
                params[i] = [[CJSConverter convertFromJS:&entry rho_api_param:&(rho_api_params[i])] retain];
            }
            // TODO: Handle CMethodResultError
            if (params[i] == nil) {
                NSLog(@"Dummy::setSimpleStringProperty parameter %d is nil!", i);
                rho::String resValue = rho::String("\"result\":null,\"error\":\"Method parameter is nil!\"");
                return resValue;
            }
        }
    }

    NSMutableArray* params_array = [NSMutableArray arrayWithCapacity:(1)];
    for (i = 0 ; i < (1); i++) {
        [params_array addObject:params[i]];
    }

    
        if (strCallbackID.size() > 0) {
            method_receive_callback = YES;
        }
    

    

    if (method_receive_callback) {
        // we have callback - method should not call setResult if method execute from current thread - only later or in UI or separated threads !!!
        [methodResult setJSCallback:[NSString stringWithUTF8String:strCallbackID.c_str()] webViewUID:[NSString stringWithUTF8String:strJsVmID.c_str()]];
        [methodResult setCallbackParam:[NSString stringWithUTF8String:strCallbackParam.c_str()]];
        
        [Dummy_setSimpleStringProperty_caller setSimpleStringProperty_in_thread:[Dummy_setSimpleStringProperty_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        

        // FIXME: callback should not be retained, it must be saved outside of this call
        [methodResult retain];
    }
    else {
        // we do not have callback
        
        [Dummy_setSimpleStringProperty_caller setSimpleStringProperty:[Dummy_setSimpleStringProperty_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    rho::String resValue = rho::String("\"result\":null");
    if ((!method_receive_callback) && (method_return_result)) {
        resValue = [[methodResult toJSON] UTF8String];
    }
    [methodResult release];
    return resValue;
}


rho::String js_Dummy_setSimpleStringProperty(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    id<IDummy> item = Dummy_makeInstanceByJSObject(strObjID);
    return js_Dummy_setSimpleStringProperty_Obj(argv, item, strCallbackID, strJsVmID, strCallbackParam);

}

rho::String js_s_Dummy_def_setSimpleStringProperty(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {
    id<IDummyFactory> factory = [DummyFactorySingleton getDummyFactoryInstance];
    id<IDummySingleton> singleton = [factory getDummySingleton];

    NSString* defID = [singleton getDefaultID];

    id<IDummy> item = [factory getDummyByID:defID];
    return js_Dummy_setSimpleStringProperty_Obj(argv, item, strCallbackID, strJsVmID, strCallbackParam);
}







@interface Dummy_enumerate_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<IDummySingleton> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(Dummy_enumerate_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummySingleton>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation Dummy_enumerate_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(Dummy_enumerate_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummySingleton>)_item _methodResult:(CMethodResult*)_methodResult {
    Dummy_enumerate_caller_params* par = [[[Dummy_enumerate_caller_params alloc] init] autorelease];
    par.params = _params;
    par.item = _item;
    par.methodResult = [_methodResult retain];
    return [par retain];
}

@end


@interface Dummy_enumerate_caller : NSObject {

}
+(Dummy_enumerate_caller*) getSharedInstance;
+(void) enumerate:(Dummy_enumerate_caller_params*)caller_params;
+(void) enumerate_in_thread:(Dummy_enumerate_caller_params*)caller_params;
+(void) enumerate_in_UI_thread:(Dummy_enumerate_caller_params*)caller_params;

@end

static Dummy_enumerate_caller* our_Dummy_enumerate_caller = nil;

@implementation Dummy_enumerate_caller

+(Dummy_enumerate_caller*) getSharedInstance {
    if (our_Dummy_enumerate_caller == nil) {
        our_Dummy_enumerate_caller = [[Dummy_enumerate_caller alloc] init];
    }
    return our_Dummy_enumerate_caller;
}

-(void) command_enumerate:(Dummy_enumerate_caller_params*)caller_params {

    id<IDummySingleton> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem enumerate:methodResult ];
    [caller_params.methodResult release];
    [caller_params release];
}


+(void) enumerate:(Dummy_enumerate_caller_params*)caller_params {
    [[Dummy_enumerate_caller getSharedInstance] command_enumerate:caller_params];
}

+(void) enumerate_in_thread:(Dummy_enumerate_caller_params*)caller_params {
    [[Dummy_enumerate_caller getSharedInstance] performSelectorInBackground:@selector(command_enumerate:) withObject:caller_params];
}

+(void) enumerate_in_UI_thread:(Dummy_enumerate_caller_params*)caller_params {
    [[Dummy_enumerate_caller getSharedInstance] performSelectorOnMainThread:@selector(command_enumerate:) withObject:caller_params waitUntilDone:NO];
}


@end


rho::String js_Dummy_enumerate_Obj(rho::json::CJSONArray& argv, id<IDummySingleton>objItem, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[0+1];
    BOOL method_return_result = YES;
    BOOL method_receive_callback = NO;
    int argc = argv.getSize();


    [methodResult setMethodSignature:@"Dummy::enumerate"];

    
    static RHO_API_PARAM rho_api_params[] = {  };

    
    BOOL is_factory_param[] = { NO };

    int i;

    // init
    for (i = 0; i < (0); i++) {
        params[i] = [CJSConverter getObjectiveCNULL];
    }

    

    // enumerate params
    for (int i = 0; i < (0); i++) {
        if (argc > i) {
            // we have a [i] param !
            if (is_factory_param[i]) {
                params[i] = Dummy_makeInstanceByJSObject(argv.getItem(i).getString());
            }
            else {
                rho::json::CJSONEntry entry = argv.getItem(i);
                params[i] = [[CJSConverter convertFromJS:&entry rho_api_param:&(rho_api_params[i])] retain];
            }
            // TODO: Handle CMethodResultError
            if (params[i] == nil) {
                NSLog(@"Dummy::enumerate parameter %d is nil!", i);
                rho::String resValue = rho::String("\"result\":null,\"error\":\"Method parameter is nil!\"");
                return resValue;
            }
        }
    }

    NSMutableArray* params_array = [NSMutableArray arrayWithCapacity:(0)];
    for (i = 0 ; i < (0); i++) {
        [params_array addObject:params[i]];
    }

    
        if (strCallbackID.size() > 0) {
            method_receive_callback = YES;
        }
    

    [methodResult enableObjectCreationModeWithJSClassPath:@"Rho.Dummy"];

    if (method_receive_callback) {
        // we have callback - method should not call setResult if method execute from current thread - only later or in UI or separated threads !!!
        [methodResult setJSCallback:[NSString stringWithUTF8String:strCallbackID.c_str()] webViewUID:[NSString stringWithUTF8String:strJsVmID.c_str()]];
        [methodResult setCallbackParam:[NSString stringWithUTF8String:strCallbackParam.c_str()]];
        
        [Dummy_enumerate_caller enumerate_in_thread:[Dummy_enumerate_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        

        // FIXME: callback should not be retained, it must be saved outside of this call
        [methodResult retain];
    }
    else {
        // we do not have callback
        
        [Dummy_enumerate_caller enumerate:[Dummy_enumerate_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    rho::String resValue = rho::String("\"result\":null");
    if ((!method_receive_callback) && (method_return_result)) {
        resValue = [[methodResult toJSON] UTF8String];
    }
    [methodResult release];
    return resValue;
}


rho::String js_s_Dummy_enumerate(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    id<IDummyFactory> factory = [DummyFactorySingleton getDummyFactoryInstance];
    id<IDummySingleton> singleton = [factory getDummySingleton];
    return js_Dummy_enumerate_Obj(argv, singleton, strCallbackID, strJsVmID, strCallbackParam);

}







@interface Dummy_getPlatformName_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<IDummy> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(Dummy_getPlatformName_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation Dummy_getPlatformName_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(Dummy_getPlatformName_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult {
    Dummy_getPlatformName_caller_params* par = [[[Dummy_getPlatformName_caller_params alloc] init] autorelease];
    par.params = _params;
    par.item = _item;
    par.methodResult = [_methodResult retain];
    return [par retain];
}

@end


@interface Dummy_getPlatformName_caller : NSObject {

}
+(Dummy_getPlatformName_caller*) getSharedInstance;
+(void) getPlatformName:(Dummy_getPlatformName_caller_params*)caller_params;
+(void) getPlatformName_in_thread:(Dummy_getPlatformName_caller_params*)caller_params;
+(void) getPlatformName_in_UI_thread:(Dummy_getPlatformName_caller_params*)caller_params;

@end

static Dummy_getPlatformName_caller* our_Dummy_getPlatformName_caller = nil;

@implementation Dummy_getPlatformName_caller

+(Dummy_getPlatformName_caller*) getSharedInstance {
    if (our_Dummy_getPlatformName_caller == nil) {
        our_Dummy_getPlatformName_caller = [[Dummy_getPlatformName_caller alloc] init];
    }
    return our_Dummy_getPlatformName_caller;
}

-(void) command_getPlatformName:(Dummy_getPlatformName_caller_params*)caller_params {

    id<IDummy> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem getPlatformName:methodResult ];
    [caller_params.methodResult release];
    [caller_params release];
}


+(void) getPlatformName:(Dummy_getPlatformName_caller_params*)caller_params {
    [[Dummy_getPlatformName_caller getSharedInstance] command_getPlatformName:caller_params];
}

+(void) getPlatformName_in_thread:(Dummy_getPlatformName_caller_params*)caller_params {
    [[Dummy_getPlatformName_caller getSharedInstance] performSelectorInBackground:@selector(command_getPlatformName:) withObject:caller_params];
}

+(void) getPlatformName_in_UI_thread:(Dummy_getPlatformName_caller_params*)caller_params {
    [[Dummy_getPlatformName_caller getSharedInstance] performSelectorOnMainThread:@selector(command_getPlatformName:) withObject:caller_params waitUntilDone:NO];
}


@end


rho::String js_Dummy_getPlatformName_Obj(rho::json::CJSONArray& argv, id<IDummy>objItem, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[0+1];
    BOOL method_return_result = YES;
    BOOL method_receive_callback = NO;
    int argc = argv.getSize();


    [methodResult setMethodSignature:@"Dummy::getPlatformName"];

    
    static RHO_API_PARAM rho_api_params[] = {  };

    
    BOOL is_factory_param[] = { NO };

    int i;

    // init
    for (i = 0; i < (0); i++) {
        params[i] = [CJSConverter getObjectiveCNULL];
    }

    

    // enumerate params
    for (int i = 0; i < (0); i++) {
        if (argc > i) {
            // we have a [i] param !
            if (is_factory_param[i]) {
                params[i] = Dummy_makeInstanceByJSObject(argv.getItem(i).getString());
            }
            else {
                rho::json::CJSONEntry entry = argv.getItem(i);
                params[i] = [[CJSConverter convertFromJS:&entry rho_api_param:&(rho_api_params[i])] retain];
            }
            // TODO: Handle CMethodResultError
            if (params[i] == nil) {
                NSLog(@"Dummy::getPlatformName parameter %d is nil!", i);
                rho::String resValue = rho::String("\"result\":null,\"error\":\"Method parameter is nil!\"");
                return resValue;
            }
        }
    }

    NSMutableArray* params_array = [NSMutableArray arrayWithCapacity:(0)];
    for (i = 0 ; i < (0); i++) {
        [params_array addObject:params[i]];
    }

    
        if (strCallbackID.size() > 0) {
            method_receive_callback = YES;
        }
    

    

    if (method_receive_callback) {
        // we have callback - method should not call setResult if method execute from current thread - only later or in UI or separated threads !!!
        [methodResult setJSCallback:[NSString stringWithUTF8String:strCallbackID.c_str()] webViewUID:[NSString stringWithUTF8String:strJsVmID.c_str()]];
        [methodResult setCallbackParam:[NSString stringWithUTF8String:strCallbackParam.c_str()]];
        
        [Dummy_getPlatformName_caller getPlatformName_in_thread:[Dummy_getPlatformName_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        

        // FIXME: callback should not be retained, it must be saved outside of this call
        [methodResult retain];
    }
    else {
        // we do not have callback
        
        [Dummy_getPlatformName_caller getPlatformName:[Dummy_getPlatformName_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    rho::String resValue = rho::String("\"result\":null");
    if ((!method_receive_callback) && (method_return_result)) {
        resValue = [[methodResult toJSON] UTF8String];
    }
    [methodResult release];
    return resValue;
}


rho::String js_Dummy_getPlatformName(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    id<IDummy> item = Dummy_makeInstanceByJSObject(strObjID);
    return js_Dummy_getPlatformName_Obj(argv, item, strCallbackID, strJsVmID, strCallbackParam);

}

rho::String js_s_Dummy_def_getPlatformName(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {
    id<IDummyFactory> factory = [DummyFactorySingleton getDummyFactoryInstance];
    id<IDummySingleton> singleton = [factory getDummySingleton];

    NSString* defID = [singleton getDefaultID];

    id<IDummy> item = [factory getDummyByID:defID];
    return js_Dummy_getPlatformName_Obj(argv, item, strCallbackID, strJsVmID, strCallbackParam);
}







@interface Dummy_calcSumm_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<IDummy> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(Dummy_calcSumm_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation Dummy_calcSumm_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(Dummy_calcSumm_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult {
    Dummy_calcSumm_caller_params* par = [[[Dummy_calcSumm_caller_params alloc] init] autorelease];
    par.params = _params;
    par.item = _item;
    par.methodResult = [_methodResult retain];
    return [par retain];
}

@end


@interface Dummy_calcSumm_caller : NSObject {

}
+(Dummy_calcSumm_caller*) getSharedInstance;
+(void) calcSumm:(Dummy_calcSumm_caller_params*)caller_params;
+(void) calcSumm_in_thread:(Dummy_calcSumm_caller_params*)caller_params;
+(void) calcSumm_in_UI_thread:(Dummy_calcSumm_caller_params*)caller_params;

@end

static Dummy_calcSumm_caller* our_Dummy_calcSumm_caller = nil;

@implementation Dummy_calcSumm_caller

+(Dummy_calcSumm_caller*) getSharedInstance {
    if (our_Dummy_calcSumm_caller == nil) {
        our_Dummy_calcSumm_caller = [[Dummy_calcSumm_caller alloc] init];
    }
    return our_Dummy_calcSumm_caller;
}

-(void) command_calcSumm:(Dummy_calcSumm_caller_params*)caller_params {

    NSArray* params = caller_params.params;

    id<IDummy> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem calcSumm:(int)[((NSNumber*)[params objectAtIndex:0]) intValue] b:(int)[((NSNumber*)[params objectAtIndex:1]) intValue] methodResult:methodResult ];
    [caller_params.methodResult release];
    [caller_params release];
}


+(void) calcSumm:(Dummy_calcSumm_caller_params*)caller_params {
    [[Dummy_calcSumm_caller getSharedInstance] command_calcSumm:caller_params];
}

+(void) calcSumm_in_thread:(Dummy_calcSumm_caller_params*)caller_params {
    [[Dummy_calcSumm_caller getSharedInstance] performSelectorInBackground:@selector(command_calcSumm:) withObject:caller_params];
}

+(void) calcSumm_in_UI_thread:(Dummy_calcSumm_caller_params*)caller_params {
    [[Dummy_calcSumm_caller getSharedInstance] performSelectorOnMainThread:@selector(command_calcSumm:) withObject:caller_params waitUntilDone:NO];
}


@end


rho::String js_Dummy_calcSumm_Obj(rho::json::CJSONArray& argv, id<IDummy>objItem, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[2+1];
    BOOL method_return_result = YES;
    BOOL method_receive_callback = NO;
    int argc = argv.getSize();


    [methodResult setMethodSignature:@"Dummy::calcSumm"];

    
    static RHO_API_PARAM rho_api_params[] = { {RHO_API_INTEGER, 0, "a", 0, 0 }, {RHO_API_INTEGER, 0, "b", 0, 0 } };

    
    BOOL is_factory_param[] = { NO, NO, NO };

    int i;

    // init
    for (i = 0; i < (2); i++) {
        params[i] = [CJSConverter getObjectiveCNULL];
    }

    

    // enumerate params
    for (int i = 0; i < (2); i++) {
        if (argc > i) {
            // we have a [i] param !
            if (is_factory_param[i]) {
                params[i] = Dummy_makeInstanceByJSObject(argv.getItem(i).getString());
            }
            else {
                rho::json::CJSONEntry entry = argv.getItem(i);
                params[i] = [[CJSConverter convertFromJS:&entry rho_api_param:&(rho_api_params[i])] retain];
            }
            // TODO: Handle CMethodResultError
            if (params[i] == nil) {
                NSLog(@"Dummy::calcSumm parameter %d is nil!", i);
                rho::String resValue = rho::String("\"result\":null,\"error\":\"Method parameter is nil!\"");
                return resValue;
            }
        }
    }

    NSMutableArray* params_array = [NSMutableArray arrayWithCapacity:(2)];
    for (i = 0 ; i < (2); i++) {
        [params_array addObject:params[i]];
    }

    
        if (strCallbackID.size() > 0) {
            method_receive_callback = YES;
        }
    

    

    if (method_receive_callback) {
        // we have callback - method should not call setResult if method execute from current thread - only later or in UI or separated threads !!!
        [methodResult setJSCallback:[NSString stringWithUTF8String:strCallbackID.c_str()] webViewUID:[NSString stringWithUTF8String:strJsVmID.c_str()]];
        [methodResult setCallbackParam:[NSString stringWithUTF8String:strCallbackParam.c_str()]];
        
        [Dummy_calcSumm_caller calcSumm_in_thread:[Dummy_calcSumm_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        

        // FIXME: callback should not be retained, it must be saved outside of this call
        [methodResult retain];
    }
    else {
        // we do not have callback
        
        [Dummy_calcSumm_caller calcSumm:[Dummy_calcSumm_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    rho::String resValue = rho::String("\"result\":null");
    if ((!method_receive_callback) && (method_return_result)) {
        resValue = [[methodResult toJSON] UTF8String];
    }
    [methodResult release];
    return resValue;
}


rho::String js_Dummy_calcSumm(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    id<IDummy> item = Dummy_makeInstanceByJSObject(strObjID);
    return js_Dummy_calcSumm_Obj(argv, item, strCallbackID, strJsVmID, strCallbackParam);

}

rho::String js_s_Dummy_def_calcSumm(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {
    id<IDummyFactory> factory = [DummyFactorySingleton getDummyFactoryInstance];
    id<IDummySingleton> singleton = [factory getDummySingleton];

    NSString* defID = [singleton getDefaultID];

    id<IDummy> item = [factory getDummyByID:defID];
    return js_Dummy_calcSumm_Obj(argv, item, strCallbackID, strJsVmID, strCallbackParam);
}







@interface Dummy_joinStrings_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<IDummy> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(Dummy_joinStrings_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation Dummy_joinStrings_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(Dummy_joinStrings_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult {
    Dummy_joinStrings_caller_params* par = [[[Dummy_joinStrings_caller_params alloc] init] autorelease];
    par.params = _params;
    par.item = _item;
    par.methodResult = [_methodResult retain];
    return [par retain];
}

@end


@interface Dummy_joinStrings_caller : NSObject {

}
+(Dummy_joinStrings_caller*) getSharedInstance;
+(void) joinStrings:(Dummy_joinStrings_caller_params*)caller_params;
+(void) joinStrings_in_thread:(Dummy_joinStrings_caller_params*)caller_params;
+(void) joinStrings_in_UI_thread:(Dummy_joinStrings_caller_params*)caller_params;

@end

static Dummy_joinStrings_caller* our_Dummy_joinStrings_caller = nil;

@implementation Dummy_joinStrings_caller

+(Dummy_joinStrings_caller*) getSharedInstance {
    if (our_Dummy_joinStrings_caller == nil) {
        our_Dummy_joinStrings_caller = [[Dummy_joinStrings_caller alloc] init];
    }
    return our_Dummy_joinStrings_caller;
}

-(void) command_joinStrings:(Dummy_joinStrings_caller_params*)caller_params {

    NSArray* params = caller_params.params;

    id<IDummy> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem joinStrings:(NSString*)[params objectAtIndex:0] b:(NSString*)[params objectAtIndex:1] methodResult:methodResult ];
    [caller_params.methodResult release];
    [caller_params release];
}


+(void) joinStrings:(Dummy_joinStrings_caller_params*)caller_params {
    [[Dummy_joinStrings_caller getSharedInstance] command_joinStrings:caller_params];
}

+(void) joinStrings_in_thread:(Dummy_joinStrings_caller_params*)caller_params {
    [[Dummy_joinStrings_caller getSharedInstance] performSelectorInBackground:@selector(command_joinStrings:) withObject:caller_params];
}

+(void) joinStrings_in_UI_thread:(Dummy_joinStrings_caller_params*)caller_params {
    [[Dummy_joinStrings_caller getSharedInstance] performSelectorOnMainThread:@selector(command_joinStrings:) withObject:caller_params waitUntilDone:NO];
}


@end


rho::String js_Dummy_joinStrings_Obj(rho::json::CJSONArray& argv, id<IDummy>objItem, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[2+1];
    BOOL method_return_result = YES;
    BOOL method_receive_callback = NO;
    int argc = argv.getSize();


    [methodResult setMethodSignature:@"Dummy::joinStrings"];

    
    static RHO_API_PARAM rho_api_params[] = { {RHO_API_STRING, 0, "a", 0, 0 }, {RHO_API_STRING, 0, "b", 0, 0 } };

    
    BOOL is_factory_param[] = { NO, NO, NO };

    int i;

    // init
    for (i = 0; i < (2); i++) {
        params[i] = [CJSConverter getObjectiveCNULL];
    }

    

    // enumerate params
    for (int i = 0; i < (2); i++) {
        if (argc > i) {
            // we have a [i] param !
            if (is_factory_param[i]) {
                params[i] = Dummy_makeInstanceByJSObject(argv.getItem(i).getString());
            }
            else {
                rho::json::CJSONEntry entry = argv.getItem(i);
                params[i] = [[CJSConverter convertFromJS:&entry rho_api_param:&(rho_api_params[i])] retain];
            }
            // TODO: Handle CMethodResultError
            if (params[i] == nil) {
                NSLog(@"Dummy::joinStrings parameter %d is nil!", i);
                rho::String resValue = rho::String("\"result\":null,\"error\":\"Method parameter is nil!\"");
                return resValue;
            }
        }
    }

    NSMutableArray* params_array = [NSMutableArray arrayWithCapacity:(2)];
    for (i = 0 ; i < (2); i++) {
        [params_array addObject:params[i]];
    }

    
        if (strCallbackID.size() > 0) {
            method_receive_callback = YES;
        }
    

    

    if (method_receive_callback) {
        // we have callback - method should not call setResult if method execute from current thread - only later or in UI or separated threads !!!
        [methodResult setJSCallback:[NSString stringWithUTF8String:strCallbackID.c_str()] webViewUID:[NSString stringWithUTF8String:strJsVmID.c_str()]];
        [methodResult setCallbackParam:[NSString stringWithUTF8String:strCallbackParam.c_str()]];
        
        [Dummy_joinStrings_caller joinStrings_in_thread:[Dummy_joinStrings_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        

        // FIXME: callback should not be retained, it must be saved outside of this call
        [methodResult retain];
    }
    else {
        // we do not have callback
        
        [Dummy_joinStrings_caller joinStrings:[Dummy_joinStrings_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    rho::String resValue = rho::String("\"result\":null");
    if ((!method_receive_callback) && (method_return_result)) {
        resValue = [[methodResult toJSON] UTF8String];
    }
    [methodResult release];
    return resValue;
}


rho::String js_Dummy_joinStrings(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    id<IDummy> item = Dummy_makeInstanceByJSObject(strObjID);
    return js_Dummy_joinStrings_Obj(argv, item, strCallbackID, strJsVmID, strCallbackParam);

}

rho::String js_s_Dummy_def_joinStrings(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {
    id<IDummyFactory> factory = [DummyFactorySingleton getDummyFactoryInstance];
    id<IDummySingleton> singleton = [factory getDummySingleton];

    NSString* defID = [singleton getDefaultID];

    id<IDummy> item = [factory getDummyByID:defID];
    return js_Dummy_joinStrings_Obj(argv, item, strCallbackID, strJsVmID, strCallbackParam);
}







@interface Dummy_enable_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<IDummy> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(Dummy_enable_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation Dummy_enable_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(Dummy_enable_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult {
    Dummy_enable_caller_params* par = [[[Dummy_enable_caller_params alloc] init] autorelease];
    par.params = _params;
    par.item = _item;
    par.methodResult = [_methodResult retain];
    return [par retain];
}

@end


@interface Dummy_enable_caller : NSObject {

}
+(Dummy_enable_caller*) getSharedInstance;
+(void) enable:(Dummy_enable_caller_params*)caller_params;
+(void) enable_in_thread:(Dummy_enable_caller_params*)caller_params;
+(void) enable_in_UI_thread:(Dummy_enable_caller_params*)caller_params;

@end

static Dummy_enable_caller* our_Dummy_enable_caller = nil;

@implementation Dummy_enable_caller

+(Dummy_enable_caller*) getSharedInstance {
    if (our_Dummy_enable_caller == nil) {
        our_Dummy_enable_caller = [[Dummy_enable_caller alloc] init];
    }
    return our_Dummy_enable_caller;
}

-(void) command_enable:(Dummy_enable_caller_params*)caller_params {

    NSArray* params = caller_params.params;

    id<IDummy> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem enable:(int)[((NSNumber*)[params objectAtIndex:0]) intValue] methodResult:methodResult ];
    [caller_params.methodResult release];
    [caller_params release];
}


+(void) enable:(Dummy_enable_caller_params*)caller_params {
    [[Dummy_enable_caller getSharedInstance] command_enable:caller_params];
}

+(void) enable_in_thread:(Dummy_enable_caller_params*)caller_params {
    [[Dummy_enable_caller getSharedInstance] performSelectorInBackground:@selector(command_enable:) withObject:caller_params];
}

+(void) enable_in_UI_thread:(Dummy_enable_caller_params*)caller_params {
    [[Dummy_enable_caller getSharedInstance] performSelectorOnMainThread:@selector(command_enable:) withObject:caller_params waitUntilDone:NO];
}


@end


rho::String js_Dummy_enable_Obj(rho::json::CJSONArray& argv, id<IDummy>objItem, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[1+1];
    BOOL method_return_result = YES;
    BOOL method_receive_callback = NO;
    int argc = argv.getSize();


    [methodResult setMethodSignature:@"Dummy::enable"];

    
    static RHO_API_PARAM rho_api_params[] = { {RHO_API_INTEGER, 0, "firingInterval", 0, 0 } };

    
    BOOL is_factory_param[] = { NO, NO };

    int i;

    // init
    for (i = 0; i < (1); i++) {
        params[i] = [CJSConverter getObjectiveCNULL];
    }

    

    // enumerate params
    for (int i = 0; i < (1); i++) {
        if (argc > i) {
            // we have a [i] param !
            if (is_factory_param[i]) {
                params[i] = Dummy_makeInstanceByJSObject(argv.getItem(i).getString());
            }
            else {
                rho::json::CJSONEntry entry = argv.getItem(i);
                params[i] = [[CJSConverter convertFromJS:&entry rho_api_param:&(rho_api_params[i])] retain];
            }
            // TODO: Handle CMethodResultError
            if (params[i] == nil) {
                NSLog(@"Dummy::enable parameter %d is nil!", i);
                rho::String resValue = rho::String("\"result\":null,\"error\":\"Method parameter is nil!\"");
                return resValue;
            }
        }
    }

    NSMutableArray* params_array = [NSMutableArray arrayWithCapacity:(1)];
    for (i = 0 ; i < (1); i++) {
        [params_array addObject:params[i]];
    }

    
        if (strCallbackID.size() > 0) {
            method_receive_callback = YES;
        }
    

    

    if (method_receive_callback) {
        // we have callback - method should not call setResult if method execute from current thread - only later or in UI or separated threads !!!
        [methodResult setJSCallback:[NSString stringWithUTF8String:strCallbackID.c_str()] webViewUID:[NSString stringWithUTF8String:strJsVmID.c_str()]];
        [methodResult setCallbackParam:[NSString stringWithUTF8String:strCallbackParam.c_str()]];
        
        [Dummy_enable_caller enable_in_thread:[Dummy_enable_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        

        // FIXME: callback should not be retained, it must be saved outside of this call
        [methodResult retain];
    }
    else {
        // we do not have callback
        
        [Dummy_enable_caller enable:[Dummy_enable_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    rho::String resValue = rho::String("\"result\":null");
    if ((!method_receive_callback) && (method_return_result)) {
        resValue = [[methodResult toJSON] UTF8String];
    }
    [methodResult release];
    return resValue;
}


rho::String js_Dummy_enable(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    id<IDummy> item = Dummy_makeInstanceByJSObject(strObjID);
    return js_Dummy_enable_Obj(argv, item, strCallbackID, strJsVmID, strCallbackParam);

}

rho::String js_s_Dummy_def_enable(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {
    id<IDummyFactory> factory = [DummyFactorySingleton getDummyFactoryInstance];
    id<IDummySingleton> singleton = [factory getDummySingleton];

    NSString* defID = [singleton getDefaultID];

    id<IDummy> item = [factory getDummyByID:defID];
    return js_Dummy_enable_Obj(argv, item, strCallbackID, strJsVmID, strCallbackParam);
}







@interface Dummy_enable_Int_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<IDummy> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(Dummy_enable_Int_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation Dummy_enable_Int_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(Dummy_enable_Int_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult {
    Dummy_enable_Int_caller_params* par = [[[Dummy_enable_Int_caller_params alloc] init] autorelease];
    par.params = _params;
    par.item = _item;
    par.methodResult = [_methodResult retain];
    return [par retain];
}

@end


@interface Dummy_enable_Int_caller : NSObject {

}
+(Dummy_enable_Int_caller*) getSharedInstance;
+(void) enable_Int:(Dummy_enable_Int_caller_params*)caller_params;
+(void) enable_Int_in_thread:(Dummy_enable_Int_caller_params*)caller_params;
+(void) enable_Int_in_UI_thread:(Dummy_enable_Int_caller_params*)caller_params;

@end

static Dummy_enable_Int_caller* our_Dummy_enable_Int_caller = nil;

@implementation Dummy_enable_Int_caller

+(Dummy_enable_Int_caller*) getSharedInstance {
    if (our_Dummy_enable_Int_caller == nil) {
        our_Dummy_enable_Int_caller = [[Dummy_enable_Int_caller alloc] init];
    }
    return our_Dummy_enable_Int_caller;
}

-(void) command_enable_Int:(Dummy_enable_Int_caller_params*)caller_params {

    NSArray* params = caller_params.params;

    id<IDummy> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem enable_Int:(int)[((NSNumber*)[params objectAtIndex:0]) intValue] methodResult:methodResult ];
    [caller_params.methodResult release];
    [caller_params release];
}


+(void) enable_Int:(Dummy_enable_Int_caller_params*)caller_params {
    [[Dummy_enable_Int_caller getSharedInstance] command_enable_Int:caller_params];
}

+(void) enable_Int_in_thread:(Dummy_enable_Int_caller_params*)caller_params {
    [[Dummy_enable_Int_caller getSharedInstance] performSelectorInBackground:@selector(command_enable_Int:) withObject:caller_params];
}

+(void) enable_Int_in_UI_thread:(Dummy_enable_Int_caller_params*)caller_params {
    [[Dummy_enable_Int_caller getSharedInstance] performSelectorOnMainThread:@selector(command_enable_Int:) withObject:caller_params waitUntilDone:NO];
}


@end


rho::String js_Dummy_enable_Int_Obj(rho::json::CJSONArray& argv, id<IDummy>objItem, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[1+1];
    BOOL method_return_result = YES;
    BOOL method_receive_callback = NO;
    int argc = argv.getSize();


    [methodResult setMethodSignature:@"Dummy::enable_Int"];

    
    static RHO_API_PARAM rho_api_params[] = { {RHO_API_INTEGER, 0, "firingInterval", 0, 0 } };

    
    BOOL is_factory_param[] = { NO, NO };

    int i;

    // init
    for (i = 0; i < (1); i++) {
        params[i] = [CJSConverter getObjectiveCNULL];
    }

    

    // enumerate params
    for (int i = 0; i < (1); i++) {
        if (argc > i) {
            // we have a [i] param !
            if (is_factory_param[i]) {
                params[i] = Dummy_makeInstanceByJSObject(argv.getItem(i).getString());
            }
            else {
                rho::json::CJSONEntry entry = argv.getItem(i);
                params[i] = [[CJSConverter convertFromJS:&entry rho_api_param:&(rho_api_params[i])] retain];
            }
            // TODO: Handle CMethodResultError
            if (params[i] == nil) {
                NSLog(@"Dummy::enable_Int parameter %d is nil!", i);
                rho::String resValue = rho::String("\"result\":null,\"error\":\"Method parameter is nil!\"");
                return resValue;
            }
        }
    }

    NSMutableArray* params_array = [NSMutableArray arrayWithCapacity:(1)];
    for (i = 0 ; i < (1); i++) {
        [params_array addObject:params[i]];
    }

    
        if (strCallbackID.size() > 0) {
            method_receive_callback = YES;
        }
    

    

    if (method_receive_callback) {
        // we have callback - method should not call setResult if method execute from current thread - only later or in UI or separated threads !!!
        [methodResult setJSCallback:[NSString stringWithUTF8String:strCallbackID.c_str()] webViewUID:[NSString stringWithUTF8String:strJsVmID.c_str()]];
        [methodResult setCallbackParam:[NSString stringWithUTF8String:strCallbackParam.c_str()]];
        
        [Dummy_enable_Int_caller enable_Int_in_thread:[Dummy_enable_Int_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        

        // FIXME: callback should not be retained, it must be saved outside of this call
        [methodResult retain];
    }
    else {
        // we do not have callback
        
        [Dummy_enable_Int_caller enable_Int:[Dummy_enable_Int_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    rho::String resValue = rho::String("\"result\":null");
    if ((!method_receive_callback) && (method_return_result)) {
        resValue = [[methodResult toJSON] UTF8String];
    }
    [methodResult release];
    return resValue;
}


rho::String js_Dummy_enable_Int(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    id<IDummy> item = Dummy_makeInstanceByJSObject(strObjID);
    return js_Dummy_enable_Int_Obj(argv, item, strCallbackID, strJsVmID, strCallbackParam);

}

rho::String js_s_Dummy_def_enable_Int(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {
    id<IDummyFactory> factory = [DummyFactorySingleton getDummyFactoryInstance];
    id<IDummySingleton> singleton = [factory getDummySingleton];

    NSString* defID = [singleton getDefaultID];

    id<IDummy> item = [factory getDummyByID:defID];
    return js_Dummy_enable_Int_Obj(argv, item, strCallbackID, strJsVmID, strCallbackParam);
}







@interface Dummy_enable_str_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<IDummy> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(Dummy_enable_str_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation Dummy_enable_str_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(Dummy_enable_str_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult {
    Dummy_enable_str_caller_params* par = [[[Dummy_enable_str_caller_params alloc] init] autorelease];
    par.params = _params;
    par.item = _item;
    par.methodResult = [_methodResult retain];
    return [par retain];
}

@end


@interface Dummy_enable_str_caller : NSObject {

}
+(Dummy_enable_str_caller*) getSharedInstance;
+(void) enable_str:(Dummy_enable_str_caller_params*)caller_params;
+(void) enable_str_in_thread:(Dummy_enable_str_caller_params*)caller_params;
+(void) enable_str_in_UI_thread:(Dummy_enable_str_caller_params*)caller_params;

@end

static Dummy_enable_str_caller* our_Dummy_enable_str_caller = nil;

@implementation Dummy_enable_str_caller

+(Dummy_enable_str_caller*) getSharedInstance {
    if (our_Dummy_enable_str_caller == nil) {
        our_Dummy_enable_str_caller = [[Dummy_enable_str_caller alloc] init];
    }
    return our_Dummy_enable_str_caller;
}

-(void) command_enable_str:(Dummy_enable_str_caller_params*)caller_params {

    NSArray* params = caller_params.params;

    id<IDummy> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem enable_str:(int)[((NSNumber*)[params objectAtIndex:0]) intValue] methodResult:methodResult ];
    [caller_params.methodResult release];
    [caller_params release];
}


+(void) enable_str:(Dummy_enable_str_caller_params*)caller_params {
    [[Dummy_enable_str_caller getSharedInstance] command_enable_str:caller_params];
}

+(void) enable_str_in_thread:(Dummy_enable_str_caller_params*)caller_params {
    [[Dummy_enable_str_caller getSharedInstance] performSelectorInBackground:@selector(command_enable_str:) withObject:caller_params];
}

+(void) enable_str_in_UI_thread:(Dummy_enable_str_caller_params*)caller_params {
    [[Dummy_enable_str_caller getSharedInstance] performSelectorOnMainThread:@selector(command_enable_str:) withObject:caller_params waitUntilDone:NO];
}


@end


rho::String js_Dummy_enable_str_Obj(rho::json::CJSONArray& argv, id<IDummy>objItem, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[1+1];
    BOOL method_return_result = YES;
    BOOL method_receive_callback = NO;
    int argc = argv.getSize();


    [methodResult setMethodSignature:@"Dummy::enable_str"];

    
    static RHO_API_PARAM rho_api_params[] = { {RHO_API_INTEGER, 0, "firingInterval", 0, 0 } };

    
    BOOL is_factory_param[] = { NO, NO };

    int i;

    // init
    for (i = 0; i < (1); i++) {
        params[i] = [CJSConverter getObjectiveCNULL];
    }

    

    // enumerate params
    for (int i = 0; i < (1); i++) {
        if (argc > i) {
            // we have a [i] param !
            if (is_factory_param[i]) {
                params[i] = Dummy_makeInstanceByJSObject(argv.getItem(i).getString());
            }
            else {
                rho::json::CJSONEntry entry = argv.getItem(i);
                params[i] = [[CJSConverter convertFromJS:&entry rho_api_param:&(rho_api_params[i])] retain];
            }
            // TODO: Handle CMethodResultError
            if (params[i] == nil) {
                NSLog(@"Dummy::enable_str parameter %d is nil!", i);
                rho::String resValue = rho::String("\"result\":null,\"error\":\"Method parameter is nil!\"");
                return resValue;
            }
        }
    }

    NSMutableArray* params_array = [NSMutableArray arrayWithCapacity:(1)];
    for (i = 0 ; i < (1); i++) {
        [params_array addObject:params[i]];
    }

    
        if (strCallbackID.size() > 0) {
            method_receive_callback = YES;
        }
    

    

    if (method_receive_callback) {
        // we have callback - method should not call setResult if method execute from current thread - only later or in UI or separated threads !!!
        [methodResult setJSCallback:[NSString stringWithUTF8String:strCallbackID.c_str()] webViewUID:[NSString stringWithUTF8String:strJsVmID.c_str()]];
        [methodResult setCallbackParam:[NSString stringWithUTF8String:strCallbackParam.c_str()]];
        
        [Dummy_enable_str_caller enable_str_in_thread:[Dummy_enable_str_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        

        // FIXME: callback should not be retained, it must be saved outside of this call
        [methodResult retain];
    }
    else {
        // we do not have callback
        
        [Dummy_enable_str_caller enable_str:[Dummy_enable_str_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    rho::String resValue = rho::String("\"result\":null");
    if ((!method_receive_callback) && (method_return_result)) {
        resValue = [[methodResult toJSON] UTF8String];
    }
    [methodResult release];
    return resValue;
}


rho::String js_Dummy_enable_str(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    id<IDummy> item = Dummy_makeInstanceByJSObject(strObjID);
    return js_Dummy_enable_str_Obj(argv, item, strCallbackID, strJsVmID, strCallbackParam);

}

rho::String js_s_Dummy_def_enable_str(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {
    id<IDummyFactory> factory = [DummyFactorySingleton getDummyFactoryInstance];
    id<IDummySingleton> singleton = [factory getDummySingleton];

    NSString* defID = [singleton getDefaultID];

    id<IDummy> item = [factory getDummyByID:defID];
    return js_Dummy_enable_str_Obj(argv, item, strCallbackID, strJsVmID, strCallbackParam);
}







@interface Dummy_enable_bool_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<IDummy> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(Dummy_enable_bool_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation Dummy_enable_bool_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(Dummy_enable_bool_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult {
    Dummy_enable_bool_caller_params* par = [[[Dummy_enable_bool_caller_params alloc] init] autorelease];
    par.params = _params;
    par.item = _item;
    par.methodResult = [_methodResult retain];
    return [par retain];
}

@end


@interface Dummy_enable_bool_caller : NSObject {

}
+(Dummy_enable_bool_caller*) getSharedInstance;
+(void) enable_bool:(Dummy_enable_bool_caller_params*)caller_params;
+(void) enable_bool_in_thread:(Dummy_enable_bool_caller_params*)caller_params;
+(void) enable_bool_in_UI_thread:(Dummy_enable_bool_caller_params*)caller_params;

@end

static Dummy_enable_bool_caller* our_Dummy_enable_bool_caller = nil;

@implementation Dummy_enable_bool_caller

+(Dummy_enable_bool_caller*) getSharedInstance {
    if (our_Dummy_enable_bool_caller == nil) {
        our_Dummy_enable_bool_caller = [[Dummy_enable_bool_caller alloc] init];
    }
    return our_Dummy_enable_bool_caller;
}

-(void) command_enable_bool:(Dummy_enable_bool_caller_params*)caller_params {

    NSArray* params = caller_params.params;

    id<IDummy> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem enable_bool:(int)[((NSNumber*)[params objectAtIndex:0]) intValue] methodResult:methodResult ];
    [caller_params.methodResult release];
    [caller_params release];
}


+(void) enable_bool:(Dummy_enable_bool_caller_params*)caller_params {
    [[Dummy_enable_bool_caller getSharedInstance] command_enable_bool:caller_params];
}

+(void) enable_bool_in_thread:(Dummy_enable_bool_caller_params*)caller_params {
    [[Dummy_enable_bool_caller getSharedInstance] performSelectorInBackground:@selector(command_enable_bool:) withObject:caller_params];
}

+(void) enable_bool_in_UI_thread:(Dummy_enable_bool_caller_params*)caller_params {
    [[Dummy_enable_bool_caller getSharedInstance] performSelectorOnMainThread:@selector(command_enable_bool:) withObject:caller_params waitUntilDone:NO];
}


@end


rho::String js_Dummy_enable_bool_Obj(rho::json::CJSONArray& argv, id<IDummy>objItem, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[1+1];
    BOOL method_return_result = YES;
    BOOL method_receive_callback = NO;
    int argc = argv.getSize();


    [methodResult setMethodSignature:@"Dummy::enable_bool"];

    
    static RHO_API_PARAM rho_api_params[] = { {RHO_API_INTEGER, 0, "firingInterval", 0, 0 } };

    
    BOOL is_factory_param[] = { NO, NO };

    int i;

    // init
    for (i = 0; i < (1); i++) {
        params[i] = [CJSConverter getObjectiveCNULL];
    }

    

    // enumerate params
    for (int i = 0; i < (1); i++) {
        if (argc > i) {
            // we have a [i] param !
            if (is_factory_param[i]) {
                params[i] = Dummy_makeInstanceByJSObject(argv.getItem(i).getString());
            }
            else {
                rho::json::CJSONEntry entry = argv.getItem(i);
                params[i] = [[CJSConverter convertFromJS:&entry rho_api_param:&(rho_api_params[i])] retain];
            }
            // TODO: Handle CMethodResultError
            if (params[i] == nil) {
                NSLog(@"Dummy::enable_bool parameter %d is nil!", i);
                rho::String resValue = rho::String("\"result\":null,\"error\":\"Method parameter is nil!\"");
                return resValue;
            }
        }
    }

    NSMutableArray* params_array = [NSMutableArray arrayWithCapacity:(1)];
    for (i = 0 ; i < (1); i++) {
        [params_array addObject:params[i]];
    }

    
        if (strCallbackID.size() > 0) {
            method_receive_callback = YES;
        }
    

    

    if (method_receive_callback) {
        // we have callback - method should not call setResult if method execute from current thread - only later or in UI or separated threads !!!
        [methodResult setJSCallback:[NSString stringWithUTF8String:strCallbackID.c_str()] webViewUID:[NSString stringWithUTF8String:strJsVmID.c_str()]];
        [methodResult setCallbackParam:[NSString stringWithUTF8String:strCallbackParam.c_str()]];
        
        [Dummy_enable_bool_caller enable_bool_in_thread:[Dummy_enable_bool_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        

        // FIXME: callback should not be retained, it must be saved outside of this call
        [methodResult retain];
    }
    else {
        // we do not have callback
        
        [Dummy_enable_bool_caller enable_bool:[Dummy_enable_bool_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    rho::String resValue = rho::String("\"result\":null");
    if ((!method_receive_callback) && (method_return_result)) {
        resValue = [[methodResult toJSON] UTF8String];
    }
    [methodResult release];
    return resValue;
}


rho::String js_Dummy_enable_bool(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    id<IDummy> item = Dummy_makeInstanceByJSObject(strObjID);
    return js_Dummy_enable_bool_Obj(argv, item, strCallbackID, strJsVmID, strCallbackParam);

}

rho::String js_s_Dummy_def_enable_bool(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {
    id<IDummyFactory> factory = [DummyFactorySingleton getDummyFactoryInstance];
    id<IDummySingleton> singleton = [factory getDummySingleton];

    NSString* defID = [singleton getDefaultID];

    id<IDummy> item = [factory getDummyByID:defID];
    return js_Dummy_enable_bool_Obj(argv, item, strCallbackID, strJsVmID, strCallbackParam);
}







@interface Dummy_enable_double_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<IDummy> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(Dummy_enable_double_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation Dummy_enable_double_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(Dummy_enable_double_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult {
    Dummy_enable_double_caller_params* par = [[[Dummy_enable_double_caller_params alloc] init] autorelease];
    par.params = _params;
    par.item = _item;
    par.methodResult = [_methodResult retain];
    return [par retain];
}

@end


@interface Dummy_enable_double_caller : NSObject {

}
+(Dummy_enable_double_caller*) getSharedInstance;
+(void) enable_double:(Dummy_enable_double_caller_params*)caller_params;
+(void) enable_double_in_thread:(Dummy_enable_double_caller_params*)caller_params;
+(void) enable_double_in_UI_thread:(Dummy_enable_double_caller_params*)caller_params;

@end

static Dummy_enable_double_caller* our_Dummy_enable_double_caller = nil;

@implementation Dummy_enable_double_caller

+(Dummy_enable_double_caller*) getSharedInstance {
    if (our_Dummy_enable_double_caller == nil) {
        our_Dummy_enable_double_caller = [[Dummy_enable_double_caller alloc] init];
    }
    return our_Dummy_enable_double_caller;
}

-(void) command_enable_double:(Dummy_enable_double_caller_params*)caller_params {

    NSArray* params = caller_params.params;

    id<IDummy> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem enable_double:(int)[((NSNumber*)[params objectAtIndex:0]) intValue] methodResult:methodResult ];
    [caller_params.methodResult release];
    [caller_params release];
}


+(void) enable_double:(Dummy_enable_double_caller_params*)caller_params {
    [[Dummy_enable_double_caller getSharedInstance] command_enable_double:caller_params];
}

+(void) enable_double_in_thread:(Dummy_enable_double_caller_params*)caller_params {
    [[Dummy_enable_double_caller getSharedInstance] performSelectorInBackground:@selector(command_enable_double:) withObject:caller_params];
}

+(void) enable_double_in_UI_thread:(Dummy_enable_double_caller_params*)caller_params {
    [[Dummy_enable_double_caller getSharedInstance] performSelectorOnMainThread:@selector(command_enable_double:) withObject:caller_params waitUntilDone:NO];
}


@end


rho::String js_Dummy_enable_double_Obj(rho::json::CJSONArray& argv, id<IDummy>objItem, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[1+1];
    BOOL method_return_result = YES;
    BOOL method_receive_callback = NO;
    int argc = argv.getSize();


    [methodResult setMethodSignature:@"Dummy::enable_double"];

    
    static RHO_API_PARAM rho_api_params[] = { {RHO_API_INTEGER, 0, "firingInterval", 0, 0 } };

    
    BOOL is_factory_param[] = { NO, NO };

    int i;

    // init
    for (i = 0; i < (1); i++) {
        params[i] = [CJSConverter getObjectiveCNULL];
    }

    

    // enumerate params
    for (int i = 0; i < (1); i++) {
        if (argc > i) {
            // we have a [i] param !
            if (is_factory_param[i]) {
                params[i] = Dummy_makeInstanceByJSObject(argv.getItem(i).getString());
            }
            else {
                rho::json::CJSONEntry entry = argv.getItem(i);
                params[i] = [[CJSConverter convertFromJS:&entry rho_api_param:&(rho_api_params[i])] retain];
            }
            // TODO: Handle CMethodResultError
            if (params[i] == nil) {
                NSLog(@"Dummy::enable_double parameter %d is nil!", i);
                rho::String resValue = rho::String("\"result\":null,\"error\":\"Method parameter is nil!\"");
                return resValue;
            }
        }
    }

    NSMutableArray* params_array = [NSMutableArray arrayWithCapacity:(1)];
    for (i = 0 ; i < (1); i++) {
        [params_array addObject:params[i]];
    }

    
        if (strCallbackID.size() > 0) {
            method_receive_callback = YES;
        }
    

    [methodResult enableObjectCreationModeWithJSClassPath:@"DOUBLE"];

    if (method_receive_callback) {
        // we have callback - method should not call setResult if method execute from current thread - only later or in UI or separated threads !!!
        [methodResult setJSCallback:[NSString stringWithUTF8String:strCallbackID.c_str()] webViewUID:[NSString stringWithUTF8String:strJsVmID.c_str()]];
        [methodResult setCallbackParam:[NSString stringWithUTF8String:strCallbackParam.c_str()]];
        
        [Dummy_enable_double_caller enable_double_in_thread:[Dummy_enable_double_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        

        // FIXME: callback should not be retained, it must be saved outside of this call
        [methodResult retain];
    }
    else {
        // we do not have callback
        
        [Dummy_enable_double_caller enable_double:[Dummy_enable_double_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    rho::String resValue = rho::String("\"result\":null");
    if ((!method_receive_callback) && (method_return_result)) {
        resValue = [[methodResult toJSON] UTF8String];
    }
    [methodResult release];
    return resValue;
}


rho::String js_Dummy_enable_double(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    id<IDummy> item = Dummy_makeInstanceByJSObject(strObjID);
    return js_Dummy_enable_double_Obj(argv, item, strCallbackID, strJsVmID, strCallbackParam);

}

rho::String js_s_Dummy_def_enable_double(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {
    id<IDummyFactory> factory = [DummyFactorySingleton getDummyFactoryInstance];
    id<IDummySingleton> singleton = [factory getDummySingleton];

    NSString* defID = [singleton getDefaultID];

    id<IDummy> item = [factory getDummyByID:defID];
    return js_Dummy_enable_double_Obj(argv, item, strCallbackID, strJsVmID, strCallbackParam);
}







@interface Dummy_stop_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<IDummy> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(Dummy_stop_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation Dummy_stop_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(Dummy_stop_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult {
    Dummy_stop_caller_params* par = [[[Dummy_stop_caller_params alloc] init] autorelease];
    par.params = _params;
    par.item = _item;
    par.methodResult = [_methodResult retain];
    return [par retain];
}

@end


@interface Dummy_stop_caller : NSObject {

}
+(Dummy_stop_caller*) getSharedInstance;
+(void) stop:(Dummy_stop_caller_params*)caller_params;
+(void) stop_in_thread:(Dummy_stop_caller_params*)caller_params;
+(void) stop_in_UI_thread:(Dummy_stop_caller_params*)caller_params;

@end

static Dummy_stop_caller* our_Dummy_stop_caller = nil;

@implementation Dummy_stop_caller

+(Dummy_stop_caller*) getSharedInstance {
    if (our_Dummy_stop_caller == nil) {
        our_Dummy_stop_caller = [[Dummy_stop_caller alloc] init];
    }
    return our_Dummy_stop_caller;
}

-(void) command_stop:(Dummy_stop_caller_params*)caller_params {

    id<IDummy> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem stop:methodResult ];
    [caller_params.methodResult release];
    [caller_params release];
}


+(void) stop:(Dummy_stop_caller_params*)caller_params {
    [[Dummy_stop_caller getSharedInstance] command_stop:caller_params];
}

+(void) stop_in_thread:(Dummy_stop_caller_params*)caller_params {
    [[Dummy_stop_caller getSharedInstance] performSelectorInBackground:@selector(command_stop:) withObject:caller_params];
}

+(void) stop_in_UI_thread:(Dummy_stop_caller_params*)caller_params {
    [[Dummy_stop_caller getSharedInstance] performSelectorOnMainThread:@selector(command_stop:) withObject:caller_params waitUntilDone:NO];
}


@end


rho::String js_Dummy_stop_Obj(rho::json::CJSONArray& argv, id<IDummy>objItem, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[0+1];
    BOOL method_return_result = YES;
    BOOL method_receive_callback = NO;
    int argc = argv.getSize();


    [methodResult setMethodSignature:@"Dummy::stop"];

    
    static RHO_API_PARAM rho_api_params[] = {  };

    
    BOOL is_factory_param[] = { NO };

    int i;

    // init
    for (i = 0; i < (0); i++) {
        params[i] = [CJSConverter getObjectiveCNULL];
    }

    

    // enumerate params
    for (int i = 0; i < (0); i++) {
        if (argc > i) {
            // we have a [i] param !
            if (is_factory_param[i]) {
                params[i] = Dummy_makeInstanceByJSObject(argv.getItem(i).getString());
            }
            else {
                rho::json::CJSONEntry entry = argv.getItem(i);
                params[i] = [[CJSConverter convertFromJS:&entry rho_api_param:&(rho_api_params[i])] retain];
            }
            // TODO: Handle CMethodResultError
            if (params[i] == nil) {
                NSLog(@"Dummy::stop parameter %d is nil!", i);
                rho::String resValue = rho::String("\"result\":null,\"error\":\"Method parameter is nil!\"");
                return resValue;
            }
        }
    }

    NSMutableArray* params_array = [NSMutableArray arrayWithCapacity:(0)];
    for (i = 0 ; i < (0); i++) {
        [params_array addObject:params[i]];
    }

    
        if (strCallbackID.size() > 0) {
            method_receive_callback = YES;
        }
    

    

    if (method_receive_callback) {
        // we have callback - method should not call setResult if method execute from current thread - only later or in UI or separated threads !!!
        [methodResult setJSCallback:[NSString stringWithUTF8String:strCallbackID.c_str()] webViewUID:[NSString stringWithUTF8String:strJsVmID.c_str()]];
        [methodResult setCallbackParam:[NSString stringWithUTF8String:strCallbackParam.c_str()]];
        
        [Dummy_stop_caller stop_in_thread:[Dummy_stop_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        

        // FIXME: callback should not be retained, it must be saved outside of this call
        [methodResult retain];
    }
    else {
        // we do not have callback
        
        [Dummy_stop_caller stop:[Dummy_stop_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    rho::String resValue = rho::String("\"result\":null");
    if ((!method_receive_callback) && (method_return_result)) {
        resValue = [[methodResult toJSON] UTF8String];
    }
    [methodResult release];
    return resValue;
}


rho::String js_Dummy_stop(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    id<IDummy> item = Dummy_makeInstanceByJSObject(strObjID);
    return js_Dummy_stop_Obj(argv, item, strCallbackID, strJsVmID, strCallbackParam);

}

rho::String js_s_Dummy_def_stop(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {
    id<IDummyFactory> factory = [DummyFactorySingleton getDummyFactoryInstance];
    id<IDummySingleton> singleton = [factory getDummySingleton];

    NSString* defID = [singleton getDefaultID];

    id<IDummy> item = [factory getDummyByID:defID];
    return js_Dummy_stop_Obj(argv, item, strCallbackID, strJsVmID, strCallbackParam);
}







@interface Dummy_getProperty_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<IDummy> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(Dummy_getProperty_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation Dummy_getProperty_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(Dummy_getProperty_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult {
    Dummy_getProperty_caller_params* par = [[[Dummy_getProperty_caller_params alloc] init] autorelease];
    par.params = _params;
    par.item = _item;
    par.methodResult = [_methodResult retain];
    return [par retain];
}

@end


@interface Dummy_getProperty_caller : NSObject {

}
+(Dummy_getProperty_caller*) getSharedInstance;
+(void) getProperty:(Dummy_getProperty_caller_params*)caller_params;
+(void) getProperty_in_thread:(Dummy_getProperty_caller_params*)caller_params;
+(void) getProperty_in_UI_thread:(Dummy_getProperty_caller_params*)caller_params;

@end

static Dummy_getProperty_caller* our_Dummy_getProperty_caller = nil;

@implementation Dummy_getProperty_caller

+(Dummy_getProperty_caller*) getSharedInstance {
    if (our_Dummy_getProperty_caller == nil) {
        our_Dummy_getProperty_caller = [[Dummy_getProperty_caller alloc] init];
    }
    return our_Dummy_getProperty_caller;
}

-(void) command_getProperty:(Dummy_getProperty_caller_params*)caller_params {

    NSArray* params = caller_params.params;

    id<IDummy> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem getProperty:(NSString*)[params objectAtIndex:0] methodResult:methodResult ];
    [caller_params.methodResult release];
    [caller_params release];
}


+(void) getProperty:(Dummy_getProperty_caller_params*)caller_params {
    [[Dummy_getProperty_caller getSharedInstance] command_getProperty:caller_params];
}

+(void) getProperty_in_thread:(Dummy_getProperty_caller_params*)caller_params {
    [[Dummy_getProperty_caller getSharedInstance] performSelectorInBackground:@selector(command_getProperty:) withObject:caller_params];
}

+(void) getProperty_in_UI_thread:(Dummy_getProperty_caller_params*)caller_params {
    [[Dummy_getProperty_caller getSharedInstance] performSelectorOnMainThread:@selector(command_getProperty:) withObject:caller_params waitUntilDone:NO];
}


@end


rho::String js_Dummy_getProperty_Obj(rho::json::CJSONArray& argv, id<IDummy>objItem, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[1+1];
    BOOL method_return_result = YES;
    BOOL method_receive_callback = NO;
    int argc = argv.getSize();


    [methodResult setMethodSignature:@"Dummy::getProperty"];

    
    static RHO_API_PARAM rho_api_params[] = { {RHO_API_STRING, 0, "propertyName", 0, 0 } };

    
    BOOL is_factory_param[] = { NO, NO };

    int i;

    // init
    for (i = 0; i < (1); i++) {
        params[i] = [CJSConverter getObjectiveCNULL];
    }

    

    // enumerate params
    for (int i = 0; i < (1); i++) {
        if (argc > i) {
            // we have a [i] param !
            if (is_factory_param[i]) {
                params[i] = Dummy_makeInstanceByJSObject(argv.getItem(i).getString());
            }
            else {
                rho::json::CJSONEntry entry = argv.getItem(i);
                params[i] = [[CJSConverter convertFromJS:&entry rho_api_param:&(rho_api_params[i])] retain];
            }
            // TODO: Handle CMethodResultError
            if (params[i] == nil) {
                NSLog(@"Dummy::getProperty parameter %d is nil!", i);
                rho::String resValue = rho::String("\"result\":null,\"error\":\"Method parameter is nil!\"");
                return resValue;
            }
        }
    }

    NSMutableArray* params_array = [NSMutableArray arrayWithCapacity:(1)];
    for (i = 0 ; i < (1); i++) {
        [params_array addObject:params[i]];
    }

    
        if (strCallbackID.size() > 0) {
            method_receive_callback = YES;
        }
    

    

    if (method_receive_callback) {
        // we have callback - method should not call setResult if method execute from current thread - only later or in UI or separated threads !!!
        [methodResult setJSCallback:[NSString stringWithUTF8String:strCallbackID.c_str()] webViewUID:[NSString stringWithUTF8String:strJsVmID.c_str()]];
        [methodResult setCallbackParam:[NSString stringWithUTF8String:strCallbackParam.c_str()]];
        
        [Dummy_getProperty_caller getProperty_in_thread:[Dummy_getProperty_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        

        // FIXME: callback should not be retained, it must be saved outside of this call
        [methodResult retain];
    }
    else {
        // we do not have callback
        
        [Dummy_getProperty_caller getProperty:[Dummy_getProperty_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    rho::String resValue = rho::String("\"result\":null");
    if ((!method_receive_callback) && (method_return_result)) {
        resValue = [[methodResult toJSON] UTF8String];
    }
    [methodResult release];
    return resValue;
}


rho::String js_Dummy_getProperty(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    id<IDummy> item = Dummy_makeInstanceByJSObject(strObjID);
    return js_Dummy_getProperty_Obj(argv, item, strCallbackID, strJsVmID, strCallbackParam);

}

rho::String js_s_Dummy_def_getProperty(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {
    id<IDummyFactory> factory = [DummyFactorySingleton getDummyFactoryInstance];
    id<IDummySingleton> singleton = [factory getDummySingleton];

    NSString* defID = [singleton getDefaultID];

    id<IDummy> item = [factory getDummyByID:defID];
    return js_Dummy_getProperty_Obj(argv, item, strCallbackID, strJsVmID, strCallbackParam);
}







@interface Dummy_getProperties_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<IDummy> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(Dummy_getProperties_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation Dummy_getProperties_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(Dummy_getProperties_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult {
    Dummy_getProperties_caller_params* par = [[[Dummy_getProperties_caller_params alloc] init] autorelease];
    par.params = _params;
    par.item = _item;
    par.methodResult = [_methodResult retain];
    return [par retain];
}

@end


@interface Dummy_getProperties_caller : NSObject {

}
+(Dummy_getProperties_caller*) getSharedInstance;
+(void) getProperties:(Dummy_getProperties_caller_params*)caller_params;
+(void) getProperties_in_thread:(Dummy_getProperties_caller_params*)caller_params;
+(void) getProperties_in_UI_thread:(Dummy_getProperties_caller_params*)caller_params;

@end

static Dummy_getProperties_caller* our_Dummy_getProperties_caller = nil;

@implementation Dummy_getProperties_caller

+(Dummy_getProperties_caller*) getSharedInstance {
    if (our_Dummy_getProperties_caller == nil) {
        our_Dummy_getProperties_caller = [[Dummy_getProperties_caller alloc] init];
    }
    return our_Dummy_getProperties_caller;
}

-(void) command_getProperties:(Dummy_getProperties_caller_params*)caller_params {

    NSArray* params = caller_params.params;

    id<IDummy> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem getProperties:(NSArray*)[params objectAtIndex:0] methodResult:methodResult ];
    [caller_params.methodResult release];
    [caller_params release];
}


+(void) getProperties:(Dummy_getProperties_caller_params*)caller_params {
    [[Dummy_getProperties_caller getSharedInstance] command_getProperties:caller_params];
}

+(void) getProperties_in_thread:(Dummy_getProperties_caller_params*)caller_params {
    [[Dummy_getProperties_caller getSharedInstance] performSelectorInBackground:@selector(command_getProperties:) withObject:caller_params];
}

+(void) getProperties_in_UI_thread:(Dummy_getProperties_caller_params*)caller_params {
    [[Dummy_getProperties_caller getSharedInstance] performSelectorOnMainThread:@selector(command_getProperties:) withObject:caller_params waitUntilDone:NO];
}


@end


rho::String js_Dummy_getProperties_Obj(rho::json::CJSONArray& argv, id<IDummy>objItem, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[1+1];
    BOOL method_return_result = YES;
    BOOL method_receive_callback = NO;
    int argc = argv.getSize();


    [methodResult setMethodSignature:@"Dummy::getProperties"];

    
    static RHO_API_PARAM rho_api_params_param0[] = { {RHO_API_STRING, 0, "array_param", 0, 0 } };
    static RHO_API_PARAM rho_api_params[] = { {RHO_API_ARRAY, 0, "arrayofNames", 1, rho_api_params_param0 } };

    
    BOOL is_factory_param[] = { NO, NO };

    int i;

    // init
    for (i = 0; i < (1); i++) {
        params[i] = [CJSConverter getObjectiveCNULL];
    }

    

    // enumerate params
    for (int i = 0; i < (1); i++) {
        if (argc > i) {
            // we have a [i] param !
            if (is_factory_param[i]) {
                params[i] = Dummy_makeInstanceByJSObject(argv.getItem(i).getString());
            }
            else {
                rho::json::CJSONEntry entry = argv.getItem(i);
                params[i] = [[CJSConverter convertFromJS:&entry rho_api_param:&(rho_api_params[i])] retain];
            }
            // TODO: Handle CMethodResultError
            if (params[i] == nil) {
                NSLog(@"Dummy::getProperties parameter %d is nil!", i);
                rho::String resValue = rho::String("\"result\":null,\"error\":\"Method parameter is nil!\"");
                return resValue;
            }
        }
    }

    NSMutableArray* params_array = [NSMutableArray arrayWithCapacity:(1)];
    for (i = 0 ; i < (1); i++) {
        [params_array addObject:params[i]];
    }

    
        if (strCallbackID.size() > 0) {
            method_receive_callback = YES;
        }
    

    

    if (method_receive_callback) {
        // we have callback - method should not call setResult if method execute from current thread - only later or in UI or separated threads !!!
        [methodResult setJSCallback:[NSString stringWithUTF8String:strCallbackID.c_str()] webViewUID:[NSString stringWithUTF8String:strJsVmID.c_str()]];
        [methodResult setCallbackParam:[NSString stringWithUTF8String:strCallbackParam.c_str()]];
        
        [Dummy_getProperties_caller getProperties_in_thread:[Dummy_getProperties_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        

        // FIXME: callback should not be retained, it must be saved outside of this call
        [methodResult retain];
    }
    else {
        // we do not have callback
        
        [Dummy_getProperties_caller getProperties:[Dummy_getProperties_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    rho::String resValue = rho::String("\"result\":null");
    if ((!method_receive_callback) && (method_return_result)) {
        resValue = [[methodResult toJSON] UTF8String];
    }
    [methodResult release];
    return resValue;
}


rho::String js_Dummy_getProperties(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    id<IDummy> item = Dummy_makeInstanceByJSObject(strObjID);
    return js_Dummy_getProperties_Obj(argv, item, strCallbackID, strJsVmID, strCallbackParam);

}

rho::String js_s_Dummy_def_getProperties(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {
    id<IDummyFactory> factory = [DummyFactorySingleton getDummyFactoryInstance];
    id<IDummySingleton> singleton = [factory getDummySingleton];

    NSString* defID = [singleton getDefaultID];

    id<IDummy> item = [factory getDummyByID:defID];
    return js_Dummy_getProperties_Obj(argv, item, strCallbackID, strJsVmID, strCallbackParam);
}







@interface Dummy_getAllProperties_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<IDummy> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(Dummy_getAllProperties_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation Dummy_getAllProperties_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(Dummy_getAllProperties_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult {
    Dummy_getAllProperties_caller_params* par = [[[Dummy_getAllProperties_caller_params alloc] init] autorelease];
    par.params = _params;
    par.item = _item;
    par.methodResult = [_methodResult retain];
    return [par retain];
}

@end


@interface Dummy_getAllProperties_caller : NSObject {

}
+(Dummy_getAllProperties_caller*) getSharedInstance;
+(void) getAllProperties:(Dummy_getAllProperties_caller_params*)caller_params;
+(void) getAllProperties_in_thread:(Dummy_getAllProperties_caller_params*)caller_params;
+(void) getAllProperties_in_UI_thread:(Dummy_getAllProperties_caller_params*)caller_params;

@end

static Dummy_getAllProperties_caller* our_Dummy_getAllProperties_caller = nil;

@implementation Dummy_getAllProperties_caller

+(Dummy_getAllProperties_caller*) getSharedInstance {
    if (our_Dummy_getAllProperties_caller == nil) {
        our_Dummy_getAllProperties_caller = [[Dummy_getAllProperties_caller alloc] init];
    }
    return our_Dummy_getAllProperties_caller;
}

-(void) command_getAllProperties:(Dummy_getAllProperties_caller_params*)caller_params {

    id<IDummy> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem getAllProperties:methodResult ];
    [caller_params.methodResult release];
    [caller_params release];
}


+(void) getAllProperties:(Dummy_getAllProperties_caller_params*)caller_params {
    [[Dummy_getAllProperties_caller getSharedInstance] command_getAllProperties:caller_params];
}

+(void) getAllProperties_in_thread:(Dummy_getAllProperties_caller_params*)caller_params {
    [[Dummy_getAllProperties_caller getSharedInstance] performSelectorInBackground:@selector(command_getAllProperties:) withObject:caller_params];
}

+(void) getAllProperties_in_UI_thread:(Dummy_getAllProperties_caller_params*)caller_params {
    [[Dummy_getAllProperties_caller getSharedInstance] performSelectorOnMainThread:@selector(command_getAllProperties:) withObject:caller_params waitUntilDone:NO];
}


@end


rho::String js_Dummy_getAllProperties_Obj(rho::json::CJSONArray& argv, id<IDummy>objItem, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[0+1];
    BOOL method_return_result = YES;
    BOOL method_receive_callback = NO;
    int argc = argv.getSize();


    [methodResult setMethodSignature:@"Dummy::getAllProperties"];

    
    static RHO_API_PARAM rho_api_params[] = {  };

    
    BOOL is_factory_param[] = { NO };

    int i;

    // init
    for (i = 0; i < (0); i++) {
        params[i] = [CJSConverter getObjectiveCNULL];
    }

    

    // enumerate params
    for (int i = 0; i < (0); i++) {
        if (argc > i) {
            // we have a [i] param !
            if (is_factory_param[i]) {
                params[i] = Dummy_makeInstanceByJSObject(argv.getItem(i).getString());
            }
            else {
                rho::json::CJSONEntry entry = argv.getItem(i);
                params[i] = [[CJSConverter convertFromJS:&entry rho_api_param:&(rho_api_params[i])] retain];
            }
            // TODO: Handle CMethodResultError
            if (params[i] == nil) {
                NSLog(@"Dummy::getAllProperties parameter %d is nil!", i);
                rho::String resValue = rho::String("\"result\":null,\"error\":\"Method parameter is nil!\"");
                return resValue;
            }
        }
    }

    NSMutableArray* params_array = [NSMutableArray arrayWithCapacity:(0)];
    for (i = 0 ; i < (0); i++) {
        [params_array addObject:params[i]];
    }

    
        if (strCallbackID.size() > 0) {
            method_receive_callback = YES;
        }
    

    

    if (method_receive_callback) {
        // we have callback - method should not call setResult if method execute from current thread - only later or in UI or separated threads !!!
        [methodResult setJSCallback:[NSString stringWithUTF8String:strCallbackID.c_str()] webViewUID:[NSString stringWithUTF8String:strJsVmID.c_str()]];
        [methodResult setCallbackParam:[NSString stringWithUTF8String:strCallbackParam.c_str()]];
        
        [Dummy_getAllProperties_caller getAllProperties_in_thread:[Dummy_getAllProperties_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        

        // FIXME: callback should not be retained, it must be saved outside of this call
        [methodResult retain];
    }
    else {
        // we do not have callback
        
        [Dummy_getAllProperties_caller getAllProperties:[Dummy_getAllProperties_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    rho::String resValue = rho::String("\"result\":null");
    if ((!method_receive_callback) && (method_return_result)) {
        resValue = [[methodResult toJSON] UTF8String];
    }
    [methodResult release];
    return resValue;
}


rho::String js_Dummy_getAllProperties(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    id<IDummy> item = Dummy_makeInstanceByJSObject(strObjID);
    return js_Dummy_getAllProperties_Obj(argv, item, strCallbackID, strJsVmID, strCallbackParam);

}

rho::String js_s_Dummy_def_getAllProperties(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {
    id<IDummyFactory> factory = [DummyFactorySingleton getDummyFactoryInstance];
    id<IDummySingleton> singleton = [factory getDummySingleton];

    NSString* defID = [singleton getDefaultID];

    id<IDummy> item = [factory getDummyByID:defID];
    return js_Dummy_getAllProperties_Obj(argv, item, strCallbackID, strJsVmID, strCallbackParam);
}







@interface Dummy_setProperty_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<IDummy> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(Dummy_setProperty_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation Dummy_setProperty_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(Dummy_setProperty_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult {
    Dummy_setProperty_caller_params* par = [[[Dummy_setProperty_caller_params alloc] init] autorelease];
    par.params = _params;
    par.item = _item;
    par.methodResult = [_methodResult retain];
    return [par retain];
}

@end


@interface Dummy_setProperty_caller : NSObject {

}
+(Dummy_setProperty_caller*) getSharedInstance;
+(void) setProperty:(Dummy_setProperty_caller_params*)caller_params;
+(void) setProperty_in_thread:(Dummy_setProperty_caller_params*)caller_params;
+(void) setProperty_in_UI_thread:(Dummy_setProperty_caller_params*)caller_params;

@end

static Dummy_setProperty_caller* our_Dummy_setProperty_caller = nil;

@implementation Dummy_setProperty_caller

+(Dummy_setProperty_caller*) getSharedInstance {
    if (our_Dummy_setProperty_caller == nil) {
        our_Dummy_setProperty_caller = [[Dummy_setProperty_caller alloc] init];
    }
    return our_Dummy_setProperty_caller;
}

-(void) command_setProperty:(Dummy_setProperty_caller_params*)caller_params {

    NSArray* params = caller_params.params;

    id<IDummy> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem setProperty:(NSString*)[params objectAtIndex:0] propertyValue:(NSString*)[params objectAtIndex:1] methodResult:methodResult ];
    [caller_params.methodResult release];
    [caller_params release];
}


+(void) setProperty:(Dummy_setProperty_caller_params*)caller_params {
    [[Dummy_setProperty_caller getSharedInstance] command_setProperty:caller_params];
}

+(void) setProperty_in_thread:(Dummy_setProperty_caller_params*)caller_params {
    [[Dummy_setProperty_caller getSharedInstance] performSelectorInBackground:@selector(command_setProperty:) withObject:caller_params];
}

+(void) setProperty_in_UI_thread:(Dummy_setProperty_caller_params*)caller_params {
    [[Dummy_setProperty_caller getSharedInstance] performSelectorOnMainThread:@selector(command_setProperty:) withObject:caller_params waitUntilDone:NO];
}


@end


rho::String js_Dummy_setProperty_Obj(rho::json::CJSONArray& argv, id<IDummy>objItem, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[2+1];
    BOOL method_return_result = YES;
    BOOL method_receive_callback = NO;
    int argc = argv.getSize();


    [methodResult setMethodSignature:@"Dummy::setProperty"];

    
    static RHO_API_PARAM rho_api_params[] = { {RHO_API_STRING, 0, "propertyName", 0, 0 }, {RHO_API_STRING, 0, "propertyValue", 0, 0 } };

    
    BOOL is_factory_param[] = { NO, NO, NO };

    int i;

    // init
    for (i = 0; i < (2); i++) {
        params[i] = [CJSConverter getObjectiveCNULL];
    }

    

    // enumerate params
    for (int i = 0; i < (2); i++) {
        if (argc > i) {
            // we have a [i] param !
            if (is_factory_param[i]) {
                params[i] = Dummy_makeInstanceByJSObject(argv.getItem(i).getString());
            }
            else {
                rho::json::CJSONEntry entry = argv.getItem(i);
                params[i] = [[CJSConverter convertFromJS:&entry rho_api_param:&(rho_api_params[i])] retain];
            }
            // TODO: Handle CMethodResultError
            if (params[i] == nil) {
                NSLog(@"Dummy::setProperty parameter %d is nil!", i);
                rho::String resValue = rho::String("\"result\":null,\"error\":\"Method parameter is nil!\"");
                return resValue;
            }
        }
    }

    NSMutableArray* params_array = [NSMutableArray arrayWithCapacity:(2)];
    for (i = 0 ; i < (2); i++) {
        [params_array addObject:params[i]];
    }

    
        if (strCallbackID.size() > 0) {
            method_receive_callback = YES;
        }
    

    

    if (method_receive_callback) {
        // we have callback - method should not call setResult if method execute from current thread - only later or in UI or separated threads !!!
        [methodResult setJSCallback:[NSString stringWithUTF8String:strCallbackID.c_str()] webViewUID:[NSString stringWithUTF8String:strJsVmID.c_str()]];
        [methodResult setCallbackParam:[NSString stringWithUTF8String:strCallbackParam.c_str()]];
        
        [Dummy_setProperty_caller setProperty_in_thread:[Dummy_setProperty_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        

        // FIXME: callback should not be retained, it must be saved outside of this call
        [methodResult retain];
    }
    else {
        // we do not have callback
        
        [Dummy_setProperty_caller setProperty:[Dummy_setProperty_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    rho::String resValue = rho::String("\"result\":null");
    if ((!method_receive_callback) && (method_return_result)) {
        resValue = [[methodResult toJSON] UTF8String];
    }
    [methodResult release];
    return resValue;
}


rho::String js_Dummy_setProperty(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    id<IDummy> item = Dummy_makeInstanceByJSObject(strObjID);
    return js_Dummy_setProperty_Obj(argv, item, strCallbackID, strJsVmID, strCallbackParam);

}

rho::String js_s_Dummy_def_setProperty(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {
    id<IDummyFactory> factory = [DummyFactorySingleton getDummyFactoryInstance];
    id<IDummySingleton> singleton = [factory getDummySingleton];

    NSString* defID = [singleton getDefaultID];

    id<IDummy> item = [factory getDummyByID:defID];
    return js_Dummy_setProperty_Obj(argv, item, strCallbackID, strJsVmID, strCallbackParam);
}







@interface Dummy_setProperties_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<IDummy> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(Dummy_setProperties_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation Dummy_setProperties_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(Dummy_setProperties_caller_params*) makeParams:(NSArray*)_params _item:(id<IDummy>)_item _methodResult:(CMethodResult*)_methodResult {
    Dummy_setProperties_caller_params* par = [[[Dummy_setProperties_caller_params alloc] init] autorelease];
    par.params = _params;
    par.item = _item;
    par.methodResult = [_methodResult retain];
    return [par retain];
}

@end


@interface Dummy_setProperties_caller : NSObject {

}
+(Dummy_setProperties_caller*) getSharedInstance;
+(void) setProperties:(Dummy_setProperties_caller_params*)caller_params;
+(void) setProperties_in_thread:(Dummy_setProperties_caller_params*)caller_params;
+(void) setProperties_in_UI_thread:(Dummy_setProperties_caller_params*)caller_params;

@end

static Dummy_setProperties_caller* our_Dummy_setProperties_caller = nil;

@implementation Dummy_setProperties_caller

+(Dummy_setProperties_caller*) getSharedInstance {
    if (our_Dummy_setProperties_caller == nil) {
        our_Dummy_setProperties_caller = [[Dummy_setProperties_caller alloc] init];
    }
    return our_Dummy_setProperties_caller;
}

-(void) command_setProperties:(Dummy_setProperties_caller_params*)caller_params {

    NSArray* params = caller_params.params;

    id<IDummy> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem setProperties:(NSDictionary*)[params objectAtIndex:0] methodResult:methodResult ];
    [caller_params.methodResult release];
    [caller_params release];
}


+(void) setProperties:(Dummy_setProperties_caller_params*)caller_params {
    [[Dummy_setProperties_caller getSharedInstance] command_setProperties:caller_params];
}

+(void) setProperties_in_thread:(Dummy_setProperties_caller_params*)caller_params {
    [[Dummy_setProperties_caller getSharedInstance] performSelectorInBackground:@selector(command_setProperties:) withObject:caller_params];
}

+(void) setProperties_in_UI_thread:(Dummy_setProperties_caller_params*)caller_params {
    [[Dummy_setProperties_caller getSharedInstance] performSelectorOnMainThread:@selector(command_setProperties:) withObject:caller_params waitUntilDone:NO];
}


@end


rho::String js_Dummy_setProperties_Obj(rho::json::CJSONArray& argv, id<IDummy>objItem, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[1+1];
    BOOL method_return_result = YES;
    BOOL method_receive_callback = NO;
    int argc = argv.getSize();


    [methodResult setMethodSignature:@"Dummy::setProperties"];

    
    static RHO_API_PARAM rho_api_params[] = { {RHO_API_HASH, 0, "propertyMap", 0, 0 } };

    
    BOOL is_factory_param[] = { NO, NO };

    int i;

    // init
    for (i = 0; i < (1); i++) {
        params[i] = [CJSConverter getObjectiveCNULL];
    }

    

    // enumerate params
    for (int i = 0; i < (1); i++) {
        if (argc > i) {
            // we have a [i] param !
            if (is_factory_param[i]) {
                params[i] = Dummy_makeInstanceByJSObject(argv.getItem(i).getString());
            }
            else {
                rho::json::CJSONEntry entry = argv.getItem(i);
                params[i] = [[CJSConverter convertFromJS:&entry rho_api_param:&(rho_api_params[i])] retain];
            }
            // TODO: Handle CMethodResultError
            if (params[i] == nil) {
                NSLog(@"Dummy::setProperties parameter %d is nil!", i);
                rho::String resValue = rho::String("\"result\":null,\"error\":\"Method parameter is nil!\"");
                return resValue;
            }
        }
    }

    NSMutableArray* params_array = [NSMutableArray arrayWithCapacity:(1)];
    for (i = 0 ; i < (1); i++) {
        [params_array addObject:params[i]];
    }

    
        if (strCallbackID.size() > 0) {
            method_receive_callback = YES;
        }
    

    

    if (method_receive_callback) {
        // we have callback - method should not call setResult if method execute from current thread - only later or in UI or separated threads !!!
        [methodResult setJSCallback:[NSString stringWithUTF8String:strCallbackID.c_str()] webViewUID:[NSString stringWithUTF8String:strJsVmID.c_str()]];
        [methodResult setCallbackParam:[NSString stringWithUTF8String:strCallbackParam.c_str()]];
        
        [Dummy_setProperties_caller setProperties_in_thread:[Dummy_setProperties_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        

        // FIXME: callback should not be retained, it must be saved outside of this call
        [methodResult retain];
    }
    else {
        // we do not have callback
        
        [Dummy_setProperties_caller setProperties:[Dummy_setProperties_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    rho::String resValue = rho::String("\"result\":null");
    if ((!method_receive_callback) && (method_return_result)) {
        resValue = [[methodResult toJSON] UTF8String];
    }
    [methodResult release];
    return resValue;
}


rho::String js_Dummy_setProperties(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    id<IDummy> item = Dummy_makeInstanceByJSObject(strObjID);
    return js_Dummy_setProperties_Obj(argv, item, strCallbackID, strJsVmID, strCallbackParam);

}

rho::String js_s_Dummy_def_setProperties(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {
    id<IDummyFactory> factory = [DummyFactorySingleton getDummyFactoryInstance];
    id<IDummySingleton> singleton = [factory getDummySingleton];

    NSString* defID = [singleton getDefaultID];

    id<IDummy> item = [factory getDummyByID:defID];
    return js_Dummy_setProperties_Obj(argv, item, strCallbackID, strJsVmID, strCallbackParam);
}







rho::String js_s_Dummy_getDefaultID(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam)
{
    id<IDummyFactory> factory = [DummyFactorySingleton getDummyFactoryInstance];
    id<IDummySingleton> singleton = [factory getDummySingleton];

    NSString* defID = [singleton getDefaultID];

    rho::String res =  [[CJSConverter convertToJS:defID level:0] UTF8String];

    return res;
}

rho::String js_s_Dummy_getDefault(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam)
{
    id<IDummyFactory> factory = [DummyFactorySingleton getDummyFactoryInstance];
    id<IDummySingleton> singleton = [factory getDummySingleton];

    NSString* defID = [singleton getDefaultID];

    rho::String res =  [[CJSConverter convertToJS:[CRhoAPIClassInstance rubyClassByName:@"Rho.Dummy" instanceID:defID] level:0] UTF8String];

    return res;
}

rho::String js_s_Dummy_setDefaultID(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam)
{
    id<IDummyFactory> factory = [DummyFactorySingleton getDummyFactoryInstance];
    id<IDummySingleton> singleton = [factory getDummySingleton];

    rho::json::CJSONEntry el = argv[0];

    if (el.isString()) {
        NSString* defID = [NSString stringWithUTF8String:(el.getString())];

        [singleton setDefaultID:defID];

        return [[CJSConverter convertToJS:nil level:0] UTF8String];
    }

    return "\"result\":null,\"error\":\"Method parameter should be defined as string!\"";
}



