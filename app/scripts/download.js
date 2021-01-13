var request = require('request');
var fs = require('fs');
var os = require('os');
var gUserProfile = os.userInfo().username; 
var percentage = 0;
function downloadFile(file_url , targetPath){
    // Save variable to know progress
    var received_bytes = 0;
    var total_bytes = 0;

    var req = request({
        method: 'GET',
        uri: file_url
    });

    var out = fs.createWriteStream("C:/Users/" + gUserProfile + targetPath);
    req.pipe(out);

    req.on('response', function ( data ) {
        // Change the total bytes value to get progress later.
        total_bytes = parseInt(data.headers['content-length' ]);
    });

    req.on('data', function(chunk) {
        // Update the received bytes
        received_bytes += chunk.length;

        showProgress(received_bytes, total_bytes);
    });

    req.on('end', function() {
        alert("Mod has Finished Installing")
    });
}

function showProgress(received,total){
    percentage = received;
    var localpercentage = (received * 100) / total;
    console.log(localpercentage + "% | " + received + " bytes out of " + total + " bytes.");
}

module.exports = { precentage: percentage };