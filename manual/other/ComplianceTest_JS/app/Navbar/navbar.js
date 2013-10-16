function callNavbarcreate()
{
	Rho.Navbar.create({ 'left':{'action':'/app/index.html','label':'Back'},'title':'Navbar Test'})
}

function callNavbarcreateright()
{
	Rho.Navbar.create({ 'left':{'action':'/app/index.html', 'label':'Back'}, 'right':{'action':'/app/System/system.html', 'label':'System'},'title':'Navbar Test'})
}

function callNavbarcreatewithoutleft()
{
	Rho.Navbar.create({ 'right':{'action':'/app/System/system.html', 'label':'System'},'title':'Navbar Test'})
}

function callNavbarremove()
{
	Rho.Navbar.remove()
}

function callNavbarcreatewithouttitle()
{
	Rho.Navbar.create({ 'left':{'action':'/app/index.html', 'label':'Back'},'title':''})
}

function callNavbarcreatewithoutlabel()
{
	Rho.Navbar.create({ 'left':{'action':'/app/index.html','label':''},'title':'Navbar Test'})
}

function callNavbarcreateinvalidaction()
{
	Rho.Navbar.create({ 'left':{'action':'asd##', 'label':'Back'},'title':'Navbar Test'})
}

function callNavbarcreatenoaction()
{
	Rho.Navbar.create({ 'left':{'action':'','label':'Back'},'title':'Navbar Test'})
}


function callNavbarstarted()
{
	data = Rho.Navbar.started();
	$("#Rho_Navbar_started span.result").text(JSON.stringify(data));
}