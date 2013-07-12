var card_get_property = [
	
	{
		testName		:	"VT286-0001/VT286-0009 | autoEnter getproperty before setting any value | false",
		propertyName	:	"autoEnter",
		expectedResult	: 	"false", 
	},
	{
		testName		:	"VT286-0002/VT286-0010 | autoTab getproperty before setting any value | false",
		propertyName	:	"autoTab",
		expectedResult	: 	"false", 
	}
];

if(isWindowsMobilePlatform() && Rho.CardReader.moduleName == "dcr7000")
{
	card_get_property.push(
	{
		testName		:	"VT286-0003/VT286-0011 | pinEntry getproperty before setting any value | false",
		propertyName	:	"pinEntry",
		expectedResult	: 	"false", 
	},
	{
		testName		:	"VT286-0004/VT286-0012 | pinTimeout getproperty before setting any value | 30000",
		propertyName	:	"pinTimeout",
		expectedResult	: 	"30000", 
	},
	{
		testName		:	"VT286-0005/VT286-0013 | panData getproperty before setting any value | ",
		propertyName	:	"panData",
		expectedResult	: 	"", 
	}/*,
	{
		testName		:	"VT286-0006/VT286-0014 | moduleName getproperty before setting any value | ",
		propertyName	:	"moduleName",
		expectedResult	: 	"", 
	},
  {
		testName		:	"VT286-0007/VT286-0015 | moduleName getproperty with empty property name | ",
		propertyName	:	"",
		expectedResult	: 	"", 
	},
	{
		testName		:	"VT286-0008/VT286-0016 | moduleName getproperty with invalid property name | ",
		propertyName	:	"invalid",
		expectedResult	: 	"", 
	}*/);
}

var card_get_property_instance = [
	
	{
		testName		:	"VT286-0208 | autoEnter getproperty before setting any value | false",
		propertyName	:	"autoEnter",
		expectedResult	: 	"false", 
	},
	{
		testName		:	"VT286-0209 | autoTab getproperty before setting any value | false",
		propertyName	:	"autoTab",
		expectedResult	: 	"false", 
	}
];

if(isWindowsMobilePlatform() && Rho.CardReader.moduleName == "dcr7000")
{
	card_get_property_instance.push(
	{
		testName		:	"VT286-0210 | pinEntry getproperty before setting any value | false",
		propertyName	:	"pinEntry",
		expectedResult	: 	"false", 
	},
	{
		testName		:	"VT286-0211 | pinTimeout getproperty before setting any value | 30000",
		propertyName	:	"pinTimeout",
		expectedResult	: 	"30000", 
	},
	{
		testName		:	"VT286-0212 | panData getproperty before setting any value | ",
		propertyName	:	"panData",
		expectedResult	: 	"", 
	}
	);
}

var card_setget_property = [
	{
		testName		:	"VT286-0017/VT286-0045/VT286-0097 |  set autoEnter to true and getproperty after setting | true",
		propertyName	:	"autoEnter",
		propertyValue	:	"true",
		expectedResult	:	"true"
	},
	{
		testName		:	"VT286-0018/VT286-0046/VT286-0098 |  set autoEnter to false and getproperty after setting | false",
		propertyName	:	"autoEnter",
		propertyValue	:	"false",
		expectedResult	:	"false"
	},
	{
		testName		:	"VT286-0022/VT286-0050/VT286-0102 |  set autoTab to true and getproperty after setting | false",
		propertyName	:	"autoTab",
		propertyValue	:	"true",
		expectedResult	:	"true"
	},
	{
		testName		:	"VT286-0023/VT286-0051/VT286-0103 |  set autoTab to false and getproperty after setting | false",
		propertyName	:	"autoTab",
		propertyValue	:	"false",
		expectedResult	:	"false"
	}];

