function sleep (msec)
{
    var start = new Date().getTime();
    while (new Date().getTime() - start < msec);
}

describe('Network JS API', function() {
         
    var srvHost = SERVER_HOST;
    var srvPort = SERVER_PORT;
    var srvURL = "http://"+SERVER_HOST+":"+SERVER_PORT.toString();
    var httpsSrvURL = "https://"+SECURE_HOST+":"+SECURE_PORT.toString();
 
    var srvHttpTestMethodsUrl = srvURL + "/test_methods";
    var srvHttpDownloadImageUrl = srvURL + "/download_image";
    var srvHttpDownloadImageUrlAuth = srvURL + "/download_image_auth";
    var srvHttpUploadTextFileUrl = srvURL + "/upload_text_file";
    var srvHttpUploadTextFileUrlAuth = srvURL + "/upload_text_file_auth";

    var srvHttpsTestMethodsUrl = httpsSrvURL + "/test_methods";
         
    var imagesDownloadFolder = Rho.RhoFile.join( Rho.Application.userFolder,"images" );
    Rho.RhoFile.makeDir(imagesDownloadFolder);
         
    var waitTimeout = 30000;
    
    var callbackCount = 0;
         
    var connectionInfo = "";
    var failureMsg = "";
         
    var detectConnectionCallback = function(args) {
        callbackCount += 1;
        connectionInfo = args.connectionInformation;
        failureMsg = args.failureMessage;
        Rho.Log.info("detectConnectionCallback, count = " + callbackCount.toString() + "failureMsg: " + failureMsg, "net_spec" );
    }
         
    beforeEach(function() {
        callbackCount = 0;
        connectionInfo = "";
        failureMsg = "";
    });
         
    afterEach(function() {
        Rho.Network.stopDetectingConnection(null);
    });

    it('VT293-0013 | cancel with wan/mguest connection', function() {

       var getCallback = function(args) {
            callbackCount += 1;
       }

       runs( function() {
            getProps = {
                url: "http://www.apache.org/licenses/LICENSE-2.0"
            };
            Rho.Network.get(getProps, getCallback);
            sleep(50);
            Rho.Network.cancel();
        } );

        runs(function() {
            expect(callbackCount).toEqual(0);
        });
    });

        it('VT293-0014 | detectConnection with wlan profile enabled', function () {

            runs(function () {
                detectconnectionProps = {
                    host: srvHost,
                    port: srvPort
                };
                Rho.Network.detectConnection(detectconnectionProps, detectConnectionCallback);
            });

            waitsFor(function () {
                return callbackCount == 1;
            },
                 "Callback never called",
                 5100
             );

            runs(function () {
                expect(callbackCount).toEqual(1);
                expect(connectionInfo).toEqual("Connected");
            });
        });

        it('VT293-0015 | detectConnection with sync', function () {

            detectconnectionProps = {
                host: srvHost,
                port: srvPort
            };

            var data = Rho.Network.detectConnection(detectconnectionProps);
            expect(JSON.stringify(data)).toEqual("null");

        });

        it('VT293-0016 | detectConnection with ananymous callback', function () {

            runs(function () {
                detectconnectionProps = {
                    host: srvHost,
                    port: srvPort
                };

                Rho.Network.detectConnection(detectconnectionProps, function (params) {
                    detectConnectionCallback(params);
                });
            });

            waitsFor(function () {
                return callbackCount == 1;
            },
                 "Callback never called",
                 5100
             );

            runs(function () {
                expect(callbackCount).toEqual(1);
                expect(connectionInfo).toEqual("Connected");
                Rho.Network.stopDetectingConnection(null);
            });
        });

        /*
   it('VT293-0019 | detectConnection with exteranl profile disabled with pollinterval', function() {
      var flag = false;
       runs( function() {

           detectconnectionProps = {
               host: 'http://www.google.com',
               port: 80,
               pollInterval: 6000
           };
           
           Rho.Network.detectConnection(detectconnectionProps, detectConnectionCallback);

       } );
      
      waitsFor( function() {
               return callbackCount==1;
           },
           "Callback never called",
           6100
       );
      
       runs(function() {
           expect(callbackCount).toEqual(1);
           expect(connectionInfo).toEqual("Connected");
       });

   });*/

        it('VT293-0020 | detectConnection with detectionTimeout', function () {
            var flag = false;
            runs(function () {

                detectconnectionProps = {
                    host: 'http://any.unavailable.address',
                    port: 80,
                    detectionTimeout: 1000
                };

                Rho.Network.detectConnection(detectconnectionProps, detectConnectionCallback);

            });

            waitsFor(function () {
                return callbackCount == 1;
            },
                 "Callback never called",
                 waitTimeout
             );

            runs(function () {
                expect(callbackCount).toEqual(1);
                expect(failureMsg).toMatch("Attempted to resolve hostname to connect to but did not succeed");
            });

        });

        it('VT293-0021 | detectConnection with pollinterval and dtectionTimeout', function () {
            var flag = false;
            runs(function () {

                detectconnectionProps = {
                    host: srvHost,
                    port: srvPort,
                    pollInterval: 6000,
                    detectionTimeout: 5000
                };

                Rho.Network.detectConnection(detectconnectionProps, detectConnectionCallback);

                //            setTimeout(function() {
                //                flag = true;
                //            }, 12000);
            });

            waitsFor(function () {
                //return flag;
                return callbackCount == 1;
            },
                 "Callback never called",
                 13000
             );

            runs(function () {
                //           expect(callbackCount).toEqual(2);
                expect(callbackCount).toEqual(1);
                expect(connectionInfo).toEqual("Connected");
            });

        });


        it('VT293-0022 | stopDetectingConnection with wlan profile enabled', function () {
            var flag = false;
            runs(function () {

                detectconnectionProps = {
                    host: srvHost,
                    port: srvPort
                };

                Rho.Network.detectConnection(detectconnectionProps, detectConnectionCallback);

            });

            waitsFor(function () {
                return callbackCount == 1;
            },
                "Callback never called",
                5100
            );

            runs(function () {
                Rho.Network.stopDetectingConnection(detectConnectionCallback);
                setTimeout(function () {
                    flag = true;
                }, 6000);
            });

            waitsFor(function () {
                return flag;
            },
                "Callback never called",
                7000
            );

            runs(function () {
                //After 12 sec of wait the count should not get increased to 2 as poll interval got stopped
                expect(callbackCount).toEqual(1);
                expect(connectionInfo).toEqual("Connected");
            });

        });

        if (Rho.System.platform != "WP8") {
            it('VT293-0037 | verifyPeerCertificate with default value', function () {
                var status = '';
                var callbackCalled = false;

                var post_callback = function (args) {
                    status = args['status'];
                    callbackCalled = true;
                }
                runs(function () {

                    var httpsPostProps = {
                        url: srvHttpsTestMethodsUrl,
                        body: "data1=test&data2=test2"
                    };

                    Rho.Network.post(httpsPostProps, post_callback);
                });

                waitsFor(function () {
                    return callbackCalled;
                },
                    "Callback never called",
                    waitTimeout
                );

                runs(function () {
                    expect(status).toEqual('error');
                });
            });

            it('VT293-0038 | verifyPeerCertificate with value true', function () {
                var status = '';
                var callbackCalled = false;

                var post_callback = function (args) {
                    status = args['status'];
                    callbackCalled = true;
                }
                runs(function () {

                    var httpsPostProps = {
                        url: srvHttpsTestMethodsUrl,
                        body: "data1=test&data2=test2",
                        verifyPeerCertificate: true
                    };

                    Rho.Network.post(httpsPostProps, post_callback);
                });

                waitsFor(function () {
                    return callbackCalled;
                },
                    "Callback never called",
                    waitTimeout
                );

                runs(function () {
                    expect(status).toEqual('error');
                });
            });

            it('VT293-0039 | verifyPeerCertificate with false', function () {
                var data = '';
                var callbackCalled = false;

                var post_callback = function (args) {
                    data = args['body'];
                    callbackCalled = true;
                }
                runs(function () {

                    var httpsPostProps = {
                        url: srvHttpsTestMethodsUrl,
                        body: "data1=test&data2=test2",
                        verifyPeerCertificate: false
                    };

                    Rho.Network.post(httpsPostProps, post_callback);
                });

                waitsFor(function () {
                    return callbackCalled;
                },
                    "Callback never called",
                    waitTimeout
                );

                runs(function () {
                    expect(data).toEqual('initial POST request is: test and test2');
                });
            });

        }

    it('VT293-0040 | post with valide url', function() {
       var flag = false;
       var callbackCalled = false;
       var data = '';

       var post_callback = function (args){
            data = args['body'];
            callbackCalled = true;
       }

       runs( function() {

            postProps = {
                url: srvHttpTestMethodsUrl,
                body: "data1=test&data2=test2"
            };

            Rho.Network.post(postProps, post_callback);
        });

        waitsFor( function() {
                return callbackCalled;
            },
            "Callback never called",
            waitTimeout
        );

        runs(function() {
            expect(data).toEqual('initial POST request is: test and test2');
            //TODO: Need to add Code for File exist.
        });
    });

    it('VT293-0041 | post with sync', function() {

        postProps = {
            url: srvHttpTestMethodsUrl,
            body: "data1=test&data2=test2"
        };

        var data = Rho.Network.post(postProps);
        expect(data['body']).toEqual('initial POST request is: test and test2');

    });

         
    it('VT293-0042 | post with anonymous call back event', function() {
       var data = '';
       var callbackCalled = false;
       runs( function() {

            postProps = {
                url: srvHttpTestMethodsUrl,
                body: "data1=test&data2=test2"
            };

            Rho.Network.post(postProps, function(args){callbackCalled=true;data = args['body'];});
        });

        waitsFor( function() {
                return callbackCalled;
            },
            "Callback never called",
            waitTimeout
        );

        runs(function() {
            expect(data).toEqual('initial POST request is: test and test2');
            //TODO: Need to add Code for File exist.
        });
    });


    it('VT293-0043 | get with callback', function() {
       var flag = false;
       var callbackCalled = false;
       var data = '';

       var get_callback = function (args){
            data = args['body'];
            callbackCalled = true;
       }

       runs( function() {

            getProps = {
                url: srvHttpTestMethodsUrl+"?data1=test&data2=test2",
            };

            Rho.Network.get(getProps, get_callback);
        });

        waitsFor( function() {
                return callbackCalled;
            },
            "Callback never called",
            waitTimeout
        );

        runs(function() {
            expect(data).toEqual('initial GET request is: test and test2');
            //TODO: Need to add Code for File exist.
        });
    });

    /*it('VT293-0044 | get with valid url', function() {
       var fullURL = srvURL + "/download";
       var content = "";
       var errCode = -1;
       
        var getCallback = function(args) {
            callbackCount += 1;
            content = args.body;
            errCode = args.http_error;
        }
            
        runs( function() {
             getProps = {
                url: fullURL
             };
             Rho.Network.get(getProps, getCallback);
        });
       
       waitsFor( function() {
                return callbackCount==1;
            },
            "Callback never called",
            2000
        );
       
        runs(function() {
            expect(callbackCount).toEqual(1);
            expect(content).toEqual("Downloaded content");
            expect(errCode).toEqual('200');
        });
    });*/

    it('VT293-0044 | get with sync event', function() {

        getProps = {
            url: srvHttpTestMethodsUrl+"?data1=test&data2=test2",
        };

        var data = Rho.Network.get(getProps);
        expect(data['body']).toEqual('initial GET request is: test and test2');

    });

    it('VT293-0045 | get with anonymous call back event', function() {
       var data = '';
       var callbackCalled = false;
       runs( function() {

            getProps = {
                url: srvHttpTestMethodsUrl+"?data1=test&data2=test2",
            };

            Rho.Network.get(getProps, function(args){callbackCalled=true;data = args['body'];});
        });

        waitsFor( function() {
                return callbackCalled;
            },
            "Callback never called",
            waitTimeout
        );

        runs(function() {
            expect(data).toEqual('initial GET request is: test and test2');
            //TODO: Need to add Code for File exist.
        });
    }); 
         
    it('VT293-0046 | download file from http with callback event', function() {
       var flag = false;
       var callbackCalled = false;
       var status = '';
       var fname = Rho.RhoFile.join(imagesDownloadFolder,"network_0049.jpg");

       var download_file_callback = function (args){
            status = args['status'];
            callbackCalled = true;
       }

       runs( function() {
            
            if ( Rho.RhoFile.exists(fname) ) {
                Rho.RhoFile.deleteFile(fname);
            }

            expect(Rho.RhoFile.exists(fname)).toEqual(false);

            downloadfileProps = {
                url: srvHttpDownloadImageUrl,
                filename: fname
            };

            Rho.Network.downloadFile(downloadfileProps, download_file_callback);

        } );

        waitsFor( function() {
                return callbackCalled;
            },
            "Callback never called",
            waitTimeout
        );

        runs(function() {
            expect(status).toEqual('ok');
            //TODO: Need to add Code for File exist.
        });
    });

    it('VT293-0047 | download file with overwrite default and callback event', function() {
       var flag = false;
       var callbackCalled = false;
       var status = '';
       var fname = Rho.RhoFile.join(imagesDownloadFolder,"network_0049.jpg");

       var download_file_callback = function (args){
            status = args['status'];
            callbackCalled = true;
       }

       runs( function() {
            
            if ( Rho.RhoFile.exists(fname) ) {
                Rho.RhoFile.deleteFile(fname);
            }
            
            expect(Rho.RhoFile.exists(fname)).toEqual(false);

            downloadfileProps = {
                url: srvHttpDownloadImageUrl,
                filename: fname
            };

            Rho.Network.downloadFile(downloadfileProps, download_file_callback);

        } );

        waitsFor( function() {
                return callbackCalled;
            },
            "Callback never called",
            waitTimeout
        );

        runs(function() {
            expect(status).toEqual('ok');
            //TODO: Need to add Code for File exist.
        });
    });
          

    it('VT293-0048 | download file with overwrite true and callback event', function() {
       var flag = false;
       var callbackCalled = false;
       var status = '';

       var download_file_callback = function (args){
            status = args['status'];
            callbackCalled = true;
       }

       runs( function() {

            downloadfileProps = {
                url: srvHttpDownloadImageUrl,
                filename: Rho.RhoFile.join(imagesDownloadFolder,"network_0049.jpg"),
                overwriteFile: true
            };

            Rho.Network.downloadFile(downloadfileProps, download_file_callback);

        } );

        waitsFor( function() {
                return callbackCalled;
            },
            "Callback never called",
            waitTimeout
        );

        runs(function() {
            expect(status).toEqual('ok');
            //TODO: Need to add Code for File exist.
        });
    });

    it('VT293-0049 | download file with overwrite true and createfolder default value and callback', function() {
       var flag = false;
       var callbackCalled = false;
       var status = '';

       var download_file_callback = function (args){
            status = args['status'];
            callbackCalled = true;
       }

       runs( function() {

            downloadfileProps = {
                url: srvHttpDownloadImageUrl,
                filename: Rho.RhoFile.join(imagesDownloadFolder,"network_0049.jpg"),
                overwriteFile: true
            };

            Rho.Network.downloadFile(downloadfileProps, download_file_callback);

        } );

        waitsFor( function() {
                return callbackCalled;
            },
            "Callback never called",
            waitTimeout
        );

        runs(function() {
            expect(status).toEqual('ok');
            //TODO: Need to add Code for File exist.
        });
    });

     it('VT293-0050 | download file with overwrite true and createfolder fasle value with callback', function() {
       var flag = false;
       var callbackCalled = false;
       var status = '';

       var download_file_callback = function (args){
            status = args['status'];
            callbackCalled = true;
       }

       runs( function() {

            downloadfileProps = {
                url: srvHttpDownloadImageUrl,
                filename: Rho.RhoFile.join(imagesDownloadFolder,"newNetwork/network_0053.jpg"),
                overwriteFile: true,
                createFolders: false
            };

            Rho.Network.downloadFile(downloadfileProps, download_file_callback);

        } );

        waitsFor( function() {
                return callbackCalled;
            },
            "Callback never called",
            waitTimeout
        );

        runs(function() {
            expect(status).toEqual('error');
            //TODO: Need to add Code for File exist.
        });
    });


     it('VT293-0051 | download file with overwrite true and createfolder true value with callback', function() {
       var flag = false;
       var callbackCalled = false;
       var status = '';

       var download_file_callback = function (args){
            status = args['status'];
            callbackCalled = true;
       }

       runs( function() {

            downloadfileProps = {
                url: srvHttpDownloadImageUrl,
                filename: Rho.RhoFile.join(imagesDownloadFolder,"newNetwork54/network_0054.jpg"),
                overwriteFile: true,
                createFolders: true
            };

            Rho.Network.downloadFile(downloadfileProps, download_file_callback);

        } );

        waitsFor( function() {
                return callbackCalled;
            },
            "Callback never called",
            waitTimeout
        );

        runs(function() {
            expect(status).toEqual('ok');
            //TODO: Need to add Code for File exist.
        });
    });


     it('VT293-0052 | download file with anonymus event', function() {
       var flag = false;
       var callbackCalled = false;
       var status = '';

       runs( function() {

            downloadfileProps = {
                url: srvHttpDownloadImageUrl,
                filename: Rho.RhoFile.join(imagesDownloadFolder,"newNetwork54/network_0055.jpg"),
                overwriteFile: true,
                createFolders: true
            };

            Rho.Network.downloadFile(downloadfileProps, function (args){
            status = args['status'];
            callbackCalled = true;
            });

        } );

        waitsFor( function() {
                return callbackCalled;
            },
            "Callback never called",
            waitTimeout
        );

        runs(function() {
            expect(status).toEqual('ok');
            //TODO: Need to add Code for File exist.
        });
    });
         
    it('VT293-0057 | download file with authentication properties with callback event', function() {
       var flag = false;
       var callbackCalled = false;
       var status = '';

       var download_file_callback = function (args){
            status = args['status'];
            callbackCalled = true;
       }

       runs( function() {

            downloadfileProps = {
                url: srvHttpDownloadImageUrlAuth,
                authType: "basic",
                authUser: "admin",
                authPassword: "admin",
                filename: Rho.RhoFile.join(imagesDownloadFolder,"network/network1.jpg"),
                overwriteFile: true,
                createFolders: true
            };

            Rho.Network.downloadFile(downloadfileProps, download_file_callback);

        } );

        waitsFor( function() {
                return callbackCalled;
            },
            "Callback never called",
            waitTimeout
        );

        runs(function() {
            expect(status).toEqual('ok');
            //TODO: Need to add Code for File exist.
        });
    });

    it('VT293-0068 | uploadFile to http with callback event', function() {
       var flag = false;
       var callbackCalled = false;
       var data = '';
       var status = '';
       var fname = Rho.RhoFile.join(Rho.Application.publicFolder,"/images/myfile.txt");

       var upload_file_callback = function (args){
        status = args['status'];
        data = args['body'];
        callbackCalled = true;
       }

       runs( function() {

            var uploadfileProps = {
              url: srvHttpUploadTextFileUrl,
              filename: fname,
              body: "uploading file",
              fileContentType: "text/plain"
            };

            var args = Rho.Network.uploadFile(uploadfileProps,upload_file_callback);
            });

        waitsFor( function() {
                return callbackCalled;
            },
            "Callback never called",
            waitTimeout
        );

        runs(function() {
            expect(status).toEqual('ok');
            expect(data).toEqual(Rho.RhoFile.read(fname));
        });
    });

    it('VT293-0069 | uploadFile with synch callback event', function() {
       
       var fname = Rho.RhoFile.join(Rho.Application.publicFolder,"/images/myfile.txt");

        var uploadfileProps = {
          url: srvHttpUploadTextFileUrl,
          filename: fname,
          body: "uploading file",
          fileContentType: "text/plain"
        };

        var args = Rho.Network.uploadFile(uploadfileProps); 

        expect(args['status']).toEqual('ok');
        expect(args['body']).toEqual(Rho.RhoFile.read(fname));
    });

    it('VT293-0070 | uploadFile with anonymus event', function() {
       var data = '';
       var callbackCalled = false;
       var status = ''
       var fname = Rho.RhoFile.join(Rho.Application.publicFolder,"/images/myfile.txt");

       runs( function() {

        var uploadfileProps = {
          url: srvHttpUploadTextFileUrl,
          filename: fname,
          body: "uploading file",
          fileContentType: "text/plain"
        };

        Rho.Network.uploadFile(uploadfileProps, function(args){
            status = args['status'];
            data = args['body'];
            callbackCalled = true;
        }); 
        });

        waitsFor( function() {
                return callbackCalled;
            },
            "Callback never called",
            waitTimeout
        );

        runs(function() {
            expect(status).toEqual('ok');
            expect(data).toEqual(Rho.RhoFile.read(fname));
        });
    });

    it('VT293-0071 | uploadFile with autherisation properties', function() {
       var data = '';
       var callbackCalled = false;
       var status = ''
       var upload_file_callback = function (args){
        status = args['status'];
        data = args['body'];
        callbackCalled = true;
       }
       var fname = Rho.RhoFile.join(Rho.Application.publicFolder,"/images/myfile.txt");

       runs( function() {

        var uploadfileProps = {
          url: srvHttpUploadTextFileUrlAuth,
          authType: "basic",
          authUser: "admin",
          authPassword: "Motorola@123",
          filename: fname,
          body: "uploading file",
          fileContentType: "image/png"
        };

            Rho.Network.uploadFile(uploadfileProps, upload_file_callback); 
        });

        waitsFor( function() {
                return callbackCalled;
            },
            "Callback never called",
            waitTimeout
        );

        runs(function() {
            expect(status).toEqual('ok');
            expect(data).toEqual(Rho.RhoFile.read(fname));
        });
    });

    it('VT293-0082 | download file from http with sync', function() {

        downloadfileProps = {
            url: srvHttpDownloadImageUrl,
            overwriteFile: true,
            createFolders: true,
            filename: Rho.RhoFile.join(imagesDownloadFolder,"network.jpg")
        };

        Rho.Network.downloadFile(downloadfileProps);
        myvar =  Rho.Network.downloadFile(downloadfileProps); 
        expect(myvar["status"]).toEqual('ok');
        //TODO: Need to add Code for File exist.
    });
         
});
