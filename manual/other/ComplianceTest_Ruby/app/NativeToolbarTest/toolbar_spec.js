describe("Native ToolBar Ruby API Tests", function(){

    it("VT200-0370 | Create a toolbar for Testing with label and icon for each of the action elements", function(){
        displayObjective(jasmine.getEnv().currentSpec.description);
        dispTestCaseRunning("Press 'RunTest' button");
        dispExpectedResult('Natvie tool bar should be created and no label should be seen as icons are also specified. Background color and mask color should be seen.');
        _result.waitToRunTest();
        runs(function(){
            Ruby.call('NativeToolbarTest','tool_icon_masklabel');
        });
        _result.waitForResponse();
    });

    it("VT200-0371 | Create a toolbar for Testing with coloured icon for one of the buttons", function(){
        displayObjective(jasmine.getEnv().currentSpec.description);
        dispTestCaseRunning("Press 'RunTest' button");
        dispExpectedResult('Natvie tool bar should be created. Colored icon should be displayed for "back" button in the toolbar if applicable.');
        _result.waitToRunTest();
        runs(function(){
            Ruby.call('NativeToolbarTest','tool_colored');
        });
        _result.waitForResponse();
    });

    it("VT200-0373 | remove ToolBar", function(){
        displayObjective(jasmine.getEnv().currentSpec.description);
        dispTestCaseRunning("Press 'RunTest' button");
        dispExpectedResult('Active toolbar should be removed .');
        _result.waitToRunTest();
        runs(function(){
            Ruby.call('NativeToolbarTest','tool_remove');
        });
        _result.waitForResponse();
    });

    it("VT200-0374 | Create a Toolbar for testing different set of  Actions", function(){
        displayObjective(jasmine.getEnv().currentSpec.description);
        dispTestCaseRunning("Press 'RunTest' button");
        dispExpectedResult('Native toolbar should get created and all the actions should work upon calling.');
        _result.waitToRunTest();
        runs(function(){
            Ruby.call('NativeToolbarTest','tool_setaction');
        });
        _result.waitForResponse();
    });

    it("Click here to see Mask color - Red icon will not be visible (Only for WM)", function(){
        displayObjective(jasmine.getEnv().currentSpec.description);
        dispTestCaseRunning("Press 'RunTest' button");
        dispExpectedResult('Native toolbar should get created and Red icon will not be visible upon [Button] in WM.');
        _result.waitToRunTest();
        runs(function(){
            Ruby.call('NativeToolbarTest','tool_mask');
        });
        _result.waitForResponse();
    });

});