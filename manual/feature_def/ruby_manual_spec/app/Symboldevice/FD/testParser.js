var stack = [{'name': 'Global', tests: []}];
var current;

function describe(title, func, devices) {
	if(undefined != current) {
		stack.push(current);
	}
	current = {'title': title, tests: [], 'devices': devices};
	func();
	
	old = stack.pop();
	old.tests.push(current);
	current = old;
}

function it(title, func, devices) {
	//current.tests.push({'title': title, 'devices': devices, 'enabled': true});
}

function itFD(title, func, devices) {
	current.tests.push({'title': title, 'devices': devices, 'enabled': true});
}

function xit(title, func, devices) {
	//current.tests.push({'title': title, 'devices': devices, 'enabled': false});
}

function xitFD(title, func, devices) {
	current.tests.push({'title': title, 'devices': devices, 'enabled': false});
}

function output(testObject, parentUl)
{
	if(testObject.title != undefined) {
		var li = document.createElement('li');
		li.textContent = testObject.title;
		if(testObject.devices != null){
			li.textContent = li.textContent + " - ( Supported platforms : " + JSON.stringify(testObject.devices) + ")";
		} 
		parentUl.appendChild(li);
	}
	if(testObject.tests != undefined) {
		var ul = document.createElement('ul');
		testObject.tests.forEach(function(describeTest) {
			output(describeTest, ul);
		});
		if(parentUl != undefined) {
			parentUl.appendChild(ul);
		}
		else {
			document.body.appendChild(ul);
		}
	}
}

function loadEvent() {
	output(current, undefined);
}
window.addEventListener('load', loadEvent);
