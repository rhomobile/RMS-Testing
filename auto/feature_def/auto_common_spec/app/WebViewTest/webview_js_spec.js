//TODO: restore default webview settings after each test?

var parsePair = function( pair ) {
    var sepIdx = pair.indexOf('=');

    ret = {}

    ret.name = pair.substring(0,sepIdx);
    ret.value = pair.substring(sepIdx+1);

    return ret;
}

var parseCookie = function( cookie ) {
    var c = {};

    var pairs = cookie.split(';');

    var parsed = parsePair(pairs[0]);

    c.name = parsed.name;
    c.value = parsed.value;

    for ( var i = 1; i < pairs.length; ++i ) {
        parsed = parsePair(pairs[i]);
        c[parsed.name.toLowerCase().trim()] = parsed.value;
    }

    return c;
}

var global_js_exceute_result = 0;

describe("WebView JS API", function () {

    var rho_version_major;
    var rho_version_minor;

    try {
        var ver = Rho.Config.getPropertyString("rhodes_gem_version");
        rho_version_major = ver.split('.')[0];
        rho_version_minor = ver.split('.')[1];
    } catch (e)
    {
        rho_version_major = 5;
        rho_version_minor = 5;
    }

    var server_url = "http://"+SERVER_HOST+":"+SERVER_PORT;

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

//FIXME: this should be called from main thread
if (!isApplePlatform()) {
    it("Test fullScreen property", function () {
        Rho.WebView.fullScreen = true;
        expect(Rho.WebView.fullScreen).toEqual(true);

        Rho.WebView.fullScreen = false;
        expect(Rho.WebView.fullScreen).toEqual(false);
    });
  }

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
        global_js_exceute_result = 0;
        Rho.WebView.executeJavascript("global_js_exceute_result = 1;");

        if (isAndroidPlatform()) {
            waitsFor( function() { return global_js_exceute_result==1; }, "JS was not executed after 1sec of wait", 1000 );
        }

        runs( function() {
            expect(global_js_exceute_result).toEqual(1);
        });
    });


    /* ----------          platform dependent specs          ---------- */

    if (Rho.System.webviewFramework != "WEBKIT/SYMBOL") {
        it("Test setCookie method", function () {
            expect(Rho.WebView.setCookie("http://localhost", "specCookie=123"));
        });
    }

    if (rho_version_major >= 6) {
        it ( "Sets cookie with properties", function() {
            var expires = new Date(new Date().getTime() + 60 * 1000);
            var cookie = "specCookie=cookieValue; expires="+expires.toUTCString()+"; path=/";
            expect(Rho.WebView.setCookie("http://localhost", cookie));
        });

        it ( "Gets cookie with properties", function() {
            var async_done = false;

            runs( function() {
              Rho.WebView.getCookies( "http://localhost", function(cookies) {
                var cookie = cookies.specCookie;
                expect( cookie ).isNotEmptyString();

                var c = parseCookie( cookie );

                expect(c.name).toEqual('specCookie');
                expect(c.value).toEqual('cookieValue');

                if ( !isAndroidPlatform() ) {
                    expect(c.path).toEqual('/');
                    expect(c.expires).isNotEmptyString();
                }
                async_done = true;
              });
            });
            waitsFor( function() { return async_done; }, 'getCookies not completed', 2000 );
        });

        it ( "Sets multiple cookies", function() {

            var async_done = false;
            var expires = new Date(new Date().getTime() + 60 * 1000);
            var cookie1 = "specCookie1=cookieValue1; expires="+expires.toUTCString()+"; path=/";
            var cookie2 = "specCookie2=cookieValue2; expires="+expires.toUTCString()+"; path=/";

            Rho.WebView.setCookie("http://localhost", cookie1);
            Rho.WebView.setCookie("http://localhost", cookie2);

            runs( function() {
              Rho.WebView.getCookies( "http://localhost", function(cookies) {
                cookie1 = cookies.specCookie1;
                expect( cookie1 ).isNotEmptyString();

                var c = parseCookie( cookie1 );

                expect(c.name).toEqual('specCookie1');
                expect(c.value).toEqual('cookieValue1');
                if ( !isAndroidPlatform() ) {
                    expect(c.path).toEqual('/');
                    expect(c.expires).isNotEmptyString();
                }

                cookie2 = cookies.specCookie2;
                expect( cookie2 ).isNotEmptyString();

                c = parseCookie( cookie2 );

                expect(c.name).toEqual('specCookie2');
                expect(c.value).toEqual('cookieValue2');
                if ( !isAndroidPlatform() ) {
                    expect(c.path).toEqual('/');
                    expect(c.expires).isNotEmptyString();
                }

                async_done = true;
              });
            });
            waitsFor( function() { return async_done; }, 'getCookies not completed', 2000 );
        });
    }

    if( isAndroidOrApplePlatform() ) {

        it ( "Removes all cookies", function() {
          var async_done = false;
          var expires = new Date(new Date().getTime() + 60 * 1000);
          var cookie1 = "specCookie1=cookieValue1; expires="+expires.toUTCString()+"; path=/";
          var cookie2 = "specCookie2=cookieValue2";

          Rho.WebView.setCookie("http://localhost", cookie1);
          Rho.WebView.setCookie("http://localhost", cookie2);

          runs( function() {
            Rho.WebView.removeAllCookies( function() {
              async_done = true;
            });
          });
          waitsFor( function() { return async_done; }, 'removeAllCookies not completed', 2000 );

          runs( function() {
            Rho.WebView.getCookies( "http://localhost", function(cookies) {
              expect(Object.keys(cookies).length).toEqual(0);
              async_done = true;
            });
          });
          waitsFor( function() { return async_done; }, 'getCookies not completed', 2000 );
        });

        it ( "Receives session cookie", function() {
            var url = server_url + '/get_session';
            var async_done = false;

            //get session from server
            runs( function() {
                $.ajax( { url: url, xhrFields: { withCredentials: true } } ).done( function(data) { async_done = true; } );
            });
            waitsFor( function() { return async_done; }, 'Ajax call not completed', 2000 );

            //should receive session
            runs( function() {
                async_done = false;
                Rho.WebView.getCookies( server_url, function(cookies) {
                  var cookie = cookies.session;
                  expect( cookie ).isNotEmptyString();
                  async_done = true;
                });
            });
            waitsFor( function() { return async_done; }, 'getCookies not completed', 2000 );
        });

        it ( "Sends session cookie", function() {
            var get_session_url = server_url + '/get_session';
            var return_session_url = server_url + '/return_session';
            var async_done = false;
            var session;

            //get session from server
            runs( function() {
                $.ajax( { url: get_session_url, xhrFields: { withCredentials: true } } ).done( function(data) { async_done = true; } );
            });
            waitsFor( function() { return async_done; }, 'Ajax call not completed', 2000 );

            //should receive session, store it
            runs( function() {
                async_done = false;
                Rho.WebView.getCookies( server_url, function(cookies) {
                  session = cookies.session;
                  expect( session ).isNotEmptyString();
                  async_done = true;
                });
            });
            waitsFor( function() { return async_done; }, 'getCookies not completed', 2000 );

            //check webview sends valid session
            runs( function() {
                async_done = false;
                $.ajax( { url: return_session_url, xhrFields: { withCredentials: true } } ).done( function(data) {
                    async_done = true;
                    expect($.trim(data)).toEqual( parseCookie(session).value );
                });
            });
            waitsFor( function() { return async_done; }, 'Ajax call not completed', 2000 );
        });

        it ( "Removes session cookie", function() {
            var get_session_url = server_url + '/get_session';
            var return_session_url = server_url + '/return_session';
            var async_done = false;
            var session;

            //get session from server
            runs( function() {
                $.ajax( { url: get_session_url, xhrFields: { withCredentials: true } } ).done( function(data) { async_done = true; } );
            });
            waitsFor( function() { return async_done; }, 'Ajax call not completed', 2000 );

            runs( function() {
                async_done = false;
                Rho.WebView.getCookies( server_url, function(cookies) {
                  var cookie = cookies.session;
                  expect( cookie ).isNotEmptyString();
                  async_done = true;
                });
            });
            waitsFor( function() { return async_done; }, 'getCookies not completed', 2000 );

            runs( function() {
                async_done = false;
                Rho.WebView.removeCookie( server_url, 'session', function(data) {
                  expect(data.removed_cookie).toEqual('session');
                  async_done = true;
                });
            });
            waitsFor( function() { return async_done; }, 'removeCookie not completed', 2000 );

            runs( function() {
                async_done = false;
                Rho.WebView.getCookies( server_url, function(cookies) {
                  session = cookies.session;
                  expect(session).toEqual(null);
                  async_done = true;
                });
            });
            waitsFor( function() { return async_done; }, 'getCookies not completed', 2000 );

            //check webview sends valid session
            runs( function() {
                async_done = false;
                $.ajax( { url: return_session_url, xhrFields: { withCredentials: true } } ).done( function(data) {
                    async_done = true;
                    expect($.trim(data)).toEqual('');
                });
            });
            waitsFor( function() { return async_done; }, 'Ajax call not completed', 2000 );
        });

if ( isAndroidPlatform() ) {
        it ( "Removes session cookie with expiry date", function() {
            var get_session_url = server_url + '/get_session';
            var return_session_url = server_url + '/return_session';
            var async_done = false;
            var session;

            //get session from server
            runs( function() {
                $.ajax( { url: get_session_url, xhrFields: { withCredentials: true } } ).done( function(data) { async_done = true; } );
            });
            waitsFor( function() { return async_done; }, 'Ajax call not completed', 2000 );

            runs( function() {
                async_done = false;
                Rho.WebView.getCookies( server_url, function(cookies) {
                  expect( cookies.session ).isNotEmptyString();

                  var d = new Date(1970, 0, 1);
                  Rho.WebView.setCookie( server_url, "session='';expires="+d.toUTCString()+";" );

                  async_done = true;
                });
            });
            waitsFor( function() { return async_done; }, 'getCookies not completed', 2000 );

            runs( function() {
                async_done = false;
                Rho.WebView.getCookies( server_url, function(cookies) {
                  session = cookies.session;
                  expect(session).toEqual(null);
                  async_done = true;
                });
            });
            waitsFor( function() { return async_done; }, 'getCookies not completed', 2000 );

            //check webview sends valid session
            runs( function() {
                async_done = false;
                $.ajax( { url: return_session_url, xhrFields: { withCredentials: true } } ).done( function(data) {
                    async_done = true;
                    expect($.trim(data)).toEqual('');
                });
            });
            waitsFor( function() { return async_done; }, 'Ajax call not completed', 2000 );
        });
    }
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
