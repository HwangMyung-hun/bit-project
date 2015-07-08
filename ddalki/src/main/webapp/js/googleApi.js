var CLIENT_ID = '163518707285-1rnv5uqh371qimkfdqaj02mp9img4aof.apps.googleusercontent.com';
var SCOPES = ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/drive.file'];
var token;
var accessToken;
var apiKey = 'AIzaSyA3nrbSWG0imQOxUPr8tINF3NzvTtInyGI';
function signinCallback(authResult) {
  if (authResult['access_token']) {
    // 승인 성공
    // 사용자가 승인되었으므로 로그인 버튼 숨김. 예:
    //document.getElementById('signinButton').setAttribute('style', 'display: none');
	  token = authResult['access_token'];
    console.log(authResult);
    accessToken = authResult.access_token;
    var credentials = {
    		access_token : authResult['access_token'],
    		error : authResult['error'],
    		expires_in : authResult['expires_in'],
    		state : authResult['state']
    }; 
    retrieveAllFiles(credentials);
  } else if (authResult['error']) {
    // 오류가 발생했습니다.
    // 가능한 오류 코드:
    //   "access_denied" - 사용자가 앱에 대한 액세스 거부
    //   "immediate_failed" - 사용자가 자동으로 로그인할 수 없음
    // console.log('오류 발생: ' + authResult['error']);
  }
}

function disconnectUser(access_token) {
  var revokeUrl = 'https://accounts.google.com/o/oauth2/revoke?token=' +
  access_token;

  // 비동기 GET 요청을 수행합니다.
  $.ajax({
    type: 'GET',
    url: revokeUrl,
    async: false,
    contentType: "application/json",
    dataType: 'jsonp',
    success: function(nullResponse) {
      // 사용자가 연결 해제되었으므로 작업을 수행합니다.
      // 응답은 항상 정의되지 않음입니다.
    },
    error: function(e) {
      // 오류 처리
      // console.log(e);
      // 실패한 경우 사용자가 수동으로 연결 해제하게 할 수 있습니다.
      // https://plus.google.com/apps
    }
  });
}


// 버튼 클릭으로 연결 해제를 실행할 수 있습니다.
$('#revokeButton').click(function() {
	disconnectUser(token);
});

function loadClient(callback) {
	  gapi.client.load('drive', 'v2', callback);
}

function retrieveAllFiles(callback) {
  var retrievePageOfFiles = function(request, result) {
    request.execute(function(resp) {
      result = result.concat(resp.items);
      var nextPageToken = resp.nextPageToken;
      if (nextPageToken) {
        request = gapi.client.drive.files.list({
          'pageToken': nextPageToken
        });
        retrievePageOfFiles(request, result);
      } else {
        callback(result);
      }
    });
  }
  var initialRequest = gapi.client.drive.files.list();
  retrievePageOfFiles(initialRequest, []);
}


function handleClientLoad() {
  checkAuth();
}

var auth_callback = function(){};

function checkAuth(callback) {
  console.log(gapi.auth.authorize);
  gapi.auth.authorize(
		  {'client_id': CLIENT_ID, 'scope': SCOPES, 'immediate': true},
		  handleAuthResult);
  auth_callback = callback;
}


function handleAuthResult(authResult) {
	if (authResult) {
	  gapi.client.load('drive', 'v2', 
	    function(){
	      auth_callback();
	    });
	} else {
	  gapi.auth.authorize(
	      {'client_id': CLIENT_ID, 'scope': SCOPES, 'immediate': false},
	      handleAuthResult);
	}
}


//구글 요놈
function googlelogin() {
  $("#___signin_0").children("button").trigger('click');
}

//google list 가져오는 부분
var driveResult = null;
var order = ['first','second','third','fourth','fifth','sixth','seventh','eighth','ninth','tenth'];
function fileList() {
	checkAuth(function(){
		var request = gapi.client.drive.files.list();
		request.execute(function(resp) {
			if (!resp.error) {
				console.log(resp.items);
				driveResult = resp.items;
				if(uploadreseton) actionRefresh();
			} else if (resp.error.code == 401) {
				// Access token might have expired.
				//console.log(resp.error.code + "");
				checkAuth();
			} else {
				console.log('An error occured: ' + resp.error.message);
			}
		});
	});
}

