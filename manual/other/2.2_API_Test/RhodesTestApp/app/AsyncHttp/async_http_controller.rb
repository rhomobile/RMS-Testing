require 'rho/rhocontroller'
require 'helpers/browser_helper'

class AsyncHttpController < Rho::RhoController
  include BrowserHelper

  # GET /AsyncHttp
  def index
    @@get_result = ""
    @@get_img_result = ""
    @@file_name = ""
    render :back => '/app'
  end
  
  #AsyncHTTP.get
  def asyncHttpCall1
    Rho::AsyncHttp.get(
      :url => 'http://10.233.85.82:9097/rhodes/AsyncHttp/asyncget.php?data1=test&data2=test2',
      :callback => (url_for :action => :httpget_callback),
      :callback_param => "" )
    render :action => :wait
  end
  
  #AsyncHTTP.get with authentication
  def asyncHttpCall2
    Rho::AsyncHttp.get(
      :url => "http://10.233.85.82:9097/rhodes/secure/asyncget.php?data1=test&data2=test2",
      :callback => (url_for :action => :httpget_callback),
      :authentication => {
        :type => :basic,
        :username => "admin",
        :password => "admin"
      }
    )
    render :action => :wait
  end
  
  #AsyncHTTP.get with authentication (HTTP Site) with wrong udername and password
  def asyncHttpCall3
    Rho::AsyncHttp.get(
      :url => "http://10.233.85.82:9097/rhodes/secure/asyncget.php?data1=test&data2=test2",
      :callback => (url_for :action => :httpget_callback),
      :authentication => {
        :type => :basic,
        :username => "wrong",
        :password => "wrong"
      }
    )
    render :action => :wait
  end
  
  #AsyncHTTP.get Synchronus call
  def asyncHttpCall4

  result = Rho::AsyncHttp.get(
    :url => "http://10.233.85.82:9097/rhodes/AsyncHttp/asyncget.php?data1=test&data2=test2"
  )
  @@get_result = result["body"]
  render :action => :index, :back => '/app'
  end
  
  #AsyncHTTP.post
  def asyncHttpCall5
    Rho::AsyncHttp.post(
      :url => "http://10.233.85.82:9097/rhodes/AsyncHttp/asyncpost.php",
      :body => "data1=test&data2=test2",
      :callback => url_for(:action => :httpget_callback),
      :callback_param => "post=complete"
    )
  end
  
  #AsyncHTTP.post with authentication (HTTP Site) with username and password
  def asyncHttpCall6
    Rho::AsyncHttp.post(
          :url => "http://10.233.85.82:9097/rhodes/secure/asyncpost.php",
          :body => "data1=test&data2=test2",
          :callback => url_for(:action => :httpget_callback),
          :authentication => {
                  :type => :basic,
                  :username => "admin",
                  :password => "admin"
                },
          :callback_param => "post=complete"
        )
    render :action => :wait
  end
  
  #AsyncHTTP.post with authentication (HTTP Site) with wrong udername and password
  def asyncHttpCall7
    Rho::AsyncHttp.post(
          :url => "http://10.233.85.82:9097/rhodes/secure/asyncpost.php",
          :body => "data1=test&data2=test2",
          :callback => url_for(:action => :httpget_callback),
          :authentication => {
                  :type => :basic,
                  :username => "wrong",
                  :password => "wrong"
                },
          :callback_param => "post=complete"
        )
    render :action => :wait
  end
  
  #AsyncHTTP.post Synchronus call
  def asyncHttpCall8

  result = Rho::AsyncHttp.post(
    :url => "http://10.233.85.82:9097/rhodes/AsyncHttp/asyncget.php?data1=test&data2=test2"
  )
  @@get_result = result["body"]
  render :action => :index, :back => '/app'
  end
  
  #ARho::AsyncHttp.download_file
  def asyncHttpDownload
  @@get_img_result = File.join(Rho::RhoApplication::get_blob_folder(), "/test.jpg")
  puts @@get_img_result
  # :filename     Full path to download file target.
  Rho::AsyncHttp.download_file(
    :url => "http://10.233.85.82:9097/rhodes/AsyncHttp/screen.jpg",
    :filename => @@get_img_result,
    :headers => {},
    :callback => url_for(:action => :httpdownload_callback)
  )
  end
  
  #AsyncHTTP.download_file with authentication
  def asyncHttpDownload1
  @@get_img_result = File.join(Rho::RhoApplication::get_blob_folder(), "/test2.jpg")
  puts @@get_img_result
  # :filename     Full path to download file target.
  Rho::AsyncHttp.download_file(
    :url => "http://10.233.85.82:9097/rhodes/secure/screen.jpg",
    :filename => @@get_img_result,
    :headers => {},
    :authentication => {
                     :type => :basic,
                     :username => "admin",
                     :password => "admin"
                   },
    :callback => url_for(:action => :httpdownload_callback)
  )
  end
  
  #AsyncHTTP.download_file with authentication with wrong userid and password
  def asyncHttpDownload2
  @@get_img_result = File.join(Rho::RhoApplication::get_blob_folder(), "/test3.jpg")
  puts @@get_img_result
  # :filename     Full path to download file target.
  Rho::AsyncHttp.download_file(
    :url => "http://10.233.85.82:9097/rhodes/secure/screen.jpg",
    :filename => @@get_img_result,
    :headers => {},
    :authentication => {
                     :type => :basic,
                     :username => "wrong",
                     :password => "wrong"
                   },
    :callback => url_for(:action => :httpdownload_callback)
  )
  end
  
  #AsyncHTTP.download_file synchronous
  def asyncHttpDownload3
  @@get_img_result = File.join(Rho::RhoApplication::get_blob_folder(), "/test4.jpg")
  puts @@get_img_result
  # :filename     Full path to download file target.
  Rho::AsyncHttp.download_file(
    :url => "http://10.233.85.82:9097/rhodes/AsyncHttp/screen.jpg",
    :filename => @@get_img_result
  )
  render :action => :index, :back => '/app'
  end
  
  #AsyncHTTP.upload_file
  def asyncHttpUploadFile
    @@file_name = File.join(Rho::RhoApplication::get_model_path('app','AsyncHttp'), "myfile.txt")
    
    # :filename     Full path to download file target.
    # :post         HTTP POST body to send with request.
    Rho::AsyncHttp.upload_file(
      :url => "http://192.168.6.18/Neon/ReceivedFiles/Upload.aspx",
      :filename => @@file_name,
      :body => "", #=> leave blank, AsyncHttp will fill in multipart body
      :headers => {"Content-Type"=>"text/plain"}, #=> used as body text content type
      :callback => url_for(:action => :httpupload_callback),
      :callback_param => "" )
  end
  
  #AsyncHTTP.upload_file with authentication
  def asyncHttpUploadFile1
    @@file_name = File.join(Rho::RhoApplication::get_model_path('app','AsyncHttp'), "myfile.txt")
    
    # :filename     Full path to download file target.
    # :post         HTTP POST body to send with request.
    Rho::AsyncHttp.upload_file(
      :url => "http://192.168.6.18/Neon/secure/Upload.aspx",
      :filename => @@file_name,
      :body => "", #=> leave blank, AsyncHttp will fill in multipart body
      :headers => {"Content-Type"=>"text/plain"}, #=> used as body text content type
      :callback => url_for(:action => :httpupload_callback),
      :authentication => {
           :type => :basic,
           :username => "admin",
           :password => "Motorola@123"
         },
      :callback_param => "" )
  end
  
  #AsyncHTTP.upload_file with authentication with wrong userid and password
  def asyncHttpUploadFile2
    @@file_name = File.join(Rho::RhoApplication::get_model_path('app','AsyncHttp'), "myfile.txt")
    
    # :filename     Full path to download file target.
    # :post         HTTP POST body to send with request.
    Rho::AsyncHttp.upload_file(
      :url => "http://10.233.85.82:9097/rhodes/secure/uploadfile",
      :filename => @@file_name,
      :body => "", #=> leave blank, AsyncHttp will fill in multipart body
      :headers => {"Content-Type"=>"text/plain"}, #=> used as body text content type
      :callback => url_for(:action => :httpupload_callback),
      :authentication => {
           :type => :basic,
           :username => "wrong",
           :password => "wrong"
         },
      :callback_param => "" )
  end
  
  #AsyncHTTP.upload_file Synchronous
  def asyncHttpUploadFile3
    @@file_name = File.join(Rho::RhoApplication::get_model_path('app','AsyncHttp'), "myfile.txt")
    
    # :filename     Full path to download file target.
    # :post         HTTP POST body to send with request.
    Rho::AsyncHttp.upload_file(
      :url => "http://10.233.85.82:9097/rhodes/AsyncHttp/uploadfile",
      :filename => @@file_name,
      :body => "", #=> leave blank, AsyncHttp will fill in multipart body
      :headers => {"Content-Type"=>"text/plain"} #=> used as body text content type
      )
    render :action => :index, :back => '/app'
      
  end
  
  
  
  ##################################################
  def httpget_callback
    puts "httpget_callback: #{@params}"
    if @params['status'] != 'ok'
        @@error_params = @params
        WebView.navigate ( url_for :action => :show_error )        
    else
        @@get_result = @params['body']
        WebView.navigate ( url_for :action => :show_result )
    end
  end
  
  def httpdownload_callback
    puts "httpdownload_callback: #{@params}"

    if @params['status'] != 'ok'
        @@error_params = @params
        WebView.navigate ( url_for :action => :show_error )        
    else
        WebView.navigate ( url_for :action => :show_result )
    end

  end
  
  def httpupload_callback
    puts "httpupload_callback: #{@params}"

    if @params['status'] != 'ok'
        @@error_params = @params
        WebView.navigate ( url_for :action => :show_error )        
    else
        @@get_result = "Success. File: " + @@file_name;
        WebView.navigate ( url_for :action => :show_result )
    end
        
  end
  
  def show_result
    render :action => :index, :back => '/app'
  end

  def show_error
    render :action => :error, :back => '/app'
  end
    
  def cancel_httpcall
    Rho::AsyncHttp.cancel( url_for( :action => :httpget_callback) )

    @@get_result  = 'Request was cancelled.'
    render :action => :index, :back => '/app'
  end
  
  def get_res
    @@get_result    
  end
  
  def get_img_res
    @@get_img_result    
  end

  def get_error
    @@error_params
  end

end
