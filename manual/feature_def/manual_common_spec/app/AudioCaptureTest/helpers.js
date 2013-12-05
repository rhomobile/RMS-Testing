function filenameMp4() {
    return filenameWithExtension("mp4");
}

function filename3gpp() {
    return filenameWithExtension("3gpp");
}

function filenameWithExtension(aString) {
    return Rho.RhoFile.join(Rho.Application.userFolder, "captured." + aString);
}