if(isWindowsMobilePlatform() && Rho.CardReader.moduleName == "dcr7000")
{
	card_setget_property.push(
	{
		testName		:	"VT286-0027/VT286-0055/VT286-0107 |  set pinEntry to true and getproperty after setting | false",
		propertyName	:	"pinEntry",
		propertyValue	:	"true",
		expectedResult	:	"true"
	},
	{
		testName		:	"VT286-0028/VT286-0056/VT286-0108 |  set pinEntry to false and getproperty after setting | false",
		propertyName	:	"pinEntry",
		propertyValue	:	"false",
		expectedResult	:	"false"
	},
	{
		testName		:	"VT286-0032/VT286-0060/VT286-0112 |  set pinTimeout to 60000 and getproperty after setting | false",
		propertyName	:	"pinTimeout",
		propertyValue	:	"60000",
		expectedResult	:	"60000"
	},
	{
		testName		:	"VT286-0043/VT286-0071/VT286-0123 |  set panData to 1234567891234567 and getproperty after setting | false",
		propertyName	:	"panData",
		propertyValue	:	"1234567891234567",
		expectedResult	:	"1234567891234567"
	}/*,
	{
		testName		:	"VT286-0019/VT286-0047/VT286-0099 |  set autoEnter to 0 and getproperty after setting | false",
		propertyName	:	"autoEnter",
		propertyValue	:	"0",
		expectedResult	:	"false"
	},
	{
		testName		:	"VT286-0020/VT286-0048/VT286-0100 |  set autoEnter to 1 and getproperty after setting | false",
		propertyName	:	"autoEnter",
		propertyValue	:	"1",
		expectedResult	:	"false"
	},
	{
		testName		:	"VT286-0021/VT286-0049/VT286-0101 |  set autoEnter to invalid and getproperty after setting | false",
		propertyName	:	"autoEnter",
		propertyValue	:	"invalid",
		expectedResult	:	"false"
	},*/
/*	{
		testName		:	"VT286-0024/VT286-0052/VT286-0104 |  set autoTab to 0 and getproperty after setting | false",
		propertyName	:	"autoTab",
		propertyValue	:	"0",
		expectedResult	:	"false"
	},
	{
		testName		:	"VT286-0025/VT286-0053/VT286-0105 |  set autoTab to 1 and getproperty after setting | false",
		propertyName	:	"autoTab",
		propertyValue	:	"1",
		expectedResult	:	"false"
	},
	{
		testName		:	"VT286-0026/VT286-0054/VT286-0106 |  set autoEnter to invalid and getproperty after setting | false",
		propertyName	:	"autoTab",
		propertyValue	:	"invalid",
		expectedResult	:	"false"
	},*/
/*	{
		testName		:	"VT286-0029/VT286-0057/VT286-0109 |  set pinEntry to 0 and getproperty after setting | false",
		propertyName	:	"pinEntry",
		propertyValue	:	"0",
		expectedResult	:	"false"
	},
	{
		testName		:	"VT286-0030/VT286-0058/VT286-0110 |  set pinEntry to 1 and getproperty after setting | false",
		propertyName	:	"pinEntry",
		propertyValue	:	"1",
		expectedResult	:	"false"
	},
	{
		testName		:	"VT286-0031/VT286-0059/VT286-0111 |  set pinEntry to invalid and getproperty after setting | false",
		propertyName	:	"pinEntry",
		propertyValue	:	"invalid",
		expectedResult	:	"false"
	},*/
	/*
	{
		testName		:	"VT286-0033/VT286-0061/VT286-0113 |  set pinTimeout to invalid and getproperty after setting | false",
		propertyName	:	"pinTimeout",
		propertyValue	:	"0",
		expectedResult	:	"0"
	},
	{
		testName		:	"VT286-0034/VT286-0062/VT286-0114 |  set pinTimeout to 0 and getproperty after setting | false",
		propertyName	:	"pinTimeout",
		propertyValue	:	"-30000",
		expectedResult	:	"30000"
	},*/
/*	{
		testName		:	"VT286-0035/VT286-0063/VT286-0115 |  set moduleName to msr9000 and getproperty after setting | false",
		propertyName	:	"moduleName",
		propertyValue	:	"msr9000",
		expectedResult	:	"msr9000"
	},
	{
		testName		:	"VT286-0036/VT286-0064/VT286-0116 |  set moduleName to msr9001 and getproperty after setting | false",
		propertyName	:	"moduleName",
		propertyValue	:	"msr9001",
		expectedResult	:	"msr9001"
	},
	{
		testName		:	"VT286-0037/VT286-0065/VT286-0117 |  set moduleName to msr9500 and getproperty after setting | false",
		propertyName	:	"moduleName",
		propertyValue	:	"msr9500",
		expectedResult	:	"msr9500"
	},
	{
		testName		:	"VT286-0038/VT286-0066/VT286-0118 |  set moduleName to msrcameo and getproperty after setting | false",
		propertyName	:	"moduleName",
		propertyValue	:	"msrcameo",
		expectedResult	:	"msrcameo"
	},
	{
		testName		:	"VT286-0039/VT286-0067/VT286-0119 |  set moduleName to msr7000 and getproperty after setting | false",
		propertyName	:	"moduleName",
		propertyValue	:	"msr7000",
		expectedResult	:	"msr7000"
	},
	{
		testName		:	"VT286-0040/VT286-0068/VT286-0120 |  set moduleName to dcr7000 and getproperty after setting | false",
		propertyName	:	"moduleName",
		propertyValue	:	"dcr7000",
		expectedResult	:	"dcr7000"
	},
	{
		testName		:	"VT286-0041/VT286-0069/VT286-0121 |  set moduleName to msr55 and getproperty after setting | false",
		propertyName	:	"moduleName",
		propertyValue	:	"msr55",
		expectedResult	:	"msr55"
	},
	{
		testName		:	"VT286-0042/VT286-0070/VT286-0122 |  set moduleName to msr3000 and getproperty after setting | false",
		propertyName	:	"moduleName",
		propertyValue	:	"msr3000",
		expectedResult	:	"msr3000"
	},*/
/*	{
		testName		:	"VT286-0044/VT286-0072/VT286-0124 |  set panData to 12345 and getproperty after setting | false",
		propertyName	:	"panData",
		propertyValue	:	"12345",
		expectedResult	:	"12345"
	}*/);
}

