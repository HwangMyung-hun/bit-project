if (document.location.href.length < 400) {
	var currentPage = document.location.href;
	var regExpurl = /\=([\da-z\._-]*)\&/;
	var sktoken = currentPage.match(regExpurl);
	var tcloudID; 
	if(sktoken != null){
		console.log(sktoken[1]);
	}
}
var TcloudVolume = [0, 0]; 
var tcloudvolok;

function userProfile_callback( data ) {
	tcloudID = data.profile.userId;
	$.ajax('http://' + ip + directoryLocation + '/tcloudactive.do', {
        method: 'POST',
        dataType: 'json',
        data: {
          email: $.session.get('useremail'),
          cloudtype: 'tcloud'
        },
        success: function(result) {
        	console.log(result.active);
        	if (result.active == "Y") {
        		console.log("tcloud 기존 회원");
        	} else {
        		$.ajax('http://' + ip + directoryLocation + '/addcloud.do', {
        		    method: 'POST',
        		    dataType: 'json',
        		    data: {
        		      email: $.session.get('useremail'),
        		      cloudtype: 'tcloud',
        		      cloudid: tcloudID,
        		      token: sktoken[1],
        		      active: 'Y'
        		    },
        		    success: function(result) {
        		       alert('T Cloud 등록이 완료되었습니다.');
        		       startactive();
        		    },
        		    error: function(xhr, textStatus, errorThrown) {
        		      alert('DB저장 실패.\n' + 
        		          '잠시 후 다시 시도하세요.\n' +
        		      '계속 창이 뜬다면, 관리자에 문의하세요.(사내번호:1112)');
        		    }
        	    });
        	}
        },
        error: function(xhr, textStatus, errorThrown) {
          alert('active로딩중 문제 발생.\n' + 
              '잠시 후 다시 시도하세요.\n' +
          '계속 창이 뜬다면, 관리자에 문의하세요.(사내번호:2)');
        }
      });
	
}

$(function (){
    PlanetX.init({
    	appkey : "a9e7c01c-2062-37fc-b8ad-56eddcce4063" ,   // 본인의 appkey 정보 입력
        client_id : "4b11f26b-424a-332d-b331-103ee34178d0", // 본인의 client id 정보 입력
        redirect_uri : "http://localhost:9999/ddalki/ddalki-main/main.html",            // 본인의 redirect uri 정보 입력
        scope : "tcloud,user",
        savingToken : true
    });
    
    var status = PlanetX.getLoginStatus();
    console.log(status);
    
    if (status) {
    	$('#Tcloudactive').css('opacity', '1');
    	PlanetX.api( "get", "https://apis.skplanetx.com/users/me/profile", "JSON", { "version": 1}, userProfile_callback );
    	PlanetX.api( "get", "https://apis.skplanetx.com/tcloud/usage", "JSON", { "version": 1}, TcloudStorage_callback );
    	PlanetX.api( "get", "https://apis.skplanetx.com/tcloud/images","JSON", { "version" :1 }, tcloud_find );
    	PlanetX.api( "get", "https://apis.skplanetx.com/tcloud/music","JSON", { "version" :1 }, tcloud_find );
    	PlanetX.api( "get", "https://apis.skplanetx.com/tcloud/movies","JSON", { "version" :1 }, tcloud_find );
    	PlanetX.api( "get", "https://apis.skplanetx.com/tcloud/documents","JSON", { "version" :1 }, tcloud_find );
    	
    	$('#Tcloudlist').append("<li><a id='tcloudimages'>images</a></li>" +
		"<li><a id='tcloudmovies'>movies</a></li>" +
		"<li><a id='tcloudmusic'>music</a></li>" + 
		"<li><a id='tclouddocuments'>documents</a></li>");
    	$('#side-menu').metisMenu();
    	tImage();
    	tMusic();
    	tMovie();
    	tDoc();
    } else {
    	$('#Tcloudactive').css('opacity', '0.1');
    	tcloudvolok = 'ok';
    	VolumeBar();
    }
   // PlanetX.api( "get", "https://apis.skplanetx.com/tcloud/images","JSON", { "version" :1 }, tcloud_callback );
});

