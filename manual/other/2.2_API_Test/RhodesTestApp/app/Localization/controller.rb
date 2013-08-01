require 'rho/rhocontroller'
require 'time'
require 'date'

class LocalizationController < Rho::RhoController

  #GET /Localization
  def index
  
    render :back => '/app'
  end
  
  def change_locale_to_english
  
    System::set_locale("en")
    redirect :action => :index  
  end
  
  def change_locale_to_french
  
    System::set_locale("fr")
    redirect :action => :index  
  end
  
  def change_locale_to_german
  
    System::set_locale("de")
    redirect :action => :index  
  end
  
  def change_locale_to_spanish
  
    System::set_locale("es")
    redirect :action => :index  
  end
  
  def change_locale_to_italian
  
    System::set_locale("it")
    redirect :action => :index  
  end
  
  def change_locale_to_korean
  
    System::set_locale("ko")
    redirect :action => :index  
  end
  
  def change_locale_to_chinese
  
    System::set_locale("zh")
    redirect :action => :index  
  end
  
  def change_locale_to_japanese
  
    System::set_locale("ja")
    redirect :action => :index  
  end
  
  def change_locale_to_arabic
  
    System::set_locale("ar")
    redirect :action => :index  
  end
  
  def change_locale_to_hebrew
  
    System::set_locale("he")
    redirect :action => :index  
  end
  
  def change_locale_to_dutch
  
    System::set_locale("nl")
    redirect :action => :index  
  end
  
  def change_locale_to_finnish
  
    System::set_locale("fi")
    redirect :action => :index  
  end
  
  def change_locale_to_danish
  
    System::set_locale("da")
    redirect :action => :index  
  end
  
  def change_locale_to_czech
  
    System::set_locale("cs")
    redirect :action => :index  
  end
  
  def change_locale_to_catalan
  
    System::set_locale("ca")
    redirect :action => :index  
  end
  
  def change_locale_to_portuguese
  
    System::set_locale("pt")
    redirect :action => :index  
  end
  
  def change_locale_to_serbian
  
    System::set_locale("sr")
    redirect :action => :index  
  end

end