var card_setget_property_instance = [
	{
		testName		:	"VT286-0218/VT286-0226 |  set autoEnter to true and getproperty after setting | true",
		propertyName	:	"autoEnter",
		propertyValue	:	"true",
		expectedResult	:	"true"
	},
	{
		testName		:	"VT286-0219/VT286-0227 |  set autoEnter to false and getproperty after setting | false",
		propertyName	:	"autoEnter",
		propertyValue	:	"false",
		expectedResult	:	"false"
	},
	{
		testName		:	"VT286-0220/VT286-0228 |  set autoTab to true and getproperty after setting | false",
		propertyName	:	"autoTab",
		propertyValue	:	"true",
		expectedResult	:	"true"
	},
	{
		testName		:	"VT286-0221/VT286-0229 |  set autoTab to false and getproperty after setting | false",
		propertyName	:	"autoTab",
		propertyValue	:	"false",
		expectedResult	:	"false"
	}];

if(isWindowsMobilePlatform() && Rho.CardReader.moduleName == "dcr7000")
{
	card_setget_property_instance.push(
	{
		testName		:	"VT286-0222/VT286-0230 |  set pinEntry to true and getproperty after setting | false",
		propertyName	:	"pinEntry",
		propertyValue	:	"true",
		expectedResult	:	"true"
	},
	{
		testName		:	"VT286-0223/VT286-0231 |  set pinEntry to false and getproperty after setting | false",
		propertyName	:	"pinEntry",
		propertyValue	:	"false",
		expectedResult	:	"false"
	},
	{
		testName		:	"VT286-0224/VT286-0232 |  set pinTimeout to 60000 and getproperty after setting | false",
		propertyName	:	"pinTimeout",
		propertyValue	:	"60000",
		expectedResult	:	"60000"
	},
	{
		testName		:	"VT286-0225/VT286-0233 |  set panData to 1234567891234567 and getproperty after setting | false",
		propertyName	:	"panData",
		propertyValue	:	"1234567891234567",
		expectedResult	:	"1234567891234567"
	}
	);
}

