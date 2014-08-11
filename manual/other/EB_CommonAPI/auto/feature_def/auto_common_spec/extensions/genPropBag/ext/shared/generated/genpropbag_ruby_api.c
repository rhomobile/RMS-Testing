#include "ruby.h"

static VALUE rb_api_mParent;
static VALUE rb_api_mGenPropBag;

VALUE rb_GenPropBag_getBoolProp(int argc, VALUE *argv, VALUE obj);
VALUE rb_s_GenPropBag_def_getBoolProp(int argc, VALUE *argv);
VALUE rb_GenPropBag_setBoolProp(int argc, VALUE *argv, VALUE obj);
VALUE rb_s_GenPropBag_def_setBoolProp(int argc, VALUE *argv);
VALUE rb_GenPropBag_getIntProp(int argc, VALUE *argv, VALUE obj);
VALUE rb_s_GenPropBag_def_getIntProp(int argc, VALUE *argv);
VALUE rb_GenPropBag_setIntProp(int argc, VALUE *argv, VALUE obj);
VALUE rb_s_GenPropBag_def_setIntProp(int argc, VALUE *argv);
VALUE rb_GenPropBag_getFloatProp(int argc, VALUE *argv, VALUE obj);
VALUE rb_s_GenPropBag_def_getFloatProp(int argc, VALUE *argv);
VALUE rb_GenPropBag_setFloatProp(int argc, VALUE *argv, VALUE obj);
VALUE rb_s_GenPropBag_def_setFloatProp(int argc, VALUE *argv);
VALUE rb_GenPropBag_getStringProp(int argc, VALUE *argv, VALUE obj);
VALUE rb_s_GenPropBag_def_getStringProp(int argc, VALUE *argv);
VALUE rb_GenPropBag_setStringProp(int argc, VALUE *argv, VALUE obj);
VALUE rb_s_GenPropBag_def_setStringProp(int argc, VALUE *argv);
VALUE rb_s_GenPropBag_enumerate(int argc, VALUE *argv);
VALUE rb_GenPropBag_getProperty(int argc, VALUE *argv, VALUE obj);
VALUE rb_s_GenPropBag_def_getProperty(int argc, VALUE *argv);
VALUE rb_GenPropBag_getProperties(int argc, VALUE *argv, VALUE obj);
VALUE rb_s_GenPropBag_def_getProperties(int argc, VALUE *argv);
VALUE rb_GenPropBag_getAllProperties(int argc, VALUE *argv, VALUE obj);
VALUE rb_s_GenPropBag_def_getAllProperties(int argc, VALUE *argv);
VALUE rb_GenPropBag_setProperty(int argc, VALUE *argv, VALUE obj);
VALUE rb_s_GenPropBag_def_setProperty(int argc, VALUE *argv);
VALUE rb_GenPropBag_setProperties(int argc, VALUE *argv, VALUE obj);
VALUE rb_s_GenPropBag_def_setProperties(int argc, VALUE *argv);



VALUE rb_GenPropBag_s_default(VALUE klass);
VALUE rb_GenPropBag_s_setDefault(VALUE klass, VALUE obj);


VALUE getRuby_GenPropBag_Module(){ return rb_api_mGenPropBag; }



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

void Init_RubyAPI_GenPropBag(void)
{

    VALUE tmpParent = Qnil;
    rb_api_mParent = rb_define_module("Rho");
    

	rb_api_mGenPropBag = rb_define_class_under(rb_api_mParent, "GenPropBag", rb_cObject);

	rb_define_alloc_func(rb_api_mGenPropBag, _allocate_class_object);
    //Constructor should be not available in case of static members
    //rb_undef_alloc_func(rb_api_mGenPropBag);

    rb_define_method(rb_api_mGenPropBag, "boolProp", rb_GenPropBag_getBoolProp, -1);
    rb_define_singleton_method(rb_api_mGenPropBag, "boolProp", rb_s_GenPropBag_def_getBoolProp, -1);
    rb_define_method(rb_api_mGenPropBag, "boolProp=", rb_GenPropBag_setBoolProp, -1);
    rb_define_singleton_method(rb_api_mGenPropBag, "boolProp=", rb_s_GenPropBag_def_setBoolProp, -1);
    rb_define_method(rb_api_mGenPropBag, "intProp", rb_GenPropBag_getIntProp, -1);
    rb_define_singleton_method(rb_api_mGenPropBag, "intProp", rb_s_GenPropBag_def_getIntProp, -1);
    rb_define_method(rb_api_mGenPropBag, "intProp=", rb_GenPropBag_setIntProp, -1);
    rb_define_singleton_method(rb_api_mGenPropBag, "intProp=", rb_s_GenPropBag_def_setIntProp, -1);
    rb_define_method(rb_api_mGenPropBag, "floatProp", rb_GenPropBag_getFloatProp, -1);
    rb_define_singleton_method(rb_api_mGenPropBag, "floatProp", rb_s_GenPropBag_def_getFloatProp, -1);
    rb_define_method(rb_api_mGenPropBag, "floatProp=", rb_GenPropBag_setFloatProp, -1);
    rb_define_singleton_method(rb_api_mGenPropBag, "floatProp=", rb_s_GenPropBag_def_setFloatProp, -1);
    rb_define_method(rb_api_mGenPropBag, "stringProp", rb_GenPropBag_getStringProp, -1);
    rb_define_singleton_method(rb_api_mGenPropBag, "stringProp", rb_s_GenPropBag_def_getStringProp, -1);
    rb_define_method(rb_api_mGenPropBag, "stringProp=", rb_GenPropBag_setStringProp, -1);
    rb_define_singleton_method(rb_api_mGenPropBag, "stringProp=", rb_s_GenPropBag_def_setStringProp, -1);
    rb_define_singleton_method(rb_api_mGenPropBag, "enumerate", rb_s_GenPropBag_enumerate, -1);
    rb_define_method(rb_api_mGenPropBag, "getProperty", rb_GenPropBag_getProperty, -1);
    rb_define_singleton_method(rb_api_mGenPropBag, "getProperty", rb_s_GenPropBag_def_getProperty, -1);
    rb_define_method(rb_api_mGenPropBag, "getProperties", rb_GenPropBag_getProperties, -1);
    rb_define_singleton_method(rb_api_mGenPropBag, "getProperties", rb_s_GenPropBag_def_getProperties, -1);
    rb_define_method(rb_api_mGenPropBag, "getAllProperties", rb_GenPropBag_getAllProperties, -1);
    rb_define_singleton_method(rb_api_mGenPropBag, "getAllProperties", rb_s_GenPropBag_def_getAllProperties, -1);
    rb_define_method(rb_api_mGenPropBag, "setProperty", rb_GenPropBag_setProperty, -1);
    rb_define_singleton_method(rb_api_mGenPropBag, "setProperty", rb_s_GenPropBag_def_setProperty, -1);
    rb_define_method(rb_api_mGenPropBag, "setProperties", rb_GenPropBag_setProperties, -1);
    rb_define_singleton_method(rb_api_mGenPropBag, "setProperties", rb_s_GenPropBag_def_setProperties, -1);



    rb_define_singleton_method(rb_api_mGenPropBag, "getDefault", rb_GenPropBag_s_default, 0);
    rb_define_singleton_method(rb_api_mGenPropBag, "setDefault", rb_GenPropBag_s_setDefault, 1);






}

