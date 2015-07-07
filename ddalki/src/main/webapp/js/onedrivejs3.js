var onedrive_id = "000000004C155431";
var onedrive_scope = "wl.signin wl.offline_access onedrive.readwrite onedrive.appfolder";
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
		})(jQuery);
	}
	else {
		alert("Error signing in");
	}
}
var level = ['first','second','third','fourth','fifth','sixth','seventh','eighth','ninth','tenth'];
var ODlist = null;
$('#onedrivefolder').click(function() {
	$("#onedrivelist > li").remove();
	$("#tbody > tr").remove();
	$.ajax({
		url: "https://api.onedrive.com/v1.0/drive/root/children?access_token=" + odtoken,
		success: function(data) {
			for (j = 0; j < data.value.length ; j++) {
				if (data.value[j].folder) {
					ODlist = data.value;
					$("#onedrivelist").append("<li> <a id='" + data.value[j].id 
							+ "' onclick='innerfile(this.id)'>"+ data.value[j].name 
							+"<span class='fa arrow'></span></a><ul class='nav nav-"
							+ level[2] + "-level' id='" + level[2] + j + "'></ul></li>");
					innerfolder(data.value[j].id, 3);
				} 
				if (data.value[j].file){
					$("#tbody").append("<tr><td><input id='" + data.value[j].id + "' type='checkbox'></td>"
							+ "<td>"+ data.value[j].name +"</td>"
							+ "<td></td>"
							+ "<td>"+ data.value[j].lastModifiedDateTime +"</td>"
							+ "<td class='center'>"+ data.value[j].size + "byte" +"</td>"
							+ "<td class='center'>"+ data.value[j].name +"</td></tr>");
				}
			}
		}
	});
});
function innerfolder(folderid , levelnum) {
	$.ajax({
		url: "https://api.onedrive.com/v1.0/drive/items/" + folderid + "/children?access_token=" + odtoken,
		success: function(data) {	
			for (i = 0 ; i < data.value.length ; i++) {
				if (data.value[i].folder) {
					$("#"+ level[levelnum - 1] + i).append("<li> <a id='" + data.value[i].id 
						+ "' onclick='innerfile(this.id)'>"+ data.value[i].name 
						+"<span class='fa arrow'></span></a><ul class='nav nav-"
						+ level[levelnum] + "-level' id='"+ level[levelnum] + i + "'></ul></li>");
					innerfolder(data.value[i].id, levelnum+1);
				}
			}
		}
	});
}
var odfolder;
function innerfile(folderid) {
	odfolder = folderid;
	$("#tbody > tr").remove();
	$.ajax({
		url: "https://api.onedrive.com/v1.0/drive/items/" + folderid + "/children?access_token=" + odtoken,
		success: function(data) {	
			for (i = 0 ; i < data.value.length ; i++) {
				if (data.value[i].file) {
					$("#tbody").append("<tr><td><input id='" + data.value[i].id + "' type='checkbox'></td>"
							+ "<td>"+ data.value[i].name +"</td>"
							+ "<td></td>"
							+ "<td>"+ data.value[i].lastModifiedDateTime +"</td>"
							+ "<td class='center'>"+ data.value[i].size + "byte" +"</td>"
							+ "<td class='center'>"+ data.value[i].name +"</td></tr>");
				}
			}
		}
	});
	$("#newfolderbtn").click(function() {
		var createfolder = {
            	'name' : "newfolder",
            	"folder": { }
		    }
		var inputData = JSON.stringify(createfolder);
		$.ajax({
			url: "https://api.onedrive.com/v1.0/drive/root/children?nameConflict=fail",
			method: "POST",
			datatype : "json",
		    contentType: "application/json",
			beforeSend : function(xhr) {
		      xhr.setRequestHeader("Authorization", 'Bearer ' + odtoken);
		    },
            data: inputData,
			success: function(data) {
				console.log(data);
			},
			error: function(error){
				console.log(error);
			}
		});
	});
}
function ODupload(event) {
	var upfolder = odfolder;
	var odfile = event.target.files[0];
	var reader = new FileReader();
	reader.readAsBinaryString(odfile);
	/*var xmlReq =  new  XMLHttpRequest (); 
	  xmlReq.open( 'PUT' ,  "https://api.onedrive.com/v1.0/drive/" + upfolder + ":/" + odfile.name + ":/content");
	  xmlReq.setRequestHeader( 'Authorization' ,  'Bearer ' + odtoken);
	  xmlReq.onreadystatechange = function() {
	     dlrjanjdi++;
	     if (dlrjanjdi == 2) {
	    	 alert("업로드완료.");
	     }
	  }
	  xmlReq.send();*/
	$.ajax({
		url: "https://api.onedrive.com/v1.0/drive/items/" + upfolder + "/children/" + odfile.name + "/content",
		method: "PUT",
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Content-Type", 'test/plain');
			xhr.setRequestHeader("Authorization", 'Bearer ' + odtoken);
		},
		data: reader.result,
		success: function(data) {
			console.log(data);
		}
	});
	
	/*var upfolder = odfolder;
	var odfile = event.target.files[0];
	var reader = new FileReader();
	reader.readAsBinaryString(odfile);
	console.log(reader);
	var uploadfile = {
		"name": odfile.name,
		"file": {},
		"@content.sourceUrl": "cid:content",
		"@name.conflictBehavior": "rename"
	}
	var uploadfile2 = JSON.stringify(uploadfile);
	$.ajax({
		url: "https://api.onedrive.com/v1.0/drive/items/" + upfolder + "/children",
		method: "POST",
		contentType: 'multipart/related; boundary="A100x"', 
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Authorization", 'Bearer ' + odtoken);
		},
		data: "--A100x\r\n" +
		"Content-ID: <metadata>\r\n" +
		"Content-Type: application/json\r\n\r\n" +
		uploadfile2 + "\r\n\r\n" +
		"--A100x\r\n" +
		"Content-ID: <content>\r\n" +
		"Content-Type: application/octet-stream\r\n\r\n" +
		odfile +
		"\r\n\r\n--A100x--\r\n" ,
		success: function(data) {
			console.log(data);
		}
	});*/
}
$("#downloadbtn").click(function(event) {
	var ODfilelist = $("#tbody input");
	for (i = 0; i< ODfilelist.length ; i++) {
		if($("input:checkbox[id='" + ODfilelist[i].id + "']").is(":checked")) {
			location.href = "https://api.onedrive.com/v1.0/drive/items/" + ODfilelist[i].id + "/content?access_token=" + odtoken
			/*$.ajax({
				url: "https://api.onedrive.com/v1.0/drive/items/" + ODfilelist[i].id + "/content?access_token=" + odtoken,
				success: function(data) {	
					alert(data);
				}
			});*/
		}
	}
});
var dlrjanjdi = 0;
$('#deletebtn').click(function() {
	var ODfilelist = $("#tbody input");
	for (i = 0; i< ODfilelist.length ; i++) {
		if($("input:checkbox[id='" + ODfilelist[i].id + "']").is(":checked")) {
			var xmlReq =  new  XMLHttpRequest (); 
			  xmlReq.open( 'DELETE' ,  "https://api.onedrive.com/v1.0/drive/items/" + ODfilelist[i].id + "?access_token=" + odtoken );
			  xmlReq.setRequestHeader( 'Authorization' ,  'Bearer');
			  xmlReq.onreadystatechange = function() {
			     dlrjanjdi++;
			     if (dlrjanjdi == 2) {
			    	 alert("삭제하였습니다.");
			     }
			  }
			  xmlReq.send();
		}
	}
});
$("#uploadbutton").click(function(){
	 var form = $('#frm')[0];
	 var formData = new FormData(form);
      	 $.ajax({
      	    url: "https://api.onedrive.com/v1.0/drive/items/root/children",
      	    processData: false,
	    	contentType: false,
	    	headers: {
	    		access_token: odtoken
	    	},
      	    data: formData,
      	    type: 'POST',
      	    success: function(result){
      	    	alert("업로드 성공!!");
      	    },
      	    error: function(result) {
      	    	console.log(result);
      	    }
      	 });
});

