describe("Native ToolBar Ruby API Tests", function(){

    beforeEach(function() {
        document.getElementById("actResult").innerHTML = "";
    });

    it("VT200-0382 | Switch the active tab to second", function(){
        displayObjective(jasmine.getEnv().currentSpec.description);
        dispTestCaseRunning("Press 'RunTest' button");
        dispExpectedResult('3 tabs should be created. Tab should be switched and it should be the active tab.');
        _result.waitToRunTest();
        runs(function(){
            Ruby.call('NativeTabbarTest','tabbar_create_switch');
        });
        _result.waitForResponse();
    });

    it("VT200-0384 | Current tabindex on second page", function(){
        displayObjective(jasmine.getEnv().currentSpec.description);
        dispTestCaseRunning("Press 'RunTest' button");
        dispExpectedResult('Should switch to 2nd page & give the tab value as 2.');
        _result.waitToRunTest();
        runs(function(){
            Ruby.call('NativeTabbarTest','tabbar_checkindex');
        });
        _result.waitForResponse();
    });

    it("VT200-0385 | Remove the current tab bar and replace with this one", function(){
        displayObjective(jasmine.getEnv().currentSpec.description);
        dispTestCaseRunning("Press 'RunTest' button");
        dispExpectedResult('It should remove the current tab bar and replaces it with the new tab. New tab should have the label as Main page.');
        _result.waitToRunTest();
        runs(function(){
            Ruby.call('NativeTabbarTest','tabbar_remove');
        });
        _result.waitForResponse();
    });

    it("VT200-0387 | Tabbar with background color for Tab", function(){
        displayObjective(jasmine.getEnv().currentSpec.description);
        dispTestCaseRunning("Press 'RunTest' button");
        dispExpectedResult('It should remove the current tab bar and replaces it with the new two tabs. New tabs should have the label as Native Tabbar and Main page. Also specified Background color for the tab should set.');
        _result.waitToRunTest();
        runs(function(){
            Ruby.call('NativeTabbarTest','tabbar_bgcolor');
        });
        _result.waitForResponse();
    });

});