function callNavbarcreate()
{
	EB.Navbar.create({ 'left':{'action':'/app/index.html','label':'Back'},'title':'Navbar Test'})
}

function callNavbarcreateright()
{
	EB.Navbar.create({ 'left':{'action':'/app/index.html', 'label':'Back'}, 'right':{'action':'/app/System/system.html', 'label':'System'},'title':'Navbar Test'})
}

function callNavbarcreatewithoutleft()
{
	EB.Navbar.create({ 'right':{'action':'/app/System/system.html', 'label':'System'},'title':'Navbar Test'})
}

function callNavbarremove()
{
	EB.Navbar.remove()
}

function callNavbarcreatewithouttitle()
{
	EB.Navbar.create({ 'left':{'action':'/app/index.html', 'label':'Back'},'title':''})
}

function callNavbarcreatewithoutlabel()
{
	EB.Navbar.create({ 'left':{'action':'/app/index.html','label':''},'title':'Navbar Test'})
}

function callNavbarcreateinvalidaction()
{
	EB.Navbar.create({ 'left':{'action':'asd##', 'label':'Back'},'title':'Navbar Test'})
}

function callNavbarcreatenoaction()
{
	EB.Navbar.create({ 'left':{'action':'','label':'Back'},'title':'Navbar Test'})
}


function callNavbarstarted()
{
	data = EB.Navbar.started();
	$("#Rho_Navbar_started span.result").text(JSON.stringify(data));
}