var client = new Dropbox.Client({ key: 'y7tt5ruwf0t6d4e' });
var alldirandfile = [];
// Try to complete OAuth flow.
client.authenticate({ interactive: false }, function (error, client) {
  if (error) {
      alert('Error: ' + error);
  } else {
	  if(client._credentials != null) {
      	var ip = 'localhost:9999/ddalki';
        var directoryLocation = '/cloud';
	    $.ajax('http://' + ip + directoryLocation + '/hasCloud.do', {
	        method: 'POST',
	        dataType: 'json',
	        data: {
	          email: "aa",
	          cloudtype: "dropbox",
	          cloudid: "allow"
	        },
	        success: function(result) {
	        	dropboxactive();
	        	if (alldirandfile.length == 0 && client.isAuthenticated()) {
        		  function againlist(path) {
        		    client.readdir(path, function (error, results, now, under) {
        		      if (error) {
        		        console.log(error);   
        		      }
        		      alldirandfile.push(now);
        		      for(var i = 0; i < under.length; i++) {
        		        if(under[i].mimeType == "inode/directory") againlist(under[i].path);
        		      }
        		    });
        		  }
        		  againlist('/');
        		}
	        },
	        error: function(xhr, textStatus, errorThrown) {
	          alert('자걱.\n' + 
	              '잠시 후 다시 시도하세요.\n' +
	          '계속 창이 뜬다면, 관리자에 문의하세요.(사내번호:1112)');
	        }
	      });
	  } else {
		  dropboxunactive();
	  }
  }
});

function dropboxactive() {
	//존재하면서 활성화
}

function dropboxunactive() {
	var ip = 'localhost:9999/ddalki';
	  var directoryLocation = '/cloud';
	  $.ajax('http://' + ip + directoryLocation + '/hasCloud.do', {
	    method: 'POST',
	    dataType: 'json',
	    data: {
	      email: "aa",
	      cloudtype: "dropbox",
	      cloudid: "allow"
	    },
	    success: function(result) {
	    	if(result.cloud == "exist") {
	    		// 있으면서 비활성화
	    	} else {
	    		// 존재조차 안함
	    	}
	    },
	    error: function(xhr, textStatus, errorThrown) {
	      alert('자걱.\n' + 
	          '잠시 후 다시 시도하세요.\n' +
	      '계속 창이 뜬다면, 관리자에 문의하세요.(사내번호:1112)');
	    }
	  });
}


if (client.isAuthenticated()) {
  function againlist(path) {
    client.readdir(path, function (error, results, now, under) {
      if (error) {
        console.log(error);   
      }
      alldirandfile.push(now);
      if(under != undefined) {
    	  for(var i = 0; i < under.length; i++) {
    		  if(under[i].mimeType == "inode/directory") againlist(under[i].path);
    	  }
      }
    });
  }
  againlist('/');
}
 
function dropboxinbtn () {
  client.authenticate(function (error, client) {
    if (error) {
      alert('Error: ' + error);
    } else {
      alert('접속됨!!!');
    }
  });
}

function allfile() {
	console.log(alldirandfile);
}

function inputdirectory() {
	if($("#dbxsidelist2 > li").length == 0) {
		for (var i in alldirandfile) {
			if(alldirandfile[i].path != "" && 
					alldirandfile[i].path == "/" + alldirandfile[i].name) {
				$("#dbxsidelist2").append("<li> <a id='" + alldirandfile[i].contentHash 
						+ "' onclick='dropboxfiletable(this.id)'>"+ alldirandfile[i].name 
						+"<span class='fa arrow'></span></a><ul class='nav nav-" 
						+ order[2] + "-level'></ul></li>");
				dropboxdirecAdd(alldirandfile[i].path, alldirandfile[i].contentHash, 3);
			}
		}
	}
}

function dropboxdirecAdd(path, id, inteager) {
	if($("#" + id + "+ ul > li").length == 0) {
		for (var i in alldirandfile) {
			if(((alldirandfile[i].path).split("/" + alldirandfile[i].name))[0] == path) {
				$("#" + id + "+ ul").append("<li> <a id='" + alldirandfile[i].contentHash 
						+ "' onclick='dropboxfiletable(this.id)'>"+ alldirandfile[i].name 
						+"<span class='fa arrow'></span></a><ul class='nav nav-"
						+ order[inteager] + "-level'></ul></li>");
				dropboxdirecAdd(alldirandfile[i].path, alldirandfile[i].contentHash, inteager + 1);
			}
		}
	}
}

var dropboxallow = false;
$('.btn-dropbox').click(function() {
	inputdirectory();
	dropboxallow = true;
	dropboxfiletable("/");
});

