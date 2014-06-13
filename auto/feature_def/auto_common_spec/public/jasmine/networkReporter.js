(function() {
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
            var skipped = !! results.skipped;
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

            testSuite.specs.push(testSpec);

            if (!testSpec.success) {
                var items = results.getItems();

                for (var i = 0; i < items.length; i++) {
                    var result = items[i];
                    if (result.passed && !result.passed()) {
                        var failure = {
                            message: result.toString(),
                            stack: result.trace.stack ? result.trace.stack : '',
                            idx: i
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
            Rho.Network.post({
                url: this.url,
                body: text + '\r\n'
            });
        }
    };

    function dateString(date) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1; // 0-based
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
        if (!specs.length) {
            return 0;
        }
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

        var sys_props = [
            'platform', 'osVersion', 'phoneId', 'deviceName',
            'locale', 'isEmulator', 'isRhoSimulator', 'oemInfo',
            'uuid', 'localServerPort', 'webviewFramework',
            'hasNetwork', 'hasSqlite'
        ];

        var props = Rho.System.getProperties(sys_props);

        var sorted_props = {};

        for (var i = 0; i < sys_props.length; i++) {
            var name = sys_props[i];
            sorted_props[name] = props[name];
        }

        var result = {
            date: dateString(date),
            time: timeString(date),
            app_name: Rho.Application.appName,
            spec_path: location.pathname,
            total: specCount,
            failures: results.failedCount,
            not_run: skippedCount,
            system: sorted_props,
            suites: convertSuites(testRun.suites)
        };

        return JSON.stringify(result);
    }

    function convertSuites(suites) {
        var result = [];

        for (var i = 0; i < suites.length; i++) {
            var suite = suites[i];
            var item = {
                name: suite.name,
                result: suite.executed ? (suite.success ? 1 : -1) : 0,
                time: suite.elapsed / 1000
            };

            if (suite.suites.length > 0) {
                item.suites = convertSuites(suite.suites);
            }

            if (suite.specs.length > 0) {
                item.specs = convertSpecs(suite.specs);
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
                n: spec.name,
                t: spec.elapsed / 1000,
                r: spec.executed ? (spec.success ? 1 : -1) : 0
            };

            if (spec.passed_asserts > 0) {
                item.p_a = spec.passed_asserts;
            }

            if (spec.total_asserts > 0) {
                item.t_a = spec.total_asserts;
            }

            if (spec.failures.length > 0) {
                item.f = convertFailures(spec.failures);
            }

            result.push(item);
        }

        return result;
    }

    function convertFailures(failures) {
        var fail_list = [];
        for (var j = 0; j < failures.length; j++) {
            var failure = failures[j];

            var fail_descr = {
                i: failure.idx
            };

            if (failure.message.length > 0) {
                fail_descr.m = failure.message;
            }

            if (failure.stack.length > 0) {
                fail_descr.s = failure.stack;
            }
            fail_list.push(fail_descr);
        }
        return fail_list;
    }

    jasmine.NetworkReporter = NetworkReporter;
})();
