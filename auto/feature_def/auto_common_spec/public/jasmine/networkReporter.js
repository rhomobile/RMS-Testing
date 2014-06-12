(function () {
    'use strict';

    if (!jasmine) {
        throw new Exception('jasmine library does not exist in global namespace!');
    }

    var NetworkReporter = function(url) {
        this.url = url;
        this.started = false;
        this.finished = false;

        this.reportName = 'Jasmine Results';
        this.testSuites = {};
        this.testSpecs = {};
        this.testRun = {
            suites: []
        };
    };

    NetworkReporter.prototype = {
        reportRunnerStarting: function(runner) {
            var suites = runner.suites();

            for (var i = 0; i < suites.length; i++) {
                var currentSuite = suites[i];

                var suite = {
                    elapsed: 0,
                    executed: false,
                    id: currentSuite.id,
                    name: currentSuite.description,
                    specs: [],
                    success: false,
                    suites: []
                };

                this.testSuites[currentSuite.id] = suite;

                var parent = this.testRun.suites;
                if (currentSuite.parentSuite) {
                    parent = this.testSuites[currentSuite.parentSuite.id].suites;
                }

                parent.push(suite);
            }
        },

        reportSpecStarting: function(spec) {
            spec.startTime = new Date();
        },

        reportRunnerResults: function(runner) {
            var output = printTestResults(runner, this);
            this.writeFile(output);
        },

        reportSuiteResults: function(suite) {
            var id = suite.id;

            var results = suite.results();

            var testSuite = this.testSuites[id];
            testSuite.executed = true;
            testSuite.success = results.passed();
        },

        reportSpecResults: function(spec) {
            var elapsed = spec.startTime ? (new Date() - spec.startTime) : 0;
            var results = spec.results();
            var skipped = !!results.skipped;
            var id = spec.id;
            var suite = spec.suite;
            var testSuite = this.testSuites[suite.id];
            var testSpec = {
                elapsed: elapsed,
                executed: !skipped,
                passed_asserts: results.passedCount,
                total_asserts: results.totalCount,
                failures: [],
                id: spec.id,
                name: spec.description,
                success: results.passed()
            };
            this.testSpecs[spec.id] = testSpec;
            testSuite.specs.push(testSpec);

            if (!testSpec.success) {
                var items = results.getItems();

                for (var i = 0; i < items.length; i++) {
                    var result = items[i];
                    if (result.passed && !result.passed()) {
                        var failure = {
                            message: result.toString(),
                            stack: result.trace.stack ? result.trace.stack : ''
                        };
                        testSpec.failures.push(failure);
                    }
                }
            }

            while (suite) {
                testSuite = this.testSuites[suite.id];
                testSuite.elapsed = testSuite.elapsed ? (testSuite.elapsed + elapsed) : elapsed;
                suite = suite.parentSuite;
            }
        },

        writeFile: function(text) {
            Rho.Network.post(
                { url : this.url, body : text + '\r\n' }
            );
        }
    };

    function dateString(date) {
        var year = date.getFullYear();
        var month = date.getMonth()+1; // 0-based
        var day = date.getDate();
        return year + '-' + formatAsTwoDigits(month) + '-' + formatAsTwoDigits(day);
    }

    function timeString(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        return hours + ':' + formatAsTwoDigits(minutes) + ':' + formatAsTwoDigits(seconds);
    }

    function formatAsTwoDigits(digit) {
        return (digit < 10) ? '0' + digit : '' + digit;
    }

    function getSkippedCount(specs) {
        if (!specs.length) { return 0; }
        for (var i = 0, count = 0; i < specs.length; i++) {
            if (specs[i].results().skipped) {
                count++;
            }
        }
        return count;
    }

    function printTestResults(runner, reporter) {
        var testRun = reporter.testRun;

        var date = new Date();
        var results = runner.results();
        var specs = runner.specs();
        var specCount = specs.length;
        var skippedCount = getSkippedCount(specs);

        var result = {
            date : dateString(date),
            time : timeString(date),
            total : specCount,
            failures : results.failedCount,
            not_run : skippedCount,
            suites : convertSuites(testRun.suites) 
        };

        return JSON.stringify(result);
    }

    function convertSuites(suites) {
        var result = [];

        for (var i = 0; i < suites.length; i++) {
            var item = {
                name : suites[i].name,
                executed : suites[i].executed ? 1 : 0,
                success : suites[i].success ? 1 : 0,
                time : suites[i].elapsed / 1000
            };

            if (suites[i].suites.length > 0) {
                item.suites = convertSuites(suites[i].suites);
            }

            if (suites[i].specs.length > 0) {
                item.specs = convertSpecs(suites[i].specs);
            }

            result.push(item);
        }

        return result;
    }

    function convertSpecs(specs) {
        var result = [];

        for (var i = 0; i < specs.length; i++) {
            var spec = specs[i];

            var item = {
                n : spec.name,
                t : spec.elapsed / 1000
            };

            if (!spec.executed) {
                item.e = 0
            }

            if (!spec.success) {
                item.s = 0
            }

            if (spec.passed_asserts > 0) {
                item.p_a = spec.passed_asserts;
            }

            if (spec.total_asserts > 0) {
                item.t_a = spec.total_asserts;
            } 

            var fails = [];

            for (var j = 0; j < spec.failures.length; j++) {
                var failure = spec.failures[j];

                fails.push(
                    {
                        m : failure.message,
                        s : failure.stack
                    }
                );
            }

            if (fails.length > 0) {
                item.f = fails;
            }

            result.push(item);
        }

        return result;
    }

    jasmine.NetworkReporter = NetworkReporter;
})();