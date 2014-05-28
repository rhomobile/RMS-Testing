describe('Near Field Communications Auto test cases', function () {

    beforeEach(function(){
        var matchers = {
            isNotEmptyString: function () {
                return (typeof this.actual == 'string') && (this.actual.length != 0)
            },
            isNumberGreaterThenZero: function () {
                return (typeof this.actual == 'number') && (this.actual > 0)
            },
            isBoolean: function () {
                return typeof this.actual == 'boolean';
            }
        };
        this.addMatchers(
            matchers
        );
    })

    describe('Rho.NFC.Adapter JS API', function () {
        describe('Rho.NFC.Adapter APIs Set Test', function () {
            if (["WINDOWS"].indexOf(Rho.System.platform) != -1) {
                describe('Getting supported', function () {
                    it('Should return supported value as BOOLEAN (true or false)', function () {
                        expect(Rho.NFC.Adapter.supported).isBoolean();
                    });
                });
            }
            if (["WINDOWS"].indexOf(Rho.System.platform) != -1) {
                describe('Getting isActive', function () {
                    it('Should return isActive value as BOOLEAN (true or false)', function () {
                        expect(Rho.NFC.Adapter.isActive).isBoolean();
                    });
                });
            }
            if (["WINDOWS"].indexOf(Rho.System.platform) != -1) {
                describe('Getting version', function () {
                    it('Should return version value as a string', function () {
                        expect(Rho.NFC.Adapter.version).isNotEmptyString();
                    });
                });
            }
        });
    });
    describe('Rho.NFC.Record JS API', function () {
        describe('Rho.NFC.Record APIs Set Test', function () {
            var recordObj = Rho.NFC.Record.create();
            if (["WINDOWS"].indexOf(Rho.System.platform) != -1) {
                describe('Getting ID', function () {
                    it('Should return ID value as a string', function () {
                        expect(recordObj.ID).isNotEmptyString();
                    });
                });
            }
            if (["WINDOWS"].indexOf(Rho.System.platform) != -1) {
                describe('Setting type', function () {
                    it('Should Set type to NDEF_RTD_TEXT using direct calling method', function () {
                        recordObj.type = Rho.NFC.Record.NDEF_RTD_TEXT;
                        expect(recordObj.type).toEqual(Rho.NFC.Record.NDEF_RTD_TEXT);
                    });
                    it('Should Set type to 1 using direct calling method', function () {
                        recordObj.type = 1;
                        expect(recordObj.type).toEqual(1);
                    });

                    it('Should Set type to NDEF_RTD_URI using direct calling method', function () {
                        recordObj.type = Rho.NFC.Record.NDEF_RTD_URI;
                        expect(recordObj.type).toEqual(Rho.NFC.Record.NDEF_RTD_URI);
                    });
                    it('Should Set type to 2 using direct calling method', function () {
                        recordObj.type = 2;
                        expect(recordObj.type).toEqual(2);
                    });

                    it('Should Set type to NDEF_RTD_GENERAL using direct calling method', function () {
                        recordObj.type = Rho.NFC.Record.NDEF_RTD_GENERAL;
                        expect(recordObj.type).toEqual(Rho.NFC.Record.NDEF_RTD_GENERAL);
                    });
                    it('Should Set type to 3 using direct calling method', function () {
                        recordObj.type = 3;
                        expect(recordObj.type).toEqual(3);
                    });
                });
            }
            if (["WINDOWS"].indexOf(Rho.System.platform) != -1) {
                describe('Setting tnf', function () {
                    it('Should Set tnf to NDEF_TNF_EMPTY using direct calling method', function () {
                        recordObj.tnf = Rho.NFC.Record.NDEF_TNF_EMPTY;
                        expect(recordObj.tnf).toEqual(Rho.NFC.Record.NDEF_TNF_EMPTY);
                    });
                    it('Should Set tnf to 1 using direct calling method', function () {
                        recordObj.tnf = 1;
                        expect(recordObj.tnf).toEqual(1);
                    });
                    it('Should Set tnf to NDEF_TNF_WELL_KNOWN using direct calling method', function () {
                        recordObj.tnf = Rho.NFC.Record.NDEF_TNF_WELL_KNOWN;
                        expect(recordObj.tnf).toEqual(Rho.NFC.Record.NDEF_TNF_WELL_KNOWN);
                    });
                    it('Should Set tnf to 2 using direct calling method', function () {
                        recordObj.tnf = 2;
                        expect(recordObj.tnf).toEqual(2);
                    });

                    it('Should Set tnf to NDEF_TNF_MEDIA using direct calling method', function () {
                        recordObj.tnf = Rho.NFC.Record.NDEF_TNF_MEDIA;
                        expect(recordObj.tnf).toEqual(Rho.NFC.Record.NDEF_TNF_MEDIA);
                    });
                    it('Should Set tnf to 3 using direct calling method', function () {
                        recordObj.tnf = 3;
                        expect(recordObj.tnf).toEqual(3);
                    });

                    it('Should Set tnf to NDEF_TNF_ABSOLUTE_URI using direct calling method', function () {
                        recordObj.tnf = Rho.NFC.Record.NDEF_TNF_ABSOLUTE_URI;
                        expect(recordObj.tnf).toEqual(Rho.NFC.Record.NDEF_TNF_ABSOLUTE_URI);
                    });
                    it('Should Set tnf to 4 using direct calling method', function () {
                        recordObj.tnf = 4;
                        expect(recordObj.tnf).toEqual(4);
                    });

                    it('Should Set tnf to NDEF_TNF_EXTERNAL using direct calling method', function () {
                        recordObj.tnf = Rho.NFC.Record.NDEF_TNF_EXTERNAL;
                        expect(recordObj.tnf).toEqual(Rho.NFC.Record.NDEF_TNF_EXTERNAL);
                    });
                    it('Should Set tnf to 5 using direct calling method', function () {
                        recordObj.tnf = 5;
                        expect(recordObj.tnf).toEqual(5);
                    });

                    it('Should Set tnf to NDEF_TNF_UNKNOWN using direct calling method', function () {
                        recordObj.tnf = Rho.NFC.Record.NDEF_TNF_UNKNOWN;
                        expect(recordObj.tnf).toEqual(Rho.NFC.Record.NDEF_TNF_UNKNOWN);
                    });
                    it('Should Set tnf to 6 using direct calling method', function () {
                        recordObj.tnf = 6;
                        expect(recordObj.tnf).toEqual(6);
                    });

                    it('Should Set tnf to NDEF_TNF_UNCHANGED using direct calling method', function () {
                        recordObj.tnf = Rho.NFC.Record.NDEF_TNF_UNCHANGED;
                        expect(recordObj.tnf).toEqual(Rho.NFC.Record.NDEF_TNF_UNCHANGED);
                    });
                    it('Should Set tnf to 7 using direct calling method', function () {
                        recordObj.tnf = 7;
                        expect(recordObj.tnf).toEqual(7);
                    });

                    it('Should Set tnf to NDEF_TNF_ANY_TYPE using direct calling method', function () {
                        recordObj.tnf = Rho.NFC.Record.NDEF_TNF_ANY_TYPE;
                        expect(recordObj.tnf).toEqual(Rho.NFC.Record.NDEF_TNF_ANY_TYPE);
                    });
                    it('Should Set tnf to 8 using direct calling method', function () {
                        recordObj.tnf = 8;
                        expect(recordObj.tnf).toEqual(8);
                    });

                });
            }
        });
    });
});