function tcloud_find(response) {
	console.log(response);
	if (response.meta.images) {
		for(j = 0; j < response.meta.images.image.length ; j++){
			var tcloudobj = {};
			tcloudobj.name = response.meta.images.image[j].name;
			tcloudobj.size = response.meta.images.image[j].size;
			tcloudobj.drive = 'tcloud';
			filefind.push(tcloudobj);
		}
	} else if (response.meta.music) {
		for(j = 0; j < response.meta.music.music.length ; j++){
			var tcloudobj = {};
			tcloudobj.name = response.meta.music.music[j].name;
			tcloudobj.size = response.meta.music.music[j].size;
			tcloudobj.drive = 'tcloud';
			filefind.push(tcloudobj);
		}
	} else if (response.meta.movies) {
		for(j = 0; j < response.meta.movies.movie.length ; j++){
			var tcloudobj = {};
			tcloudobj.name = response.meta.movies.movie[j].name;
			tcloudobj.size = response.meta.movies.movie[j].size;
			tcloudobj.drive = 'tcloud';
			filefind.push(tcloudobj);
		}
	} else if (response.meta.documents) {
		for(j = 0; j < response.meta.documents.document.length ; j++) {
			var tcloudobj = {};
			tcloudobj.name = response.meta.documents.document[j].name;
			tcloudobj.size = response.meta.documents.document[j].size;
			tcloudobj.drive = 'tcloud';
			filefind.push(tcloudobj);
		}
	}
}

function TcloudStorage_callback (res) {
	TcloudVolume = [res.usage.total, res.usage.used];
	console.log(TcloudVolume);
	tcloudvolok = 'ok';
	VolumeBar();
}

function tcloud_delete (response) {
	console.log(response);
}


function tcloud_update (response) {
	$(function(){
		/*document.getElementById('frm').action = response.storage.token;*/
		//ajax form submit
		 $("#uploadbutton").click(function(){
			 var form = $('#frm')[0];
			 var formData = new FormData(form);
		       	 $.ajax({
		       	    url: response.storage.token,
		       	    processData: false,
	     	    	contentType: false,
		       	    data: formData,
		       	    type: 'POST',
		       	    success: function(result){
		       	    	alert("업로드 성공!!");
		       	    },
		       	    error: function(result) {
		       	    	console.log(result);
		       	    	var reg = /\.([a-z\.]*)$/;
		    			var filename = $('#tcloudfile').val();
		    			var append = filename.match(reg);
		    			console.log(append[1]);
		    			if (append[1] == 'jpg' || append[1] == 'jpeg' || append[1] == 'png' || append[1] == 'bmp' || append[1] == 'gif') {
		    				$( "#tcloudimages" ).trigger( "click" );
		    			} else if (append[1] == 'avi' || append[1] == 'wmv' || append[1] == 'mp4' || append[1] == 'mkv' || append[1] == 'mpeg') {
		    				$( "#tcloudmovies" ).trigger( "click" );
		    			} else if (append[1] == 'mp3' || append[1] == 'wma'  || append[1] == 'wav'  || append[1] == 'mid'  || append[1] == 'ogg' ) {
		    				$( "#tcloudmusic" ).trigger( "click" );
		    			} else {
		    				$( "#tclouddocuments" ).trigger( "click" );
		    			}
		    			$('#frm').hide();
		       	    }
		       	 });
		 });
	});

		/*$('#frm').ajaxForm({
	            beforeSubmit: function (data,form,option) {
	            	//validation체크 
	            	//막기위해서는 return false를 잡아주면됨
	                return true;
	            },
	            success: function(response,status){
	            	//성공후 서버에서 받은 데이터 처리
	            	alert("업로드 성공!!");
	            },
	            error: function(){
	            	//에러발생을 위한 code페이지
	            },
	            beforeSend: setHeader
	        });*/
	
	
//	console.log(response.storage.token);
//	$('#fileupload').attr('data-url', response.storage.token);
//	document.getElementById('upload').style.display = "block";
//	$('#fileupload').click(function(event) {
//		$('#fileupload').fileupload();
//		/*$('div.modal').modal('hide');*/
//	});
	/* $.ajax(response.storage.token, {
        method: 'POST',
        name: 'upload',
        enctype: 'multipart/form-data',
        
        success: function(result) {
           console.log(result.data);
        },
        error: function(xhr, textStatus, errorThrown) {
          alert('문제잇음');
        }
   });  */
}
var tactive = false;
$('#Tcloudactive').click(function() {
	$('#deletebtn').css('opacity','1');
	$('#downloadbtn').css('opacity','1');
	$('#uploadbtn').css('opacity','1');
	$('#newfolderbtn').css('opacity','0.1');
	$('#renamebtn').css('opacity','0.1');
	var status = PlanetX.getLoginStatus();
	if (status) {
		tactive = true;
	} else {
		$('#tcloudlogin').trigger('click');
	}
});