var months = {
		  "Jan" : 1,
		  "Feb" : 2,
		  "Mar" : 3,
		  "Apr" : 4,
		  "May" : 5,
		  "Jun" : 6,
		  "Jul" : 7,
		  "Aug" : 8,
		  "Sept": 9,
		  "Oct" : 10,
		  "Nov" : 11,
		  "Dec" : 12
		};
var droptarget = '';
function dropboxfiletable(id) {
	//id가 해쉬값, 디렉토리의 배열값(파일, 폴더)
	$('#dropupbtn').remove();
	var thumnailobj;
	var thumnailtag;
	if(id != "/") {
		thumnailobj = thumnailFind(dropArrayFind(id)[0].path, "path");
		droptarget = id;
	}
	else if(id == "/"){
		thumnailobj = thumnailFind("", "path");
		id = droprootFind()[0].contentHash;
		droptarget = "/";
	}
	var tablevalue = dropArrayFind(id)[0]._json.contents;
	var title;
    var time;
    $("#tbody > tr").remove();
	for (var i in tablevalue) {
		if(tablevalue[i].is_dir == false) {
			title = tablevalue[i].path.split("/");
			time = tablevalue[i].modified.split(" ");
			time = time[3] + "-" + months[time[2]] + "-" + time[1];
			if(thumnailobj.length != 0) {
				if(thumnailFind(title[title.length - 1],"name")[0].thumnail == "undefined") {
					thumnailtag = "";
				} else {
					thumnailtag = "<img src='"+ thumnailFind(title[title.length - 1] 
					,"name")[0].thumnail +"' id='image1'>";
				}
			} else {
				thumnailtag = "";
			}
			$("#tbody").append("<tr><td><input type='checkbox' name='" 
					                + tablevalue[i].path + "'></td>"
                                    + "<td>"+ title[title.length - 1] + thumnailtag +"</td>"
                                    + "<td></td>"
                                    + "<td>"+ time +"</td>"
                                    + "<td class='center'>"+ tablevalue[i].size +"</td>"
                                    + "<td class='center'>"+ dropmimetype(title[title.length - 1]) +"</td></tr>");
		} else if (tablevalue[i].is_dir == true){
			title = tablevalue[i].path.split("/");
			time = tablevalue[i].modified.split(" ");
			time = time[3] + "-" + months[time[2]] + "-" + time[1];
			$("#tbody").append("<tr><td><input type='checkbox' name='" 
					+ tablevalue[i].path + "'></td>"
                    + "<td>"+ title[title.length - 1] +"</td>"
                    + "<td></td>"
                    + "<td>"+ time +"</td>"
                    + "<td class='center'></td>"
                    + "<td class='center'>folder</td></tr>");
		}
	}
	etcthumnail();
}

function etcthumnail() {
	var td = $('#tbody tr td:nth-child(6)');
	for (var i = 0; i < td.length; i++ ) {
		if(td[i].innerText != "jpg" && td[i].innerText != "png") {
			td[i].parentElement.childNodes[1].innerHTML += imghtmltag(td[i].innerText);
		}
	}
}

function imghtmltag(type) {
	switch (type) {
	case "ppt":
		return "<img src='../img/fileicon_ppt.png' id='image1'>";
		break;
	case "pptx":
		return "<img src='../img/fileicon_ppt.png' id='image1'>";
		break;
	case "folder":
		return "<img src='../img/fileicon_folder.png' id='image1'>";
		break;
	case "hwp":
		return "<img src='../img/fileicon_doc.png' id='image1'>";
		break;
	case "doc":
		return "<img src='../img/fileicon_doc.png' id='image1'>";
		break;
	case "avi":
		return "<img src='../img/fileicon_avi.png' id='image1'>";
		break;
	case "html":
		return "<img src='../img/fileicon_html.png' id='image1'>";
		break;
	case "mp3":
		return "<img src='../img/fileicon_mp3.png' id='image1'>";
		break;
	case "pdf":
		return "<img src='../img/fileicon_pdf.png' id='image1'>";
		break;
	case "text":
		return "<img src='../img/fileicon_text.png' id='image1'>";
		break;
	case "wav":
		return "<img src='../img/fileicon_wav.png' id='image1'>";
		break;
	case "wma":
		return "<img src='../img/fileicon_wma.png' id='image1'>";
		break;
	case "xls":
		return "<img src='../img/fileicon_xls.png' id='image1'>";
		break;
	case "zip":
		return "<img src='../img/fileicon_zip.png' id='image1'>";
		break;
	case "gif":
		return "<img src='../img/fileicon_gif.png' id='image1'>";
		break;
	case "bmp":
		return "<img src='../img/fileicon_bmp.png' id='image1'>";
		break;
	default:
		return "<img src='../img/quest.jpg' id='image1'>";
	}
}