/*$.ajax({
		url: "https://api.onedrive.com/v1.0/drive/root/children?access_token=" + odtoken,
		success: function(data) {
			for (j = 0; j < data.value.length ; j++) {
				if (data.value[j].folder) {
					ODlist = data.value;
					$("#onedrivelist").append("<li> <a id='" + "onedrive" + j + "'>"+ data.value[j].name 
							+"<span class='fa arrow'></span></a><ul class='nav nav-third-level' id='oneul" + j + "'></ul></li>");
				} else {
					$("#tbody").append("<tr><td><input id='" + data.value[j].id + "' type='checkbox'></td>"
							+ "<td>"+ data.value[j].name +"</td>"
							+ "<td></td>"
							+ "<td>"+ data.value[j].lastModifiedDateTime +"</td>"
							+ "<td class='center'>"+ data.value[j].size + "byte" +"</td>"
							+ "<td class='center'>"+ data.value[j].name +"</td></tr>");
				}
				(function(m) {
					$('#onedrive' + m).click(function() {
						$("#tbody > tr").remove();
						$.ajax({
							url: "https://api.onedrive.com/v1.0/drive/items/" + data.value[m].id + "/children?access_token=" + odtoken,
							success: function(data2) {
								for (k = 0; k < data2.value.length ; k++){
									if (data2.value[k].file) {
										$("#tbody").append("<tr><td><input id='" + data2.value[k].id + "' type='checkbox'></td>"
												+ "<td>"+ data2.value[k].name + "</td>"
												+ "<td></td>"
												+ "<td>"+ data2.value[k].lastModifiedDateTime +"</td>"
												+ "<td class='center'>"+ data2.value[k].size + "byte" +"</td>"
												+ "<td class='center'>"+ data2.value[k].name +"</td></tr>");
									} else {
										$("#oneul" + k).append("<li> <a id='" + "inonedrive" + k + "'>"+ data2.value[k].name 
												+"</a><ul class='nav nav-fourth-level' id='inoneul" + k + "'></ul></li>");
									}
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
		error: function(error) {
			console.log(error);
		}
	});*/

/*$('#onedrivefolder').click(function() {	
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
});*/
