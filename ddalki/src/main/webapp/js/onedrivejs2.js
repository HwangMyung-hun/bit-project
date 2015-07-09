var onedrive_id = "000000004C155431";
var onedrive_scope = "wl.signin wl.offline_access onedrive.readwrite";
var onedrive_redirect = "http://cloud.ddalki.com:9999/ddalki/ddalki-main/callback.html";
var onedrive_secret = "cdau0UrKN3cW3hnBpJ-kD9uPp9dC5Fsv";

function onedrivelogout() {
	location.href='https://login.live.com/oauth20_logout.srf?client_id=' + onedrive_id + '&redirect_uri=' + onedrive_redirect + '';
}
function getAppInfo() {
	var scriptTag = document.getElementById("odauth");
	if (!scriptTag) {
		alert("the script tag for odauth.js should have its id set to 'odauth'");
	}

	var clientId = scriptTag.getAttribute("clientId");
	if (!clientId) {
		alert("the odauth script tag needs a clientId attribute set to your application id");
	}

	var scopes = scriptTag.getAttribute("scopes");
	if (!scopes) {
		alert("the odauth script tag needs a scopes attribute set to the scopes your app needs");
	}

	var redirectUri = scriptTag.getAttribute("redirectUri");
	if (!redirectUri) {
		alert("the odauth script tag needs a redirectUri attribute set to your redirect landing url");
	}

	var appInfo = {
			"clientId": clientId,
			"scopes": scopes,
			"redirectUri": redirectUri
	};

	return appInfo;
}

$('#onedrivelogin').click(function(event){
	var appInfo = getAppInfo();
	  var url =
	    "https://login.live.com/oauth20_authorize.srf" +
	    "?client_id=" + onedrive_id +
	    "&scope=" + onedrive_scope +
	    "&response_type=token" +
	    "&redirect_uri=" + onedrive_redirect;
	  popup2(url);
	/*location.href='https://login.live.com/oauth20_authorize.srf?client_id=' + onedrive_id + '&scope=' + onedrive_scope + '&response_type=code&redirect_uri=' + onedrive_redirect + '';*/
});
function popup2(url) {
	  var width = 525,
	      height = 525,
	      screenX = window.screenX,
	      screenY = window.screenY,
	      outerWidth = window.outerWidth,
	      outerHeight = window.outerHeight;

	  var left = screenX + Math.max(outerWidth - width, 0) / 2;
	  var top = screenY + Math.max(outerHeight - height, 0) / 2;

	  var features = [
	              "width=" + width,
	              "height=" + height,
	              "top=" + top,
	              "left=" + left,
	              "status=no",
	              "resizable=yes",
	              "toolbar=no",
	              "menubar=no",
	              "scrollbars=yes"];
	  var popup = window.open(url, "oauth", features.join(","));
	  if (!popup) {
	    alert("failed to pop up auth window");
	  }
	  popup.focus();
}

function setCookie(token, expiresInSeconds) {
	  var expiration = new Date();
	  expiration.setTime(expiration.getTime() + expiresInSeconds * 1000);
	  var cookie = "odauth=" + token +"; path=/; expires=" + expiration.toUTCString();
	  
	  console.log(token);
	  if (document.location.protocol.toLowerCase() == "https") {
	    cookie = cookie + ";secure";
	  }
	  document.cookie = cookie;
	}

var odtoken;

function onAuthCallback() {
	  var authInfo = getAuthInfoFromUrl();
	  odtoken = authInfo["access_token"];
	  var expiry = parseInt(authInfo["expires_in"]);
	  setCookie(odtoken, expiry);
	  window.opener.onAuthenticated(odtoken, window);
	}

function getAuthInfoFromUrl() {
	  if (window.location.hash) {
	    var authResponse = window.location.hash.substring(1);
	    var authInfo = JSON.parse(
	      '{"' + authResponse.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
	      function(key, value) { return key === "" ? value : decodeURIComponent(value); });
	    return authInfo;
	  }
	  else {
	    alert("failed to receive auth token");
	  }
	}

