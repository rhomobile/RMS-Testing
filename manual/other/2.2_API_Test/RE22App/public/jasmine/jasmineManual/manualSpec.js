function ManualSpec(aJasmine, aDocument) {
    var instance = {};
    instance.jasmine = aJasmine;
    instance.document = aDocument;
    instance.userActionTimeout = 3000000;
    instance.waitsForTimeout = instance.userActionTimeout + 10000;

    instance.containerID = "specContainer";
    instance.goalscontainerID = "specGoalsContainer";
    instance.preconditionsContainerID = "specPreconditionsContainer";
    instance.stepsContainerID = "specStepsContainer";
    instance.expectationsContainerID = "specExpectationsContainer";
    instance.resultsContainerID = "specResultsContainer";

    instance.goals = [];
    instance.preconditions = [];
    instance.steps = [];
    instance.expectations = [];
    instance.results = [];

    instance.addGoal = function (aString) {
        this.goals.push(aString);
    };

    instance.addPrecondition = function (aString) {
        this.preconditions.push(aString);
    };

    instance.addStep = function (aString) {
        this.steps.push(aString);
    };

    instance.addExpectation = function (aString) {
        this.expectations.push(aString);
    };

    instance.addResult = function (keyString, valueString) {
        this.results.push({key: keyString, value: valueString});
    };

    instance.nextId = function () {
        function fourSymbols() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }

        return (fourSymbols() + fourSymbols() + "-" + fourSymbols() + "-" + fourSymbols() + "-" + fourSymbols() + "-" + fourSymbols() + fourSymbols() + fourSymbols());
    };

    instance.body = function () {
        return this.document.getElementsByTagName('body').item(0);
    };

    instance.setContainerTitle = function (container, aString) {
        var title = this.document.createElement('div');
        title.setAttribute("class", "containerTitle");
        title.appendChild(this.document.createTextNode(aString));
        container.appendChild(title);
    };

    instance.container = function () {
        if (this.containerID == null) {
            this.containerID = this.nextId()
        }
        var container = this.document.getElementById(this.containerID);
        if (container == null) {
            container = this.document.createElement('div');
            container.setAttribute('id', this.containerID);
            container.setAttribute('class', 'container');
            //this.body().insertBefore(container, this.body().firstChild);
            this.body().appendChild(container);
        }
        return container;
    };

    instance.userControlsContainer = function () {
        if (this.userControlsContainerID == null) {
            this.userControlsContainerID = this.nextId()
        }
        var container = this.document.getElementById(this.userControlsContainerID);
        if (container == null) {
            container = this.document.createElement('div');
            container.setAttribute('id', this.userControlsContainerID);
            container.setAttribute('class', 'userControlsContainer');
            this.container().appendChild(container);
        }
        return container;
    };

    instance.goalsContainer = function () {
        if (this.goalsContainerId == null) {
            this.goalsContainerId = this.nextId()
        }
        var container = this.document.getElementById(this.goalsContainerId);
        if (container == null) {
            container = this.document.createElement('div');
            container.setAttribute('id', this.goalsContainerId);
            container.setAttribute('class', "goalsContainer");
            this.container().appendChild(container);
            this.setContainerTitle(container, "Goals");
        }
        return container;
    };

    instance.preconditionsContainer = function () {
        if (this.preconditionsContainerID == null) {
            this.preconditionsContainerID = this.nextId()
        }
        var container = this.document.getElementById(this.preconditionsContainerID);
        if (container == null) {
            container = this.document.createElement('div');
            container.setAttribute('id', this.preconditionsContainerID);
            container.setAttribute('class', "preconditionsContainer");
            this.container().appendChild(container);
            this.setContainerTitle(container, "Preconditions");
        }
        return container;
    };

    instance.stepsContainer = function () {
        if (this.stepsContainerID == null) {
            this.stepsContainerID = this.nextId()
        }
        var container = this.document.getElementById(this.stepsContainerID);
        if (container == null) {
            container = this.document.createElement('div');
            container.setAttribute('id', this.stepsContainerID);
            container.setAttribute('class', "stepsContainer");
            this.container().appendChild(container);
            this.setContainerTitle(container, "Steps");
        }
        return container;
    };

    instance.expectationsContainer = function () {
        if (this.expectationsContainerID == null) {
            this.expectationsContainerID = this.nextId()
        }
        var container = this.document.getElementById(this.expectationsContainerID);
        if (container == null) {
            container = this.document.createElement('div');
            container.setAttribute('id', this.expectationsContainerID);
            container.setAttribute('class', "expectationsContainer");
            this.container().appendChild(container);
            this.setContainerTitle(container, "Expectations");
        }
        return container;
    };

    instance.resultsContainer = function () {
        if (this.resultsContainerID == null) {
            this.resultsContainerID = this.nextId()
        }
        var container = this.document.getElementById(this.resultsContainerID);
        if (container == null) {
            container = this.document.createElement('div');
            container.setAttribute('id', this.resultsContainerID);
            container.setAttribute('class', "resultsContainer");
            this.container().insertBefore(container, this.userControlsContainer());
            this.setContainerTitle(container, "Results");
        }
        return container;
    };

    instance.hasGoals = function () {
        return this.goals.length != 0;
    }

    instance.hasPreconditions = function () {
        return this.preconditions.length != 0;
    }

    instance.hasSteps = function () {
        return this.steps.length != 0;
    }

    instance.hasExpectations = function () {
        return this.expectations.length != 0;
    }

    instance.displayGoals = function () {
        var list = this.document.createElement('ol');
        this.goals.forEach(function (each) {
            var item = this.document.createElement('li');
            var value = this.document.createTextNode(each);
            item.appendChild(value);
            list.appendChild(item);
        });
        this.goalsContainer().appendChild(list);
    };

    instance.displayPreconditions = function () {
        var list = this.document.createElement('ol');
        this.preconditions.forEach(function (each) {
            var item = this.document.createElement('li');
            var value = this.document.createTextNode(each);
            item.appendChild(value);
            list.appendChild(item);
        });
        this.preconditionsContainer().appendChild(list);
    };

    instance.displaySteps = function () {
        var list = this.document.createElement('ol');
        this.steps.forEach(function (each) {
            var item = this.document.createElement('li');
            var value = this.document.createTextNode(each);
            item.appendChild(value);
            list.appendChild(item);
        });
        this.stepsContainer().appendChild(list);
    };

    instance.displayExpectations = function () {
        var list = this.document.createElement('ul');
        this.expectations.forEach(function (each) {
            var item = this.document.createElement('li');
            var value = this.document.createTextNode(each);
            item.appendChild(value);
            list.appendChild(item);
        });
        this.expectationsContainer().appendChild(list);
    };

    instance.displayResults = function () {
        var list = this.document.createElement('ul');
        this.results.forEach(function (each) {
            var item = this.document.createElement('li');
            var value = this.document.createTextNode(each.key + ' = ' + each.value);
            item.appendChild(value);
            list.appendChild(item);
        });
        this.resultsContainer().appendChild(list);
    };

    instance.specName = function () {
        return jasmine.getEnv().currentSpec.description;
    };

    instance.displayTitle = function () {
        var title = this.document.createElement('div');
        title.setAttribute("class", "specTitle");
        title.appendChild(this.document.createTextNode(this.specName()));
        this.container().appendChild(title);
    };

    instance.displayScenario = function () {
        this.displayTitle();
        if (this.hasGoals()) {
            this.displayGoals();
        }
        if (this.hasPreconditions()) {
            this.displayPreconditions();
        }
        if (this.hasSteps()) {
            this.displaySteps();
        }
        if (this.hasExpectations()) {
            this.displayExpectations();
        }
    };

    instance.waitForButtonPressing = function (aString) {
        this.userControlsContainer().innerHTML = "";
        var button = this.document.createElement("button");
        button.appendChild(this.document.createTextNode(aString));
        var flag = false;
        var timeoutID = setTimeout(function () {
            flag = true
        }, this.userActionTimeout);
        var that = this;
        button.onclick = function () {
            clearTimeout(timeoutID);
            that.userControlsContainer().removeChild(button);
            flag = true;
        };
        this.userControlsContainer().appendChild(button);

        waitsFor(function () {
            return flag;
        }, "User action timeout", this.waitsForTimeout)

    };

    instance.waitForResponse = function () {
        var timeoutID;
        var that = this;

        function finishSpec(result) {
            clearTimeout(timeoutID);
            var expectationResult = new jasmine.ExpectationResult({
                passed: result,
                message: "Test failed"
            });
            this.jasmine.getEnv().currentSpec.addMatcherResult(expectationResult);
            flag = true;
            that.body().removeChild(that.container());
        }

        this.userControlsContainer().innerHTML = "";
        var button = this.document.createElement("button");
        button.setAttribute("class", "passedButton");
        button.onclick = function () {
            finishSpec(true);
        };
        button.appendChild(this.document.createTextNode("Passed"));
        this.userControlsContainer().appendChild(button);

        button = this.document.createElement("button");
        button.setAttribute("class", "failedButton");
        button.onclick = function () {
            finishSpec(false)
        };
        button.appendChild(this.document.createTextNode("Failed"));
        this.userControlsContainer().appendChild(button);

        var flag = false;
        timeoutID = setTimeout(function () {
            finishSpec(false);
        }, this.userActionTimeout);

        waitsFor(function () {
            return flag;
        }, "User action timeout", this.waitsForTimeout);

    };

    instance.initialize = function () {
        var container = this.document.getElementById(this.containerID);
        if (container != null) {
            container.innerHTML = "";
        }
    };

    instance.initialize();
    return instance;
}