function rootlist() {
    for (var i in driveResult) {
    	if(driveResult[i].parents[0].isRoot) {
    		foldertargetid = driveResult[i].parents[0].id;
    	}
    }
	if($("#googlelist > li").length == 0) {
		for (var i in driveResult) {
			if(driveResult[i].parents[0].isRoot == true
					&& driveResult[i].mimeType == "application/vnd.google-apps.folder") {
				$("#googlelist").append("<li> <a id='" + driveResult[i].id 
						+ "' onclick='filetable(this.id)'>"+ driveResult[i].title 
						+"<span class='fa arrow'></span></a><ul class='nav nav-" 
						+ order[2] + "-level'></ul></li>");
				direcAdd(driveResult[i].id, 3);
			}
		}
	}
	if(driveResult != null) $('#side-menu').metisMenu();
}


function direcAdd(id, inteager) {
	if($("#" + id + "+ ul > li").length == 0) {
		for (var i in driveResult) {
			if(driveResult[i].parents[0].id == id
					&& driveResult[i].mimeType == "application/vnd.google-apps.folder") {
				$("#" + id + "+ ul").append("<li> <a id='" + driveResult[i].id 
						+ "' onclick='filetable(this.id)'>"+ driveResult[i].title 
						+"<span class='fa arrow'></span></a><ul class='nav nav-"
						+ order[inteager] + "-level'></ul></li>");
				direcAdd(driveResult[i].id, inteager+1);
			}
		}
	}
}

function filetable(id) {
	foldertargetid = id;
	foldertargets = true;
	$("#tbody > tr").remove();
	for (var i in driveResult) {
		if(driveResult[i].parents[0].id == id 
				&& !driveResult[i].labels.trashed
				&& (driveResult[i].mimeType != "application/vnd.google-apps.folder")) {
			$("#tbody").append("<tr><td><input id='" + driveResult[i].id + "' type='checkbox'></td>"
                                    + "<td>"+ driveResult[i].title +"</td>"
                                    + "<td></td>"
                                    + "<td>"+ (driveResult[i].modifiedDate).split("T")[0] +"</td>"
                                    + "<td class='center'>"+ fileSizeRename(driveResult[i].fileSize) +"</td>"
                                    + "<td class='center'>"+ driveResult[i].fileExtension +"</td></tr>");
		} else if (driveResult[i].parents[0].id == id && 
				(driveResult[i].mimeType == "application/vnd.google-apps.folder")){
			$("#tbody").append("<tr><td><input id='" + driveResult[i].id + "' type='checkbox'></td>"
                    + "<td>"+ driveResult[i].title +"</td>"
                    + "<td></td>"
                    + "<td>"+ (driveResult[i].modifiedDate).split("T")[0] +"</td>"
                    + "<td class='center'></td>"
                    + "<td class='center'>folder</td></tr>");
		}
	}
}

function rootlistfile() {
	for (var i in driveResult) {
		if(driveResult[i].title != 'Untitled' && !driveResult[i].labels.trashed) {
			if(driveResult[i].parents[0].isRoot) {
				if(driveResult[i].mimeType == "application/vnd.google-apps.folder") {
					$("#tbody").append("<tr><td><input id='" + driveResult[i].id + "' type='checkbox'></td>"
							+ "<td>"+ driveResult[i].title +"</td>"
							+ "<td></td>"
							+ "<td>"+ (driveResult[i].modifiedDate).split("T")[0] +"</td>"
							+ "<td class='center'></td>"
							+ "<td class='center'>folder</td></tr>");
				} else {
					$("#tbody").append("<tr><td><input id='" + driveResult[i].id + "' type='checkbox'></td>"
							+ "<td>"+ driveResult[i].title +"</td>"
							+ "<td></td>"
							+ "<td>"+ (driveResult[i].modifiedDate).split("T")[0] +"</td>"
							+ "<td class='center'>"+ fileSizeRename(driveResult[i].fileSize) +"</td>"
							+ "<td class='center'>"+ driveResult[i].fileExtension +"</td></tr>");
				}
			}
		}
	}
}

