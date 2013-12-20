function filenameMp4() {
    return filenameWithExtension("mp4");
}

function filename3gpp() {
    return filenameWithExtension("3gpp");
}

function filenameWithExtension(aString) {
    return Rho.RhoFile.join(Rho.Application.userFolder, "captured." + aString);
}

function startCapturingMp4() {
    Rho.AudioCapture.start({"fileName": filenameMp4()});
}

function startCapturing3gpp() {
    Rho.AudioCapture.start({"fileName": filename3gpp()});
}

function stopCapturing() {
    Rho.AudioCapture.stop();
}

function cancelCapturing() {
    Rho.AudioCapture.cancel();
}

function playMp4() {
    Rho.Mediaplayer.start(filenameMp4());
}

function play3gpp() {
    Rho.Mediaplayer.start(filename3gpp());
}

function deleteMp4() {
    Rho.RhoFile.deleteFile(filenameMp4());
}

function delete3gpp() {
    Rho.RhoFile.deleteFile(filename3gpp());
}

function isMp4Exists() {
    return Rho.RhoFile.exists(filenameMp4())
}

function is3gppExists() {
    return Rho.RhoFile.exists(filename3gpp())
}


function startCapturingWithoutParameters() {
    try {
        Rho.AudioCapture.start();
        return("An exception didn't occured")
    } catch (err) {
        return "An exception occured"
    }
}

function startCapturingWithoutFileName() {
    try {
        Rho.AudioCapture.start({});
        return("An exception didn't occured")
    } catch (err) {
        return "An exception occured"
    }
}

function startCapturingToExistenceFileName() {
    try {
        Rho.RhoFile()
        Rho.AudioCapture.start({});
        return("An exception didn't occured")
    } catch (err) {
        return "An exception occured"
    }
}