#include "GenPropBagBase.h"
#include "common/RhodesApp.h"


namespace rho {

IMPLEMENT_LOGCLASS(CGenPropBagSingletonBase, "GenPropBag");
IMPLEMENT_LOGCLASS(CGenPropBagBase, "GenPropBag");

rho::common::CAutoPtr< CGenPropBagFactoryBase> CGenPropBagFactoryBase::m_pInstance;



///////////////////////////////////////
//string constants definiton 

////////////////////////////////////////////////

CGenPropBagBase::CGenPropBagBase()
{

    m_mapPropAccessors["boolProp"] = 0;
    m_mapPropAccessors["intProp"] = 0;
    m_mapPropAccessors["floatProp"] = 0;
    m_mapPropAccessors["stringProp"] = 0;


}

void CGenPropBagBase::getProperty( const rho::String& propertyName, CMethodResult& oResult)
{

    oResult.resetToEmptyString();
    CMethodAccessor< IGenPropBag >* pAccessor = m_mapPropAccessors[propertyName];
    if ( pAccessor )
        pAccessor->callGetter(this, oResult);
    else
    {

        oResult.set(m_hashProps[propertyName]);

    }
}

void CGenPropBagBase::getProperties( const rho::Vector<rho::String>& arrayofNames, CMethodResult& oResult)
{
    rho::Hashtable<rho::String, rho::String> res;
    oResult.setCollectionMode(true);
    for ( int i = 0; i < (int)arrayofNames.size(); i++ )
    {
        getProperty(arrayofNames[i], oResult);

        if ( !oResult.isError() )
        {
            res[arrayofNames[i]] = oResult.toString();
        }
    }
    oResult.setCollectionMode(false);

    oResult.set(res);
}

void CGenPropBagBase::getAllProperties(CMethodResult& oResult)
{
    rho::Hashtable<rho::String, rho::String> res;
    oResult.setCollectionMode(true);

    
    // user defined properties
    for ( rho::Hashtable<rho::String, rho::String>::const_iterator it = m_hashProps.begin();  it != m_hashProps.end(); ++it )
    {
        res[it->first] = it->second;
    }
    

    // existing properties
    for ( rho::Hashtable<rho::String, rho::apiGenerator::CMethodAccessor< IGenPropBag > *>::const_iterator it = m_mapPropAccessors.begin();  it != m_mapPropAccessors.end(); ++it )
    {
        getProperty(it->first, oResult);
        
        if ( oResult.isError() )
            break;
        
        res[it->first] = oResult.toString();
    }
    
    oResult.setCollectionMode(false);
    if ( oResult.isError() )
        oResult.callCallback();
    else
        oResult.set(res);
}

void CGenPropBagBase::setProperty( const rho::String& propertyName,  const rho::String& propertyValue, CMethodResult& oResult)
{
    CMethodAccessor< IGenPropBag >* pAccessor = m_mapPropAccessors[propertyName];
    if (pAccessor && pAccessor->hasSetter())
        m_mapPropAccessors[propertyName]->callSetter(this, propertyValue, oResult);
    else
    {
        

        m_hashProps.put(propertyName, propertyValue);
    }
}

void CGenPropBagBase::setProperties( const rho::Hashtable<rho::String, rho::String>& propertyMap, CMethodResult& oResult)
{
    for ( rho::Hashtable<rho::String, rho::String>::const_iterator it = propertyMap.begin();  it != propertyMap.end(); ++it )
    {
        setProperty( it->first, it->second, oResult );
        if ( oResult.isError() )
            break;
    }
}

void CGenPropBagBase::clearAllProperties(CMethodResult& oResult)
{
    m_hashProps.clear();
    // ToDo: set default values to existing properties 
}



void CGenPropBagBase::getBoolProp(rho::apiGenerator::CMethodResult& oResult)
{ 
    getProperty( "boolProp", oResult); 
}

void CGenPropBagBase::setBoolProp( bool boolProp, rho::apiGenerator::CMethodResult& oResult)
{ 
    setProperty( "boolProp", rho::common::convertToStringA(boolProp), oResult );
}

void CGenPropBagBase::getIntProp(rho::apiGenerator::CMethodResult& oResult)
{ 
    getProperty( "intProp", oResult); 
}

void CGenPropBagBase::setIntProp( int intProp, rho::apiGenerator::CMethodResult& oResult)
{ 
    setProperty( "intProp", rho::common::convertToStringA(intProp), oResult );
}

void CGenPropBagBase::getFloatProp(rho::apiGenerator::CMethodResult& oResult)
{ 
    getProperty( "floatProp", oResult); 
}

void CGenPropBagBase::setFloatProp( double floatProp, rho::apiGenerator::CMethodResult& oResult)
{ 
    setProperty( "floatProp", rho::common::convertToStringA(floatProp), oResult );
}

void CGenPropBagBase::getStringProp(rho::apiGenerator::CMethodResult& oResult)
{ 
    getProperty( "stringProp", oResult); 
}

void CGenPropBagBase::setStringProp( const rho::String& stringProp, rho::apiGenerator::CMethodResult& oResult)
{ 
    setProperty( "stringProp", rho::common::convertToStringA(stringProp), oResult );
}
CGenPropBagSingletonBase::CGenPropBagSingletonBase()
{
    RHODESAPP().getExtManager().registerExtension( "GenPropBag", this );
}

CGenPropBagSingletonBase::~CGenPropBagSingletonBase()
{
    CGenPropBagFactoryBase::setInstance(0);
}


}
