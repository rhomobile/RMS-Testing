beforeEach(function() {
    this.addMatchers({
        isNotEmptyString: function(node) {
            var str = this.actual;
            var typeOk = (typeof str) == 'string';
            var res = typeOk && ( !! str);

            this.message = function() {
                if (!typeOk) {
                    return "Expected value to be a string ";
                }
                return "Expected string to be not empty";
            };
            return res;
        },
        isNumberGreaterThenZero: function() {
            var typeOk = (typeof this.actual) == 'number';

            this.message = function() {
                if (!typeOk) {
                    return "Expected " + (typeof str) + " to be a number";
                }
                return "Expected " + this.actual + " to be greater than 0";
            };

            return (typeOk) && (this.actual > 0);
        },
        isBoolean: function() {
            return (typeof this.actual) == 'boolean';
        }
    });
});