$('.btn-facebook, .btn-google-plus, .btn-dropbox, .btn-twitter, .btn-kakao').click(function() {
	tactive = false;
	console.log(tactive);
	$('#frm').hide();
});

$('#uploadbtn').click(function(event) {
	if (tactive == true) {
		$('#frm').show();
		PlanetX.api( "get", "https://apis.skplanetx.com/tcloud/token","JSON", {"version" :1} , tcloud_update );
	} else if (tactive == false) {
		$('#frm').hide();
	}
});
var newtr = document.getElementById("tbody");

function tImage() {
	$('#tcloudimages').click(function() {
		PlanetX.api( "get", "https://apis.skplanetx.com/tcloud/images","JSON", { "version" :1 }, tcloud_images );
		function tcloud_images (response) {
			$('#tbody>tr').remove();
			for(j = 0; j < response.meta.images.image.length ; j++) {
				var createtr = newtr.appendChild(document.createElement("TR"));
				createtr.id = "tcloudlist" + j ;
				
				var td = createtr.appendChild(document.createElement("TD")).appendChild(document.createElement("input"));
				td.type = 'checkbox';
				td.id = 'tcheck' + j;
				
				
				(function(m) {
					var check = document.getElementById('tcheck' + m);
					/*if (check.checked == false) {
					$('#tcloudlist' + m).click(function() {
						$('#tcheck' + m).prop('checked', true);
					});
				} else if (check.checked == true) {
					$('#tcloudlist' + m).click(function() {
						console.log(m);
						$('#tcheck' + m).prop('checked', false);
					});
				}*/
					
					$('#deletebtn').click(function() {
						if(check.checked == true && tactive == true) {
							PlanetX.api( "post", "https://apis.skplanetx.com/tcloud/images/" + response.meta.images.image[m].objectId ,"JSON", {"version" : 1, "_method" : "DELETE" }, tcloud_delete );
						}
					});
					$('#downloadbtn').click(function(event) {
						if(check.checked == true && tactive == true) {
							var downloadURL = response.meta.images.image[m].downloadUrl;
							console.log(downloadURL);
							function downloadURI(uri) 
							{
								var link = document.createElement("a");
								link.download = 'ddd';
								link.target = '_blank';
								link.href = uri;
								link.click();
							}
							downloadURI(downloadURL);
							
							
							/*function SaveToDisk(fileURL, fileName) {
						    // for non-IE

						        var save = document.createElement('a');
						        save.href = fileURL;
						        save.target = '_blank';
						        save.download = fileName ;

						        var event = document.createEvent('Event');
						        event.initEvent('click', true, true);
						        save.dispatchEvent(event);
						        (window.URL || window.webkitURL).revokeObjectURL(save.href);

						}
						SaveToDisk(downloadURL, 'fileName.jpg');*/
						}
					});
				})(j);
				
				var td1 = createtr.appendChild(document.createElement("TD"));
				var view = new Image();
				view.src = response.meta.images.image[j].thumbnailUrl;
				td1.innerHTML = response.meta.images.image[j].name;
				img1 = td1.appendChild(view);
				img1.id = "image1";
				
				//document.getElementById("image1").style = "width : 50px;";
				
				var td2 = createtr.appendChild(document.createElement("TD"));
				
				var td3 = createtr.appendChild(document.createElement("TD"));
				var regExp2 = /^([0-9-]*)T/;
				var str2 = response.meta.images.image[j].modifiedDate;
				var result2 = str2.match(regExp2);
				var regExp3 = /T([0-9:]*)\+/;
				var str3 = response.meta.images.image[j].modifiedDate;
				var result3 = str3.match(regExp3);
				td3.innerHTML = result2[1] + " " + " / " + " " + result3[1];
				
				var td4 = createtr.appendChild(document.createElement("TD"));
				td4.innerHTML = fileSizeRename(response.meta.images.image[j].size);
				
				var td5 = createtr.appendChild(document.createElement("TD"));
				var regExp4 = /\.([\da-z\._]*)\?/;
				var str4 = response.meta.images.image[j].downloadUrl;
				var result4 = str4.match(regExp4);
				td5.innerHTML = result4[1];
				
				
			}
			console.log(response.meta.images.image[0]);
		}
	});
}

