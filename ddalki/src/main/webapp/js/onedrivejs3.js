var onedrive_id = "000000004C155431";
var onedrive_scope = "wl.signin wl.offline_access onedrive.readwrite";
var onedrive_redirect = "http://cloud.ddalki.com:9999/ddalki/ddalki-main/main.html";
var onedrive_secret = "cdau0UrKN3cW3hnBpJ-kD9uPp9dC5Fsv";
var odtoken;
var folderid;

function onedrivelogout() {
	location.href='https://login.live.com/oauth20_logout.srf?client_id=' + onedrive_id + '&redirect_uri=' + onedrive_redirect + '';
}

$('#onedrivelogin').click(function(event){
	location.href =
	    "https://login.live.com/oauth20_authorize.srf" +
	    "?client_id=" + onedrive_id +
	    "&scope=" + onedrive_scope +
	    "&response_type=token" +
	    "&redirect_uri=" + onedrive_redirect;
	/*location.href='https://login.live.com/oauth20_authorize.srf?client_id=' + onedrive_id + '&scope=' + onedrive_scope + '&response_type=code&redirect_uri=' + onedrive_redirect + '';*/
});

/*function onAuthCallback() {
	  var authInfo = getAuthInfoFromUrl();
	  var odtoken = authInfo["access_token"];
	  var expiry = parseInt(authInfo["expires_in"]);
	  setCookie(odtoken, expiry);
	  window.opener.onAuthenticated(odtoken, window);
	}*/

window.onload = function(){
	var authInfo = getAuthInfoFromUrl();
	odtoken = authInfo["access_token"];
	var expiry = parseInt(authInfo["expires_in"]);
	setCookie(odtoken, expiry);
	onAuthenticated(odtoken, window);
};

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
			var path = "";
			var beforePath = "";
			var afterPath = "";
			console.log('okok');
			if (window.location.hash) {
				console.log(window.location.hash);
				path = window.location.hash.substr(1);
				beforePath =":";
				afterPath = ":";
			}
			var odurl = "https://api.onedrive.com/v1.0/drive/root" + beforePath + path + afterPath;
			var odquery = "?expand=thumbnails,children(expand=thumbnails(select=large,c200x150_Crop))&access_token=" + odtoken;
			console.log(odtoken);
			$.ajax({
				url: "https://api.onedrive.com/v1.0/drive?access_token=" + odtoken,
				success: function(data) {
					folderid = data.id;
					console.log(folderid);
				},
				error: function(err){
					console.log(err);
				}
			});
			
			/*$.ajax({
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
				},
				error: function(err){
					console.log(err);
				}
			});*/
		})(jQuery);
	}
	else {
		alert("Error signing in");
	}
}

$('#onedrivefolder').click(function() {	
	$("#onedrivelist > li").remove();
	console.log(folderid);
	$.ajax({
		url: "https://api.onedrive.com/v1.0/drive/root/children?access_token=" + odtoken,
		success: function(data) {
			console.log(data.value);
			for (j = 0; j < data.value.length ; j++) {
				if (data.value[j].folder) {
					$("#onedrivelist").append("<li> <a id='" + "onedrive" + j + "'>"+ data.value[j].name 
							+"<span class='fa arrow'></span></a><ul class='nav nav-level'></ul></li>");
				} else {
					$("#tbody").append("<tr><td><input id='" + "odcheck" + j + "' type='checkbox'></td>"
							+ "<td>"+ data.value[j].name +"</td>"
							+ "<td></td>"
							+ "<td>"+ data.value[j].lastModifiedDateTime +"</td>"
							+ "<td class='center'>"+ data.value[j].size + "byte" +"</td>"
							+ "<td class='center'>"+ data.value[j].name +"</td></tr>");
				}
				 (function(m) {
				$('#onedrive' + m).click(function() {
					console.log(data.value[m].id);
					$("#tbody > tr").remove();
					
					var thumnail;
					$.ajax({
						url: "https://api.onedrive.com/v1.0/drive/items/" + data.value[m].id + "/thumbnails?access_token=" + odtoken,
						success: function(data3) {
							console.log(data3.value[m].small.url);	
							thumnail = data3.value[m].small.url;
						},
						error: function(err3){
							console.log(err3);
						}
					});
					$.ajax({
						url: "https://api.onedrive.com/v1.0/drive/items/" + data.value[m].id + "/children?access_token=" + odtoken,
						success: function(data2) {
							console.log(data2);
							for (k = 0; k < data2.value.length ; k++){
								console.log(thumnail);
								$("#tbody").append("<tr><td><input id='" + "odcheck" + k + "' type='checkbox'></td>"
										+ "<td>"+ data2.value[k].name +"<img src='" + thumnail + "' width='30px'></td>"
										+ "<td></td>"
										+ "<td>"+ data2.value[k].lastModifiedDateTime +"</td>"
										+ "<td class='center'>"+ data2.value[k].size + "byte" +"</td>"
										+ "<td class='center'>"+ data2.value[k].name +"</td></tr>");
							}
						},
						error: function(err2){
							console.log(err2);
						}
					});
					
				});
				 })(j);
			}
		},
		error: function(err){
			console.log(err);
		}
	});
});
