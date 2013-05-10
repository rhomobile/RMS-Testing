describe "Barcode" do
 
  it "should barcode" do

    barcode_01_filename = File.join(Rho::RhoApplication::get_model_path('app','Barcode'), 'Barcode_UPC_01.png')	
    barcode_01_correct_code = '718122850617'	
    barcode_02_filename = File.join(Rho::RhoApplication::get_model_path('app','Barcode'), 'Barcode_UPC_02.jpg')	
    barcode_02_correct_code = '123456789012'
	

    barcode_01_recognized_code = Barcode.barcode_recognize(barcode_01_filename)
    barcode_01_correct_code.should == barcode_01_recognized_code

    barcode_02_recognized_code = Barcode.barcode_recognize(barcode_02_filename)
    barcode_02_correct_code.should == barcode_02_recognized_code 

  end

end
