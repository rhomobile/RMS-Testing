
#import "IGenPropBag.h"
//#import "api_generator/common/ruby_helpers.h"

#include "api_generator/js_helpers.h"

#import "api_generator/iphone/CMethodResult.h"
#import "api_generator/iphone/CJSConverter.h"

extern VALUE getRuby_GenPropBag_Module();



id<IGenPropBag> GenPropBag_makeInstanceByJSObject(rho::String sid) {
    const char* szID = sid.c_str();
    id<IGenPropBagFactory> factory = [GenPropBagFactorySingleton getGenPropBagFactoryInstance];
    return [factory getGenPropBagByID:[NSString stringWithUTF8String:szID]];
}









@interface GenPropBag_getBoolProp_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<IGenPropBag> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(GenPropBag_getBoolProp_caller_params*) makeParams:(NSArray*)_params _item:(id<IGenPropBag>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation GenPropBag_getBoolProp_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(GenPropBag_getBoolProp_caller_params*) makeParams:(NSArray*)_params _item:(id<IGenPropBag>)_item _methodResult:(CMethodResult*)_methodResult {
    GenPropBag_getBoolProp_caller_params* par = [[[GenPropBag_getBoolProp_caller_params alloc] init] autorelease];
    par.params = _params;
    par.item = _item;
    par.methodResult = [_methodResult retain];
    return [par retain];
}

@end


@interface GenPropBag_getBoolProp_caller : NSObject {

}
+(GenPropBag_getBoolProp_caller*) getSharedInstance;
+(void) getBoolProp:(GenPropBag_getBoolProp_caller_params*)caller_params;
+(void) getBoolProp_in_thread:(GenPropBag_getBoolProp_caller_params*)caller_params;
+(void) getBoolProp_in_UI_thread:(GenPropBag_getBoolProp_caller_params*)caller_params;

@end

static GenPropBag_getBoolProp_caller* our_GenPropBag_getBoolProp_caller = nil;

@implementation GenPropBag_getBoolProp_caller

+(GenPropBag_getBoolProp_caller*) getSharedInstance {
    if (our_GenPropBag_getBoolProp_caller == nil) {
        our_GenPropBag_getBoolProp_caller = [[GenPropBag_getBoolProp_caller alloc] init];
    }
    return our_GenPropBag_getBoolProp_caller;
}

-(void) command_getBoolProp:(GenPropBag_getBoolProp_caller_params*)caller_params {

    id<IGenPropBag> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem getBoolProp:methodResult ];
    [caller_params.methodResult release];
    [caller_params release];
}


+(void) getBoolProp:(GenPropBag_getBoolProp_caller_params*)caller_params {
    [[GenPropBag_getBoolProp_caller getSharedInstance] command_getBoolProp:caller_params];
}

+(void) getBoolProp_in_thread:(GenPropBag_getBoolProp_caller_params*)caller_params {
    [[GenPropBag_getBoolProp_caller getSharedInstance] performSelectorInBackground:@selector(command_getBoolProp:) withObject:caller_params];
}

+(void) getBoolProp_in_UI_thread:(GenPropBag_getBoolProp_caller_params*)caller_params {
    [[GenPropBag_getBoolProp_caller getSharedInstance] performSelectorOnMainThread:@selector(command_getBoolProp:) withObject:caller_params waitUntilDone:NO];
}


@end


