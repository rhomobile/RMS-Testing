ManualSpecRunner = function (controlsContainer, resultContainer, onReset) {
    var self = this;

    var resCont = $(resultContainer);
    var ctlCont = $(controlsContainer);

    // Selects for suites and specs
    var runner = jasmine.getEnv().currentRunner();
    var suitesSelect = createItemsSelect('suites', runner.suites()).appendTo(ctlCont);
    var specsSelect  = createItemsSelect('specs',  runner.specs() ).appendTo(ctlCont);

    // On suite selection changed event
    suitesSelect.change(function (evt) {
        evt.preventDefault();
        updateItemsSelect('specs', runner.specs().filter(function (spec) {
            return ((suitesSelect.val() == -1) || (suitesSelect.val() == spec.suite.id));
        }));
    });

    // Run specs button
    $('<button>', {text: 'Run selected tests'}).click(function (evt) {
        evt.preventDefault();
        jasmine.getEnv().execute();
    }).appendTo(ctlCont);

    // Reset result button
    $('<button>', {text: 'Reset result'}).click(function (evt) {
        evt.preventDefault();
        resCont.empty();
        onReset();
    }).appendTo(ctlCont);


    self.specFilter = function (spec) {
        var suiteIndex = suitesSelect.val();
        var specIndex = specsSelect.val();
        result = true;
        result = result && ((suiteIndex == -1) || (suiteIndex == spec.suite.id));
        result = result && ((specIndex == -1) || (specIndex == spec.id));
        return result;
    };

    return self;

    function createItemsSelect(selectClass, items) {
        var select = $('<select>', {class: selectClass}).append(
            $('<option>', {value: -1, text: 'All'})
        ).append(
            items.map(function (item) {
                return $('<option>', {value: item.id, text: item.description});
            })
        );
        return select;
    }

    function updateItemsSelect(selectClass, items) {
        var select = $('select.'+ selectClass);
        select.empty().append(
            $('<option>', {value: -1, text: 'All'})
        ).append(
            items.map(function (item) {
                return $('<option>', {value: item.id, text: item.description});
            })
        );
        return select;
    }
}

