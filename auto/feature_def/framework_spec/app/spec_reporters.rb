require 'mspec/matchers'
require 'mspec/expectations'
require 'mspec/mocks'
require 'mspec/runner'
require 'mspec/guards'
require 'mspec/helpers'

# If the implementation on which the specs are run cannot
# load pp from the standard library, add a pp.rb file that
# defines the #pretty_inspect method on Object or Kernel.
require 'mspec/pp'

require 'mspec/utils/script'
require 'mspec/version'

class JasmineLikeFormatter < DottedFormatter
  def after(state)
    # do not put anything outside
  end

  def finish
    Rho::Log.info("***Total: #{@tally.counter.examples}","APP")
    Rho::Log.info("***Expectations: #{@tally.counter.expectations}","APP")
    failed = @tally.counter.failures + @tally.counter.errors
    passed = @tally.counter.examples - failed
    Rho::Log.info("***Passed: #{passed}","APP")
    # Failed should be the last line because Jake stops monitoring task after it
    Rho::Log.info("***Failed: #{failed}","APP")
  end
end


class JUnitRhoLogFormatter < JUnitFormatter
  def initialize(file_name=nil)
    super
    @fname = file_name
    @finish = StringIO.new()
  end

  def finish
    super

    @finish.rewind()

    Rho::Log.info(@fname.nil? ? 'spec' : @fname,"JUNITNAME")
    max_buffer_size = 4 * 1024
    buffer = []
    buffer_size = 0
    @finish.each_line do |line|
      buffer << line.rstrip
      buffer_size += line.length + 2
      if buffer_size > max_buffer_size
        Rho::Log.info(buffer.join("~~"),'JUNITBLOB')
        buffer = []
        buffer_size = 0
      end
    end

    Rho::Log.info(buffer.join("~~"),'JUNITBLOB') unless buffer.empty?

    @finish.rewind()

    if !@fname.nil?
      File.open(@fname, "w") { |io| io.write(@finish.string) }
    end
  end
end
