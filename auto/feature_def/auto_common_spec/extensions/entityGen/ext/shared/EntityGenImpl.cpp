//
//  EntityGenImpl.cpp

#include "EntityGenImpl.h"

#include "generated/cpp/EntityGenBase.h"
#include "common/RhoStd.h"
#include "common/AutoPointer.h"
#include "common/RhodesApp.h"
#include "common/RhoConf.h"
#include "logging/RhoLog.h"
#include "api_generator/StringifyHelper.h"

namespace rho {
    
    using namespace apiGenerator;
    using namespace common;
    
    class CEntityGenSingletonImpl: public CEntityGenSingletonBase
    {
    protected:
        rho::Hashtable<rho::String, rho::String> m_initArgs;
        rho::Hashtable<rho::String, rho::String> m_updateArgs;
        rho::Vector<rho::String> m_callList;
        int counter;
        int dat_test_counter;
        int simple_entity_counter;
        
        virtual void reset() {
            m_initArgs.clear();
            m_updateArgs.clear();
            m_callList.clear();
            counter = 0;
            dat_test_counter = 0;
            simple_entity_counter = 0;
        }
        
    public:
        
        CEntityGenSingletonImpl(): CEntityGenSingletonBase(){ reset(); }
        
        //methods

        /* Enity Emtpy fileds 
        */ 

        virtual void initEmtpy(rho::apiGenerator::CMethodResult& oResult) {
            RAWLOGC_INFO("initEmtpy","EntityGen");
            m_callList.push_back("initEmtpy");
            m_initArgs.clear();
        } 

        /* Enity ConstEnt fileds 
          const rho::String cconst;
        */ 

        virtual void initConstEnt(rho::apiGenerator::CMethodResult& oResult) {
            RAWLOGC_INFO("initConstEnt","EntityGen");
            m_callList.push_back("initConstEnt");
            m_initArgs.clear();

            
            
            /* Enity ConstEnt fileds initialization */
            rho::Hashtable<rho::String, rho::String> result;

             // STRING const 
            result["cconst"] =  "initialized";
             
            oResult.set(result);
            
        } 

        /* Enity SimpleEntity fileds 
          const int id;
          rho::String someField;
        */ 

        virtual void initSimpleEntity( const rho::String& someField, rho::apiGenerator::CMethodResult& oResult) {
            RAWLOGC_INFO("initSimpleEntity","EntityGen");
            m_callList.push_back("initSimpleEntity:"+someField);
            
            /* Enity SimpleEntity fileds initialization */
            rho::Hashtable<rho::String, rho::String> result;

             // INTEGER const binding
            result["id"] =  convertToStringA(simple_entity_counter++);
             // STRING  
            result["someField"] =  "someValue";
             
            oResult.set(result);
            
        } 

        virtual void updateSimpleEntity( int id,  const rho::Hashtable<rho::String, rho::String>& updates, rho::apiGenerator::CMethodResult& oResult) {
            RAWLOGC_INFO("updateSimpleEntity","EntityGen");
            StringifyHash helper; rho::String str; helper.fromHash(updates); helper.toString(str);
            m_callList.push_back("updateSimpleEntity:"+convertToStringA(id)+"," + str);
        } 

        virtual void justMethodSimpleEntity( int id, rho::apiGenerator::CMethodResult& oResult) {
            RAWLOGC_INFO("justMethodSimpleEntity","EntityGen");
            m_callList.push_back("justMethodSimpleEntity:"+convertToStringA(id));
            oResult.set("foo"+convertToStringA(id));
        } 

        virtual void someMethodSimpleEntityStatic(rho::apiGenerator::CMethodResult& oResult) {
            RAWLOGC_INFO("someMethodSimpleEntityStatic","EntityGen");
            m_callList.push_back("someMethodSimpleEntityStatic");
            oResult.set("simple_result");
            
        } 

        virtual void oneEntitySimpleEntityStatic(rho::apiGenerator::CMethodResult& oResult) {
            RAWLOGC_INFO("oneEntitySimpleEntityStatic","EntityGen");
            rho::Hashtable<rho::String, rho::String> result;
            result["id"] = convertToStringA(simple_entity_counter++);
            result["someField"] =  "otherValue";
            oResult.set(result);
        } 

        virtual void arrayOfEntitesSimpleEntityStatic( int num, rho::apiGenerator::CMethodResult& oResult) {
            // RAWLOGC_INFO("arrayOfEntitesSimpleEntityStatic","EntityGen");
            rho::Vector<rho::Hashtable<rho::String, rho::String> > result;
            if (num > 0 && num < 100) {
                for(int i = 0; i < num; i++)
                {
                    rho::Hashtable<rho::String, rho::String> s_result;
                    s_result["id"] = convertToStringA(simple_entity_counter++);
                    s_result["someField"] =  "yetAnotherValue";
                    result.push_back(s_result);
                }
            }
            oResult.set(result);
        }


        /* Enity DatTest fileds 
          const rho::String fConst;
          const rho::String fConstBinding;
          rho::String fBinding;
          rho::String f;
        */ 

