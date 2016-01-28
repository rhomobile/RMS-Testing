(function () {
    // sessionStorage with image
    var storageFiles = JSON.parse(sessionStorage.getItem("storageFiles")) || {},
        elephant = document.getElementById("elephant"),
        storageFilesDate = storageFiles.date,
        date = new Date(),
        todaysDate = (date.getMonth() + 1).toString() + date.getDate().toString();

    // Compare date and create sessionStorage if it's not existing/too old   
    if (typeof storageFilesDate === "undefined" || storageFilesDate < todaysDate) {
        // Take action when the image has loaded
        elephant.addEventListener("load", function () {
            var imgCanvas = document.createElement("canvas"),
                imgContext = imgCanvas.getContext("2d");

            // Make sure canvas is as big as the picture
            imgCanvas.width = elephant.width;
            imgCanvas.height = elephant.height;

            // Draw image into canvas element
            imgContext.drawImage(elephant, 0, 0, elephant.width, elephant.height);

            // Save image as a data URL
            storageFiles.elephant = imgCanvas.toDataURL("image/png");

            // Set date for sessionStorage
            storageFiles.date = todaysDate;

            // Save as JSON in sessionStorage
            try {
                sessionStorage.setItem("storageFiles", JSON.stringify(storageFiles));
            }
            catch (e) {
                    console.log("Storage failed: " + e);                
            }
        }, false);

        // Set initial image src    
        elephant.setAttribute("src", "elephant.png");
    }
    else {
        // Use image from sessionStorage
        elephant.setAttribute("src", storageFiles.elephant);
    }

    // Getting a file through XMLHttpRequest as an arraybuffer and creating a Blob
    var rhinoStorage = sessionStorage.getItem("rhino"),
        rhino = document.getElementById("rhino");
    if (rhinoStorage) {
        // Reuse existing Data URL from sessionStorage
        rhino.setAttribute("src", rhinoStorage);
    }
    else {
        // Create XHR, BlobBuilder and FileReader objects
        var xhr = new XMLHttpRequest(),
            blobBuilder = new (window.BlobBuilder || window.MozBlobBuilder || window.WebKitBlobBuilder || window.OBlobBuilder || window.msBlobBuilder),
            blob,
            fileReader = new FileReader();

        xhr.open("GET", "rhino.png", true);
        // Set the responseType to arraybuffer. "blob" is an option too, rendering BlobBuilder unnecessary, but the support for "blob" is not widespread enough yet
        xhr.responseType = "arraybuffer";

        xhr.addEventListener("load", function () {
            if (xhr.status === 200) {
                // Append the response to the BlobBuilder
                blobBuilder.append(xhr.response);
                // Create a blob with the desired MIME type
                blob = blobBuilder.getBlob("image/png");

                // onload needed since Google Chrome doesn't support addEventListener for FileReader
                fileReader.onload = function (evt) {
                    // Read out file contents as a Data URL
                    var result = evt.target.result;
                    // Set image src to Data URL
                    rhino.setAttribute("src", result);
                    // Store Data URL in sessionStorage
                    try {
                        sessionStorage.setItem("rhino", result);
                    }
                    catch (e) {
                        console.log("Storage failed: " + e);
                    }
                };
                // Load blob as Data URL
                fileReader.readAsDataURL(blob);
            }
        }, false);
        // Send XHR
        xhr.send();
    }
})();
