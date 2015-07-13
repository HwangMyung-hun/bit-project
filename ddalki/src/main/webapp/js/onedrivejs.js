var onedrive_id = "000000004C155431";
var onedrive_scope = "wl.signin wl.offline_access onedrive.readwrite onedrive.appfolder";
var onedrive_redirect = "http://localhost:9999/ddalki/ddalki-main/callback.html";
var onedrive_secret = "cdau0UrKN3cW3hnBpJ-kD9uPp9dC5Fsv";
var odtoken;
var folderid;
var onedriveactive = null;
var onedriveStorage = new Array();

$(function(){
	odtoken = getTokenFromCookie();
	if(odtoken) {
		console.log(odtoken);
		$.ajax({
			url: "https://api.onedrive.com/v1.0/drive?access_token=" + odtoken,
			success: function(data) {
				onedriveStorage = [data.quota.total, data.quota.used];
				console.log(onedriveStorage);
			},
			error: function(err){
				console.log(err);
			}
		});
		$.ajax('http://' + ip + directoryLocation + '/tcloudactive.do', {
	        method: 'POST',
	        dataType: 'json',
	        data: {
	          email: $.session.get('useremail'),
	          cloudtype: 'onedrive'
	        },
	        success: function(result) {
	        	console.log(result);
	        	/*if (result.active == "Y") {
	        		console.log("onedrive 기존 회원");
	        	} else {
	        		$.ajax('http://' + ip + directoryLocation + '/addcloud.do', {
	        		    method: 'POST',
	        		    dataType: 'json',
	        		    data: {
	        		      email: $.session.get('useremail'),
	        		      cloudtype: 'onedrive',
	        		      cloudid: 'aa',
	        		      token: odtoken,
	        		      active: 'Y'
	        		    },
	        		    success: function(result) {
	        		       alert('onedrive 등록이 완료되었습니다.');
	        		    },
	        		    error: function(xhr, textStatus, errorThrown) {
	        		      alert('DB저장 실패.\n' + 
	        		          '잠시 후 다시 시도하세요.\n' +
	        		      '계속 창이 뜬다면, 관리자에 문의하세요.(사내번호:1112)');
	        		    }
	        	    });
	        	}*/
	        },
	        error: function(xhr, textStatus, errorThrown) {
	          alert('active로딩중 문제 발생.\n' + 
	              '잠시 후 다시 시도하세요.\n' +
	          '계속 창이 뜬다면, 관리자에 문의하세요.(사내번호:2)');
	        }
	      });
	}
});

function onedrivelogout() {
	location.href='https://login.live.com/oauth20_logout.srf?client_id=' + onedrive_id + '&redirect_uri=' + onedrive_redirect + '';
}

