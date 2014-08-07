#include "NativeBridgeTestBase.h"
#include "common/RhodesApp.h"


namespace rho {

IMPLEMENT_LOGCLASS(CNativeBridgeTestSingletonBase, "NativeBridgeTest");
IMPLEMENT_LOGCLASS(CNativeBridgeTestBase, "NativeBridgeTest");

rho::common::CAutoPtr< CNativeBridgeTestFactoryBase> CNativeBridgeTestFactoryBase::m_pInstance;



///////////////////////////////////////
//string constants definiton 

////////////////////////////////////////////////

CNativeBridgeTestBase::CNativeBridgeTestBase()
{

}
CNativeBridgeTestSingletonBase::CNativeBridgeTestSingletonBase()
{
    RHODESAPP().getExtManager().registerExtension( "NativeBridgeTest", this );
}

CNativeBridgeTestSingletonBase::~CNativeBridgeTestSingletonBase()
{
    CNativeBridgeTestFactoryBase::setInstance(0);
}


}
