//
//  EntityGenImpl.cpp

#include "EntityGenImpl.h"

#include "generated/cpp/EntityGenBase.h"
#include "common/RhoStd.h"
#include "common/AutoPointer.h"
#include "common/RhodesApp.h"
#include "common/RhoConf.h"
#include "logging/RhoLog.h"

namespace rho {
    
    using namespace apiGenerator;
    using namespace common;
    
    class CEntityGenSingletonImpl: public CEntityGenSingletonBase
    {
    protected:
        rho::Hashtable<rho::String, rho::String> m_initArgs;
        rho::Hashtable<rho::String, rho::String> m_updateArgs;
        rho::Vector<rho::String> m_callList;
    public:
        
        CEntityGenSingletonImpl(): CEntityGenSingletonBase(){}
        
        //methods

        /* Enity Emtpy fileds 
        */ 

        virtual void initEmtpyEntity(rho::apiGenerator::CMethodResult& oResult) {
            // RAWLOGC_INFO("initEmtpyEntity","EntityGen");
            m_callList.push_back("initEmtpyEntity");
        } 

        /* Enity ConstEnt fileds 
          const rho::String cconst;
        */ 

        virtual void initConstEntEntity(rho::apiGenerator::CMethodResult& oResult) {
            // RAWLOGC_INFO("initConstEntEntity","EntityGen");
            m_callList.push_back("initConstEntEntity");
            
            
            /* Enity ConstEnt fileds initialization */
            rho::Hashtable<rho::String, rho::String> result;

             // STRING const 
            result["cconst"] =  "initialized";
             
            oResult.set(result);
            
        } 

        /* Enity DatTest fileds 
          const rho::String fConst;
          const rho::String fConstBinding;
          rho::String fBinding;
          rho::String f;
        */ 

        virtual void initDatTestEntity( const rho::Hashtable<rho::String, rho::String>& init_hash, rho::apiGenerator::CMethodResult& oResult) {
            // RAWLOGC_INFO("initDatTestEntity","EntityGen");
            m_callList.push_back("initDatTestEntity");
            
            
            /* Enity DatTest fileds initialization */
            rho::Hashtable<rho::String, rho::String> result;

             // STRING const 
            result["fConst"] =  "abc";
             // STRING const binding
            result["fConstBinding"] = "mapping";
             // STRING  binding
            result["fBinding"] =  "mapping2";
             // STRING  
            result["f"] =  "justvalue";
             
            oResult.set(result);
            
        } 

        virtual void updateDatTestEntity( const rho::Hashtable<rho::String, rho::String>& binding,  const rho::String& f, rho::apiGenerator::CMethodResult& oResult) {
            // RAWLOGC_INFO("updateDatTestEntity","EntityGen");
            m_callList.push_back("updateDatTestEntity");
            
        } 

        virtual void instanceMethodDatTestEntity( const rho::Hashtable<rho::String, rho::String>& hash, rho::apiGenerator::CMethodResult& oResult) {
            // RAWLOGC_INFO("instanceMethodDatTestEntity","EntityGen");
            m_callList.push_back("instanceMethodDatTestEntity");
            
        } 

        virtual void instanceMethodArgDatTestEntity( const rho::Hashtable<rho::String, rho::String>& hash,  const rho::String& filter, rho::apiGenerator::CMethodResult& oResult) {
            // RAWLOGC_INFO("instanceMethodArgDatTestEntity","EntityGen");
            m_callList.push_back("instanceMethodArgDatTestEntity");
            
        } 

        virtual void staticMethodDatTestEntity( const rho::String& filter, rho::apiGenerator::CMethodResult& oResult) {
            // RAWLOGC_INFO("staticMethodDatTestEntity","EntityGen");
            m_callList.push_back("staticMethodDatTestEntity");
            
        } 

        /* Enity Phone fileds 
          const int id;
          rho::String brand;
          rho::String platform;
          rho::String model;
          int generatrion;
          bool available;
          double price;
        */ 