$('#onedrivelogin').click(function(event){
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
function onAuthCallback() {
	  var authInfo = getAuthInfoFromUrl();
	  var token = authInfo["access_token"];
	  var expiry = parseInt(authInfo["expires_in"]);
	  setCookie(token, expiry);
	  window.opener.onAuthenticated(token, window);
	}

/*window.onload = function(){
	var authInfo = getAuthInfoFromUrl();
	odtoken = authInfo["access_token"];
	console.log(odtoken);
	var expiry = parseInt(authInfo["expires_in"]);
	setCookie(odtoken, expiry);
	onAuthenticated(odtoken, window);
};*/

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
function getTokenFromCookie() {
	  var cookies = document.cookie;
	  var name = "odauth=";
	  var start = cookies.indexOf(name);
	  if (start >= 0) {
	    start += name.length;
	    var end = cookies.indexOf(';', start);
	    if (end < 0) {
	      end = cookies.length;
	    }
	    else {
	      postCookie = cookies.substring(end);
	    }

	    var value = cookies.substring(start, end);
	    return value;
	  }

	  return "";
	}

function onAuthenticated(odtoken2, authWindow) {
	if (odtoken2) {
		if (authWindow) {
			authWindow.close();
		}
		document.location.reload();
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
			var odquery = "?expand=thumbnails,children(expand=thumbnails(select=large,c200x150_Crop))&access_token=" + odtoken2;
			console.log(odtoken2);
			$.ajax({
				url: "https://api.onedrive.com/v1.0/drive?access_token=" + odtoken2,
				success: function(data) {
					folderid = data.id;
					console.log(data);
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
var ondriveallow = 0;
$('#onedrivefolder').click(function() {
	$("#tbody > tr").remove();
	ondriveallow++;
	/*console.log($('.nav-pills > li > a')[0]);
	$('.nav-pills > li > a')[0].innerHTML = '';
	$('.nav-pills > li > a')[0].innerHTML = 'OneDrive';*/
	if($('.btn-twitter li').length == 0 && ondriveallow == 1) {
		onedriveactive = true;
		$("#onedrivelist > li").remove();
		$("#tbody > tr").remove();
		$.ajax({
			url: "https://api.onedrive.com/v1.0/drive/root/children?expand=thumbnails,children(expand=thumbnails(select=smallSquare,c200x150_Crop))&access_token=" + odtoken,
			success: function(data) {
				for (j = 0; j < data.value.length ; j++) {
					if (data.value[j].folder) {
						ODlist = data.value;
						$("#onedrivelist").append("<li> <a id='" + data.value[j].id 
								+ "' onclick='innerfile(this.id, this.innerText)'>"+ data.value[j].name 
								+"<span class='fa arrow'></span></a><ul class='nav nav-"
								+ level[2] + "-level' id='" + level[2] + j + "'></ul></li>");
						innerfolder(data.value[j].id, 3, j);
					} 
					if (data.value[j].file && data.value[j].thumbnails[0]){
						$("#tbody").append("<tr><td><input id='" + data.value[j].id + "' type='checkbox'></td>"
								+ "<td>"+ data.value[j].name +"<img src='" + data.value[j].thumbnails[0].smallSquare.url + "' id='image1'></td>"
								+ "<td></td>"
								+ "<td>"+ data.value[j].lastModifiedDateTime.split("T")[0] +"</td>"
								+ "<td class='center'>"+ data.value[j].size + "byte" +"</td>"
								+ "<td class='center'>"+ data.value[j].name.split(".")[1] +"</td></tr>");
					} else if (data.value[j].folder) {
						$("#tbody").append("<tr><td><input id='" + data.value[j].id + "' type='checkbox'></td>"
								+ "<td>"+ data.value[j].name +"<img src='../img/fileicon_folder.png' id='image1'></td>"
								+ "<td></td>"
								+ "<td>"+ data.value[j].lastModifiedDateTime.split("T")[0] +"</td>"
								+ "<td class='center'>"+ data.value[j].size + "byte" +"</td>"
								+ "<td class='center'>folder</td></tr>");
					} else {
						$("#tbody").append("<tr><td><input id='" + data.value[j].id + "' type='checkbox'></td>"
								+ "<td>"+ data.value[j].name +"</td>"
								+ "<td></td>"
								+ "<td>"+ data.value[j].lastModifiedDateTime.split("T")[0] +"</td>"
								+ "<td class='center'>"+ data.value[j].size + "byte" +"</td>"
								+ "<td class='center'>"+ data.value[j].name.split(".")[1] +"</td></tr>");
					}
				}
			}
		});
	}
});

$("#newfolderbtn").click(function() {
	if(onedriveactive == true) {
		$("#odcreatefolder").show();
	}
});

$('.btn-facebook, .btn-google-plus, .btn-dropbox, .btn-instagram').click(function() {
	onedriveactive = false;
});

function innerfolder(folderid , levelnum, locat) {
	$.ajax({
		url: "https://api.onedrive.com/v1.0/drive/items/" + folderid + "/children?access_token=" + odtoken,
		success: function(data) {	
			for (i = 0 ; i < data.value.length ; i++) {
				if (data.value[i].folder) {
					$("#"+ level[levelnum - 1] + locat).append("<li> <a id='" + data.value[i].id 
						+ "' onclick='innerfile(this.id, this.innerText)'>"+ data.value[i].name 
						+"<span class='fa arrow'></span></a><ul class='nav nav-"
						+ level[levelnum] + "-level' id='"+ level[levelnum] + i + "'></ul></li>");
					innerfolder(data.value[i].id, levelnum+1, i);
				}
			}
		}
	});
}
var odfolder;
function innerfile(folderid, name) {
	odfolder = folderid;
	$("#tbody > tr").remove();
	console.log(name);
	/*$('.nav-pills > li:nth-child(2)').remove();
	$('.nav-pills').append("<li id='arrow-on'><a href='#home-pills' data-toggle='tab'>" + name + "</li>");*/
	$.ajax({
		url: "https://api.onedrive.com/v1.0/drive/items/" + folderid + "/children?expand=thumbnails,children(expand=thumbnails(select=smallSquare,c200x150_Crop))&access_token=" + odtoken,
		success: function(data) {
			for (i = 0 ; i < data.value.length ; i++) {
				if(data.value[i].thumbnails.length){
					$("#tbody").append("<tr><td><input id='" + data.value[i].id + "' type='checkbox'></td>"
							+ "<td>"+ data.value[i].name +"<img src='" + data.value[i].thumbnails[0].smallSquare.url + "' id='image1'></td>"
							+ "<td></td>"
							+ "<td>"+ data.value[i].lastModifiedDateTime.split("T")[0] +"</td>"
							+ "<td class='center'>"+ data.value[i].size + "byte" +"</td>"
							+ "<td class='center'>"+ data.value[i].name.split('.')[1] +"</td></tr>");
				} else if (data.value[i].folder) {
					$("#tbody").append("<tr id='clickfolder'><td><input id='" + data.value[i].id + "' type='checkbox'></td>"
							+ "<td>"+ data.value[i].name +"<img src='../img/fileicon_folder.png' id='image1'></td>"
							+ "<td></td>"
							+ "<td>"+ data.value[i].lastModifiedDateTime.split('T')[0] +"</td>"
							+ "<td class='center'>"+ data.value[i].size + "byte" +"</td>"
							+ "<td class='center'>folder</td></tr>");
					(function(m) {
						$('#clickfolder').dblclick(function() {
							innerfile(  data.value[m].id , data.value[m].name );
						});
					})(i);	
				} else {
					$("#tbody").append("<tr><td><input id='" + data.value[i].id + "' type='checkbox'></td>"
							+ "<td>"+ data.value[i].name +"</td>"
							+ "<td></td>"
							+ "<td>"+ data.value[i].lastModifiedDateTime.split('T')[0] +"</td>"
							+ "<td class='center'>"+ data.value[i].size + "byte" +"</td>"
							+ "<td class='center'>"+ data.value[i].name.split('.')[1] +"</td></tr>");
				}
			}
		}
	});
}

$("#odcreatebtn").click(function() {
	if(onedriveactive == true){
		var createfolder = {
				'name' : $("#odcreate").val(),
				"folder": { }
		}
		var inputData = JSON.stringify(createfolder);
		$.ajax({
			url: "https://api.onedrive.com/v1.0/drive/items/" + odfolder + "/children?nameConflict=fail",
			method: "POST",
			datatype : "json",
			contentType: "application/json",
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Authorization", 'Bearer ' + odtoken);
			},
			data: inputData,
			success: function(data) {
				console.log(data);
				$("#odcreatefolder").hide();
				ondriveallow = 0;
				innerfile(data.id, data.name);
				$('#side-menu').metisMenu();
			},
			error: function(error){
				console.log(error);
			}
		});	
	}
});

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
	if(onedriveactive == true) {
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
	}
});
$("#renamebtn").click(function(event) {
	console.log(onedriveactive);	
	if(onedriveactive == true) {
		var ODfilelist = $("#tbody input");
		for (i = 0; i< ODfilelist.length ; i++) {
			if($("input:checkbox[id='" + ODfilelist[i].id + "']").is(":checked")) {
				console.log($("input:checkbox[id='" + ODfilelist[i].id + "']").parents().children()[2]);
				$("input:checkbox[id='" + ODfilelist[i].id + "']").parents().children()[2].innerText = '';
				$("input:checkbox[id='" + ODfilelist[i].id + "']").parents().children()[2].innerHTML = '<input id="odupdate" type="text"/><button id="updatedbtn">변경</button>';
				(function(m) {
					$('#updatedbtn').click(function() {
						updatename(ODfilelist[m].id, $('#odupdate').val())
						
					});
				})(i);
			}
		}
	}
});
function updatename (id, name) {
	var odrename = {
			'name' : name
	}
	var inputData = JSON.stringify(odrename);	
	$.ajax({
		url: "https://api.onedrive.com/v1.0/drive/items/" + id ,
		method: "POST",
		datatype : "json",
		contentType: "application/json",
		beforeSend : function(xhr) {
			xhr.setRequestHeader("X-HTTP-Method-Override", 'PATCH');
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
}
var dlrjanjdi = 0;
$('#deletebtn').click(function() {
	if(onedriveactive == true) {
		var ODfilelist = $("#tbody input");
		for (i = 0; i< ODfilelist.length ; i++) {
			if($("input:checkbox[id='" + ODfilelist[i].id + "']").is(":checked")) {
				var xmlReq =  new  XMLHttpRequest (); 
				xmlReq.open( 'DELETE' ,  "https://api.onedrive.com/v1.0/drive/items/" + ODfilelist[i].id + "?access_token=" + odtoken );
				xmlReq.setRequestHeader( 'Authorization' ,  'Bearer');
				xmlReq.onreadystatechange = function(event) {
					dlrjanjdi++;
					if (dlrjanjdi == 2) {
						alert("삭제하였습니다.");
						$('#side-menu').metisMenu();
					}
				}
				xmlReq.send();
			}
		}
	}
});
$('#uploadbtn').click(function() {
	if(onedriveactive == true){
		$('#ondriveupload').show();
	}
})
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
