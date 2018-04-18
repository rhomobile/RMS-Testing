describe("Final", function () {
    it("should just pass", function() {
        expect(true).toBe(true);
    });
    if ( Rho.System.platform == Rho.System.PLATFORM_WINDOWS_DESKTOP ){
    	Rho.Application.quit();
    }
});