function onAuthenticated(odtoken, authWindow) {
	if (odtoken) {
		if (authWindow) {
			authWindow.close();
		}
		(function($){
			// we extract the onedrive path from the url fragment and we
			// flank it with colons to use the api's path-based addressing scheme
			var path = "";
			var beforePath = "";
			var afterPath = "";
			console.log('okok');
			if (window.location.hash) {
				console.log(wondow.location.hash);
				path = window.location.hash.substr(1);
				beforePath =":";
				afterPath = ":";
			}
			var odurl = "https://api.onedrive.com/v1.0/drive/root" + beforePath + path + afterPath;
			// the expand and select parameters mean:
			//  "for the item i'm addressing, include its thumbnails and children,
			//   and for each of the children, include its thumbnails. for those
			//   thumbnails, return the 'large' and 'c200x150_Crop' sizes"
			// we also attach the access token as a query parameter to every request.
			// we could also pass it in through the 'Authorization: bearer' header,
			// but that would result in an extra CORS preflight request for every
			// unique path.
			var odquery = "?expand=thumbnails,children(expand=thumbnails(select=large,c200x150_Crop))&access_token=" + odtoken;
			console.log(odtoken);
			$.ajax({
				url: odurl + odquery,
				dataType: 'json',
				success: function(data) {
					$("#tbody > tr").remove();
					for (i = 0 ; i < data.children.length ; i++) {
						if (data.children[i].folder) {
							$("#onedrivelist").append("<li> <a id='" + "onedrive" + i + "'>"+ data.children[i].name 
									+"<span class='fa arrow'></span></a><ul class='nav nav-level'></ul></li>");
						}
						if (data.children[i].file) {
							$("#tbody").append("<tr><td><input id='" + "odcheck" + i + "' type='checkbox'></td>"
                                    + "<td>"+ data.children[i].name +"</td>"
                                    + "<td></td>"
                                    + "<td>"+ data.children[i].lastModifiedDateTime +"</td>"
                                    + "<td class='center'>"+ data.children[i].size + "byte" +"</td>"
                                    + "<td class='center'>"+ data.children[i].name +"</td></tr>");
						}
					}
					console.log(data);
					if (data.children[0].file){
						console.log('okok');
					}
				}
			});
			/*$.ajax({
				url: odurl + odquery,
				dataType: 'json',
				success: function(data) {
					if (data) {
						// clear out the old content
						$('#od-items').empty();
						$('#od-json').empty();
						// add the syntax-highlighted json response
						$("<pre>").html(syntaxHighlight(data)).appendTo("#od-json");
						// process the response data. if we get back children (data.children)
						// then render the tile view. otherwise, render the "one-up" view
						// for the item's individual data. we also look for children in
						// 'data.value' because if this app is ever configured to reqeust
						// '/children' directly instead of '/parent?expand=children', then
						// they'll be in an array called 'data'
						var decodedPath = decodeURIComponent(path);
						document.title = "1drv " + decodedPath;
						updateBreadcrumb(decodedPath);
						var children = data.children || data.value;
						if (children && children.length > 0) {
							$.each(children, function(i,item) {
								var tile = $("<div>").
								attr("href", "#" + path + "/" + encodeURIComponent(item.name)).
								addClass("item").
								click(function() {
									// when the page changes in response to a user click,
									// we set loadedForHash to the new value and call
									// odauth ourselves in user-click mode. this causes
									// the catch-all hashchange event handler not to
									// process the page again. see comment at the top.
									loadedForHash = $(this).attr('href');
									window.location = loadedForHash;
									odauth(true);
								}).
								appendTo("#od-items");
								// look for various facets on the items and style them accordingly
								if (item.folder) {
									tile.addClass("folder");
								}
								if (item.thumbnails && item.thumbnails.length > 0) {
									$("<img>").
									attr("src", item.thumbnails[0].c200x150_Crop.url).
									appendTo(tile);
								}
								$("<div>").
								addClass("nameplate").
								text(item.name).
								appendTo(tile);
							});
						}
						else {
							// 1-up view
							var tile = $("<div>").
							addClass("item").
							addClass("oneup").
							appendTo("#od-items");
							var downloadUrl = data['@content.downloadUrl'];
							if (downloadUrl) {
								tile.click(function(){window.location = downloadUrl;});
							}
							if (data.folder) {
								tile.addClass("folder");
							}
							if (data.thumbnails && data.thumbnails.length > 0) {
								$("<img>").
								attr("src", data.thumbnails[0].large.url).
								appendTo(tile);
							}
						}
					} else {
						$('#od-items').empty();
						$('<p>error.</p>').appendTo('#od-items');
						$('#od-json').empty();
					}
				}
			});*/
		})(jQuery);
	}
	else {
		alert("Error signing in");
	}
}

$('#onedriveactive').click(function() {	
	console.log(document.cookie.odtoken);
});
