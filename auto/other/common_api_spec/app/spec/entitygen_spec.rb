describe "EntityGen API specs" do
  before(:all) do
    Rho::EntityGen.resetState()
    Rho::EntityGen.clearCallList()
  end

  describe "Empty Entity" do
    before(:each) do
      Rho::EntityGen.clearCallList()
    end

    it "create entity, do not access it" do
      entity = Rho::EntityGen::Emtpy.new()
      entity.should_not be_nil
      Rho::EntityGen.getCallList().join(',').should == ''
    end

    it "create entity, check constructor calls" do
      entity = Rho::EntityGen::Emtpy.new()
      entity.save
      Rho::EntityGen.getCallList().join(',').should == 'initEmtpy'
    end
  end

  describe "constEnt Entity test" do
    before(:each) do
      Rho::EntityGen.clearCallList()
    end

    it "create entity, do not access it" do
      entity = Rho::EntityGen::ConstEnt.new()
      entity.should_not be_nil
      Rho::EntityGen.getCallList().join(',').should == ''
    end

    it "create entity, check constructor calls" do
      entity = Rho::EntityGen::ConstEnt.new()
      entity.save
      Rho::EntityGen.getCallList().join(',').should == 'initConstEnt'
    end

    it "create entity, check access order calls" do
      entity = Rho::EntityGen::ConstEnt.new()
      entity.cconst.should == ''
      entity.save
      entity.cconst.should == 'initialized'
    end

    it "create entity, check access raise error" do
      entity = Rho::EntityGen::ConstEnt.new()
      entity.save
      entity.cconst.should == 'initialized'
      lambda { entity.cconst = 'efg' }.should raise_error
    end
  end

  describe "simpleEntity test" do
    before(:each) do
      Rho::EntityGen.clearCallList()
    end

    it "create entity, do not access it" do
      entity = Rho::EntityGen::SimpleEntity.new()
      entity.should_not be_nil
      Rho::EntityGen.getCallList().join(',').should == ''
      ## set fields
      lambda { entity.id = 100500 }.should raise_error
      entity.someField = "info"

      # check initialization
      entity.save
      Rho::EntityGen.getCallList().join(',').should == 'initSimpleEntity:info'
      Rho::EntityGen.clearCallList()

      # constant fields
      entity.id.should == 0
      lambda { entity.id = 100 }.should raise_error
      entity.id.should == 0

      # non constant fields
      entity.someField.should == 'someValue'
      entity.someField = 10
      entity.someField.should == '10'

      # call method
      entity.just_method().should == 'foo'+entity.id.to_s

      # call static method
      Rho::EntityGen::SimpleEntity.some_method().should =='simple_result'
    end

    it "test entity returned from function" do
      Rho::EntityGen.resetState()

      # generate some entity
      another_entity = Rho::EntityGen::SimpleEntity.one_entity()
      another_entity.id.should == 0
      another_entity.someField.should == 'otherValue'

      yet_another_entity = Rho::EntityGen::SimpleEntity.one_entity()
      yet_another_entity.id.should == 1
      yet_another_entity.someField.should == 'otherValue'

      another_entities = Rho::EntityGen::SimpleEntity.array_of_entites(10)
      (0..9).each do |i|
        another_entities[i].id.should == i+2
        another_entities[i].someField.should =='yetAnotherValue'
      end
    end
  end

end
