var card_get_property = [
	
	{
		testName		:	"VT286-0001 | autoEnter getproperty before setting any value | false",
		propertyName	:	"autoEnter",
		expectedResult	: 	"false", 
	},
	{
		testName		:	"VT286-0002 | autoTab getproperty before setting any value | false",
		propertyName	:	"autoTab",
		expectedResult	: 	"false", 
	},
	{
		testName		:	"VT286-0003 | pinEntry getproperty before setting any value | false",
		propertyName	:	"pinEntry",
		expectedResult	: 	"false", 
	},
	{
		testName		:	"VT286-0004 | pinTimeout getproperty before setting any value | 30000",
		propertyName	:	"pinTimeout",
		expectedResult	: 	"30000", 
	},
	{
		testName		:	"VT286-0005 | panData getproperty before setting any value | ",
		propertyName	:	"panData",
		expectedResult	: 	"", 
	},
	{
		testName		:	"VT286-0006 | moduleName getproperty before setting any value | ",
		propertyName	:	"moduleName",
		expectedResult	: 	"", 
	}
]

var card_setget_property = [
	{
		testName		:	"VT286-0009 |  set autoEnter to true and getproperty after setting | true",
		propertyName	:	"autoEnter",
		propertyValue	:	"true",
		expectedResult	:	"true"
	},
	{
		testName		:	"VT286-0010 |  set autoEnter to false and getproperty after setting | false",
		propertyName	:	"autoEnter",
		propertyValue	:	"false",
		expectedResult	:	"false"
	}
]
