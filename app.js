(function() {
    var BUILD_FLAG_STRING = "** BUILD FAILED **";

    var ERROR_MSG = "The following build commands failed:";


    function nl2br(str, is_xhtml) {
        var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
        return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
    }

    function handleUpload(evt) {
        var f = evt.target.files[0];
        readFile(f);
    }


    function readFile(f) {
        var reader = new FileReader();

        reader.onload = (function(theFile) {
            return function(e) {
                var res = e.target.result;
                parseBuildLog(res);
            }
            ;
        })(f);

        reader.readAsText(f);
    }

    function handleFileSelect(evt) {
        evt.stopPropagation();
        evt.preventDefault();

        readFile(evt.dataTransfer.files[0]);
    }

    function handleDragOver(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'copy';
    }

    document.addEventListener("DOMContentLoaded", function() {
        document.getElementById('files').addEventListener('change', handleUpload, false);
        var dropZone = document.getElementById('drop_zone');
        dropZone.addEventListener('dragover', handleDragOver, false);
        dropZone.addEventListener('drop', handleFileSelect, false);
        $("showfull").addEventListener("click", function(e) {
            $("fulllog").style.display = "block";
        }, false);
    });




    var $ = function(id) {
        id = id.replace("#", "");
        return document.getElementById(id);
    };

    function parseBuildLog(contents) {
        var extra = null ;

        var logErrorMsg = null ;
        var startPos = contents.indexOf(BUILD_FLAG_STRING);
        logErrorStart = contents.indexOf(ERROR_MSG);
        var message = contents.substring(startPos);
        if (startPos === -1) {
            $("#buildfailed").innerHTML = "<h1>Build Succeeded</h1>";

        } else {
            logErrorMsg = contents.substring(logErrorStart, contents.indexOf("failure)") + 8);

            for (var i = 0; i < errorMessages.length; i++) {
                var currError = errorMessages[i];
                if (contents.indexOf(currError.pattern) >= 0) {
                    start = contents.indexOf(currError.pattern);
                    message = contents.substring(start, logErrorStart);
                    extra = currError.message;
                }
            }

            $("#command").innerHTML = nl2br(logErrorMsg);
            $("#message").innerHTML = nl2br(message);
            $("#tips").innerHTML = nl2br(extra);
            $("#fulllog").innerHTML = nl2br(contents);
        }
        $("#buildfailed").style.display = "block";
    }
})();