system.data = ''
var enumCallback = function (value){
	var data = '';
	data = value['result']
	data = value[0] + ',' + value[1]
}

var system = [
data : '',
getValue : function (){
	return 'hello';
	
}
]

system.getValue()