function dropArrayFind(contentHash) {
	return alldirandfile.filter(function( obj ) {
		//프로퍼티중에 특정 값이 있는 오브젝트를 반환
		return obj.contentHash == contentHash;
	});
}

function droprootFind() {
	return alldirandfile.filter(function( obj ) {
		//프로퍼티중에 특정 값이 있는 오브젝트를 반환
		return obj._json.path == "/";
	});
}

function dropmimetype(type) {
	var mime = "";
	for (var i = type.length - 1; i > -1; i--) {
		if(type[i] == ".") break;
		mime = type[i] + mime;
	}
	if(mime != type) return mime;
	else return "";
}

$(".left img:nth-child(4)").click(function(event) {
	if(dropboxallow) {
		var input = $("#tbody input:checked");
		var path = [];
		for (var i = 0; i < input.length; i++) {
			path.push(input[i].name);
		}
		if(path.length != 0) dropdownload(path);
	}
});

//드롭박스만 작동하게 하기
$(".btn-facebook, .btn-instagram, .btn-google-plus, .btn-twitter").click(function(event) {
	dropboxallow = false;
	droptarget = "";
});

$('.btn-social').click(function(event) {
	$('#dropupbtn').remove();
})

function dropdownload(path) {
	for(var i = 0; i < path.length; i++) {
	  client.makeUrl(path[i], {'download' : true}, function (error, downurl) {
        if (error) {
          console.log('Error: ' + error);
        } else {
        	document.location = downurl.url + "?dl=1"
        }
	  });
	}
}


function dropupload(e) {
  var filename = e.target.value.split("\\")[e.target.value.split("\\").length - 1];
  var path = "";
  if(droptarget != "") {
	  if(droptarget != "/") path = dropArrayFind(droptarget)[0].path + "/" + filename;
	  else if((droptarget == "/")) path = droptarget + filename;
	  client.writeFile(path, e.target.files[0], {}, function (error, upload) {
		  if (!error) {
		    client.readdir((droptarget == "/") ? "/" : upload.path.split("/" + upload.name)[0],
		    		function (error, results, now, under) {
		        if (error) {
		          console.log(error);
		        } else {
		          alert('업로드 성공');
		          for(var i in alldirandfile) {
		        	if (alldirandfile[i].path == now.path) {
		        		alldirandfile[i] = now;
		        		if(droptarget != "/") {
		        			$('#' + droptarget).attr("id", alldirandfile[i].contentHash);
		        			droptarget = alldirandfile[i].contentHash;
		        		}
		        		break;
		        	}
		          } 
				  if(droptarget != "/") $('#' + droptarget).trigger('click');
				  else $('.btn-dropbox').trigger('click');
		        }
		     });
		  } else {
			  console.log(error);
		  }
	  });
  }
}

$('.left img:nth-child(5)').click(function() {
	if(dropboxallow) $('.dataTable_wrapper').append('<input id="dropupbtn" ' 
			       + ' type="file" accept="*/*" onchange="dropupload(event)">');
});

$('.left img:nth-child(3)').click(function() {
	if(dropboxallow) {
		var input = $("#tbody input:checked");
		var path = [];
		for (var i = 0; i < input.length; i++) {
			path.push(input[i].name);
		}
		if(path.length != 0) dropdelete(path);
	}
});

function dropdelete(path) {
	var resultint = 0;
	for(var i = 0; i < path.length; i++) {
	  client.remove(path[i], function (error, result) {
        if (error) {
          console.log('Error: ' + error);
        } else {
          resultint++;
          if(resultint == path.length) {
		    client.readdir((droptarget == "/") ? "/" : result.path.split("/" + result.name)[0],
		    		function (error, results, now, under) {
		        if (error) {
		          console.log(error);
		        } else {
		          alert("삭제하였습니다.");
		          for(var i in alldirandfile) {
		        	if (alldirandfile[i].path == now.path) {
		        		alldirandfile[i] = now;
		        		if(droptarget != "/") {
		        			$('#' + droptarget).attr("id", alldirandfile[i].contentHash);
		        			droptarget = alldirandfile[i].contentHash;
		        		}
		        		break;
		        	}
		          } 
				  if(droptarget != "/") $('#' + droptarget).trigger('click');
				  else $('.btn-dropbox').trigger('click');
		        }
		     });
          }
        }
	  });
	}
}

