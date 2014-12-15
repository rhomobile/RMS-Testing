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
        expect(EB.WebView.framework).isNotEmptyString();
    });

    it("Test default value of fullScreen property", function () {
        expect(EB.WebView.fullScreen).toEqual(false);
    });

    it("Test fullScreen property", function () {
        EB.WebView.fullScreen = true;
        expect(EB.WebView.fullScreen).toEqual(true);

        EB.WebView.fullScreen = false;
        expect(EB.WebView.fullScreen).toEqual(false);
    });

    it("Test activeTab property", function () {
        expect(EB.WebView.activeTab).toEqual(0);
    });

    xit("Test refresh method", function () {
        expect(EB.WebView.refresh(-1));
    });

    xit("Test navigate method", function () {
        expect(EB.WebView.navigate("http://localhost", -1));
    });

    xit("Test navigateBack method", function () {
        expect(EB.WebView.navigateBack(-1));
    });

    it("Test currentLocation method", function () {
        expect(EB.WebView.currentLocation(-1)).isNotEmptyString();
    });

    it("Test executeJavascript method", function () {
        var result = 0;
        EB.WebView.executeJavascript("result = 1");
        expect(result).toEqual(1);
    });


    /* ----------          platform dependent specs          ---------- */

    if (EB.System.webviewFramework != "WEBKIT/MOTOROLA") {
        it("Test setCookie method", function () {
            expect(EB.WebView.setCookie("http://localhost", "specCookie=123"));
        });
    }


    if (isAndroidPlatform()) {
        it("Test default value of enableCache property", function () {
            expect(EB.WebView.enableCache).toEqual(true);
        });

        // Read only property - comment out (aat103)
        //it("Test enableCache property", function () {
        //    EB.WebView.enableCache = false;
        //    expect(EB.WebView.enableCache).toEqual(false);

        //    EB.WebView.enableCache = true;
        //    expect(EB.WebView.enableCache).toEqual(true);
        //});

        it("Test default value of enableZoom property", function () {
            expect(EB.WebView.enableZoom).toEqual(true);
        });

        // Read only property - comment out (aat103)
        //it("Test enableZoom property", function () {
        //    EB.webView.enableZoom = false;
        //    expect(EB.WebView.enableZoom).toEqual(false);

        //    EB.webView.enableZoom = true;
        //    expect(EB.WebView.enableZoom).toEqual(true);
        //});

        it("Test default value of enablePageLoadingIndication property", function () {
            expect(EB.WebView.enablePageLoadingIndication).toEqual(true);
        });

        // Read only property - comment out (aat103)
        //it("Test enablePageLoadingIndication property", function () {
        //    EB.WebView.enablePageLoadingIndication = false;
        //    expect(EB.WebView.enablePageLoadingIndication).toEqual(false);

        //    EB.WebView.enablePageLoadingIndication = true;
        //    expect(EB.WebView.enablePageLoadingIndication).toEqual(true);
        //});

        it("Test default value of enableWebPlugins property", function () {
            expect(EB.WebView.enableWebPlugins).toEqual(true);
        });

        // Read only property - comment out (aat103)
        //it("Test enableWebPlugins property", function () {
        //    EB.WebView.enableWebPlugins = false;
        //    expect(EB.WebView.enableWebPlugins).toEqual(false);

        //    EB.WebView.enableWebPlugins = true;
        //    expect(EB.WebView.enableWebPlugins).toEqual(true);
        //});

        //TODO: add check on existing saved file
        it("Test save method", function () {
            expect(EB.WebView.save("jpeg", "someFilename", -1));
        });
    }

    if (isAndroidOrApplePlatform()) {
        var currentURL = "";
        EB.WebView.currentURL(-1,  function(value){currentURL = value})
        it("Test currentURL method", function () {
            expect(currentURL).isNotEmptyString();
        });
    }

    if (isWindowsMobilePlatform()) {
        it("Test default value of navigationTimeout property", function () {
            expect(EB.WebView.navigationTimeout).toEqual(0);
        });

        it("Test navigationTimeout property", function () {
            EB.WebView.navigationTimeout = 100;
            expect(EB.WebView.navigationTimeout).toEqual(100);
        });

        it("Test scrollTechnique property", function () {
            expect(EB.WebView.scrollTechnique).toEqual("FingerScroll");
        });

        it("Test fontFamily property", function () {
            expect(EB.WebView.fontFamily).isNotEmptyString();
        });

        it("Test userAgent property", function () {
            expect(EB.WebView.userAgent).isNotEmptyString();
        });

        it("Test viewportEnabled property", function () {
            expect(EB.WebView.viewportEnabled).toEqual(true);
        });

        it("Test viewportWidth property", function () {
            expect(EB.WebView.viewportWidth).isNumberGreaterThenZero();
        });

        it("Test cacheSize property", function () {
            expect(EB.WebView.cacheSize).isNumberGreaterThenZero();
        });

        it("Test acceptLanguage property", function () {
            EB.WebView.acceptLanguage = 'ru';
            expect(EB.WebView.acceptLanguage).toEqual('ru');
        });

        it("Test zoomPage property", function () {
            EB.WebView.zoomPage = 1.5;
            expect(EB.WebView.zoomPage).toEqual(1.5);
        });

        it("Test textZoomLevel property", function () {
            EB.WebView.textZoomLevel = 2;
            expect(EB.WebView.textZoomLevel).toEqual(2);
        });
    }



});