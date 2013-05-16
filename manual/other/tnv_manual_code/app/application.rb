require 'rho/rhoapplication'

class AppApplication < Rho::RhoApplication
  def initialize
    # Tab items are loaded left->right, @tabs[0] is leftmost tab in the tab-bar
    # Super must be called *after* settings @tabs!
    @tabs = nil
    #To remove default toolbar uncomment next line:
    #@@toolbar = nil
    super

    barcode=ModelBarcode.find(:all)
    if barcode != nil
      ModelBarcode.delete_all
    end

    barcode=ModelBarcode.create(:propertyName => "allDecoders" ,:propertyValues =>"true,false")
    barcode.save
    barcode=ModelBarcode.create(:propertyName => "picklistMode" ,:propertyValues =>"disabled,hardwareReticle,softwareReticle")
    barcode.save
    barcode=ModelBarcode.create(:propertyName => "scanTimeout" ,:propertyValues =>"7000,5000")
    barcode.save

  end
end
