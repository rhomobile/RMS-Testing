function ManualSpecLauncher(aJasmine, aDocument) {
    var instance = {};
    instance.goals = [];
    instance.preconditions = [];
    instance.steps = [];
    instance.expectations = [];
    instance.results = [];
    instance.addGoal = function (aString) {
        this.goals.push(aString);
    }
    instance.addPrecondition = function (aString) {
        this.preconditions.push(aString);
    }
    instance.addStep = function (aString) {
        this.steps.push(aString);
    }
    instance.addExpectation = function (aString) {
        this.expectations.push(aString);
    }

    instance.addResult = function (aString) {
        this.results.push(aString);
    }

    instance.displayScenario = function(document){
        alert("Display scenario");
    }

    return instance;
}