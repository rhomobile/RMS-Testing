describe("System module JS test starts here", function () {
	describe("System module - setting directly test starts here", function () {
		if (isWindowsMobilePlatform() || isWindowsDesktopPlatform()) {
		    it("VT278-199 | call setRegistry with key as null hive as HKLM, type as Binary, subkey as null, setting as Rhoelements, value as 11111| false", function () {
		        Rho.System.setRegistrySetting({hive: 'HKLM', type: 'Binary', subkey: null, setting: 'RhoElements', value: '11111'});
                var data = Rho.System.getRegistrySetting({hive: 'HKLM', type: 'Binary', subkey: null, setting: 'RhoElements', value: '11111'});
                expect(data).toEqual(false);

            });
        }

       	if (isWindowsMobilePlatform() || isWindowsDesktopPlatform()) {
		    it("VT278-200 | call set registry with setting as null hive as HKLM, type as Binary, subkey as Software, setting as null, value as 11111| false", function () {
		        Rho.System.setRegistrySetting({hive: 'HKLM', type: 'Binary', subkey: 'Software', setting: null, value: '11111'});
                var data = Rho.System.getRegistrySetting({hive: 'HKLM', type: 'Binary', subkey: 'Software', setting: null, value: '11111'});
                expect(data).toEqual(false);

            });
        }

        if (isWindowsMobilePlatform() || isWindowsDesktopPlatform()) {
		    it("VT278-200 | call set resgistry with invalid persitent value hive as HKLM, type as Binary, subkey as Software, setting as Rhoelements, value as 11111, Persistent :boo| false", function () {
		        Rho.System.setRegistrySetting({hive: 'HKLM', type: 'Binary', subkey: 'Software', setting: 'Rhoelements', value: '11111', Persistent: 'boo'});
                var data = Rho.System.getRegistrySetting({hive: 'HKLM', type: 'Binary', subkey: 'Software', setting: 'Rhoelements', value: '11111', Persistent: 'boo'});
                expect(data).toEqual(false);

            });
        }

	});
});