function tMusic() {
	$('#tcloudmusic').click(function(event) {
		PlanetX.api( "get", "https://apis.skplanetx.com/tcloud/music","JSON", { "version" :1 }, tcloud_music );
		function tcloud_music (response) {
			$('#tbody>tr').remove();
			for(j = 0; j < response.meta.music.music.length ; j++) {
				
				var createtr = newtr.appendChild(document.createElement("TR"));
				createtr.id = "tcloudlist" + j ;
				
				var td = createtr.appendChild(document.createElement("TD")).appendChild(document.createElement("input"));
				td.type = 'checkbox';
				td.id = 'tcheck' + j;
				
				(function(m) {
					var check = document.getElementById('tcheck' + m);
					
					$('#deletebtn').click(function() {
						if(check.checked == true && tactive == true) {
							PlanetX.api( "post", "https://apis.skplanetx.com/tcloud/images/" + response.meta.images.image[m].objectId ,"JSON", {"version" : 1, "_method" : "DELETE" }, tcloud_delete );
						}
					});
					$('#downloadbtn').click(function(event) {
						if(check.checked == true && tactive == true) {
							var downloadURL = response.meta.music.music[m].downloadUrl;
							console.log(downloadURL);
							function downloadURI(uri) 
							{
								var link = document.createElement("a");
								link.download = 'ddd';
								link.target = '_blank';
								link.href = uri;
								link.click();
							}
							downloadURI(downloadURL);
							
							
							/*function SaveToDisk(fileURL, fileName) {
						    // for non-IE
						   
						        var save = document.createElement('a');
						        save.href = fileURL;
						        save.target = '_blank';
						        save.download = fileName ;

						        var event = document.createEvent('Event');
						        event.initEvent('click', true, true);
						        save.dispatchEvent(event);
						        (window.URL || window.webkitURL).revokeObjectURL(save.href);

						}
						SaveToDisk(downloadURL, 'fileName.jpg');*/
						}
					});
				})(j);
				
				var td1 = createtr.appendChild(document.createElement("TD"));
				td1.innerHTML = response.meta.music.music[j].name;
				var regExpicon = /\.([\da-z]*)\?/;
				var stricon = response.meta.music.music[j].downloadUrl;
				var resulticon = stricon.match(regExpicon);
				if (resulticon[1] == "mp3") {
					var view = new Image();
					view.src = "../img/fileicon_mp3.png";
					td1.appendChild(view);
				} else {
					var view = new Image();
					view.src = "../img/fileicon_wav.png";
					td1.appendChild(view);
				}
				
				var td2 = createtr.appendChild(document.createElement("TD"));
				
				var td3 = createtr.appendChild(document.createElement("TD"));
				var regExp2 = /^([0-9-]*)T/;
				var str2 = response.meta.music.music[j].modifiedDate;
				var result2 = str2.match(regExp2);
				var regExp3 = /T([0-9:]*)\+/;
				var str3 = response.meta.music.music[j].modifiedDate;
				var result3 = str3.match(regExp3);
				td3.innerHTML = result2[1] + " " + " / " + " " + result3[1];
				
				var td4 = createtr.appendChild(document.createElement("TD"));
				td4.innerHTML = fileSizeRename(response.meta.music.music[j].size);
				
				var td5 = createtr.appendChild(document.createElement("TD"));
				var regExp4 = /\.([\da-z\._]*)\?/;
				var str4 = response.meta.music.music[j].downloadUrl;
				var result4 = str4.match(regExp4);
				td5.innerHTML = result4[1];
			}
		}
	});
}

