
var startDatabaseCall = function (arrFile){

    var report = function() {
        var li = document.createElement("li");
        for (var i = 0; i < arguments.length; ++i) {
            if (i > 0) {
                li.appendChild(document.createElement('br'));
            }
            li.appendChild(document.createTextNode(arguments[i]));
        }
        document.getElementById('myList').appendChild(li);
    };

    it(arrFile[0][0] + " - " + arrFile[0][1],function(){

        var answer = undefined;
        for (var k = 1; k < arrFile.length; k++){
            answer = setParams(arrFile[k], true);
        }

        report(arrFile[0][0] + ' - ' + arrFile[0][1], 'output:', answer);

        var pattern = arrFile[0][2];
        expect(answer).toMatch(pattern);
        window.scrollTo(0,document.body.scrollHeight);

    });
};
