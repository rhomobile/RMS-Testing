#include "common/RhodesApp.h"
#include "api_generator/wp8/MethodResultImpl.h"
#include "../../../../shared/generated/cpp/NativeBridgeTestBase.h"
#include "NativeBridgeTestRuntime.h"


namespace rho {

class CNativeBridgeTestImpl: public CNativeBridgeTestBase
{
private:
    rhoruntime::INativeBridgeTestImpl^ _runtime;
public:
    CNativeBridgeTestImpl(const rho::String& strID, rhoruntime::INativeBridgeTestImpl^ runtime): CNativeBridgeTestBase(), _runtime(runtime)
    {
        _runtime->setNativeImpl((int64)this);
    }

};

}
