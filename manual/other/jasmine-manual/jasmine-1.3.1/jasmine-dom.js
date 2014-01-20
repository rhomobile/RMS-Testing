(function () {
    jasmine.Env.prototype.clearReporters = function (reporter) {
        this.reporter.clear();
    };

    jasmine.MultiReporter.prototype.clear = function (reporter) {
        this.subReporters_ = [];
    };
})();

jasmine.DOMReporter = function (container) {
    var c = $(container)[0];

    if (!c) {
        c = window.document;
    } else {
        c.body = c.body || c;
        c.location = c.location || window.document.location;
    }

    return new jasmine.HtmlReporter(c);
};