function fileSizeRename(size) {
  var numsize = parseInt(size);
  if(numsize < 1024) return numsize + " Byte"
  else if(numsize >= 1024 && numsize < 1048576) return (numsize/1024).toFixed(1) + " KB"
  else if(numsize >= 1048576 && numsize < 1073741824) return (numsize/1048576).toFixed(1) + " MB"
  else return (numsize/1073741824).toFixed(1) + " GB"
}

$(".cloudicon").hide();

//클라우드 아이콘 보기/숨기기
$("#addcloud").click(function() {
	foldertargets = false;
	$("#tbody").hide();
	$(".dataTable_wrapper").hide();
	$(".cloudicon").show();
});

$(".btn-google-plus").click(function(event) {
  foldertargets = true;
  googlenewfolder = true;
  if(driveResult == null) fileList();
  $("#tbody > tr").remove();
  $(".dataTable_wrapper").show();
  $("#tbody").show();
  $(".cloudicon").hide();
  rootlistfile();
  $("#googleInsertInput").hide();
});

$(".btn-facebook, .btn-instagram").click(function(event) {
  foldertargets = false;
  googlenewfolder = false;
  $("#tbody > tr").remove();
  $(".dataTable_wrapper").show();
  $("#tbody").show();
  $(".cloudicon").hide();
  $("#googleInsertInput").hide();
});

var foldertargets = false;
$('#uploadfile').click(function() {
	if(foldertargets) $("#googleInsertInput").show();
});

//google download
$("#downfile").click(function(event) {
	if(googlenewfolder) {
		var tr = $("#tbody input");
		var ids = '';
		for (var i = 0; i < tr.length; i++) {
			if($("input:checkbox[id='" + tr[i].id + "']").is(":checked")) ids = ids + tr[i].id + "&&&";
		}
		if(ids != '')downloadFiles(ids);
	}
});

function downloadFiles(fileIds) {
  checkAuth(function(){
  var _fileIds = fileIds.split("&&&");
  for(var i = 0; i < _fileIds.length - 1; i++){
    _fileIds[i] = _fileIds[i].replace("https://docs.google.com/open?id=","");
    console.log(_fileIds[i]);
  }
  if(confirm("다운하시겠습니까? " + (_fileIds.length - 1) + " 파일!")){
    for(var i = 0; i < _fileIds.length; i++){
      var request = gapi.client.drive.files.get({
          'fileId': _fileIds[i]
      });
      request.execute(function(resp) {
        if (!resp.error) {
          console.log(resp);
          downloadURL(resp.webContentLink);
        } else if (resp.error.code == 401) {
          // Access token might have expired.
          checkAuth();
        } else {
          console.log('An error occured: ' + resp.error.message);
            }
          });
        }
      }
    });
}

function downloadURL(url) {
    var $idown = $('<iframe>', { id:'idown', src:url }).hide().appendTo('body');
}

var foldertargetid = null;

function foldertarget() {
	return foldertargetid;
/*  var id = $('#tbody input:first')[0].id;
  var result;
  for (var i in driveResult) {
	 if(driveResult[i].id == id) return driveResult[i].parents[0].id;
  }*/
}

var uploadreseton = false;