        virtual void initPhoneEntity( const rho::Hashtable<rho::String, rho::String>& init_hash, rho::apiGenerator::CMethodResult& oResult) {
            // RAWLOGC_INFO("initPhoneEntity","EntityGen");
            m_callList.push_back("initPhoneEntity");
            
            
            /* Enity Phone fileds initialization */
            rho::Hashtable<rho::String, rho::String> result;

             // INTEGER const binding
            result["id"] =  ;
             // STRING  
            result["brand"] =  "";
             // STRING  
            result["platform"] =  "";
             // STRING  
            result["model"] =  "";
             // INTEGER  
            result["generatrion"] =  0;
             // BOOLEAN  
            result["available"] =  false;
             // FLOAT  
            result["price"] =  0.0;
             
            oResult.set(result);
            
        } 

        virtual void updatePhoneEntity( int id,  const rho::Hashtable<rho::String, rho::String>& updates, rho::apiGenerator::CMethodResult& oResult) {
            // RAWLOGC_INFO("updatePhoneEntity","EntityGen");
            m_callList.push_back("updatePhoneEntity");
            
        } 

        virtual void filterPhoneEntity( const rho::String& filter,  const rho::String& order, rho::apiGenerator::CMethodResult& oResult) {
            // RAWLOGC_INFO("filterPhoneEntity","EntityGen");
            m_callList.push_back("filterPhoneEntity");
            
        } 

        virtual void updatePricePhoneEntity( int id, rho::apiGenerator::CMethodResult& oResult) {
            // RAWLOGC_INFO("updatePricePhoneEntity","EntityGen");
            m_callList.push_back("updatePricePhoneEntity");
            
        } 

        /* Enity Person fileds 
          rho::String name;
          rho::String surname;
          rho::String phone;
        */ 

        virtual void initPersonEntity( const rho::Hashtable<rho::String, rho::String>& init_hash, rho::apiGenerator::CMethodResult& oResult) {
            // RAWLOGC_INFO("initPersonEntity","EntityGen");
            m_callList.push_back("initPersonEntity");
            
            
            /* Enity Person fileds initialization */
            rho::Hashtable<rho::String, rho::String> result;

             // STRING  
            result["name"] =  "";
             // STRING  
            result["surname"] =  "";
             // STRING  
            result["phone"] =  "";
             
            oResult.set(result);
            
        } 

        virtual void updatePersonEntity( const rho::Hashtable<rho::String, rho::String>& updates, rho::apiGenerator::CMethodResult& oResult) {
            // RAWLOGC_INFO("updatePersonEntity","EntityGen");
            m_callList.push_back("updatePersonEntity");
            
        } 

        virtual void callPersonEntity( const rho::Hashtable<rho::String, rho::String>& hash, rho::apiGenerator::CMethodResult& oResult) {
            // RAWLOGC_INFO("callPersonEntity","EntityGen");
            m_callList.push_back("callPersonEntity");
            
        } 

        virtual void clearCallList(rho::apiGenerator::CMethodResult& oResult) {
            // RAWLOGC_INFO("clearCallList","EntityGen");
            m_callList.push_back("clearCallList")
            
        } 

        virtual void getCallList(rho::apiGenerator::CMethodResult& oResult) {
            // RAWLOGC_INFO("getCallList","EntityGen");
            m_callList.push_back("getCallList")
            
        } 

        virtual void getInitHash(rho::apiGenerator::CMethodResult& oResult) {
            // RAWLOGC_INFO("getInitHash","EntityGen");
            m_callList.push_back("getInitHash")
            
        } 

        virtual void getUpdateHash(rho::apiGenerator::CMethodResult& oResult) {
            // RAWLOGC_INFO("getUpdateHash","EntityGen");
            m_callList.push_back("getUpdateHash")
            
        } 

    };
    
    class CEntityGenImpl : public CEntityGenBase
    {
    public:
        virtual ~CEntityGenImpl() {}
    };
    
    ////////////////////////////////////////////////////////////////////////
    
    class CEntityGenFactory: public CEntityGenFactoryBase    {
    public:
        CEntityGenFactory(){}
        
        IEntityGenSingleton* createModuleSingleton()
        { 
            return new CEntityGenSingletonImpl();
        }
        
        virtual IEntityGen* createModuleByID(const rho::String& strID){ return new CEntityGenImpl(); };
        
    };
    
}

extern "C" void Init_EntityGen_extension()
{
    rho::CEntityGenFactory::setInstance( new rho::CEntityGenFactory() );
    rho::Init_EntityGen_API();
}
