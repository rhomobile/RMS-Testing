require 'rexml/document'

describe "Xml" do
    it "should parse" do
        file_name = File.join(Rho::RhoApplication::get_model_path('app','Data'), 'test.xml')
        
        file = File.new(file_name)
        doc = REXML::Document.new(file)

        events = REXML::XPath.each( doc, "event" )
        events.should_not be_nil
        count = 0
        event = nil
        events.each do |e|
            count += 1
            event = e
        end
        count.should == 1
        event.should_not be_nil
        REXML::XPath.first( event, "@id" ).value.should == "E0-001-000278174-6" 
        
        event.elements['title'].text.should ==  "Martini Tasting"
        
		childs = REXML::XPath.each( doc, "//children/child/" )
		ch_count = 0
        childs.each do |ch|
            ch_count += 1
            ch.elements['title'].text.should ==  "Momba"
        end

        ch_count.should == 10
    end

    it "should parse CDATA" do
        file_name = File.join(Rho::RhoApplication::get_model_path('app','Data'), 'testCDATA.xml')

        file = File.new(file_name)
        doc = REXML::Document.new(file)
    
		persons = REXML::XPath.each( doc, "//person/" )
		firstname=""
        persons.each do |ch|
            firstname = ch.elements['firstname'].text
        end

        firstname.should == "Sample bold <b</b>Tag"    
    end
    
    class MyStreamListener

        def initialize(events)
            @events = events
        end

        def tag_start name, attrs
            #puts "tag_start: #{name}; #{attrs}"
            @events << attrs if name == 'event'
        end
        def tag_end name
            #puts "tag_end: #{name}"
        end
        def text text
            #puts "text: #{text}"
        end
        def instruction name, instruction
        end
        def comment comment
        end
        def doctype name, pub_sys, long_name, uri
        end
        def doctype_end
        end
        def attlistdecl element_name, attributes, raw_content
        end
        def elementdecl content
        end
        def entitydecl content
        end
        def notationdecl content
        end
        def entity content
        end
        def cdata content
            #puts "cdata: #{content}"
        end
        def xmldecl version, encoding, standalone
        end
    end
    
    #def add_event(attrs)
    #    @events<<attrs
    #end
    
    it "should stream parse" do
    
        file_name = File.join(Rho::RhoApplication::get_model_path('app','Data'), 'test.xml')
        file = File.new(file_name)
    
        @events = []
        list = MyStreamListener.new(@events)
        REXML::Document.parse_stream(file, list)
    
        @events.size.should == 1
    end

    class MyStreamListener1

        def initialize(events)
            @events = events
        end

        #def tag_start name, attrs
            #puts "tag_start: #{name}; #{attrs}"
            #@events << attrs if name == 'event'
        #end
        
        def tag_start name, attrs
            if name == 'Field'
              case attrs['name']
              when 'MatchCode.Customer'  then @matchcode = attrs['value']
              when 'Pk.Customer'         then @pk = attrs['value']
              end
              if @matchcode && @pk
                then
                #@parent.add_pairs(@pk, @matchcode)
                @events << [@pk, @matchcode]
                @pk = nil
              end
            end
        end
                
        def tag_end name
            #puts "tag_end: #{name}"
        end
        def text text
            #puts "text: #{text}"
        end
        def instruction name, instruction
        end
        def comment comment
        end
        def doctype name, pub_sys, long_name, uri
        end
        def doctype_end
        end
        def attlistdecl element_name, attributes, raw_content
        end
        def elementdecl content
        end
        def entitydecl content
        end
        def notationdecl content
        end
        def entity content
        end
        def cdata content
            #puts "cdata: #{content}"
        end
        def xmldecl version, encoding, standalone
        end
    end

    it "should stream parse1" do
    
        file_name = File.join(Rho::RhoApplication::get_model_path('app','Data'), 'test1.xml')
        file = File.new(file_name)
    
        @events = []
        list = MyStreamListener1.new(@events)
        REXML::Document.parse_stream(file, list)
    
        @events.size.should == 1
    end
    
    it "should generate XML text" do
        dc = REXML::Document.new()
        FirstKey = REXML::Element.new "FirstKey"
        FirstKey.add_attribute "Key1", "Value1"
        FirstKey.add_attribute "Key2", "Value2"
        dc.add_element FirstKey
        
        puts "dc: #{dc.inspect}"
        puts "FirstKey : #{FirstKey.inspect}"
    end
end    