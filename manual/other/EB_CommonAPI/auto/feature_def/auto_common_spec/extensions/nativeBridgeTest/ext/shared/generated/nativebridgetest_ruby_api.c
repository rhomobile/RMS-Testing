#include "ruby.h"

static VALUE rb_api_mParent;
static VALUE rb_api_mNativeBridgeTest;

VALUE rb_s_NativeBridgeTest_testBool(int argc, VALUE *argv);
VALUE rb_s_NativeBridgeTest_testInt(int argc, VALUE *argv);
VALUE rb_s_NativeBridgeTest_testFloat(int argc, VALUE *argv);
VALUE rb_s_NativeBridgeTest_testString(int argc, VALUE *argv);




VALUE getRuby_NativeBridgeTest_Module(){ return rb_api_mNativeBridgeTest; }



static void _free_class_object(void *p)
{
    ruby_xfree(p);
}

static VALUE _allocate_class_object(VALUE klass)
{
    VALUE valObj = 0;
    char ** ppString = NULL;
    void* pData = ALLOC(void*);
    memset( pData, 0, sizeof(pData) );
    
	valObj = Data_Wrap_Struct(klass, 0, _free_class_object, pData);

    Data_Get_Struct(valObj, char *, ppString);
    *ppString = xmalloc(10);
    sprintf(*ppString, "%X", valObj);

    return valObj;
}

void Init_RubyAPI_NativeBridgeTest(void)
{

    VALUE tmpParent = Qnil;
    rb_api_mParent = rb_define_module("Rho");
    

	rb_api_mNativeBridgeTest = rb_define_class_under(rb_api_mParent, "NativeBridgeTest", rb_cObject);

	rb_define_alloc_func(rb_api_mNativeBridgeTest, _allocate_class_object);
    //Constructor should be not available in case of static members
    //rb_undef_alloc_func(rb_api_mNativeBridgeTest);

    rb_define_singleton_method(rb_api_mNativeBridgeTest, "testBool", rb_s_NativeBridgeTest_testBool, -1);
    rb_define_singleton_method(rb_api_mNativeBridgeTest, "testInt", rb_s_NativeBridgeTest_testInt, -1);
    rb_define_singleton_method(rb_api_mNativeBridgeTest, "testFloat", rb_s_NativeBridgeTest_testFloat, -1);
    rb_define_singleton_method(rb_api_mNativeBridgeTest, "testString", rb_s_NativeBridgeTest_testString, -1);








}