        virtual void initDatTest( const rho::Hashtable<rho::String, rho::String>& init_hash, rho::apiGenerator::CMethodResult& oResult) {
            RAWLOGC_INFO("initDatTest","EntityGen");
            m_callList.push_back("initEnityDatTest");
            m_initArgs = init_hash;
            
            /* Enity DatTest fileds initialization */
            rho::Hashtable<rho::String, rho::String> result;

             // STRING const 
            result["fConst"] = "justConstant";
             // STRING const binding
            result["fConstBinding"] = convertToStringA(dat_test_counter++);
             // STRING  binding
            result["fBinding"] =  "bindingField2";
             // STRING  
            result["f"] =  "justvalue";
             
            oResult.set(result);
            
        } 

        virtual void updateDatTest( const rho::Hashtable<rho::String, rho::String>& binding,  const rho::Hashtable<rho::String, rho::String>& updates, rho::apiGenerator::CMethodResult& oResult) {
            RAWLOGC_INFO("updateDatTest","EntityGen");
            m_callList.push_back("updateDatTest");
            m_updateArgs = binding;
            
        } 

        virtual void instanceMethodDatTest( const rho::Hashtable<rho::String, rho::String>& hash, rho::apiGenerator::CMethodResult& oResult) {
            RAWLOGC_INFO("instanceMethodDatTest","EntityGen");
            StringifyHash helper; rho::String str; helper.fromHash(hash); helper.toString(str);
            m_callList.push_back("instanceMethodDatTest:"+str);
            
        } 

        virtual void instanceMethodArgDatTest( const rho::Hashtable<rho::String, rho::String>& hash,  const rho::String& filter, rho::apiGenerator::CMethodResult& oResult) {
            RAWLOGC_INFO("instanceMethodArgDatTest","EntityGen");
            StringifyHash helper; rho::String str; helper.fromHash(hash); helper.toString(str);
            m_callList.push_back("instanceMethodArgDatTest");
            
        } 

        virtual void staticMethodDatTestStatic( const rho::String& filter, rho::apiGenerator::CMethodResult& oResult) {
            RAWLOGC_INFO("staticMethodDatTestStatic","EntityGen");
            m_callList.push_back("staticMethodDatTestStatic");
            
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

        virtual void initPhone( const rho::Hashtable<rho::String, rho::String>& init_hash, rho::apiGenerator::CMethodResult& oResult) {
            RAWLOGC_INFO("initPhone","EntityGen");
            m_callList.push_back("initPhone");
            
            
            /* Enity Phone fileds initialization */
            rho::Hashtable<rho::String, rho::String> result;

             // INTEGER const binding
            result["id"] =  "123";
             // STRING  
            result["brand"] =  "";
             // STRING  
            result["platform"] =  "";
             // STRING  
            result["model"] =  "";
             // INTEGER  
            result["generatrion"] =  "0";
             // BOOLEAN  
            result["available"] =  "false";
             // FLOAT  
            result["price"] =  "0.0";
             
            oResult.set(result);
            
        } 

        virtual void updatePhone( int id,  const rho::Hashtable<rho::String, rho::String>& updates, rho::apiGenerator::CMethodResult& oResult) {
            RAWLOGC_INFO("updatePhone","EntityGen");
            m_callList.push_back("updatePhone");
            
        } 

        virtual void filterPhoneStatic( const rho::String& filter,  const rho::String& order, rho::apiGenerator::CMethodResult& oResult) {
            RAWLOGC_INFO("filterPhoneStatic","EntityGen");
            m_callList.push_back("filterPhoneStatic");
            
        } 

        virtual void updatePricePhone( int id, rho::apiGenerator::CMethodResult& oResult) {
            RAWLOGC_INFO("updatePricePhone","EntityGen");
            m_callList.push_back("updatePricePhone");
            
        } 

        /* Enity Person fileds 
          rho::String name;
          rho::String surname;
          rho::String phone;
        */ 

        virtual void initPerson( const rho::Hashtable<rho::String, rho::String>& init_hash, rho::apiGenerator::CMethodResult& oResult) {
            RAWLOGC_INFO("initPerson","EntityGen");
            m_callList.push_back("initPerson");
            
            
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

        virtual void updatePerson( const rho::Hashtable<rho::String, rho::String>& updates, rho::apiGenerator::CMethodResult& oResult) {
            RAWLOGC_INFO("updatePerson","EntityGen");
            m_callList.push_back("updatePerson");
            
        } 

        virtual void callPerson( const rho::Hashtable<rho::String, rho::String>& hash, rho::apiGenerator::CMethodResult& oResult) {
            RAWLOGC_INFO("callPerson","EntityGen");
            m_callList.push_back("callPerson");
            
        } 

        
        virtual void resetState(rho::apiGenerator::CMethodResult& oResult) {
            // RAWLOGC_INFO("resetState","EntityGen");
            reset();
        }


        virtual void clearCallList(rho::apiGenerator::CMethodResult& oResult) {
            RAWLOGC_INFO("clearCallList","EntityGen");
            m_callList.clear();   
        }


        virtual void getCallList(rho::apiGenerator::CMethodResult& oResult) {
            RAWLOGC_INFO("getCallList","EntityGen");
            oResult.set(m_callList);
        } 

        virtual void getInitHash(rho::apiGenerator::CMethodResult& oResult) {
            RAWLOGC_INFO("getInitHash","EntityGen");
            oResult.set(m_initArgs);
        } 

        virtual void getUpdateHash(rho::apiGenerator::CMethodResult& oResult) {
            RAWLOGC_INFO("getUpdateHash","EntityGen");
            oResult.set(m_updateArgs);
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
    RHODESAPP().getExtManager().requireRubyFile("RhoEntityGenEntities");
}