function tMovie() {
	$('#tcloudmovies').click(function(event) {
		PlanetX.api( "get", "https://apis.skplanetx.com/tcloud/movies","JSON", { "version" :1 }, tcloud_movies );
		function tcloud_movies (response) {
			$('#tbody>tr').remove();
			for(j = 0; j < response.meta.movies.movie.length ; j++) {
				var createtr = newtr.appendChild(document.createElement("TR"));
				createtr.id = "tcloudlist" + j ;
				
				var td = createtr.appendChild(document.createElement("TD")).appendChild(document.createElement("input"));
				td.type = 'checkbox';
				td.id = 'tcheck' + j;
				
				(function(m) {
					var check = document.getElementById('tcheck' + m);
					
					$('#deletebtn').click(function() {
						if(check.checked == true && tactive == true) {
							PlanetX.api( "post", "https://apis.skplanetx.com/tcloud/images/" + response.meta.images.image[m].objectId ,"JSON", {"version" : 1, "_method" : "DELETE" }, tcloud_delete );
						}
					});
					$('#downloadbtn').click(function(event) {
						if(check.checked == true && tactive == true) {
							var downloadURL = response.meta.documents.document[m].downloadUrl;
							console.log(downloadURL);
							function downloadURI(uri) 
							{
								var link = document.createElement("a");
								link.download = 'ddd';
								link.target = '_blank';
								link.href = uri;
								link.click();
							}
							downloadURI(downloadURL);
							
							
							/*function SaveToDisk(fileURL, fileName) {
						    // for non-IE
						   
						        var save = document.createElement('a');
						        save.href = fileURL;
						        save.target = '_blank';
						        save.download = fileName ;

						        var event = document.createEvent('Event');
						        event.initEvent('click', true, true);
						        save.dispatchEvent(event);
						        (window.URL || window.webkitURL).revokeObjectURL(save.href);

						}
						SaveToDisk(downloadURL, 'fileName.jpg');*/
						}
					});
				})(j);
				
				var td1 = createtr.appendChild(document.createElement("TD"));
				var view = new Image();
				view.src = response.meta.movies.movie[j].thumbnailUrl;
				td1.innerHTML = response.meta.movies.movie[j].name;
				img1 = td1.appendChild(view);
				img1.id = "image1";
				
				var td2 = createtr.appendChild(document.createElement("TD"));
				
				var td3 = createtr.appendChild(document.createElement("TD"));
				var regExp2 = /^([0-9-]*)T/;
				var str2 = response.meta.movies.movie[j].modifiedDate;
				var result2 = str2.match(regExp2);
				var regExp3 = /T([0-9:]*)\+/;
				var str3 = response.meta.movies.movie[j].modifiedDate;
				var result3 = str3.match(regExp3);
				td3.innerHTML = result2[1] + " " + " / " + " " + result3[1];
				
				var td4 = createtr.appendChild(document.createElement("TD"));
				td4.innerHTML = fileSizeRename(response.meta.movies.movie[j].size);
				
				var td5 = createtr.appendChild(document.createElement("TD"));
				var regExp4 = /\.([\da-z\._]*)\?/;
				var str4 = response.meta.movies.movie[j].downloadUrl;
				var result4 = str4.match(regExp4);
				td5.innerHTML = result4[1];
			}
		}
	});
}

