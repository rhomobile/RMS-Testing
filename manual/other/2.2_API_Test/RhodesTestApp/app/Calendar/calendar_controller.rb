require 'rho/rhocontroller'
require 'rho/rhoevent.rb'
require 'time'
require 'helpers/browser_helper'

class CalendarController < Rho::RhoController
  include BrowserHelper
  @layout = 'Calendar/layout'
  
    def fetch_events
      #start = Time.utc(Rho::RhoEvent::MIN_TIME.to_i)
      #finish = Time.utc(2030, 'dec', 31, 23, 59, 59)
      @authorization_status = Rho::RhoEvent.get_authorization_status
      puts "Bhakta #{@authorization_status}"
      @@events = Rho::RhoEvent.find(:all,
          :start_date => (Rho::RhoEvent::MIN_TIME + 1), :end_date => (Rho::RhoEvent::MAX_TIME - 1),
          :find_type => 'starting', :include_repeating => false)
      puts "events : #{@@events}"
      begin
      @@events = @@events.sort do |x,y|
        res = 1 if x['start_date'].nil?
        res = -1 if y['start_date'].nil?
        res = x['start_date'] <=> y['start_date'] unless res
        res
      end
      rescue Rho::RhoError => e
       puts @msg = e.message
      end
      @event = nil
    end
    private :fetch_events
  
    def get_events
      @@events    
    end
    
    def index
      fetch_events
      render :back => '/app'
    end
  
    def date_popup
      DateTimePicker.choose url_for(:action => :date_callback), @params['title'], Time.new, 0, Marshal.dump(@params['field_key'])
    end
  
    def date_callback
      if @params['status'] == 'ok'
        key = Marshal.load(@params['opaque'])
        puts "Bhakta : #{@params['result'].to_i}"
        result = Time.at(@params['result'].to_i).strftime('%F %T')
        puts "Bhakta #{result}"
        WebView.execute_js('setFieldValue("'+key+'","'+result+'");')
      end
    end
  
    def save
      event = @params['event']
      puts "Bhakta Save #{event}"
      event[Rho::RhoEvent::END_DATE] = nil if event[Rho::RhoEvent::END_DATE] == ''
      recurrence = !@params['recurrence'].nil?
      frequency = @params['frequency']
      interval = @params['interval']
      recurrence_end = @params['recurrence_end']
      recurrence_times = @params['recurrence_times']
      
      if recurrence
        event[Rho::RhoEvent::RECURRENCE] = {
          Rho::RhoEvent::RECURRENCE_FREQUENCY => frequency,
          Rho::RhoEvent::RECURRENCE_INTERVAL => interval,
          Rho::RhoEvent::RECURRENCE_END => recurrence_end, 
          Rho::RhoEvent::RECURRENCE_COUNT => recurrence_times }
      end
      puts "event: #{event.inspect}"
      id = event[Rho::RhoEvent::ID]
      if id.nil? or id.empty?
        new_event = Rho::RhoEvent.create!(event)
        if new_event != nil
          puts "Bhakta #{new_event}"
          new_id = new_event['id']
          puts 'created new event with id = ' + new_id.to_s
        end
      else
        Rho::RhoEvent.update_attributes event
      end
  
      fetch_events
      redirect :action => :index
    end
  
    def new
      puts "create event"
      @event = nil
      render :action => :edit
    end
  
    def edit
      #id = @params[Rho::RhoEvent::ID]
      #puts "id: #{id}"
      #@event = Rho::RhoEvent.find(id)
      
      @event = @@events[strip_braces(@params['id']).to_i ]
      render :action => :edit
    end
  
    def delete
      id = @params[Rho::RhoEvent::ID]
      Rho::RhoEvent.destroy(id)
  
      fetch_events
      redirect :action => :index
    end
    
    #Test Case ID VT229-0030
    def is_calendar_exist
      $testCaseID = "VT229-0030"
      result = System::get_property('has_calendar')
      Alert.show_status(Calendar,result.to_s,Dismiss)
    end

    def create_five_event

      event = {  Rho::RhoEvent::ID => '',
                        Rho::RhoEvent::TITLE => 'My 1st Event',
                        Rho::RhoEvent::LOCATION => 'Bangalore',
                        Rho::RhoEvent::NOTES => 'This is the 1st event trying to create',
                        Rho::RhoEvent::START_DATE => Time.at(Time.now.to_i + 3600).strftime('%F %T'),
                        Rho::RhoEvent::END_DATE => Time.at(Time.now.to_i + 86400).strftime('%F %T'),
                        Rho::RhoEvent::RECURRENCE => {
                                                      Rho::RhoEvent::RECURRENCE_FREQUENCY => Rho::RhoEvent::RECURRENCE_FREQUENCY_DAILY,
                                                      Rho::RhoEvent::RECURRENCE_INTERVAL => '2',
                                                      Rho::RhoEvent::RECURRENCE_END => Time.at(Time.now.to_i + 86400).strftime('%F %T'), 
                                                      },
                        Rho::RhoEvent::REMINDER => '5',
                        Rho::RhoEvent::PRIVACY => 'public'
                     }
            puts "event: #{event.inspect}"
            new_event = Rho::RhoEvent.create!(event)
            if new_event != nil
                puts "Bhakta #{new_event}"
                new_id = new_event['id']
                puts 'created new event with id = ' + new_id.to_s
            end
            fetch_events
      
      redirect :action => :index
    end
    
   
  end
