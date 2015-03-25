function ManualSpecLauncher(aJasmine, aDocument) {
    var instance = {};

    instance.jasmine = aJasmine;
    instance.document = aDocument;

    instance.createOptionAll = function (select) {
        var option = this.document.createElement('option');
        option.setAttribute('value', '-1');
        option.appendChild(this.document.createTextNode('All'));
        select.appendChild(option);
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

    instance.suites = function () {
        return this.jasmine.getEnv().currentRunner().suites()
    };

    instance.specs = function () {
        return this.jasmine.getEnv().currentRunner().specs()
    };

    instance.container = function () {
        if (this.containerId == null) {
            this.containerId = this.nextId()
        }
        var container = this.document.getElementById(this.containerId);
        if (container == null) {
            container = this.document.createElement('div');
            container.setAttribute('id', this.containerId);
            container.setAttribute('class', 'container');
            this.body().insertBefore(container, this.body().firstChild);
        }
        return container;
    };

    instance.suiteControl = function () {
        if (this.suiteControlId == null) {
            this.suiteControlId = this.nextId()
        }
        var control = this.document.getElementById(this.suiteControlId);
        if (control == null) {
            control = this.document.createElement('select');
            control.setAttribute('id', this.suiteControlId);
            this.container().appendChild(control);
        }
        return control;
    };

    instance.specControl = function () {
        if (this.specControlId == null) {
            this.specControlId = this.nextId()
        }
        var control = this.document.getElementById(this.specControlId);
        if (control == null) {
            control = this.document.createElement('select');
            control.setAttribute('id', this.specControlId);
            this.container().appendChild(control);
        }
        return control;
    };

    instance.runControl = function () {
        if (this.buttonControlId == null) {
            this.buttonControlId = this.nextId()
        }
        var control = this.document.getElementById(this.buttonControlId);
        if (control == null) {
            control = this.document.createElement('button');
            control.setAttribute('id', this.buttonControlId);
            control.innerHTML = 'Run';
            control.click = function () {
                this.jasmine.getEnv().execute()
            };
            this.container().appendChild(control);
        }
        return control;
    };

    instance.initialize = function () {
        this.initializeSuiteControl();
        this.initializeSpecControl();
        this.setRunControlClickEventHandler();
    };

    instance.initializeSuiteControl = function () {
        var control = this.suiteControl();
        this.createOptionAll(control);
        this.suites().forEach(function (each) {
            var option = this.document.createElement('option');
            option.setAttribute('value', each.id);
            option.appendChild(this.document.createTextNode(each.description));
            control.appendChild(option);
        });
        this.setSuiteControlChangeEventHandler();
    };

    instance.initializeSpecControl = function () {
        var control = this.specControl();
        this.createOptionAll(control);
        this.specs().forEach(function (each) {
            var option = this.document.createElement('option');
            option.setAttribute('value', each.id);
            option.appendChild(this.document.createTextNode(each.description));
            control.appendChild(option);
        });
    };

    instance.valueOfSelectedSuite = function () {
        var idx = this.suiteControl().selectedIndex;
        return (this.suiteControl().options[idx].value);
    };

    instance.valueOfSelectedSpec = function () {
        var idx = this.specControl().selectedIndex;
        return (this.specControl().options[idx].value);
    };

    instance.setSuiteControlChangeEventHandler = function () {
        var that = this;
        that.suiteControl().addEventListener("change", function () {
            for (var i = that.specControl().options.length - 1; i >= 0; i--) {
                that.specControl().remove(i);
            }
            that.createOptionAll(that.specControl());
            var valueOfSelectedSuite = that.valueOfSelectedSuite();
            that.specs().forEach(function (each) {
                if ((valueOfSelectedSuite == -1) || (valueOfSelectedSuite == each.suite.id)) {
                    var option = that.document.createElement('option');
                    option.setAttribute('value', each.id);
                    option.setAttribute('title', each.description);
                    option.appendChild(that.document.createTextNode(each.description));
                    that.specControl().appendChild(option);
                }
            });
        });
    };

    instance.setRunControlClickEventHandler = function () {
        var that = this;
        that.runControl().addEventListener("click", function () {
            that.runSelectedTests();
        });
    };

    instance.isSelectSpecificSuite = function () {
        return this.valueOfSelectedSuite() != -1;
    };
    instance.isSelectSpecificSpec = function () {
        return this.valueOfSelectedSpec() != -1;
    };

    instance.selectedSpec = function () {
        var index = this.valueOfSelectedSpec();
        var spec;
        for (var i = 0; i < this.specs().length; i++) {
            if (this.specs()[i].id == index) {
                spec = this.specs()[i];
            }
        }
        return spec;
    };


    instance.selectedSuite = function () {
        var index = this.valueOfSelectedSuite();
        var suite;
        for (var i = 0; i < this.suites().length; i++) {
            if (this.suites()[i].id == index) {
                suite = this.suites()[i];
            }
        }
        return suite;
    };

    instance.runSelectedTests = function () {
        var href = window.location.href;
        if (href.indexOf('?') != -1) {
            href = href.substring(0, href.indexOf('?'));
        }

        if (this.isSelectSpecificSpec()) {
            var spec = this.selectedSpec();
            href = href + this.jasmine.HtmlReporter.sectionLink(spec.getFullName());
            window.location.replace(href);
            return;
        }

        if (this.isSelectSpecificSuite()) {
            var suite = this.selectedSuite();
            href = href + this.jasmine.HtmlReporter.sectionLink(suite.getFullName());
            window.location.replace(href);
            return;
        }

        href = href + '?';
        window.location.replace(href);
    };

    instance.initialize();
    return instance;
}