function tDoc() {
	$('#tclouddocuments').click(function(event) {
		PlanetX.api( "get", "https://apis.skplanetx.com/tcloud/documents","JSON", { "version" :1 }, tcloud_documents );
		function tcloud_documents (response) {
			$('#tbody>tr').remove();
			for(j = 0; j < response.meta.documents.document.length ; j++) {
				var createtr = newtr.appendChild(document.createElement("TR"));
				createtr.id = "tcloudlist" + j ;
				
				var td = createtr.appendChild(document.createElement("TD")).appendChild(document.createElement("input"));
				td.type = 'checkbox';
				td.id = 'tcheck' + j;
				
				(function(m) {
					var check = document.getElementById('tcheck' + m);
					
					$('#deletebtn').click(function() {
						if(check.checked == true && tactive == true) {
							PlanetX.api( "post", "https://apis.skplanetx.com/tcloud/images/" + response.meta.images.image[m].objectId ,"JSON", {"version" : 1, "_method" : "DELETE" }, tcloud_delete );
						}
					});
					$('#downloadbtn').click(function(event) {
						if(check.checked == true && tactive == true) {
							var downloadURL = response.meta.documents.document[m].downloadUrl;
							console.log(downloadURL);
							function downloadURI(uri) 
							{
								var link = document.createElement("a");
								link.download = 'ddd';
								link.target = '_blank';
								link.href = uri;
								link.click();
							}
							downloadURI(downloadURL);
							
							
							/*function SaveToDisk(fileURL, fileName) {
						    // for non-IE
						   
						        var save = document.createElement('a');
						        save.href = fileURL;
						        save.target = '_blank';
						        save.download = fileName ;

						        var event = document.createEvent('Event');
						        event.initEvent('click', true, true);
						        save.dispatchEvent(event);
						        (window.URL || window.webkitURL).revokeObjectURL(save.href);

						}
						SaveToDisk(downloadURL, 'fileName.jpg');*/
						}
					});
				})(j);
				
				var td1 = createtr.appendChild(document.createElement("TD"));
				td1.innerHTML = response.meta.documents.document[j].name;
				var regExpicon = /\.([\da-z]*)\?/;
				var stricon = response.meta.documents.document[j].downloadUrl;
				var resulticon = stricon.match(regExpicon);
				if (resulticon[1] == "pdf") {
					var view = new Image();
					view.src = "../img/fileicon_pdf.png";
					td1.appendChild(view);
				} else if (resulticon[1] == "pptx" || resulticon[1] == "ppt") {
					var view = new Image();
					view.src = "../img/fileicon_ppt.png";
					td1.appendChild(view);
				} else {
					var view = new Image();
					view.src = "../img/fileicon_text.png";
					td1.appendChild(view);
				}
				
				var td2 = createtr.appendChild(document.createElement("TD"));
				
				var td3 = createtr.appendChild(document.createElement("TD"));
				var regExp2 = /^([0-9-]*)T/;
				var str2 = response.meta.documents.document[j].modifiedDate;
				var result2 = str2.match(regExp2);
				var regExp3 = /T([0-9:]*)\+/;
				var str3 = response.meta.documents.document[j].modifiedDate;
				var result3 = str3.match(regExp3);
				td3.innerHTML = result2[1] + " " + " / " + " " + result3[1];
				
				var td4 = createtr.appendChild(document.createElement("TD"));
				td4.innerHTML = fileSizeRename(response.meta.documents.document[j].size);  
				
				var td5 = createtr.appendChild(document.createElement("TD"));
				var regExp4 = /\.([\da-z\._]*)\?/;
				var str4 = response.meta.documents.document[j].downloadUrl;
				var result4 = str4.match(regExp4);
				td5.innerHTML = result4[1];
			}
		}
	});
}
	


/* $('#tcloudlogin').click(function(event) {
	
	PlanetX.login(); 
	
});  */