function insertFile(event) {
	var id = foldertarget();
	var fileData = event.target.files[0];
	checkAuth(function(){
	  const boundary = '-------314159265358979323846';
	  const delimiter = "\r\n--" + boundary + "\r\n";
	  const close_delim = "\r\n--" + boundary + "--";
	  
	  var reader = new FileReader();
	  reader.onload = function(e) {
		  var contentType = fileData.type || 'application/octet-stream';
		  var metadata = {
				  'title': fileData.name,
				  'mimeType': contentType,
				  'parents': [{"id":"" + id}]
		  };
		  
		  var base64Data = btoa(reader.result);
		  var multipartRequestBody =
			  delimiter +
			  'Content-Type: application/json\r\n\r\n' +
			  JSON.stringify(metadata) +
			  delimiter +
			  'Content-Type: ' + contentType + '\r\n' +
			  'Content-Transfer-Encoding: base64\r\n' +
			  '\r\n' +
			  base64Data +
			  close_delim;
		  
		  var request = gapi.client.request({
			  'path': '/upload/drive/v2/files',
			  'method': 'POST',
			  'params': {'uploadType': 'multipart'},
			  'headers': {
				  'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
			  },
			  'body': multipartRequestBody});
		  
	      request.execute(function(resp) {
	          if (!resp.error) {
	            alert("업로드 하였습니다.");
	            console.log(resp);
	            uploadreseton = true;
	            fileList();// 파일 리스트 다시 받기
	          } else if (resp.error.code == 401) {
	            // Access token might have expired.
	            checkAuth();
	          } else {
	            console.log('An error occured: ' + resp.error.message);
	          }
	      });
	  }
	  reader.readAsBinaryString(fileData);
	});
	$("#googleInsertInput").hide();
}

$("#googleInsertInput").hide();

function actionRefresh() {
	filetable(foldertarget());
}

function deleteFile(fileId) {
  var _fileIds = fileId.split("&&&");
  var dlrjanjdi = 0;
  for(var i = 0; i < _fileIds.length - 1; i++){
	  var xmlReq =  new  XMLHttpRequest (); 
	  xmlReq.open( 'DELETE' ,  'https://www.googleapis.com/drive/v2/files/'  + _fileIds[i] +  '?key='  + apiKey ); 
	  xmlReq.setRequestHeader( 'Authorization' ,  'Bearer '  + accessToken );
	  xmlReq.onreadystatechange = function() {
	     dlrjanjdi++;
	     if (dlrjanjdi == 2) {
	    	 alert("삭제하였습니다.");
	    	 fileList();// 파일 리스트 다시 받기
	     }
	  }
	  xmlReq.send();
  }
  
}


$('#deletebtn').click(function() {
	var tr = $("#tbody input");
	var ids = '';
	for (var i = 0; i < tr.length; i++) {
	  if($("input:checkbox[id='" + tr[i].id 
			  + "']").is(":checked")) ids = ids + tr[i].id + "&&&";
	}
	if(ids != '')deleteFile(ids);
});

$('#dataTables-example > thead input').click(function() {
	if($('#dataTables-example > thead input')[0].checked) $('#tbody input').prop('checked', true);
	else $('#tbody input').prop('checked', false);
});

function createFolder(id) {
	data = new Object();
	data.title = 'New Folder';
	data.parents = [{"id": id}];
	data.mimeType = "application/vnd.google-apps.folder";
   checkAuth(function(){
	   gapi.client.drive.files.insert({'resource': data}).execute(function(resp){
          if (!resp.error) {
            uploadreseton = true;
            folderdeletereset();
            alert("폴더 생성");
          } else if (resp.error.code == 401) {
            // Access token might have expired.
            checkAuth();
          } else {
            console.log('An error occured: ' + resp.error.message);
          }
	   });
   });
}


var googlenewfolder = false;

$('.left img:nth-child(6)').click(function() {
	if(googlenewfolder) createFolder(foldertarget());
});

function folderdeletereset() {
	checkAuth(function(){
		var request = gapi.client.drive.files.list();
		request.execute(function(resp) {
			if (!resp.error) {
				console.log(resp.items);
				driveResult = resp.items;
				if(uploadreseton) actionRefresh();
			} else if (resp.error.code == 401) {
				// Access token might have expired.
				//console.log(resp.error.code + "");
				checkAuth();
			} else {
				console.log('An error occured: ' + resp.error.message);
			}
		});
	});
}
