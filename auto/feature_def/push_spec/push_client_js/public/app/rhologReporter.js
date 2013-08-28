(function () {
    if (!jasmine) {
        throw new Exception("jasmine library does not exist in global namespace!");
    }

    /**
     * Reporter that outputs spec results to the rho log file.
     *
     * Usage:
     *
     * jasmine.getEnv().addReporter(new jasmine.RhologReporter());
     * jasmine.getEnv().execute();
     */
    var RhologReporter = function () {
        this.started = false;
        this.finished = false;
    };

    RhologReporter.prototype = {
        reportRunnerResults: function (runner) {
            this.log("***Total: " + this.executedSpecs);
            this.log("***Passed: " + this.passedSpecs);
            this.log("***Failed: " + (this.executedSpecs - this.passedSpecs));
            this.finished = true;

            var URL  = "http://" + LOCAL_SERVER_HOST + ":" + LOCAL_SERVER_PORT.toString();
            var params = "?total=" + this.executedSpecs + "&passed=" + this.passedSpecs + "&failed=" + (this.executedSpecs - this.passedSpecs);
            var getProps = { url: URL + params };
            Rho.Network.get(getProps);
        },

        reportRunnerStarting: function (runner) {
            this.started = true;
            this.startTime = (new Date()).getTime();
            this.executedSpecs = 0;
            this.passedSpecs = 0;
            this.log("I'm started");

            var URL  = "http://" + LOCAL_SERVER_HOST + ":" + LOCAL_SERVER_PORT.toString();
            var getProps = { url: URL + "?status=start" };
            Rho.Network.get(getProps);
        },

        reportSpecStarting: function (spec) {
            this.log(spec.suite.description + ' : ' + spec.description + ' started ');
        },

        reportSpecResults: function (spec) {
            this.executedSpecs++;
            var resultText = "Failed.";
            if (spec.results().passed()) {
                this.passedSpecs++;
                resultText = "Passed.";
            }
            this.log(spec.suite.description + ' : ' + spec.description + ' : ' + resultText);
        },

        log: function (str) {
            Rho.Log.info(str, 'Jasmine specRunner')
        }
    };

    jasmine.RhologReporter = RhologReporter;
})();