#pragma once

#include "common/RhoStd.h"
#include "api_generator/MethodResult.h"
#include "api_generator/BaseClasses.h"


namespace rho {
///////////////////////////////////////////////////////////



struct INativeBridgeTest
{
//constants


//methods
    virtual ~INativeBridgeTest(){}


};

struct INativeBridgeTestSingleton
{
//constants


    virtual ~INativeBridgeTestSingleton(){}

//methods
    virtual void testBool( bool val, rho::apiGenerator::CMethodResult& oResult) = 0;
    virtual void testInt( int val, rho::apiGenerator::CMethodResult& oResult) = 0;
    virtual void testFloat( double val, rho::apiGenerator::CMethodResult& oResult) = 0;
    virtual void testString( const rho::String& val, rho::apiGenerator::CMethodResult& oResult) = 0;


    virtual void addCommandToQueue(rho::common::CInstanceClassFunctorBase<rho::apiGenerator::CMethodResult>* pFunctor) = 0;
    virtual void callCommandInThread(rho::common::IRhoRunnable* pFunctor) = 0;
};

struct INativeBridgeTestFactory
{
    virtual ~INativeBridgeTestFactory(){}

    virtual INativeBridgeTestSingleton* getModuleSingleton() = 0;


};


}
