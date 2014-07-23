
#Windows RT Support#
This document describes RhoElements support of Windows RT as a target platform.  

##Overview:##
Windows RT is a new generation of Windows operating system. It has a narrower API set than modern Windows 8.x for desktops and partially even Windows Phone 8.x, so some features of RhoElements need to be reimplemented using new “RT”-style APIs.

###Requirement description:###
Rho application support in WinRT devices, Build for WP8 should work in both WP8 and WinRT devices.  

####Rake commands support:####
- `rake build:wp8:rhobundle_noext` : *Support to build windowsRT rhobundle*
- `rake clean:wp8` : *Support to clean windowsRT project*
- `rake device:wp8:production` : *Support to build a .xap file to install on the windowsRT device*
- `rake emulator:wp8:production` : *Support to build a .xap file to install on the windowsRT device*
- `rake run:wp8` : *Support to build and install .xap file with emulator*
- `rake run:wp8:device` : *Support to build and install .xap file with windowsRT device*
- `rake run:wp8:rhosimulator` : *Support to run the application with rhosimulator*

####API support:####
- Application : `Rho.Application`
- Database : `Rho.Database`
- Log : `Rho.Log`
- NativeTabBar : `Rho.NativeTabbar`
- NativeToolBar : `Rho.NativeToolbar`
- Network : `Rho.Network`
- ORM and ORMModel : `Rho.ORM`
- RhoConnectClient : `Rho.RhoConnectClient`
- RhoFile : `Rho.RhoFile`
- System : `Rho.System`
- WebView  : `Rho.WebView`

####Application support:####
Initially only pure JavaScript applications will be supported on Windows RT.  
Later on we may support Ruby applications as well