function filenameMp4() {
    return filenameWithExtension("mp4");
}

function filename3gpp() {
    return filenameWithExtension("3gpp");
}

function filenameWithExtension(aString) {
    return EB.RhoFile.join(EB.Application.userFolder, "captured." + aString);
}

function startCapturingMp4() {
    EB.AudioCapture.start({"fileName": filenameMp4()});
}

function startCapturing3gpp() {
    EB.AudioCapture.start({"fileName": filename3gpp()});
}

function stopCapturing() {
    EB.AudioCapture.stop();
}

function cancelCapturing() {
    EB.AudioCapture.cancel();
}

function playMp4() {
    EB.Mediaplayer.start(filenameMp4());
}

function play3gpp() {
    EB.Mediaplayer.start(filename3gpp());
}

function deleteMp4() {
    EB.RhoFile.deleteFile(filenameMp4());
}

function delete3gpp() {
    EB.RhoFile.deleteFile(filename3gpp());
}

function isMp4Exists() {
    return EB.RhoFile.exists(filenameMp4())
}

function is3gppExists() {
    return EB.RhoFile.exists(filename3gpp())
}


function startCapturingWithoutParameters() {
    try {
        EB.AudioCapture.start();
        return("An exception didn't occured")
    } catch (err) {
        return "An exception occured"
    }
}

function startCapturingWithoutFileName() {
    try {
        EB.AudioCapture.start({});
        return("An exception didn't occured")
    } catch (err) {
        return "An exception occured"
    }
}

function startCapturingToExistenceFileName() {
    try {
        EB.RhoFile()
        EB.AudioCapture.start({});
        return("An exception didn't occured")
    } catch (err) {
        return "An exception occured"
    }
}