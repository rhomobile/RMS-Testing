// WARNING! THIS FILE IS GENERATED AUTOMATICALLY! DO NOT EDIT IT MANUALLY!
int rho_ruby_is_started();
extern void Init_CoreAPI_Extension(void);
extern void Init_Rhoconnectclient_extension(void);
extern void Init_Development_extension(void);
extern void Init_AudioCapture_extension(void);
extern void Init_Barcode_extension(void);
extern void Init_Signature_extension(void);
extern void Init_Indicators_extension(void);
extern void Init_HardwareKeys_extension(void);
extern void Init_Sensor_extension(void);
void Init_Extensions(void) {
    Init_CoreAPI_Extension();
    Init_Rhoconnectclient_extension();
    Init_Development_extension();
    Init_AudioCapture_extension();
    Init_Barcode_extension();
    Init_Signature_extension();
    Init_Indicators_extension();
    Init_HardwareKeys_extension();
    Init_Sensor_extension();
}
