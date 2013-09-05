(function () {
    if (!jasmine) {
        throw new Exception("jasmine library does not exist in global namespace!");
    }

    /**
     * Reporter that outputs spec results to the log file.
     *
     * Usage:
     *
     * jasmine.getEnv().addReporter(new jasmine.Logger());
     * jasmine.getEnv().execute();
     */
    var FileReporter = function (filename) {
        this.filename = filename;
        this.reported = false;
    };

    FileReporter.prototype = {
        path: function (){
            return Rho.RhoFile.join(Rho.Application.userFolder, this.filename);
        },

        reportRunnerResults: function (runner) {
        },

        reportRunnerStarting: function (runner) {
        },

        reportSpecStarting: function (spec) {
        },

        reportSpecResults: function (spec) {

            if (!spec.results().passed()) {
                this.log(spec.suite.description + '\r\n\t' + spec.description);
                for (var i = 0; i < spec.results().totalCount; i++) {
                    if (!spec.results().getItems()[i].passed()) {
                        var record = '\t\t' + String(i + 1) + "\t" + spec.results().getItems()[i].message;
                        this.log(record);
                    }
                }
                this.log('');
            }
        },

        log: function (str) {
            var fWrite = new Rho.RhoFile(this.path(), Rho.RhoFile.OPEN_FOR_APPEND);
            fWrite.write(str + '\r\n');
            fWrite.close();
        }
    };

    jasmine.FileReporter = FileReporter;
})();