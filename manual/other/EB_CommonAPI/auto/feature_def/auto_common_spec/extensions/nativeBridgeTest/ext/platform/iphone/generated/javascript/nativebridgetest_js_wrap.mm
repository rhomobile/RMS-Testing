#import "INativeBridgeTest.h"
//#import "api_generator/common/ruby_helpers.h"

#include "api_generator/js_helpers.h"

#import "api_generator/iphone/CMethodResult.h"
#import "api_generator/iphone/CJSConverter.h"

extern VALUE getRuby_NativeBridgeTest_Module();



id<INativeBridgeTest> NativeBridgeTest_makeInstanceByJSObject(rho::String sid) {
    const char* szID = sid.c_str();
    id<INativeBridgeTestFactory> factory = [NativeBridgeTestFactorySingleton getNativeBridgeTestFactoryInstance];
    return [factory getNativeBridgeTestByID:[NSString stringWithUTF8String:szID]];
}









@interface NativeBridgeTest_testBool_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<INativeBridgeTestSingleton> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(NativeBridgeTest_testBool_caller_params*) makeParams:(NSArray*)_params _item:(id<INativeBridgeTestSingleton>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation NativeBridgeTest_testBool_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(NativeBridgeTest_testBool_caller_params*) makeParams:(NSArray*)_params _item:(id<INativeBridgeTestSingleton>)_item _methodResult:(CMethodResult*)_methodResult {
    NativeBridgeTest_testBool_caller_params* par = [[NativeBridgeTest_testBool_caller_params alloc] init];
    par.params = _params;
    par.item = _item;
    par.methodResult = _methodResult;
    return [par retain];
}

@end


@interface NativeBridgeTest_testBool_caller : NSObject {

}
+(NativeBridgeTest_testBool_caller*) getSharedInstance;
+(void) testBool:(NativeBridgeTest_testBool_caller_params*)caller_params;
+(void) testBool_in_thread:(NativeBridgeTest_testBool_caller_params*)caller_params;
+(void) testBool_in_UI_thread:(NativeBridgeTest_testBool_caller_params*)caller_params;

@end

static NativeBridgeTest_testBool_caller* our_NativeBridgeTest_testBool_caller = nil;

@implementation NativeBridgeTest_testBool_caller

+(NativeBridgeTest_testBool_caller*) getSharedInstance {
    if (our_NativeBridgeTest_testBool_caller == nil) {
        our_NativeBridgeTest_testBool_caller = [[NativeBridgeTest_testBool_caller alloc] init];
    }
    return our_NativeBridgeTest_testBool_caller;
}

-(void) command_testBool:(NativeBridgeTest_testBool_caller_params*)caller_params {

    NSArray* params = caller_params.params;

    id<INativeBridgeTestSingleton> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem testBool:(BOOL)[((NSNumber*)[params objectAtIndex:0]) boolValue] methodResult:methodResult ];
    [caller_params release];
}


+(void) testBool:(NativeBridgeTest_testBool_caller_params*)caller_params {
    [[NativeBridgeTest_testBool_caller getSharedInstance] command_testBool:caller_params];
}

+(void) testBool_in_thread:(NativeBridgeTest_testBool_caller_params*)caller_params {
    [[NativeBridgeTest_testBool_caller getSharedInstance] performSelectorInBackground:@selector(command_testBool:) withObject:caller_params];
}

+(void) testBool_in_UI_thread:(NativeBridgeTest_testBool_caller_params*)caller_params {
    [[NativeBridgeTest_testBool_caller getSharedInstance] performSelectorOnMainThread:@selector(command_testBool:) withObject:caller_params waitUntilDone:NO];
}


@end


