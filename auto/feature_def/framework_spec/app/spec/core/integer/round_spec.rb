require File.expand_path('../../../spec_helper', __FILE__)
require File.expand_path('../shared/to_i', __FILE__)

describe "Integer#round" do
  it_behaves_like(:integer_to_i, :round)

  ruby_version_is "1.9" do
    it "rounds itself as a float if passed a positive precision" do
      [2, -4, 10**70, -10**100].each do |v|
        v.round(42).should eql(v.to_f)
      end
    end

    it "returns itself if passed zero" do
      [2, -4, 10**70, -10**100].each do |v|
        v.round(0).should eql(v)
      end
    end

    ruby_bug "redmine:5228", "1.9.2" do
      it "returns itself rounded if passed a negative value" do
        +249.round(-2).should eql(+200)
        +250.round(-2).should eql(+300)
        -249.round(-2).should eql(-200)
        -250.round(-2).should eql(-300)
        (+25 * 10**70).round(-71).should eql(+30 * 10**70)
        (-25 * 10**70).round(-71).should eql(-30 * 10**70)
        (+25 * 10**70 - 1).round(-71).should eql(+20 * 10**70)
        (-25 * 10**70 + 1).round(-71).should eql(-20 * 10**70)
      end
    end

    it "raises a TypeError when its argument can not be converted to an Integer" do
      lambda { 42.round("4") }.should raise_error(TypeError)
      lambda { 42.round(nil) }.should raise_error(TypeError)
    end

  end
end