$('.left img:nth-child(6)').click(function() {
	if(dropboxallow) {
	  var path = "";
	  if(droptarget != "/") path = dropArrayFind(droptarget)[0].path + "/새 폴더";
	  else path = "/새 폴더";
	  client.mkdir(path, function (error, result) {
          if (error) {
            console.log('Error: ' + error);
          } else {
  		    client.readdir((droptarget == "/") ? "/" : result.path.split("/" + result.name)[0],
  		    		function (error, results, now, under) {
  		        if (error) {
  		          console.log(error);
  		        } else {
  		          alert("폴더를 생성하였습니다.");
  		          for(var i in alldirandfile) {
  		        	if (alldirandfile[i].path == now.path) {
  		        		alldirandfile[i] = now;
  		        		if(droptarget != "/") {
  		        			$('#' + droptarget).attr("id", alldirandfile[i].contentHash);
  		        			droptarget = alldirandfile[i].contentHash;
  		        		}
  		        		break;
  		        	}
  		          } 
  				  if(droptarget != "/") $('#' + droptarget).trigger('click');
  				  else $('.btn-dropbox').trigger('click');
  		        }
  		     });
          }
	  });
	}
});

$('.left img:nth-child(7)').click(function() {
	console.log(dropboxallow);
	if(dropboxallow) {
      var tr = $("#tbody input");
      var name = null;
      var j = 0;
	  for (var i = 0; i < tr.length; i++) {
		  if(tr[i].checked && j == 0) {
			  j++;
			  name = tr[i];
		  }
		  if(tr[i].checked && j != 0 && j != 1) {
			  tr[i].checked = false;
		  }
      }
	  var titleTd = $(name.parentNode.parentNode.childNodes[1])[0];
	  var mimeType = $(name.parentNode.parentNode.childNodes[5])[0].innerText;
	  if(name.checked) {
		  titleTd.innerText = '';
		  titleTd.innerHTML = '<span><input id="dropnewtitle" type="text"/><button id="dropin">등록</button>' 
			  + '<button id="dropgetoutofhere">취소</button></span>';
		  $('#dropin').click(function() {
			  if(mimeType == "" || mimeType == "folder") {
				  mimeType = "";
				  dropRenameFile($('#dropnewtitle').val() + mimeType);
			  } else {
				  dropRenameFile($('#dropnewtitle').val() + "." + mimeType);
			  }
		  });
		  $('#dropgetoutofhere').click(function() {
			  $('#' + droptarget).trigger("click");
		  });
	  } 
	}
});

function dropRenameFile(name) {
	console.log(name);
	var input = $("#tbody input:checked");
	path = input[0].name.split("/");
	path = input[0].name.split(path[path.length - 1])[0];
	path = path + name;
	client.move(input[0].name, path ,function (error, result) {
		if(!error) {
			droprefresh(result);
			console.log(result);
		} else {
			alert("같은 이름이 존재합니다");
		}
	});
}

function droprefresh(result) {
    client.readdir((droptarget == "/") ? "/" : result.path.split("/" + result.name)[0],
    		function (error, results, now, under) {
        if (error) {
          console.log(error);
        } else {
          alert("이름을 변경하였습니다.");
          for(var i in alldirandfile) {
        	if (alldirandfile[i].path == now.path) {
        		alldirandfile[i] = now;
        		if(droptarget != "/") {
        			$('#' + droptarget).attr("id", alldirandfile[i].contentHash);
        			droptarget = alldirandfile[i].contentHash;
        		}
        		break;
        	}
          } 
		  if(droptarget != "/") $('#' + droptarget).trigger('click');
		  else $('.btn-dropbox').trigger('click');
        }
     });
}

$('.btn-social').click(function() {
	$('#side-menu').metisMenu();
});

var thumnailarray = [];

$('.btn-dropbox').click(function() {
	for(var i = 0; i < alldirandfile.length; i++) {
		for(var j = 0; j < alldirandfile[i]._json.contents.length; j++) {
			var thumnail = {};
			if (alldirandfile[i]._json.contents[j].mime_type != undefined) {
				var img = alldirandfile[i]._json.contents[j].mime_type.split("/")[0];
				if(img == "image") {
					thumnail.thumnail = client.thumbnailUrl(alldirandfile[i]._json.contents[j].path, {});
					thumnail.mime = alldirandfile[i]._json.contents[j].mime_type;
					thumnail.path = alldirandfile[i]._json.contents[j].path;
					thumnail.name = alldirandfile[i]._json.contents[j].path.
					split("/")[alldirandfile[i]._json.contents[j].
					           path.split("/").length - 1];
					thumnail.parent_dir_path = thumnail.path.split("/" + thumnail.name)[0];
					thumnailarray.push(thumnail);
				}
			}
		}
	}
});

function thumnailFind(path , str) {
	if(str == "path") {
		return thumnailarray.filter(function( obj ) {
			return obj.parent_dir_path == path;
		});
	} else {
		return thumnailarray.filter(function( obj ) {
			return obj.name == path;
		});
	}
}

