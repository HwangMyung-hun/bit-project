var CLOUDRAIL_CLIENT_ID = 'XYJi87zZH1uj38g26ZQ32Q',
    ONEDRIVE_CLIENT_ID = '000000004C155431';

var main = function() {
	 
    var CRC = CloudRailClient,
        CRI = CRC.CloudRailInterface,
        ONEDRIVE_SERVICE_TAG = 'OneDrive',
        ONEDRIVE_SERVICE_CLIENT = new CRC.ClientIdentity(ONEDRIVE_SERVICE_TAG,
            {"client_id": ONEDRIVE_CLIENT_ID}),
        content = document.getElementById("content"),
        onedrive_user_identity,
        rootFile;
    /* Initiate CloudRail */
    CRC.setClientID(CLOUDRAIL_CLIENT_ID);
 
    // Initiate the CloudRail Service's
    CRI.initService(ONEDRIVE_SERVICE_TAG); // Dropbox
 
    /* Add Authorization Button */
    var authorizationButton = document.createElement("button");
 
    content.appendChild(authorizationButton);
 
    authorizationButton.setAttribute("value", "Sign In");
    authorizationButton.setAttribute("type", "button");
    authorizationButton.setAttribute("name", "signin");
    authorizationButton.appendChild(document.createTextNode("Sign In"));
 
    authorizationButton.addEventListener("click", function() {
 
        /* Start Authorization */
    	onedrive_user_identity = new CRC.UserIdentity(ONEDRIVE_SERVICE_TAG, {});
 
    	onedrive_user_identity.read(ONEDRIVE_SERVICE_CLIENT, saveUserIdentity);
    });
};
 
window.addEventListener("load", main);

function saveUserIdentity(resp) {
	 
    if(resp.getStatus() == 200) {
 
    	onedrive_user_identity = resp.getResults()[0];
        authorizationButton.setAttribute("style", "display:none;");
 
        /* Show Root Directory */
        rootFile = new CRC.File(ONEDRIVE_SERVICE_TAG, {});
        rootFile.read(onedrive_user_identity, function(resp) {
 
            if(resp.getStatus() == 200) {
 
                rootFile = resp.getResults()[0];
                readChildren();
            } else {
                alert("Reading root directory failed!");
            }
        });
 
    } else {
        alert("Authorization not successful!");
    }
}

function readChildren() {
	 
    var i = 0,
    count = rootFile.aniChilds.length,
    done = 0;
 
    for(; i < count; i++) {
 
        (function(i) {
 
            rootFile.aniChilds[i].read(onedrive_user_identity, function(resp) {
 
                ++done;
                rootFile.aniChilds[i] = resp.getResults()[0];
 
                if(done == count) {
                    showRootDirectory();
                }
            });
        })(i);
    }
}