rho::String js_GenPropBag_getBoolProp_Obj(rho::json::CJSONArray& argv, id<IGenPropBag>objItem, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[0+1];
    BOOL method_return_result = YES;
    BOOL method_receive_callback = NO;
    int argc = argv.getSize();


    [methodResult setMethodSignature:@"GenPropBag::boolProp"];

    
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
                params[i] = GenPropBag_makeInstanceByJSObject(argv.getItem(i).getString());
            }
            else {
                rho::json::CJSONEntry entry = argv.getItem(i);
                params[i] = [[CJSConverter convertFromJS:&entry rho_api_param:&(rho_api_params[i])] retain];
            }
            // TODO: Handle CMethodResultError
            if (params[i] == nil) {
                NSLog(@"GenPropBag::getBoolProp parameter %d is nil!", i);
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
        
        [GenPropBag_getBoolProp_caller getBoolProp_in_thread:[GenPropBag_getBoolProp_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        

        // FIXME: callback should not be retained, it must be saved outside of this call
        [methodResult retain];
    }
    else {
        // we do not have callback
        
        [GenPropBag_getBoolProp_caller getBoolProp:[GenPropBag_getBoolProp_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    rho::String resValue = rho::String("\"result\":null");
    if ((!method_receive_callback) && (method_return_result)) {
        resValue = [[methodResult toJSON] UTF8String];
    }
    [methodResult release];
    return resValue;
}


rho::String js_GenPropBag_getBoolProp(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    id<IGenPropBag> item = GenPropBag_makeInstanceByJSObject(strObjID);
    return js_GenPropBag_getBoolProp_Obj(argv, item, strCallbackID, strJsVmID, strCallbackParam);

}

rho::String js_s_GenPropBag_def_getBoolProp(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {
    id<IGenPropBagFactory> factory = [GenPropBagFactorySingleton getGenPropBagFactoryInstance];
    id<IGenPropBagSingleton> singleton = [factory getGenPropBagSingleton];

    NSString* defID = [singleton getDefaultID];

    id<IGenPropBag> item = [factory getGenPropBagByID:defID];
    return js_GenPropBag_getBoolProp_Obj(argv, item, strCallbackID, strJsVmID, strCallbackParam);
}







@interface GenPropBag_setBoolProp_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<IGenPropBag> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(GenPropBag_setBoolProp_caller_params*) makeParams:(NSArray*)_params _item:(id<IGenPropBag>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation GenPropBag_setBoolProp_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(GenPropBag_setBoolProp_caller_params*) makeParams:(NSArray*)_params _item:(id<IGenPropBag>)_item _methodResult:(CMethodResult*)_methodResult {
    GenPropBag_setBoolProp_caller_params* par = [[[GenPropBag_setBoolProp_caller_params alloc] init] autorelease];
    par.params = _params;
    par.item = _item;
    par.methodResult = [_methodResult retain];
    return [par retain];
}

@end


@interface GenPropBag_setBoolProp_caller : NSObject {

}
+(GenPropBag_setBoolProp_caller*) getSharedInstance;
+(void) setBoolProp:(GenPropBag_setBoolProp_caller_params*)caller_params;
+(void) setBoolProp_in_thread:(GenPropBag_setBoolProp_caller_params*)caller_params;
+(void) setBoolProp_in_UI_thread:(GenPropBag_setBoolProp_caller_params*)caller_params;

@end

static GenPropBag_setBoolProp_caller* our_GenPropBag_setBoolProp_caller = nil;

@implementation GenPropBag_setBoolProp_caller

+(GenPropBag_setBoolProp_caller*) getSharedInstance {
    if (our_GenPropBag_setBoolProp_caller == nil) {
        our_GenPropBag_setBoolProp_caller = [[GenPropBag_setBoolProp_caller alloc] init];
    }
    return our_GenPropBag_setBoolProp_caller;
}

-(void) command_setBoolProp:(GenPropBag_setBoolProp_caller_params*)caller_params {

    NSArray* params = caller_params.params;

    id<IGenPropBag> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem setBoolProp:(BOOL)[((NSNumber*)[params objectAtIndex:0]) boolValue] methodResult:methodResult ];
    [caller_params.methodResult release];
    [caller_params release];
}


+(void) setBoolProp:(GenPropBag_setBoolProp_caller_params*)caller_params {
    [[GenPropBag_setBoolProp_caller getSharedInstance] command_setBoolProp:caller_params];
}

+(void) setBoolProp_in_thread:(GenPropBag_setBoolProp_caller_params*)caller_params {
    [[GenPropBag_setBoolProp_caller getSharedInstance] performSelectorInBackground:@selector(command_setBoolProp:) withObject:caller_params];
}

+(void) setBoolProp_in_UI_thread:(GenPropBag_setBoolProp_caller_params*)caller_params {
    [[GenPropBag_setBoolProp_caller getSharedInstance] performSelectorOnMainThread:@selector(command_setBoolProp:) withObject:caller_params waitUntilDone:NO];
}


@end


rho::String js_GenPropBag_setBoolProp_Obj(rho::json::CJSONArray& argv, id<IGenPropBag>objItem, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[1+1];
    BOOL method_return_result = YES;
    BOOL method_receive_callback = NO;
    int argc = argv.getSize();


    [methodResult setMethodSignature:@"GenPropBag::boolProp="];

    
    static RHO_API_PARAM rho_api_params[] = { {RHO_API_BOOLEAN, 0, "boolProp", 0, 0 } };

    
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
                params[i] = GenPropBag_makeInstanceByJSObject(argv.getItem(i).getString());
            }
            else {
                rho::json::CJSONEntry entry = argv.getItem(i);
                params[i] = [[CJSConverter convertFromJS:&entry rho_api_param:&(rho_api_params[i])] retain];
            }
            // TODO: Handle CMethodResultError
            if (params[i] == nil) {
                NSLog(@"GenPropBag::setBoolProp parameter %d is nil!", i);
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
        
        [GenPropBag_setBoolProp_caller setBoolProp_in_thread:[GenPropBag_setBoolProp_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        

        // FIXME: callback should not be retained, it must be saved outside of this call
        [methodResult retain];
    }
    else {
        // we do not have callback
        
        [GenPropBag_setBoolProp_caller setBoolProp:[GenPropBag_setBoolProp_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    rho::String resValue = rho::String("\"result\":null");
    if ((!method_receive_callback) && (method_return_result)) {
        resValue = [[methodResult toJSON] UTF8String];
    }
    [methodResult release];
    return resValue;
}


rho::String js_GenPropBag_setBoolProp(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    id<IGenPropBag> item = GenPropBag_makeInstanceByJSObject(strObjID);
    return js_GenPropBag_setBoolProp_Obj(argv, item, strCallbackID, strJsVmID, strCallbackParam);

}

rho::String js_s_GenPropBag_def_setBoolProp(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {
    id<IGenPropBagFactory> factory = [GenPropBagFactorySingleton getGenPropBagFactoryInstance];
    id<IGenPropBagSingleton> singleton = [factory getGenPropBagSingleton];

    NSString* defID = [singleton getDefaultID];

    id<IGenPropBag> item = [factory getGenPropBagByID:defID];
    return js_GenPropBag_setBoolProp_Obj(argv, item, strCallbackID, strJsVmID, strCallbackParam);
}







@interface GenPropBag_getIntProp_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<IGenPropBag> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(GenPropBag_getIntProp_caller_params*) makeParams:(NSArray*)_params _item:(id<IGenPropBag>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation GenPropBag_getIntProp_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(GenPropBag_getIntProp_caller_params*) makeParams:(NSArray*)_params _item:(id<IGenPropBag>)_item _methodResult:(CMethodResult*)_methodResult {
    GenPropBag_getIntProp_caller_params* par = [[[GenPropBag_getIntProp_caller_params alloc] init] autorelease];
    par.params = _params;
    par.item = _item;
    par.methodResult = [_methodResult retain];
    return [par retain];
}

@end


@interface GenPropBag_getIntProp_caller : NSObject {

}
+(GenPropBag_getIntProp_caller*) getSharedInstance;
+(void) getIntProp:(GenPropBag_getIntProp_caller_params*)caller_params;
+(void) getIntProp_in_thread:(GenPropBag_getIntProp_caller_params*)caller_params;
+(void) getIntProp_in_UI_thread:(GenPropBag_getIntProp_caller_params*)caller_params;

@end

static GenPropBag_getIntProp_caller* our_GenPropBag_getIntProp_caller = nil;

@implementation GenPropBag_getIntProp_caller

+(GenPropBag_getIntProp_caller*) getSharedInstance {
    if (our_GenPropBag_getIntProp_caller == nil) {
        our_GenPropBag_getIntProp_caller = [[GenPropBag_getIntProp_caller alloc] init];
    }
    return our_GenPropBag_getIntProp_caller;
}

-(void) command_getIntProp:(GenPropBag_getIntProp_caller_params*)caller_params {

    id<IGenPropBag> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem getIntProp:methodResult ];
    [caller_params.methodResult release];
    [caller_params release];
}


+(void) getIntProp:(GenPropBag_getIntProp_caller_params*)caller_params {
    [[GenPropBag_getIntProp_caller getSharedInstance] command_getIntProp:caller_params];
}

+(void) getIntProp_in_thread:(GenPropBag_getIntProp_caller_params*)caller_params {
    [[GenPropBag_getIntProp_caller getSharedInstance] performSelectorInBackground:@selector(command_getIntProp:) withObject:caller_params];
}

+(void) getIntProp_in_UI_thread:(GenPropBag_getIntProp_caller_params*)caller_params {
    [[GenPropBag_getIntProp_caller getSharedInstance] performSelectorOnMainThread:@selector(command_getIntProp:) withObject:caller_params waitUntilDone:NO];
}


@end


rho::String js_GenPropBag_getIntProp_Obj(rho::json::CJSONArray& argv, id<IGenPropBag>objItem, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[0+1];
    BOOL method_return_result = YES;
    BOOL method_receive_callback = NO;
    int argc = argv.getSize();


    [methodResult setMethodSignature:@"GenPropBag::intProp"];

    
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
                params[i] = GenPropBag_makeInstanceByJSObject(argv.getItem(i).getString());
            }
            else {
                rho::json::CJSONEntry entry = argv.getItem(i);
                params[i] = [[CJSConverter convertFromJS:&entry rho_api_param:&(rho_api_params[i])] retain];
            }
            // TODO: Handle CMethodResultError
            if (params[i] == nil) {
                NSLog(@"GenPropBag::getIntProp parameter %d is nil!", i);
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
        
        [GenPropBag_getIntProp_caller getIntProp_in_thread:[GenPropBag_getIntProp_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        

        // FIXME: callback should not be retained, it must be saved outside of this call
        [methodResult retain];
    }
    else {
        // we do not have callback
        
        [GenPropBag_getIntProp_caller getIntProp:[GenPropBag_getIntProp_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    rho::String resValue = rho::String("\"result\":null");
    if ((!method_receive_callback) && (method_return_result)) {
        resValue = [[methodResult toJSON] UTF8String];
    }
    [methodResult release];
    return resValue;
}


rho::String js_GenPropBag_getIntProp(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    id<IGenPropBag> item = GenPropBag_makeInstanceByJSObject(strObjID);
    return js_GenPropBag_getIntProp_Obj(argv, item, strCallbackID, strJsVmID, strCallbackParam);

}

rho::String js_s_GenPropBag_def_getIntProp(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {
    id<IGenPropBagFactory> factory = [GenPropBagFactorySingleton getGenPropBagFactoryInstance];
    id<IGenPropBagSingleton> singleton = [factory getGenPropBagSingleton];

    NSString* defID = [singleton getDefaultID];

    id<IGenPropBag> item = [factory getGenPropBagByID:defID];
    return js_GenPropBag_getIntProp_Obj(argv, item, strCallbackID, strJsVmID, strCallbackParam);
}







@interface GenPropBag_setIntProp_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<IGenPropBag> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(GenPropBag_setIntProp_caller_params*) makeParams:(NSArray*)_params _item:(id<IGenPropBag>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation GenPropBag_setIntProp_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(GenPropBag_setIntProp_caller_params*) makeParams:(NSArray*)_params _item:(id<IGenPropBag>)_item _methodResult:(CMethodResult*)_methodResult {
    GenPropBag_setIntProp_caller_params* par = [[[GenPropBag_setIntProp_caller_params alloc] init] autorelease];
    par.params = _params;
    par.item = _item;
    par.methodResult = [_methodResult retain];
    return [par retain];
}

@end


@interface GenPropBag_setIntProp_caller : NSObject {

}
+(GenPropBag_setIntProp_caller*) getSharedInstance;
+(void) setIntProp:(GenPropBag_setIntProp_caller_params*)caller_params;
+(void) setIntProp_in_thread:(GenPropBag_setIntProp_caller_params*)caller_params;
+(void) setIntProp_in_UI_thread:(GenPropBag_setIntProp_caller_params*)caller_params;

@end

static GenPropBag_setIntProp_caller* our_GenPropBag_setIntProp_caller = nil;

@implementation GenPropBag_setIntProp_caller

+(GenPropBag_setIntProp_caller*) getSharedInstance {
    if (our_GenPropBag_setIntProp_caller == nil) {
        our_GenPropBag_setIntProp_caller = [[GenPropBag_setIntProp_caller alloc] init];
    }
    return our_GenPropBag_setIntProp_caller;
}

-(void) command_setIntProp:(GenPropBag_setIntProp_caller_params*)caller_params {

    NSArray* params = caller_params.params;

    id<IGenPropBag> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem setIntProp:(int)[((NSNumber*)[params objectAtIndex:0]) intValue] methodResult:methodResult ];
    [caller_params.methodResult release];
    [caller_params release];
}


+(void) setIntProp:(GenPropBag_setIntProp_caller_params*)caller_params {
    [[GenPropBag_setIntProp_caller getSharedInstance] command_setIntProp:caller_params];
}

+(void) setIntProp_in_thread:(GenPropBag_setIntProp_caller_params*)caller_params {
    [[GenPropBag_setIntProp_caller getSharedInstance] performSelectorInBackground:@selector(command_setIntProp:) withObject:caller_params];
}

+(void) setIntProp_in_UI_thread:(GenPropBag_setIntProp_caller_params*)caller_params {
    [[GenPropBag_setIntProp_caller getSharedInstance] performSelectorOnMainThread:@selector(command_setIntProp:) withObject:caller_params waitUntilDone:NO];
}


@end


rho::String js_GenPropBag_setIntProp_Obj(rho::json::CJSONArray& argv, id<IGenPropBag>objItem, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[1+1];
    BOOL method_return_result = YES;
    BOOL method_receive_callback = NO;
    int argc = argv.getSize();


    [methodResult setMethodSignature:@"GenPropBag::intProp="];

    
    static RHO_API_PARAM rho_api_params[] = { {RHO_API_INTEGER, 0, "intProp", 0, 0 } };

    
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
                params[i] = GenPropBag_makeInstanceByJSObject(argv.getItem(i).getString());
            }
            else {
                rho::json::CJSONEntry entry = argv.getItem(i);
                params[i] = [[CJSConverter convertFromJS:&entry rho_api_param:&(rho_api_params[i])] retain];
            }
            // TODO: Handle CMethodResultError
            if (params[i] == nil) {
                NSLog(@"GenPropBag::setIntProp parameter %d is nil!", i);
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
        
        [GenPropBag_setIntProp_caller setIntProp_in_thread:[GenPropBag_setIntProp_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        

        // FIXME: callback should not be retained, it must be saved outside of this call
        [methodResult retain];
    }
    else {
        // we do not have callback
        
        [GenPropBag_setIntProp_caller setIntProp:[GenPropBag_setIntProp_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    rho::String resValue = rho::String("\"result\":null");
    if ((!method_receive_callback) && (method_return_result)) {
        resValue = [[methodResult toJSON] UTF8String];
    }
    [methodResult release];
    return resValue;
}


rho::String js_GenPropBag_setIntProp(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    id<IGenPropBag> item = GenPropBag_makeInstanceByJSObject(strObjID);
    return js_GenPropBag_setIntProp_Obj(argv, item, strCallbackID, strJsVmID, strCallbackParam);

}

rho::String js_s_GenPropBag_def_setIntProp(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {
    id<IGenPropBagFactory> factory = [GenPropBagFactorySingleton getGenPropBagFactoryInstance];
    id<IGenPropBagSingleton> singleton = [factory getGenPropBagSingleton];

    NSString* defID = [singleton getDefaultID];

    id<IGenPropBag> item = [factory getGenPropBagByID:defID];
    return js_GenPropBag_setIntProp_Obj(argv, item, strCallbackID, strJsVmID, strCallbackParam);
}







@interface GenPropBag_getFloatProp_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<IGenPropBag> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(GenPropBag_getFloatProp_caller_params*) makeParams:(NSArray*)_params _item:(id<IGenPropBag>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation GenPropBag_getFloatProp_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(GenPropBag_getFloatProp_caller_params*) makeParams:(NSArray*)_params _item:(id<IGenPropBag>)_item _methodResult:(CMethodResult*)_methodResult {
    GenPropBag_getFloatProp_caller_params* par = [[[GenPropBag_getFloatProp_caller_params alloc] init] autorelease];
    par.params = _params;
    par.item = _item;
    par.methodResult = [_methodResult retain];
    return [par retain];
}

@end


@interface GenPropBag_getFloatProp_caller : NSObject {

}
+(GenPropBag_getFloatProp_caller*) getSharedInstance;
+(void) getFloatProp:(GenPropBag_getFloatProp_caller_params*)caller_params;
+(void) getFloatProp_in_thread:(GenPropBag_getFloatProp_caller_params*)caller_params;
+(void) getFloatProp_in_UI_thread:(GenPropBag_getFloatProp_caller_params*)caller_params;

@end

static GenPropBag_getFloatProp_caller* our_GenPropBag_getFloatProp_caller = nil;

@implementation GenPropBag_getFloatProp_caller

+(GenPropBag_getFloatProp_caller*) getSharedInstance {
    if (our_GenPropBag_getFloatProp_caller == nil) {
        our_GenPropBag_getFloatProp_caller = [[GenPropBag_getFloatProp_caller alloc] init];
    }
    return our_GenPropBag_getFloatProp_caller;
}

-(void) command_getFloatProp:(GenPropBag_getFloatProp_caller_params*)caller_params {

    id<IGenPropBag> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem getFloatProp:methodResult ];
    [caller_params.methodResult release];
    [caller_params release];
}


+(void) getFloatProp:(GenPropBag_getFloatProp_caller_params*)caller_params {
    [[GenPropBag_getFloatProp_caller getSharedInstance] command_getFloatProp:caller_params];
}

+(void) getFloatProp_in_thread:(GenPropBag_getFloatProp_caller_params*)caller_params {
    [[GenPropBag_getFloatProp_caller getSharedInstance] performSelectorInBackground:@selector(command_getFloatProp:) withObject:caller_params];
}

+(void) getFloatProp_in_UI_thread:(GenPropBag_getFloatProp_caller_params*)caller_params {
    [[GenPropBag_getFloatProp_caller getSharedInstance] performSelectorOnMainThread:@selector(command_getFloatProp:) withObject:caller_params waitUntilDone:NO];
}


@end


rho::String js_GenPropBag_getFloatProp_Obj(rho::json::CJSONArray& argv, id<IGenPropBag>objItem, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[0+1];
    BOOL method_return_result = YES;
    BOOL method_receive_callback = NO;
    int argc = argv.getSize();


    [methodResult setMethodSignature:@"GenPropBag::floatProp"];

    
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
                params[i] = GenPropBag_makeInstanceByJSObject(argv.getItem(i).getString());
            }
            else {
                rho::json::CJSONEntry entry = argv.getItem(i);
                params[i] = [[CJSConverter convertFromJS:&entry rho_api_param:&(rho_api_params[i])] retain];
            }
            // TODO: Handle CMethodResultError
            if (params[i] == nil) {
                NSLog(@"GenPropBag::getFloatProp parameter %d is nil!", i);
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
        
        [GenPropBag_getFloatProp_caller getFloatProp_in_thread:[GenPropBag_getFloatProp_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        

        // FIXME: callback should not be retained, it must be saved outside of this call
        [methodResult retain];
    }
    else {
        // we do not have callback
        
        [GenPropBag_getFloatProp_caller getFloatProp:[GenPropBag_getFloatProp_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    rho::String resValue = rho::String("\"result\":null");
    if ((!method_receive_callback) && (method_return_result)) {
        resValue = [[methodResult toJSON] UTF8String];
    }
    [methodResult release];
    return resValue;
}


rho::String js_GenPropBag_getFloatProp(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    id<IGenPropBag> item = GenPropBag_makeInstanceByJSObject(strObjID);
    return js_GenPropBag_getFloatProp_Obj(argv, item, strCallbackID, strJsVmID, strCallbackParam);

}

rho::String js_s_GenPropBag_def_getFloatProp(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {
    id<IGenPropBagFactory> factory = [GenPropBagFactorySingleton getGenPropBagFactoryInstance];
    id<IGenPropBagSingleton> singleton = [factory getGenPropBagSingleton];

    NSString* defID = [singleton getDefaultID];

    id<IGenPropBag> item = [factory getGenPropBagByID:defID];
    return js_GenPropBag_getFloatProp_Obj(argv, item, strCallbackID, strJsVmID, strCallbackParam);
}







@interface GenPropBag_setFloatProp_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<IGenPropBag> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(GenPropBag_setFloatProp_caller_params*) makeParams:(NSArray*)_params _item:(id<IGenPropBag>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation GenPropBag_setFloatProp_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(GenPropBag_setFloatProp_caller_params*) makeParams:(NSArray*)_params _item:(id<IGenPropBag>)_item _methodResult:(CMethodResult*)_methodResult {
    GenPropBag_setFloatProp_caller_params* par = [[[GenPropBag_setFloatProp_caller_params alloc] init] autorelease];
    par.params = _params;
    par.item = _item;
    par.methodResult = [_methodResult retain];
    return [par retain];
}

@end


@interface GenPropBag_setFloatProp_caller : NSObject {

}
+(GenPropBag_setFloatProp_caller*) getSharedInstance;
+(void) setFloatProp:(GenPropBag_setFloatProp_caller_params*)caller_params;
+(void) setFloatProp_in_thread:(GenPropBag_setFloatProp_caller_params*)caller_params;
+(void) setFloatProp_in_UI_thread:(GenPropBag_setFloatProp_caller_params*)caller_params;

@end

static GenPropBag_setFloatProp_caller* our_GenPropBag_setFloatProp_caller = nil;

@implementation GenPropBag_setFloatProp_caller

+(GenPropBag_setFloatProp_caller*) getSharedInstance {
    if (our_GenPropBag_setFloatProp_caller == nil) {
        our_GenPropBag_setFloatProp_caller = [[GenPropBag_setFloatProp_caller alloc] init];
    }
    return our_GenPropBag_setFloatProp_caller;
}

-(void) command_setFloatProp:(GenPropBag_setFloatProp_caller_params*)caller_params {

    NSArray* params = caller_params.params;

    id<IGenPropBag> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem setFloatProp:(float)[((NSNumber*)[params objectAtIndex:0]) floatValue] methodResult:methodResult ];
    [caller_params.methodResult release];
    [caller_params release];
}


+(void) setFloatProp:(GenPropBag_setFloatProp_caller_params*)caller_params {
    [[GenPropBag_setFloatProp_caller getSharedInstance] command_setFloatProp:caller_params];
}

+(void) setFloatProp_in_thread:(GenPropBag_setFloatProp_caller_params*)caller_params {
    [[GenPropBag_setFloatProp_caller getSharedInstance] performSelectorInBackground:@selector(command_setFloatProp:) withObject:caller_params];
}

+(void) setFloatProp_in_UI_thread:(GenPropBag_setFloatProp_caller_params*)caller_params {
    [[GenPropBag_setFloatProp_caller getSharedInstance] performSelectorOnMainThread:@selector(command_setFloatProp:) withObject:caller_params waitUntilDone:NO];
}


@end


rho::String js_GenPropBag_setFloatProp_Obj(rho::json::CJSONArray& argv, id<IGenPropBag>objItem, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[1+1];
    BOOL method_return_result = YES;
    BOOL method_receive_callback = NO;
    int argc = argv.getSize();


    [methodResult setMethodSignature:@"GenPropBag::floatProp="];

    
    static RHO_API_PARAM rho_api_params[] = { {RHO_API_FLOAT, 0, "floatProp", 0, 0 } };

    
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
                params[i] = GenPropBag_makeInstanceByJSObject(argv.getItem(i).getString());
            }
            else {
                rho::json::CJSONEntry entry = argv.getItem(i);
                params[i] = [[CJSConverter convertFromJS:&entry rho_api_param:&(rho_api_params[i])] retain];
            }
            // TODO: Handle CMethodResultError
            if (params[i] == nil) {
                NSLog(@"GenPropBag::setFloatProp parameter %d is nil!", i);
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
        
        [GenPropBag_setFloatProp_caller setFloatProp_in_thread:[GenPropBag_setFloatProp_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        

        // FIXME: callback should not be retained, it must be saved outside of this call
        [methodResult retain];
    }
    else {
        // we do not have callback
        
        [GenPropBag_setFloatProp_caller setFloatProp:[GenPropBag_setFloatProp_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    rho::String resValue = rho::String("\"result\":null");
    if ((!method_receive_callback) && (method_return_result)) {
        resValue = [[methodResult toJSON] UTF8String];
    }
    [methodResult release];
    return resValue;
}


rho::String js_GenPropBag_setFloatProp(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    id<IGenPropBag> item = GenPropBag_makeInstanceByJSObject(strObjID);
    return js_GenPropBag_setFloatProp_Obj(argv, item, strCallbackID, strJsVmID, strCallbackParam);

}

rho::String js_s_GenPropBag_def_setFloatProp(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {
    id<IGenPropBagFactory> factory = [GenPropBagFactorySingleton getGenPropBagFactoryInstance];
    id<IGenPropBagSingleton> singleton = [factory getGenPropBagSingleton];

    NSString* defID = [singleton getDefaultID];

    id<IGenPropBag> item = [factory getGenPropBagByID:defID];
    return js_GenPropBag_setFloatProp_Obj(argv, item, strCallbackID, strJsVmID, strCallbackParam);
}







@interface GenPropBag_getStringProp_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<IGenPropBag> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(GenPropBag_getStringProp_caller_params*) makeParams:(NSArray*)_params _item:(id<IGenPropBag>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation GenPropBag_getStringProp_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(GenPropBag_getStringProp_caller_params*) makeParams:(NSArray*)_params _item:(id<IGenPropBag>)_item _methodResult:(CMethodResult*)_methodResult {
    GenPropBag_getStringProp_caller_params* par = [[[GenPropBag_getStringProp_caller_params alloc] init] autorelease];
    par.params = _params;
    par.item = _item;
    par.methodResult = [_methodResult retain];
    return [par retain];
}

@end


@interface GenPropBag_getStringProp_caller : NSObject {

}
+(GenPropBag_getStringProp_caller*) getSharedInstance;
+(void) getStringProp:(GenPropBag_getStringProp_caller_params*)caller_params;
+(void) getStringProp_in_thread:(GenPropBag_getStringProp_caller_params*)caller_params;
+(void) getStringProp_in_UI_thread:(GenPropBag_getStringProp_caller_params*)caller_params;

@end

static GenPropBag_getStringProp_caller* our_GenPropBag_getStringProp_caller = nil;

@implementation GenPropBag_getStringProp_caller

+(GenPropBag_getStringProp_caller*) getSharedInstance {
    if (our_GenPropBag_getStringProp_caller == nil) {
        our_GenPropBag_getStringProp_caller = [[GenPropBag_getStringProp_caller alloc] init];
    }
    return our_GenPropBag_getStringProp_caller;
}

-(void) command_getStringProp:(GenPropBag_getStringProp_caller_params*)caller_params {

    id<IGenPropBag> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem getStringProp:methodResult ];
    [caller_params.methodResult release];
    [caller_params release];
}


+(void) getStringProp:(GenPropBag_getStringProp_caller_params*)caller_params {
    [[GenPropBag_getStringProp_caller getSharedInstance] command_getStringProp:caller_params];
}

+(void) getStringProp_in_thread:(GenPropBag_getStringProp_caller_params*)caller_params {
    [[GenPropBag_getStringProp_caller getSharedInstance] performSelectorInBackground:@selector(command_getStringProp:) withObject:caller_params];
}

+(void) getStringProp_in_UI_thread:(GenPropBag_getStringProp_caller_params*)caller_params {
    [[GenPropBag_getStringProp_caller getSharedInstance] performSelectorOnMainThread:@selector(command_getStringProp:) withObject:caller_params waitUntilDone:NO];
}


@end


rho::String js_GenPropBag_getStringProp_Obj(rho::json::CJSONArray& argv, id<IGenPropBag>objItem, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[0+1];
    BOOL method_return_result = YES;
    BOOL method_receive_callback = NO;
    int argc = argv.getSize();


    [methodResult setMethodSignature:@"GenPropBag::stringProp"];

    
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
                params[i] = GenPropBag_makeInstanceByJSObject(argv.getItem(i).getString());
            }
            else {
                rho::json::CJSONEntry entry = argv.getItem(i);
                params[i] = [[CJSConverter convertFromJS:&entry rho_api_param:&(rho_api_params[i])] retain];
            }
            // TODO: Handle CMethodResultError
            if (params[i] == nil) {
                NSLog(@"GenPropBag::getStringProp parameter %d is nil!", i);
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
        
        [GenPropBag_getStringProp_caller getStringProp_in_thread:[GenPropBag_getStringProp_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        

        // FIXME: callback should not be retained, it must be saved outside of this call
        [methodResult retain];
    }
    else {
        // we do not have callback
        
        [GenPropBag_getStringProp_caller getStringProp:[GenPropBag_getStringProp_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    rho::String resValue = rho::String("\"result\":null");
    if ((!method_receive_callback) && (method_return_result)) {
        resValue = [[methodResult toJSON] UTF8String];
    }
    [methodResult release];
    return resValue;
}


rho::String js_GenPropBag_getStringProp(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    id<IGenPropBag> item = GenPropBag_makeInstanceByJSObject(strObjID);
    return js_GenPropBag_getStringProp_Obj(argv, item, strCallbackID, strJsVmID, strCallbackParam);

}

rho::String js_s_GenPropBag_def_getStringProp(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {
    id<IGenPropBagFactory> factory = [GenPropBagFactorySingleton getGenPropBagFactoryInstance];
    id<IGenPropBagSingleton> singleton = [factory getGenPropBagSingleton];

    NSString* defID = [singleton getDefaultID];

    id<IGenPropBag> item = [factory getGenPropBagByID:defID];
    return js_GenPropBag_getStringProp_Obj(argv, item, strCallbackID, strJsVmID, strCallbackParam);
}







@interface GenPropBag_setStringProp_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<IGenPropBag> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(GenPropBag_setStringProp_caller_params*) makeParams:(NSArray*)_params _item:(id<IGenPropBag>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation GenPropBag_setStringProp_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(GenPropBag_setStringProp_caller_params*) makeParams:(NSArray*)_params _item:(id<IGenPropBag>)_item _methodResult:(CMethodResult*)_methodResult {
    GenPropBag_setStringProp_caller_params* par = [[[GenPropBag_setStringProp_caller_params alloc] init] autorelease];
    par.params = _params;
    par.item = _item;
    par.methodResult = [_methodResult retain];
    return [par retain];
}

@end


@interface GenPropBag_setStringProp_caller : NSObject {

}
+(GenPropBag_setStringProp_caller*) getSharedInstance;
+(void) setStringProp:(GenPropBag_setStringProp_caller_params*)caller_params;
+(void) setStringProp_in_thread:(GenPropBag_setStringProp_caller_params*)caller_params;
+(void) setStringProp_in_UI_thread:(GenPropBag_setStringProp_caller_params*)caller_params;

@end

static GenPropBag_setStringProp_caller* our_GenPropBag_setStringProp_caller = nil;

@implementation GenPropBag_setStringProp_caller

+(GenPropBag_setStringProp_caller*) getSharedInstance {
    if (our_GenPropBag_setStringProp_caller == nil) {
        our_GenPropBag_setStringProp_caller = [[GenPropBag_setStringProp_caller alloc] init];
    }
    return our_GenPropBag_setStringProp_caller;
}

-(void) command_setStringProp:(GenPropBag_setStringProp_caller_params*)caller_params {

    NSArray* params = caller_params.params;

    id<IGenPropBag> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem setStringProp:(NSString*)[params objectAtIndex:0] methodResult:methodResult ];
    [caller_params.methodResult release];
    [caller_params release];
}


+(void) setStringProp:(GenPropBag_setStringProp_caller_params*)caller_params {
    [[GenPropBag_setStringProp_caller getSharedInstance] command_setStringProp:caller_params];
}

+(void) setStringProp_in_thread:(GenPropBag_setStringProp_caller_params*)caller_params {
    [[GenPropBag_setStringProp_caller getSharedInstance] performSelectorInBackground:@selector(command_setStringProp:) withObject:caller_params];
}

+(void) setStringProp_in_UI_thread:(GenPropBag_setStringProp_caller_params*)caller_params {
    [[GenPropBag_setStringProp_caller getSharedInstance] performSelectorOnMainThread:@selector(command_setStringProp:) withObject:caller_params waitUntilDone:NO];
}


@end


rho::String js_GenPropBag_setStringProp_Obj(rho::json::CJSONArray& argv, id<IGenPropBag>objItem, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[1+1];
    BOOL method_return_result = YES;
    BOOL method_receive_callback = NO;
    int argc = argv.getSize();


    [methodResult setMethodSignature:@"GenPropBag::stringProp="];

    
    static RHO_API_PARAM rho_api_params[] = { {RHO_API_STRING, 0, "stringProp", 0, 0 } };

    
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
                params[i] = GenPropBag_makeInstanceByJSObject(argv.getItem(i).getString());
            }
            else {
                rho::json::CJSONEntry entry = argv.getItem(i);
                params[i] = [[CJSConverter convertFromJS:&entry rho_api_param:&(rho_api_params[i])] retain];
            }
            // TODO: Handle CMethodResultError
            if (params[i] == nil) {
                NSLog(@"GenPropBag::setStringProp parameter %d is nil!", i);
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
        
        [GenPropBag_setStringProp_caller setStringProp_in_thread:[GenPropBag_setStringProp_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        

        // FIXME: callback should not be retained, it must be saved outside of this call
        [methodResult retain];
    }
    else {
        // we do not have callback
        
        [GenPropBag_setStringProp_caller setStringProp:[GenPropBag_setStringProp_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    rho::String resValue = rho::String("\"result\":null");
    if ((!method_receive_callback) && (method_return_result)) {
        resValue = [[methodResult toJSON] UTF8String];
    }
    [methodResult release];
    return resValue;
}


rho::String js_GenPropBag_setStringProp(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    id<IGenPropBag> item = GenPropBag_makeInstanceByJSObject(strObjID);
    return js_GenPropBag_setStringProp_Obj(argv, item, strCallbackID, strJsVmID, strCallbackParam);

}

rho::String js_s_GenPropBag_def_setStringProp(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {
    id<IGenPropBagFactory> factory = [GenPropBagFactorySingleton getGenPropBagFactoryInstance];
    id<IGenPropBagSingleton> singleton = [factory getGenPropBagSingleton];

    NSString* defID = [singleton getDefaultID];

    id<IGenPropBag> item = [factory getGenPropBagByID:defID];
    return js_GenPropBag_setStringProp_Obj(argv, item, strCallbackID, strJsVmID, strCallbackParam);
}







@interface GenPropBag_enumerate_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<IGenPropBagSingleton> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(GenPropBag_enumerate_caller_params*) makeParams:(NSArray*)_params _item:(id<IGenPropBagSingleton>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation GenPropBag_enumerate_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(GenPropBag_enumerate_caller_params*) makeParams:(NSArray*)_params _item:(id<IGenPropBagSingleton>)_item _methodResult:(CMethodResult*)_methodResult {
    GenPropBag_enumerate_caller_params* par = [[[GenPropBag_enumerate_caller_params alloc] init] autorelease];
    par.params = _params;
    par.item = _item;
    par.methodResult = [_methodResult retain];
    return [par retain];
}

@end


@interface GenPropBag_enumerate_caller : NSObject {

}
+(GenPropBag_enumerate_caller*) getSharedInstance;
+(void) enumerate:(GenPropBag_enumerate_caller_params*)caller_params;
+(void) enumerate_in_thread:(GenPropBag_enumerate_caller_params*)caller_params;
+(void) enumerate_in_UI_thread:(GenPropBag_enumerate_caller_params*)caller_params;

@end

static GenPropBag_enumerate_caller* our_GenPropBag_enumerate_caller = nil;

@implementation GenPropBag_enumerate_caller

+(GenPropBag_enumerate_caller*) getSharedInstance {
    if (our_GenPropBag_enumerate_caller == nil) {
        our_GenPropBag_enumerate_caller = [[GenPropBag_enumerate_caller alloc] init];
    }
    return our_GenPropBag_enumerate_caller;
}

-(void) command_enumerate:(GenPropBag_enumerate_caller_params*)caller_params {

    id<IGenPropBagSingleton> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem enumerate:methodResult ];
    [caller_params.methodResult release];
    [caller_params release];
}


+(void) enumerate:(GenPropBag_enumerate_caller_params*)caller_params {
    [[GenPropBag_enumerate_caller getSharedInstance] command_enumerate:caller_params];
}

+(void) enumerate_in_thread:(GenPropBag_enumerate_caller_params*)caller_params {
    [[GenPropBag_enumerate_caller getSharedInstance] performSelectorInBackground:@selector(command_enumerate:) withObject:caller_params];
}

+(void) enumerate_in_UI_thread:(GenPropBag_enumerate_caller_params*)caller_params {
    [[GenPropBag_enumerate_caller getSharedInstance] performSelectorOnMainThread:@selector(command_enumerate:) withObject:caller_params waitUntilDone:NO];
}


@end


rho::String js_GenPropBag_enumerate_Obj(rho::json::CJSONArray& argv, id<IGenPropBagSingleton>objItem, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[0+1];
    BOOL method_return_result = YES;
    BOOL method_receive_callback = NO;
    int argc = argv.getSize();


    [methodResult setMethodSignature:@"GenPropBag::enumerate"];

    
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
                params[i] = GenPropBag_makeInstanceByJSObject(argv.getItem(i).getString());
            }
            else {
                rho::json::CJSONEntry entry = argv.getItem(i);
                params[i] = [[CJSConverter convertFromJS:&entry rho_api_param:&(rho_api_params[i])] retain];
            }
            // TODO: Handle CMethodResultError
            if (params[i] == nil) {
                NSLog(@"GenPropBag::enumerate parameter %d is nil!", i);
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
    

    [methodResult enableObjectCreationModeWithJSClassPath:@"Rho.GenPropBag"];

    if (method_receive_callback) {
        // we have callback - method should not call setResult if method execute from current thread - only later or in UI or separated threads !!!
        [methodResult setJSCallback:[NSString stringWithUTF8String:strCallbackID.c_str()] webViewUID:[NSString stringWithUTF8String:strJsVmID.c_str()]];
        [methodResult setCallbackParam:[NSString stringWithUTF8String:strCallbackParam.c_str()]];
        
        [GenPropBag_enumerate_caller enumerate_in_thread:[GenPropBag_enumerate_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        

        // FIXME: callback should not be retained, it must be saved outside of this call
        [methodResult retain];
    }
    else {
        // we do not have callback
        
        [GenPropBag_enumerate_caller enumerate:[GenPropBag_enumerate_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    rho::String resValue = rho::String("\"result\":null");
    if ((!method_receive_callback) && (method_return_result)) {
        resValue = [[methodResult toJSON] UTF8String];
    }
    [methodResult release];
    return resValue;
}


rho::String js_s_GenPropBag_enumerate(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    id<IGenPropBagFactory> factory = [GenPropBagFactorySingleton getGenPropBagFactoryInstance];
    id<IGenPropBagSingleton> singleton = [factory getGenPropBagSingleton];
    return js_GenPropBag_enumerate_Obj(argv, singleton, strCallbackID, strJsVmID, strCallbackParam);

}







@interface GenPropBag_getProperty_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<IGenPropBag> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(GenPropBag_getProperty_caller_params*) makeParams:(NSArray*)_params _item:(id<IGenPropBag>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation GenPropBag_getProperty_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(GenPropBag_getProperty_caller_params*) makeParams:(NSArray*)_params _item:(id<IGenPropBag>)_item _methodResult:(CMethodResult*)_methodResult {
    GenPropBag_getProperty_caller_params* par = [[[GenPropBag_getProperty_caller_params alloc] init] autorelease];
    par.params = _params;
    par.item = _item;
    par.methodResult = [_methodResult retain];
    return [par retain];
}

@end


@interface GenPropBag_getProperty_caller : NSObject {

}
+(GenPropBag_getProperty_caller*) getSharedInstance;
+(void) getProperty:(GenPropBag_getProperty_caller_params*)caller_params;
+(void) getProperty_in_thread:(GenPropBag_getProperty_caller_params*)caller_params;
+(void) getProperty_in_UI_thread:(GenPropBag_getProperty_caller_params*)caller_params;

@end

static GenPropBag_getProperty_caller* our_GenPropBag_getProperty_caller = nil;

@implementation GenPropBag_getProperty_caller

+(GenPropBag_getProperty_caller*) getSharedInstance {
    if (our_GenPropBag_getProperty_caller == nil) {
        our_GenPropBag_getProperty_caller = [[GenPropBag_getProperty_caller alloc] init];
    }
    return our_GenPropBag_getProperty_caller;
}

-(void) command_getProperty:(GenPropBag_getProperty_caller_params*)caller_params {

    NSArray* params = caller_params.params;

    id<IGenPropBag> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem getProperty:(NSString*)[params objectAtIndex:0] methodResult:methodResult ];
    [caller_params.methodResult release];
    [caller_params release];
}


+(void) getProperty:(GenPropBag_getProperty_caller_params*)caller_params {
    [[GenPropBag_getProperty_caller getSharedInstance] command_getProperty:caller_params];
}

+(void) getProperty_in_thread:(GenPropBag_getProperty_caller_params*)caller_params {
    [[GenPropBag_getProperty_caller getSharedInstance] performSelectorInBackground:@selector(command_getProperty:) withObject:caller_params];
}

+(void) getProperty_in_UI_thread:(GenPropBag_getProperty_caller_params*)caller_params {
    [[GenPropBag_getProperty_caller getSharedInstance] performSelectorOnMainThread:@selector(command_getProperty:) withObject:caller_params waitUntilDone:NO];
}


@end


rho::String js_GenPropBag_getProperty_Obj(rho::json::CJSONArray& argv, id<IGenPropBag>objItem, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[1+1];
    BOOL method_return_result = YES;
    BOOL method_receive_callback = NO;
    int argc = argv.getSize();


    [methodResult setMethodSignature:@"GenPropBag::getProperty"];

    
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
                params[i] = GenPropBag_makeInstanceByJSObject(argv.getItem(i).getString());
            }
            else {
                rho::json::CJSONEntry entry = argv.getItem(i);
                params[i] = [[CJSConverter convertFromJS:&entry rho_api_param:&(rho_api_params[i])] retain];
            }
            // TODO: Handle CMethodResultError
            if (params[i] == nil) {
                NSLog(@"GenPropBag::getProperty parameter %d is nil!", i);
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
        
        [GenPropBag_getProperty_caller getProperty_in_thread:[GenPropBag_getProperty_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        

        // FIXME: callback should not be retained, it must be saved outside of this call
        [methodResult retain];
    }
    else {
        // we do not have callback
        
        [GenPropBag_getProperty_caller getProperty:[GenPropBag_getProperty_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    rho::String resValue = rho::String("\"result\":null");
    if ((!method_receive_callback) && (method_return_result)) {
        resValue = [[methodResult toJSON] UTF8String];
    }
    [methodResult release];
    return resValue;
}


rho::String js_GenPropBag_getProperty(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    id<IGenPropBag> item = GenPropBag_makeInstanceByJSObject(strObjID);
    return js_GenPropBag_getProperty_Obj(argv, item, strCallbackID, strJsVmID, strCallbackParam);

}

rho::String js_s_GenPropBag_def_getProperty(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {
    id<IGenPropBagFactory> factory = [GenPropBagFactorySingleton getGenPropBagFactoryInstance];
    id<IGenPropBagSingleton> singleton = [factory getGenPropBagSingleton];

    NSString* defID = [singleton getDefaultID];

    id<IGenPropBag> item = [factory getGenPropBagByID:defID];
    return js_GenPropBag_getProperty_Obj(argv, item, strCallbackID, strJsVmID, strCallbackParam);
}







@interface GenPropBag_getProperties_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<IGenPropBag> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(GenPropBag_getProperties_caller_params*) makeParams:(NSArray*)_params _item:(id<IGenPropBag>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation GenPropBag_getProperties_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(GenPropBag_getProperties_caller_params*) makeParams:(NSArray*)_params _item:(id<IGenPropBag>)_item _methodResult:(CMethodResult*)_methodResult {
    GenPropBag_getProperties_caller_params* par = [[[GenPropBag_getProperties_caller_params alloc] init] autorelease];
    par.params = _params;
    par.item = _item;
    par.methodResult = [_methodResult retain];
    return [par retain];
}

@end


@interface GenPropBag_getProperties_caller : NSObject {

}
+(GenPropBag_getProperties_caller*) getSharedInstance;
+(void) getProperties:(GenPropBag_getProperties_caller_params*)caller_params;
+(void) getProperties_in_thread:(GenPropBag_getProperties_caller_params*)caller_params;
+(void) getProperties_in_UI_thread:(GenPropBag_getProperties_caller_params*)caller_params;

@end

static GenPropBag_getProperties_caller* our_GenPropBag_getProperties_caller = nil;

@implementation GenPropBag_getProperties_caller

+(GenPropBag_getProperties_caller*) getSharedInstance {
    if (our_GenPropBag_getProperties_caller == nil) {
        our_GenPropBag_getProperties_caller = [[GenPropBag_getProperties_caller alloc] init];
    }
    return our_GenPropBag_getProperties_caller;
}

-(void) command_getProperties:(GenPropBag_getProperties_caller_params*)caller_params {

    NSArray* params = caller_params.params;

    id<IGenPropBag> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem getProperties:(NSArray*)[params objectAtIndex:0] methodResult:methodResult ];
    [caller_params.methodResult release];
    [caller_params release];
}


+(void) getProperties:(GenPropBag_getProperties_caller_params*)caller_params {
    [[GenPropBag_getProperties_caller getSharedInstance] command_getProperties:caller_params];
}

+(void) getProperties_in_thread:(GenPropBag_getProperties_caller_params*)caller_params {
    [[GenPropBag_getProperties_caller getSharedInstance] performSelectorInBackground:@selector(command_getProperties:) withObject:caller_params];
}

+(void) getProperties_in_UI_thread:(GenPropBag_getProperties_caller_params*)caller_params {
    [[GenPropBag_getProperties_caller getSharedInstance] performSelectorOnMainThread:@selector(command_getProperties:) withObject:caller_params waitUntilDone:NO];
}


@end


rho::String js_GenPropBag_getProperties_Obj(rho::json::CJSONArray& argv, id<IGenPropBag>objItem, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[1+1];
    BOOL method_return_result = YES;
    BOOL method_receive_callback = NO;
    int argc = argv.getSize();


    [methodResult setMethodSignature:@"GenPropBag::getProperties"];

    
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
                params[i] = GenPropBag_makeInstanceByJSObject(argv.getItem(i).getString());
            }
            else {
                rho::json::CJSONEntry entry = argv.getItem(i);
                params[i] = [[CJSConverter convertFromJS:&entry rho_api_param:&(rho_api_params[i])] retain];
            }
            // TODO: Handle CMethodResultError
            if (params[i] == nil) {
                NSLog(@"GenPropBag::getProperties parameter %d is nil!", i);
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
        
        [GenPropBag_getProperties_caller getProperties_in_thread:[GenPropBag_getProperties_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        

        // FIXME: callback should not be retained, it must be saved outside of this call
        [methodResult retain];
    }
    else {
        // we do not have callback
        
        [GenPropBag_getProperties_caller getProperties:[GenPropBag_getProperties_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    rho::String resValue = rho::String("\"result\":null");
    if ((!method_receive_callback) && (method_return_result)) {
        resValue = [[methodResult toJSON] UTF8String];
    }
    [methodResult release];
    return resValue;
}


rho::String js_GenPropBag_getProperties(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    id<IGenPropBag> item = GenPropBag_makeInstanceByJSObject(strObjID);
    return js_GenPropBag_getProperties_Obj(argv, item, strCallbackID, strJsVmID, strCallbackParam);

}

rho::String js_s_GenPropBag_def_getProperties(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {
    id<IGenPropBagFactory> factory = [GenPropBagFactorySingleton getGenPropBagFactoryInstance];
    id<IGenPropBagSingleton> singleton = [factory getGenPropBagSingleton];

    NSString* defID = [singleton getDefaultID];

    id<IGenPropBag> item = [factory getGenPropBagByID:defID];
    return js_GenPropBag_getProperties_Obj(argv, item, strCallbackID, strJsVmID, strCallbackParam);
}







@interface GenPropBag_getAllProperties_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<IGenPropBag> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(GenPropBag_getAllProperties_caller_params*) makeParams:(NSArray*)_params _item:(id<IGenPropBag>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation GenPropBag_getAllProperties_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(GenPropBag_getAllProperties_caller_params*) makeParams:(NSArray*)_params _item:(id<IGenPropBag>)_item _methodResult:(CMethodResult*)_methodResult {
    GenPropBag_getAllProperties_caller_params* par = [[[GenPropBag_getAllProperties_caller_params alloc] init] autorelease];
    par.params = _params;
    par.item = _item;
    par.methodResult = [_methodResult retain];
    return [par retain];
}

@end


@interface GenPropBag_getAllProperties_caller : NSObject {

}
+(GenPropBag_getAllProperties_caller*) getSharedInstance;
+(void) getAllProperties:(GenPropBag_getAllProperties_caller_params*)caller_params;
+(void) getAllProperties_in_thread:(GenPropBag_getAllProperties_caller_params*)caller_params;
+(void) getAllProperties_in_UI_thread:(GenPropBag_getAllProperties_caller_params*)caller_params;

@end

static GenPropBag_getAllProperties_caller* our_GenPropBag_getAllProperties_caller = nil;

@implementation GenPropBag_getAllProperties_caller

+(GenPropBag_getAllProperties_caller*) getSharedInstance {
    if (our_GenPropBag_getAllProperties_caller == nil) {
        our_GenPropBag_getAllProperties_caller = [[GenPropBag_getAllProperties_caller alloc] init];
    }
    return our_GenPropBag_getAllProperties_caller;
}

-(void) command_getAllProperties:(GenPropBag_getAllProperties_caller_params*)caller_params {

    id<IGenPropBag> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem getAllProperties:methodResult ];
    [caller_params.methodResult release];
    [caller_params release];
}


+(void) getAllProperties:(GenPropBag_getAllProperties_caller_params*)caller_params {
    [[GenPropBag_getAllProperties_caller getSharedInstance] command_getAllProperties:caller_params];
}

+(void) getAllProperties_in_thread:(GenPropBag_getAllProperties_caller_params*)caller_params {
    [[GenPropBag_getAllProperties_caller getSharedInstance] performSelectorInBackground:@selector(command_getAllProperties:) withObject:caller_params];
}

+(void) getAllProperties_in_UI_thread:(GenPropBag_getAllProperties_caller_params*)caller_params {
    [[GenPropBag_getAllProperties_caller getSharedInstance] performSelectorOnMainThread:@selector(command_getAllProperties:) withObject:caller_params waitUntilDone:NO];
}


@end


rho::String js_GenPropBag_getAllProperties_Obj(rho::json::CJSONArray& argv, id<IGenPropBag>objItem, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[0+1];
    BOOL method_return_result = YES;
    BOOL method_receive_callback = NO;
    int argc = argv.getSize();


    [methodResult setMethodSignature:@"GenPropBag::getAllProperties"];

    
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
                params[i] = GenPropBag_makeInstanceByJSObject(argv.getItem(i).getString());
            }
            else {
                rho::json::CJSONEntry entry = argv.getItem(i);
                params[i] = [[CJSConverter convertFromJS:&entry rho_api_param:&(rho_api_params[i])] retain];
            }
            // TODO: Handle CMethodResultError
            if (params[i] == nil) {
                NSLog(@"GenPropBag::getAllProperties parameter %d is nil!", i);
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
        
        [GenPropBag_getAllProperties_caller getAllProperties_in_thread:[GenPropBag_getAllProperties_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        

        // FIXME: callback should not be retained, it must be saved outside of this call
        [methodResult retain];
    }
    else {
        // we do not have callback
        
        [GenPropBag_getAllProperties_caller getAllProperties:[GenPropBag_getAllProperties_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    rho::String resValue = rho::String("\"result\":null");
    if ((!method_receive_callback) && (method_return_result)) {
        resValue = [[methodResult toJSON] UTF8String];
    }
    [methodResult release];
    return resValue;
}


rho::String js_GenPropBag_getAllProperties(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    id<IGenPropBag> item = GenPropBag_makeInstanceByJSObject(strObjID);
    return js_GenPropBag_getAllProperties_Obj(argv, item, strCallbackID, strJsVmID, strCallbackParam);

}

rho::String js_s_GenPropBag_def_getAllProperties(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {
    id<IGenPropBagFactory> factory = [GenPropBagFactorySingleton getGenPropBagFactoryInstance];
    id<IGenPropBagSingleton> singleton = [factory getGenPropBagSingleton];

    NSString* defID = [singleton getDefaultID];

    id<IGenPropBag> item = [factory getGenPropBagByID:defID];
    return js_GenPropBag_getAllProperties_Obj(argv, item, strCallbackID, strJsVmID, strCallbackParam);
}







@interface GenPropBag_setProperty_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<IGenPropBag> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(GenPropBag_setProperty_caller_params*) makeParams:(NSArray*)_params _item:(id<IGenPropBag>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation GenPropBag_setProperty_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(GenPropBag_setProperty_caller_params*) makeParams:(NSArray*)_params _item:(id<IGenPropBag>)_item _methodResult:(CMethodResult*)_methodResult {
    GenPropBag_setProperty_caller_params* par = [[[GenPropBag_setProperty_caller_params alloc] init] autorelease];
    par.params = _params;
    par.item = _item;
    par.methodResult = [_methodResult retain];
    return [par retain];
}

@end


@interface GenPropBag_setProperty_caller : NSObject {

}
+(GenPropBag_setProperty_caller*) getSharedInstance;
+(void) setProperty:(GenPropBag_setProperty_caller_params*)caller_params;
+(void) setProperty_in_thread:(GenPropBag_setProperty_caller_params*)caller_params;
+(void) setProperty_in_UI_thread:(GenPropBag_setProperty_caller_params*)caller_params;

@end

static GenPropBag_setProperty_caller* our_GenPropBag_setProperty_caller = nil;

@implementation GenPropBag_setProperty_caller

+(GenPropBag_setProperty_caller*) getSharedInstance {
    if (our_GenPropBag_setProperty_caller == nil) {
        our_GenPropBag_setProperty_caller = [[GenPropBag_setProperty_caller alloc] init];
    }
    return our_GenPropBag_setProperty_caller;
}

-(void) command_setProperty:(GenPropBag_setProperty_caller_params*)caller_params {

    NSArray* params = caller_params.params;

    id<IGenPropBag> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem setProperty:(NSString*)[params objectAtIndex:0] propertyValue:(NSString*)[params objectAtIndex:1] methodResult:methodResult ];
    [caller_params.methodResult release];
    [caller_params release];
}


+(void) setProperty:(GenPropBag_setProperty_caller_params*)caller_params {
    [[GenPropBag_setProperty_caller getSharedInstance] command_setProperty:caller_params];
}

+(void) setProperty_in_thread:(GenPropBag_setProperty_caller_params*)caller_params {
    [[GenPropBag_setProperty_caller getSharedInstance] performSelectorInBackground:@selector(command_setProperty:) withObject:caller_params];
}

+(void) setProperty_in_UI_thread:(GenPropBag_setProperty_caller_params*)caller_params {
    [[GenPropBag_setProperty_caller getSharedInstance] performSelectorOnMainThread:@selector(command_setProperty:) withObject:caller_params waitUntilDone:NO];
}


@end


rho::String js_GenPropBag_setProperty_Obj(rho::json::CJSONArray& argv, id<IGenPropBag>objItem, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[2+1];
    BOOL method_return_result = YES;
    BOOL method_receive_callback = NO;
    int argc = argv.getSize();


    [methodResult setMethodSignature:@"GenPropBag::setProperty"];

    
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
                params[i] = GenPropBag_makeInstanceByJSObject(argv.getItem(i).getString());
            }
            else {
                rho::json::CJSONEntry entry = argv.getItem(i);
                params[i] = [[CJSConverter convertFromJS:&entry rho_api_param:&(rho_api_params[i])] retain];
            }
            // TODO: Handle CMethodResultError
            if (params[i] == nil) {
                NSLog(@"GenPropBag::setProperty parameter %d is nil!", i);
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
        
        [GenPropBag_setProperty_caller setProperty_in_thread:[GenPropBag_setProperty_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        

        // FIXME: callback should not be retained, it must be saved outside of this call
        [methodResult retain];
    }
    else {
        // we do not have callback
        
        [GenPropBag_setProperty_caller setProperty:[GenPropBag_setProperty_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    rho::String resValue = rho::String("\"result\":null");
    if ((!method_receive_callback) && (method_return_result)) {
        resValue = [[methodResult toJSON] UTF8String];
    }
    [methodResult release];
    return resValue;
}


rho::String js_GenPropBag_setProperty(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    id<IGenPropBag> item = GenPropBag_makeInstanceByJSObject(strObjID);
    return js_GenPropBag_setProperty_Obj(argv, item, strCallbackID, strJsVmID, strCallbackParam);

}

rho::String js_s_GenPropBag_def_setProperty(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {
    id<IGenPropBagFactory> factory = [GenPropBagFactorySingleton getGenPropBagFactoryInstance];
    id<IGenPropBagSingleton> singleton = [factory getGenPropBagSingleton];

    NSString* defID = [singleton getDefaultID];

    id<IGenPropBag> item = [factory getGenPropBagByID:defID];
    return js_GenPropBag_setProperty_Obj(argv, item, strCallbackID, strJsVmID, strCallbackParam);
}







@interface GenPropBag_setProperties_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<IGenPropBag> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(GenPropBag_setProperties_caller_params*) makeParams:(NSArray*)_params _item:(id<IGenPropBag>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation GenPropBag_setProperties_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(GenPropBag_setProperties_caller_params*) makeParams:(NSArray*)_params _item:(id<IGenPropBag>)_item _methodResult:(CMethodResult*)_methodResult {
    GenPropBag_setProperties_caller_params* par = [[[GenPropBag_setProperties_caller_params alloc] init] autorelease];
    par.params = _params;
    par.item = _item;
    par.methodResult = [_methodResult retain];
    return [par retain];
}

@end


@interface GenPropBag_setProperties_caller : NSObject {

}
+(GenPropBag_setProperties_caller*) getSharedInstance;
+(void) setProperties:(GenPropBag_setProperties_caller_params*)caller_params;
+(void) setProperties_in_thread:(GenPropBag_setProperties_caller_params*)caller_params;
+(void) setProperties_in_UI_thread:(GenPropBag_setProperties_caller_params*)caller_params;

@end

static GenPropBag_setProperties_caller* our_GenPropBag_setProperties_caller = nil;

@implementation GenPropBag_setProperties_caller

+(GenPropBag_setProperties_caller*) getSharedInstance {
    if (our_GenPropBag_setProperties_caller == nil) {
        our_GenPropBag_setProperties_caller = [[GenPropBag_setProperties_caller alloc] init];
    }
    return our_GenPropBag_setProperties_caller;
}

-(void) command_setProperties:(GenPropBag_setProperties_caller_params*)caller_params {

    NSArray* params = caller_params.params;

    id<IGenPropBag> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem setProperties:(NSDictionary*)[params objectAtIndex:0] methodResult:methodResult ];
    [caller_params.methodResult release];
    [caller_params release];
}


+(void) setProperties:(GenPropBag_setProperties_caller_params*)caller_params {
    [[GenPropBag_setProperties_caller getSharedInstance] command_setProperties:caller_params];
}

+(void) setProperties_in_thread:(GenPropBag_setProperties_caller_params*)caller_params {
    [[GenPropBag_setProperties_caller getSharedInstance] performSelectorInBackground:@selector(command_setProperties:) withObject:caller_params];
}

+(void) setProperties_in_UI_thread:(GenPropBag_setProperties_caller_params*)caller_params {
    [[GenPropBag_setProperties_caller getSharedInstance] performSelectorOnMainThread:@selector(command_setProperties:) withObject:caller_params waitUntilDone:NO];
}


@end


rho::String js_GenPropBag_setProperties_Obj(rho::json::CJSONArray& argv, id<IGenPropBag>objItem, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[1+1];
    BOOL method_return_result = YES;
    BOOL method_receive_callback = NO;
    int argc = argv.getSize();


    [methodResult setMethodSignature:@"GenPropBag::setProperties"];

    
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
                params[i] = GenPropBag_makeInstanceByJSObject(argv.getItem(i).getString());
            }
            else {
                rho::json::CJSONEntry entry = argv.getItem(i);
                params[i] = [[CJSConverter convertFromJS:&entry rho_api_param:&(rho_api_params[i])] retain];
            }
            // TODO: Handle CMethodResultError
            if (params[i] == nil) {
                NSLog(@"GenPropBag::setProperties parameter %d is nil!", i);
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
        
        [GenPropBag_setProperties_caller setProperties_in_thread:[GenPropBag_setProperties_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        

        // FIXME: callback should not be retained, it must be saved outside of this call
        [methodResult retain];
    }
    else {
        // we do not have callback
        
        [GenPropBag_setProperties_caller setProperties:[GenPropBag_setProperties_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    rho::String resValue = rho::String("\"result\":null");
    if ((!method_receive_callback) && (method_return_result)) {
        resValue = [[methodResult toJSON] UTF8String];
    }
    [methodResult release];
    return resValue;
}


rho::String js_GenPropBag_setProperties(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    id<IGenPropBag> item = GenPropBag_makeInstanceByJSObject(strObjID);
    return js_GenPropBag_setProperties_Obj(argv, item, strCallbackID, strJsVmID, strCallbackParam);

}

rho::String js_s_GenPropBag_def_setProperties(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {
    id<IGenPropBagFactory> factory = [GenPropBagFactorySingleton getGenPropBagFactoryInstance];
    id<IGenPropBagSingleton> singleton = [factory getGenPropBagSingleton];

    NSString* defID = [singleton getDefaultID];

    id<IGenPropBag> item = [factory getGenPropBagByID:defID];
    return js_GenPropBag_setProperties_Obj(argv, item, strCallbackID, strJsVmID, strCallbackParam);
}







rho::String js_s_GenPropBag_getDefaultID(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam)
{
    id<IGenPropBagFactory> factory = [GenPropBagFactorySingleton getGenPropBagFactoryInstance];
    id<IGenPropBagSingleton> singleton = [factory getGenPropBagSingleton];

    NSString* defID = [singleton getDefaultID];

    rho::String res =  [[CJSConverter convertToJS:defID level:0] UTF8String];

    return res;
}

rho::String js_s_GenPropBag_getDefault(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam)
{
    id<IGenPropBagFactory> factory = [GenPropBagFactorySingleton getGenPropBagFactoryInstance];
    id<IGenPropBagSingleton> singleton = [factory getGenPropBagSingleton];

    NSString* defID = [singleton getDefaultID];

    rho::String res =  [[CJSConverter convertToJS:[CRhoAPIClassInstance rubyClassByName:@"Rho.GenPropBag" instanceID:defID] level:0] UTF8String];

    return res;
}

rho::String js_s_GenPropBag_setDefaultID(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam)
{
    id<IGenPropBagFactory> factory = [GenPropBagFactorySingleton getGenPropBagFactoryInstance];
    id<IGenPropBagSingleton> singleton = [factory getGenPropBagSingleton];

    rho::json::CJSONEntry el = argv[0];

    if (el.isString()) {
        NSString* defID = [NSString stringWithUTF8String:(el.getString())];

        [singleton setDefaultID:defID];

        return [[CJSConverter convertToJS:nil level:0] UTF8String];
    }

    return "\"result\":null,\"error\":\"Method parameter should be defined as string!\"";
}



