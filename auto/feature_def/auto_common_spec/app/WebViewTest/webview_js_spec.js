//TODO: restore default webview settings after each test?

describe("WebView JS API", function () {

    beforeEach(function () {
        var matchers = {
            isNotEmptyString: function () {
                return (typeof this.actual == 'string') && (this.actual.length != 0)
            },
            isNumberGreaterThenZero: function () {
                return (typeof this.actual == 'number') && (this.actual > 0)
            }
        };
        this.addMatchers(
            matchers
        );

    });

    it("Test framework property", function () {
        expect(Rho.WebView.framework).isNotEmptyString();
    });

    it("Test default value of fullScreen property", function () {
        expect(Rho.WebView.fullScreen).toEqual(false);
    });

    it("Test fullScreen property", function () {
        Rho.WebView.fullScreen = true;
        expect(Rho.WebView.fullScreen).toEqual(true);

        Rho.WebView.fullScreen = false;
        expect(Rho.WebView.fullScreen).toEqual(false);
    });

    it("Test activeTab property", function () {
        expect(Rho.WebView.activeTab).toEqual(0);
    });

    xit("Test refresh method", function () {
        expect(Rho.WebView.refresh(-1));
    });

    xit("Test navigate method", function () {
        expect(Rho.WebView.navigate("http://localhost", -1));
    });

    xit("Test navigateBack method", function () {
        expect(Rho.WebView.navigateBack(-1));
    });

    it("Test currentLocation method", function () {
        expect(Rho.WebView.currentLocation(-1)).isNotEmptyString();
    });

    it("Test executeJavascript method", function () {
        var result = 0;
        Rho.WebView.executeJavascript("result = 1");
        expect(result).toEqual(1);
    });


    /* ----------          platform dependent specs          ---------- */

    if (Rho.System.webviewFramework != "WEBKIT/MOTOROLA") {
        it("Test setCookie method", function () {
            expect(Rho.WebView.setCookie("http://localhost", "specCookie=123"));
        });
    }


    if (isAndroidPlatform()) {
        it("Test default value of enableCache property", function () {
            expect(Rho.WebView.enableCache).toEqual(true);
        });

        // Read only property - comment out (aat103)
        //it("Test enableCache property", function () {
        //    Rho.WebView.enableCache = false;
        //    expect(Rho.WebView.enableCache).toEqual(false);

        //    Rho.WebView.enableCache = true;
        //    expect(Rho.WebView.enableCache).toEqual(true);
        //});

        it("Test default value of enableZoom property", function () {
            expect(Rho.WebView.enableZoom).toEqual(true);
        });

        // Read only property - comment out (aat103)
        //it("Test enableZoom property", function () {
        //    Rho.webView.enableZoom = false;
        //    expect(Rho.WebView.enableZoom).toEqual(false);

        //    Rho.webView.enableZoom = true;
        //    expect(Rho.WebView.enableZoom).toEqual(true);
        //});

        it("Test default value of enablePageLoadingIndication property", function () {
            expect(Rho.WebView.enablePageLoadingIndication).toEqual(true);
        });

        // Read only property - comment out (aat103)
        //it("Test enablePageLoadingIndication property", function () {
        //    Rho.WebView.enablePageLoadingIndication = false;
        //    expect(Rho.WebView.enablePageLoadingIndication).toEqual(false);

        //    Rho.WebView.enablePageLoadingIndication = true;
        //    expect(Rho.WebView.enablePageLoadingIndication).toEqual(true);
        //});

        it("Test default value of enableWebPlugins property", function () {
            expect(Rho.WebView.enableWebPlugins).toEqual(true);
        });

        // Read only property - comment out (aat103)
        //it("Test enableWebPlugins property", function () {
        //    Rho.WebView.enableWebPlugins = false;
        //    expect(Rho.WebView.enableWebPlugins).toEqual(false);

        //    Rho.WebView.enableWebPlugins = true;
        //    expect(Rho.WebView.enableWebPlugins).toEqual(true);
        //});

        //TODO: add check on existing saved file
        it("Test save method", function () {
            expect(Rho.WebView.save("jpeg", "someFilename", -1));
        });
    }

    if (isAndroidOrApplePlatform()) {
        var currentURL = "";
        Rho.WebView.currentURL(-1,  function(value){currentURL = value})
        it("Test currentURL method", function () {
            expect(currentURL).isNotEmptyString();
        });
    }

    if (isWindowsMobilePlatform()) {
        it("Test default value of navigationTimeout property", function () {
            expect(Rho.WebView.navigationTimeout).toEqual(0);
        });

        it("Test navigationTimeout property", function () {
            Rho.WebView.navigationTimeout = 100;
            expect(Rho.WebView.navigationTimeout).toEqual(100);
        });

        it("Test scrollTechnique property", function () {
            expect(Rho.WebView.scrollTechnique).toEqual("FingerScroll");
        });

        it("Test fontFamily property", function () {
            expect(Rho.WebView.fontFamily).isNotEmptyString();
        });

        it("Test userAgent property", function () {
            expect(Rho.WebView.userAgent).isNotEmptyString();
        });

        it("Test viewportEnabled property", function () {
            expect(Rho.WebView.viewportEnabled).toEqual(true);
        });

        it("Test viewportWidth property", function () {
            expect(Rho.WebView.viewportWidth).isNumberGreaterThenZero();
        });

        it("Test cacheSize property", function () {
            expect(Rho.WebView.cacheSize).isNumberGreaterThenZero();
        });

        it("Test acceptLanguage property", function () {
            Rho.WebView.acceptLanguage = 'ru';
            expect(Rho.WebView.acceptLanguage).toEqual('ru');
        });

        it("Test zoomPage property", function () {
            Rho.WebView.zoomPage = 1.5;
            expect(Rho.WebView.zoomPage).toEqual(1.5);
        });

        it("Test textZoomLevel property", function () {
            Rho.WebView.textZoomLevel = 2;
            expect(Rho.WebView.textZoomLevel).toEqual(2);
        });
    }



});