rho::String js_NativeBridgeTest_testBool_Obj(rho::json::CJSONArray& argv, id<INativeBridgeTestSingleton>objItem, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[1+1];
    BOOL method_return_result = YES;
    BOOL method_receive_callback = NO;
    int argc = argv.getSize();


    [methodResult setMethodSignature:@"NativeBridgeTest::testBool"];

    
    static RHO_API_PARAM rho_api_params[] = { {RHO_API_BOOLEAN, 0, "val", 0, 0 } };

    
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
                params[i] = NativeBridgeTest_makeInstanceByJSObject(argv.getItem(i).getString());
            }
            else {
                rho::json::CJSONEntry entry = argv.getItem(i);
                params[i] = [[CJSConverter convertFromJS:&entry rho_api_param:&(rho_api_params[i])] retain];
            }
            // TODO: Handle CMethodResultError
            if (params[i] == nil) {
                NSLog(@"NativeBridgeTest::testBool parameter %d is nil!", i);
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
        
        [NativeBridgeTest_testBool_caller testBool_in_thread:[NativeBridgeTest_testBool_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    else {
        // we do not have callback
        
        [NativeBridgeTest_testBool_caller testBool:[NativeBridgeTest_testBool_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    rho::String resValue = rho::String("\"result\":null");
    if ((!method_receive_callback) && (method_return_result)) {
        resValue = [[methodResult toJSON] UTF8String];
    }
    return resValue;
}


rho::String js_s_NativeBridgeTest_testBool(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    id<INativeBridgeTestFactory> factory = [NativeBridgeTestFactorySingleton getNativeBridgeTestFactoryInstance];
    id<INativeBridgeTestSingleton> singleton = [factory getNativeBridgeTestSingleton];
    return js_NativeBridgeTest_testBool_Obj(argv, singleton, strCallbackID, strJsVmID, strCallbackParam);

}







@interface NativeBridgeTest_testInt_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<INativeBridgeTestSingleton> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(NativeBridgeTest_testInt_caller_params*) makeParams:(NSArray*)_params _item:(id<INativeBridgeTestSingleton>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation NativeBridgeTest_testInt_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(NativeBridgeTest_testInt_caller_params*) makeParams:(NSArray*)_params _item:(id<INativeBridgeTestSingleton>)_item _methodResult:(CMethodResult*)_methodResult {
    NativeBridgeTest_testInt_caller_params* par = [[NativeBridgeTest_testInt_caller_params alloc] init];
    par.params = _params;
    par.item = _item;
    par.methodResult = _methodResult;
    return [par retain];
}

@end


@interface NativeBridgeTest_testInt_caller : NSObject {

}
+(NativeBridgeTest_testInt_caller*) getSharedInstance;
+(void) testInt:(NativeBridgeTest_testInt_caller_params*)caller_params;
+(void) testInt_in_thread:(NativeBridgeTest_testInt_caller_params*)caller_params;
+(void) testInt_in_UI_thread:(NativeBridgeTest_testInt_caller_params*)caller_params;

@end

static NativeBridgeTest_testInt_caller* our_NativeBridgeTest_testInt_caller = nil;

@implementation NativeBridgeTest_testInt_caller

+(NativeBridgeTest_testInt_caller*) getSharedInstance {
    if (our_NativeBridgeTest_testInt_caller == nil) {
        our_NativeBridgeTest_testInt_caller = [[NativeBridgeTest_testInt_caller alloc] init];
    }
    return our_NativeBridgeTest_testInt_caller;
}

-(void) command_testInt:(NativeBridgeTest_testInt_caller_params*)caller_params {

    NSArray* params = caller_params.params;

    id<INativeBridgeTestSingleton> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem testInt:(int)[((NSNumber*)[params objectAtIndex:0]) intValue] methodResult:methodResult ];
    [caller_params release];
}


+(void) testInt:(NativeBridgeTest_testInt_caller_params*)caller_params {
    [[NativeBridgeTest_testInt_caller getSharedInstance] command_testInt:caller_params];
}

+(void) testInt_in_thread:(NativeBridgeTest_testInt_caller_params*)caller_params {
    [[NativeBridgeTest_testInt_caller getSharedInstance] performSelectorInBackground:@selector(command_testInt:) withObject:caller_params];
}

+(void) testInt_in_UI_thread:(NativeBridgeTest_testInt_caller_params*)caller_params {
    [[NativeBridgeTest_testInt_caller getSharedInstance] performSelectorOnMainThread:@selector(command_testInt:) withObject:caller_params waitUntilDone:NO];
}


@end


rho::String js_NativeBridgeTest_testInt_Obj(rho::json::CJSONArray& argv, id<INativeBridgeTestSingleton>objItem, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[1+1];
    BOOL method_return_result = YES;
    BOOL method_receive_callback = NO;
    int argc = argv.getSize();


    [methodResult setMethodSignature:@"NativeBridgeTest::testInt"];

    
    static RHO_API_PARAM rho_api_params[] = { {RHO_API_INTEGER, 0, "val", 0, 0 } };

    
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
                params[i] = NativeBridgeTest_makeInstanceByJSObject(argv.getItem(i).getString());
            }
            else {
                rho::json::CJSONEntry entry = argv.getItem(i);
                params[i] = [[CJSConverter convertFromJS:&entry rho_api_param:&(rho_api_params[i])] retain];
            }
            // TODO: Handle CMethodResultError
            if (params[i] == nil) {
                NSLog(@"NativeBridgeTest::testInt parameter %d is nil!", i);
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
        
        [NativeBridgeTest_testInt_caller testInt_in_thread:[NativeBridgeTest_testInt_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    else {
        // we do not have callback
        
        [NativeBridgeTest_testInt_caller testInt:[NativeBridgeTest_testInt_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    rho::String resValue = rho::String("\"result\":null");
    if ((!method_receive_callback) && (method_return_result)) {
        resValue = [[methodResult toJSON] UTF8String];
    }
    return resValue;
}


rho::String js_s_NativeBridgeTest_testInt(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    id<INativeBridgeTestFactory> factory = [NativeBridgeTestFactorySingleton getNativeBridgeTestFactoryInstance];
    id<INativeBridgeTestSingleton> singleton = [factory getNativeBridgeTestSingleton];
    return js_NativeBridgeTest_testInt_Obj(argv, singleton, strCallbackID, strJsVmID, strCallbackParam);

}







@interface NativeBridgeTest_testFloat_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<INativeBridgeTestSingleton> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(NativeBridgeTest_testFloat_caller_params*) makeParams:(NSArray*)_params _item:(id<INativeBridgeTestSingleton>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation NativeBridgeTest_testFloat_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(NativeBridgeTest_testFloat_caller_params*) makeParams:(NSArray*)_params _item:(id<INativeBridgeTestSingleton>)_item _methodResult:(CMethodResult*)_methodResult {
    NativeBridgeTest_testFloat_caller_params* par = [[NativeBridgeTest_testFloat_caller_params alloc] init];
    par.params = _params;
    par.item = _item;
    par.methodResult = _methodResult;
    return [par retain];
}

@end


@interface NativeBridgeTest_testFloat_caller : NSObject {

}
+(NativeBridgeTest_testFloat_caller*) getSharedInstance;
+(void) testFloat:(NativeBridgeTest_testFloat_caller_params*)caller_params;
+(void) testFloat_in_thread:(NativeBridgeTest_testFloat_caller_params*)caller_params;
+(void) testFloat_in_UI_thread:(NativeBridgeTest_testFloat_caller_params*)caller_params;

@end

static NativeBridgeTest_testFloat_caller* our_NativeBridgeTest_testFloat_caller = nil;

@implementation NativeBridgeTest_testFloat_caller

+(NativeBridgeTest_testFloat_caller*) getSharedInstance {
    if (our_NativeBridgeTest_testFloat_caller == nil) {
        our_NativeBridgeTest_testFloat_caller = [[NativeBridgeTest_testFloat_caller alloc] init];
    }
    return our_NativeBridgeTest_testFloat_caller;
}

-(void) command_testFloat:(NativeBridgeTest_testFloat_caller_params*)caller_params {

    NSArray* params = caller_params.params;

    id<INativeBridgeTestSingleton> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem testFloat:(float)[((NSNumber*)[params objectAtIndex:0]) floatValue] methodResult:methodResult ];
    [caller_params release];
}


+(void) testFloat:(NativeBridgeTest_testFloat_caller_params*)caller_params {
    [[NativeBridgeTest_testFloat_caller getSharedInstance] command_testFloat:caller_params];
}

+(void) testFloat_in_thread:(NativeBridgeTest_testFloat_caller_params*)caller_params {
    [[NativeBridgeTest_testFloat_caller getSharedInstance] performSelectorInBackground:@selector(command_testFloat:) withObject:caller_params];
}

+(void) testFloat_in_UI_thread:(NativeBridgeTest_testFloat_caller_params*)caller_params {
    [[NativeBridgeTest_testFloat_caller getSharedInstance] performSelectorOnMainThread:@selector(command_testFloat:) withObject:caller_params waitUntilDone:NO];
}


@end


rho::String js_NativeBridgeTest_testFloat_Obj(rho::json::CJSONArray& argv, id<INativeBridgeTestSingleton>objItem, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[1+1];
    BOOL method_return_result = YES;
    BOOL method_receive_callback = NO;
    int argc = argv.getSize();


    [methodResult setMethodSignature:@"NativeBridgeTest::testFloat"];

    
    static RHO_API_PARAM rho_api_params[] = { {RHO_API_FLOAT, 0, "val", 0, 0 } };

    
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
                params[i] = NativeBridgeTest_makeInstanceByJSObject(argv.getItem(i).getString());
            }
            else {
                rho::json::CJSONEntry entry = argv.getItem(i);
                params[i] = [[CJSConverter convertFromJS:&entry rho_api_param:&(rho_api_params[i])] retain];
            }
            // TODO: Handle CMethodResultError
            if (params[i] == nil) {
                NSLog(@"NativeBridgeTest::testFloat parameter %d is nil!", i);
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
        
        [NativeBridgeTest_testFloat_caller testFloat_in_thread:[NativeBridgeTest_testFloat_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    else {
        // we do not have callback
        
        [NativeBridgeTest_testFloat_caller testFloat:[NativeBridgeTest_testFloat_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    rho::String resValue = rho::String("\"result\":null");
    if ((!method_receive_callback) && (method_return_result)) {
        resValue = [[methodResult toJSON] UTF8String];
    }
    return resValue;
}


rho::String js_s_NativeBridgeTest_testFloat(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    id<INativeBridgeTestFactory> factory = [NativeBridgeTestFactorySingleton getNativeBridgeTestFactoryInstance];
    id<INativeBridgeTestSingleton> singleton = [factory getNativeBridgeTestSingleton];
    return js_NativeBridgeTest_testFloat_Obj(argv, singleton, strCallbackID, strJsVmID, strCallbackParam);

}







@interface NativeBridgeTest_testString_caller_params : NSObject

@property (nonatomic, copy) NSArray* params;
@property (assign) id<INativeBridgeTestSingleton> item;
@property (assign) CMethodResult* methodResult;

-(void)dealloc;

+(NativeBridgeTest_testString_caller_params*) makeParams:(NSArray*)_params _item:(id<INativeBridgeTestSingleton>)_item _methodResult:(CMethodResult*)_methodResult;

@end

@implementation NativeBridgeTest_testString_caller_params

@synthesize params,item,methodResult;

-(void)dealloc {
    [params release];
    [super dealloc];
}

+(NativeBridgeTest_testString_caller_params*) makeParams:(NSArray*)_params _item:(id<INativeBridgeTestSingleton>)_item _methodResult:(CMethodResult*)_methodResult {
    NativeBridgeTest_testString_caller_params* par = [[NativeBridgeTest_testString_caller_params alloc] init];
    par.params = _params;
    par.item = _item;
    par.methodResult = _methodResult;
    return [par retain];
}

@end


@interface NativeBridgeTest_testString_caller : NSObject {

}
+(NativeBridgeTest_testString_caller*) getSharedInstance;
+(void) testString:(NativeBridgeTest_testString_caller_params*)caller_params;
+(void) testString_in_thread:(NativeBridgeTest_testString_caller_params*)caller_params;
+(void) testString_in_UI_thread:(NativeBridgeTest_testString_caller_params*)caller_params;

@end

static NativeBridgeTest_testString_caller* our_NativeBridgeTest_testString_caller = nil;

@implementation NativeBridgeTest_testString_caller

+(NativeBridgeTest_testString_caller*) getSharedInstance {
    if (our_NativeBridgeTest_testString_caller == nil) {
        our_NativeBridgeTest_testString_caller = [[NativeBridgeTest_testString_caller alloc] init];
    }
    return our_NativeBridgeTest_testString_caller;
}

-(void) command_testString:(NativeBridgeTest_testString_caller_params*)caller_params {

    NSArray* params = caller_params.params;

    id<INativeBridgeTestSingleton> objItem = caller_params.item;
    CMethodResult* methodResult = caller_params.methodResult;

    
    [objItem testString:(NSString*)[params objectAtIndex:0] methodResult:methodResult ];
    [caller_params release];
}


+(void) testString:(NativeBridgeTest_testString_caller_params*)caller_params {
    [[NativeBridgeTest_testString_caller getSharedInstance] command_testString:caller_params];
}

+(void) testString_in_thread:(NativeBridgeTest_testString_caller_params*)caller_params {
    [[NativeBridgeTest_testString_caller getSharedInstance] performSelectorInBackground:@selector(command_testString:) withObject:caller_params];
}

+(void) testString_in_UI_thread:(NativeBridgeTest_testString_caller_params*)caller_params {
    [[NativeBridgeTest_testString_caller getSharedInstance] performSelectorOnMainThread:@selector(command_testString:) withObject:caller_params waitUntilDone:NO];
}


@end


rho::String js_NativeBridgeTest_testString_Obj(rho::json::CJSONArray& argv, id<INativeBridgeTestSingleton>objItem, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    CMethodResult* methodResult = [[CMethodResult alloc] init];

    NSObject* params[1+1];
    BOOL method_return_result = YES;
    BOOL method_receive_callback = NO;
    int argc = argv.getSize();


    [methodResult setMethodSignature:@"NativeBridgeTest::testString"];

    
    static RHO_API_PARAM rho_api_params[] = { {RHO_API_STRING, 0, "val", 0, 0 } };

    
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
                params[i] = NativeBridgeTest_makeInstanceByJSObject(argv.getItem(i).getString());
            }
            else {
                rho::json::CJSONEntry entry = argv.getItem(i);
                params[i] = [[CJSConverter convertFromJS:&entry rho_api_param:&(rho_api_params[i])] retain];
            }
            // TODO: Handle CMethodResultError
            if (params[i] == nil) {
                NSLog(@"NativeBridgeTest::testString parameter %d is nil!", i);
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
        
        [NativeBridgeTest_testString_caller testString_in_thread:[NativeBridgeTest_testString_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    else {
        // we do not have callback
        
        [NativeBridgeTest_testString_caller testString:[NativeBridgeTest_testString_caller_params makeParams:params_array _item:objItem _methodResult:methodResult]];
        
    }
    rho::String resValue = rho::String("\"result\":null");
    if ((!method_receive_callback) && (method_return_result)) {
        resValue = [[methodResult toJSON] UTF8String];
    }
    return resValue;
}


rho::String js_s_NativeBridgeTest_testString(const rho::String& strObjID, rho::json::CJSONArray& argv, const rho::String& strCallbackID, const rho::String& strJsVmID, const rho::String& strCallbackParam) {

    id<INativeBridgeTestFactory> factory = [NativeBridgeTestFactorySingleton getNativeBridgeTestFactoryInstance];
    id<INativeBridgeTestSingleton> singleton = [factory getNativeBridgeTestSingleton];
    return js_NativeBridgeTest_testString_Obj(argv, singleton, strCallbackID, strJsVmID, strCallbackParam);

}









