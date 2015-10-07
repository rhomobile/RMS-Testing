#include "common/RhodesApp.h"
#include "api_generator/wp8/MethodResultImpl.h"
#include "../../../../shared/generated/cpp/DummyBase.h"
#include "DummyRuntime.h"
#include "../../wp8/rhoruntime/common/RhoConvertWP8.h"


namespace rho {

class CDummyImpl: public CDummyBase
{
private:
    rhoruntime::IDummyImpl^ _runtime;
public:
    CDummyImpl(const rho::String& strID, rhoruntime::IDummyImpl^ runtime): CDummyBase(), _runtime(runtime)
    {
        _runtime->setNativeImpl(rho::common::convertStringToWP8(strID), (int64)this);
    }

    virtual void getSimpleStringProperty(rho::apiGenerator::CMethodResult& oResult);
    virtual void setSimpleStringProperty(const rho::String& simpleStringProperty, rho::apiGenerator::CMethodResult& oResult);
    virtual void getPlatformName(rho::apiGenerator::CMethodResult& oResult);
    virtual void calcSumm(int a, int b, rho::apiGenerator::CMethodResult& oResult);
    virtual void joinStrings(const rho::String& a, const rho::String& b, rho::apiGenerator::CMethodResult& oResult);
    virtual void enable(int firingInterval, rho::apiGenerator::CMethodResult& oResult);
    virtual void enableString(int firingInterval, rho::apiGenerator::CMethodResult& oResult);
    virtual void enableInt(int firingInterval, rho::apiGenerator::CMethodResult& oResult);
    virtual void enableBool(int firingInterval, rho::apiGenerator::CMethodResult& oResult);
    virtual void enableFloat(int firingInterval, rho::apiGenerator::CMethodResult& oResult);
    virtual void enableArray(int firingInterval, rho::apiGenerator::CMethodResult& oResult);
    virtual void stop(rho::apiGenerator::CMethodResult& oResult);
};

}
