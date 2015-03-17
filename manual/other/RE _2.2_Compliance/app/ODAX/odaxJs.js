var count = 0;
var resultset;
var i;
var FieldValue1;
var FieldValue2;
var FieldValue3;
var fieldValue;
var conditionField;
function DoInsert() {
        

        if (FieldValue1.length < 1 || FieldValue2.length < 1 || FieldValue3.length < 1) {
            //alert("Please enter a valid value for all three fields");
            result.innerHTML= "Please enter a valid value for all three fields";
        }
        else {
            var QueryString = 'INSERT INTO \'\\application\\test.xml\' (field1,field2,field3) VALUES (';
            QueryString += '\'' + FieldValue1 + '\',';
            QueryString += '\'' + FieldValue2 + '\',';
            QueryString += '\'' + FieldValue3 + '\');';
            //alert(QueryString);
            count = odax.Execute(QueryString, 0, ',', false);
            resultset += "Record(s) Inserted " + count.toString();

            //alert(count + " Record(s) Inserted");
            //var sig = document.getElementById("actualResult"); 
            //sig.innerHTML= count + " Record(s) Inserted";
        }
    }
function DoUpdate() {

                var QueryString = 'UPDATE \'\\application\\test.xml\' SET field1=';
                QueryString += '\''+ fieldValue +'\'';
                QueryString += ' WHERE field1=\'';
                QueryString += conditionField +"\';"
                count = odax.Execute(QueryString,0,',',false);
                resultset += "Record(s) Inserted " + count.toString();
                odax.Select('SELECT * FROM \'\\application\\test.xml\';', ',', false);
                odax.MoveFirst();
                resultset += "The fieldvalue inserted is " + odax.get('field1').toString();
	            main.displayResult(resultset);
}  
function DoDelete(){
                
                var QueryString = 'DELETE FROM \'\\application\\test.xml\' WHERE field1=';
                QueryString += '\''+ conditionField +'\';';
                resultset += "Record(s) Inserted " + odax.Execute(QueryString,0,',',false).toString();
                odax.Select('SELECT * FROM \'\\application\\test.xml\';', ',', false);
                resultset += "  MoveNext returns " + odax.MoveNext().toString() + " after Deletion";
	            main.displayResult(resultset);
}