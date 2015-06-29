var currentPage = document.location.href;
var regExpurl = /\=([\da-z\._-]*)\&/;
var sktoken = currentPage.match(regExpurl);
if(sktoken != null){
	console.log(sktoken[1]);
	console.log(currentPage);
}
$(function (){
    PlanetX.init({
    	  appkey : "a9e7c01c-2062-37fc-b8ad-56eddcce4063" ,   // 본인의 appkey 정보 입력
        client_id : "4b11f26b-424a-332d-b331-103ee34178d0", // 본인의 client id 정보 입력
        redirect_uri : "http://cloud.ddalki.com:9999/ddalki/ddalki-main/main.html",            // 본인의 redirect uri 정보 입력
        scope : "tcloud,user",
        // if true, token is saved cookie or localstorage
        savingToken : true
    });
    
    var status = PlanetX.getLoginStatus();
    console.log(status);
    
    if (status) {
    	PlanetX.api( "get", "https://apis.skplanetx.com/tcloud/images","JSON", { "version" :1 }, tcloud_images );
    	PlanetX.api( "get", "https://apis.skplanetx.com/tcloud/music","JSON", { "version" :1 }, tcloud_music );
    	PlanetX.api( "get", "https://apis.skplanetx.com/tcloud/movies","JSON", { "version" :1 }, tcloud_movies );
    	PlanetX.api( "get", "https://apis.skplanetx.com/tcloud/documents","JSON", { "version" :1 }, tcloud_documents );
    }
   // PlanetX.api( "get", "https://apis.skplanetx.com/tcloud/images","JSON", { "version" :1 }, tcloud_callback );
    
   	//PlanetX.api( "get", "https://apis.skplanetx.com/users/me/profile", "JSON", { "version": 1}, userProfile_callback );
    	     
});
function tcloud_delete (response) {
	console.log(response);
}

function tcloud_update (response) {
	console.log(response.storage.token);
	document.getElementById('upurl').action = response.storage.token;
	document.getElementById('upload').style.display = "block";
	/* $('#upurl') */
	
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

var newtr = document.getElementById("tbody");
function tcloud_images (response) {
	$('#tcloudimages').click(function(event) {
		$('#tbody>tr').remove();
		for(j = 0; j < response.meta.images.image.length ; j++) {
			var createtr = newtr.appendChild(document.createElement("TR"));
			createtr.id = "tcloudlist" + j ;
			
			var td = createtr.appendChild(document.createElement("TD")).appendChild(document.createElement("input"));
			td.type = 'checkbox';
			td.id = 'tcheck' + j;
			
			(function(m) {
				var check = document.getElementById('tcheck' + m);
				console.log(check);
				$('#deletebtn').click(function(event) {
		        if(check.checked == true) {
		          var imgID = response.meta.images.image[m].objectId;
		          console.log(imgID);
		          $.ajax("https://apis.skplanetx.com/tcloud/images/" + response.meta.images.image[m].objectId + "?version=1", {
	                  method: 'DELETE',
	                  dataType: 'json',
	                  headers: {
	                	  access_token : sktoken[1]
	                  },
	                  success: function(result) {
	                     console.log(result.data);
	                  },
	                  error: function(xhr, textStatus, errorThrown) {
	                    alert('문제잇음');
	                  }
	             });
		          /* PlanetX.api( "DELETE", "https://apis.skplanetx.com/tcloud/images/" + response.meta.images.image[m].objectId + "?version=1" ,
		        		          "JSON", {"version" :1} , tcloud_delete); */
		        }
	      });
				$('#downloadbtn').click(function(event) {
					if(check.checked == true) {
						var downloadURL = response.meta.images.image[m].downloadUrl;
						console.log(downloadURL);
						$.ajax(response.meta.images.image[m].downloadUrl, {
					        method: 'GET',
					        success: function(result) {
					           console.log(result.data);
					        },
					        error: function(xhr, textStatus, errorThrown) {
					          alert('문제잇음');
					        }
					   });
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
			  td4.innerHTML = response.meta.images.image[j].size + "byte";
			
			var td5 = createtr.appendChild(document.createElement("TD"));
			   var regExp4 = /\.([\da-z\._]*)\?/;
        var str4 = response.meta.images.image[j].downloadUrl;
        var result4 = str4.match(regExp4);
        td5.innerHTML = result4[1];
        
      
		}
		console.log(response.meta.images.image[0]);
	});
}
function tcloud_music (response) {
	$('#tcloudmusic').click(function(event) {
	    $('#tbody>tr').remove();
	    for(j = 0; j < response.meta.music.music.length ; j++) {
	      
	      var createtr = newtr.appendChild(document.createElement("TR"));
	      createtr.id = "tcloudlist" + j ;
	      
	      var td = createtr.appendChild(document.createElement("TD")).appendChild(document.createElement("input"));
	      td.type = 'checkbox';
	      
	      var td1 = createtr.appendChild(document.createElement("TD"));
	      td1.innerHTML = response.meta.music.music[j].name;
	      var regExpicon = /\.([\da-z\._]*)\?/;
        var stricon = response.meta.music.music[j].downloadUrl;
        var resulticon = stricon.match(regExp4);
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
	        td4.innerHTML = response.meta.music.music[j].size + "byte";
	        
	      var td5 = createtr.appendChild(document.createElement("TD"));
	         var regExp4 = /\.([\da-z\._]*)\?/;
	        var str4 = response.meta.music.music[j].downloadUrl;
	        var result4 = str4.match(regExp4);
	        td5.innerHTML = result4[1];
	    }
	  });
	console.log(response.meta.music);
}
function tcloud_movies (response) {
	$('#tcloudmovies').click(function(event) {
	      $('#tbody>tr').remove();
	      for(j = 0; j < response.meta.movies.movie.length ; j++) {
	        var createtr = newtr.appendChild(document.createElement("TR"));
	        createtr.id = "tcloudlist" + j ;
	        
	        var td = createtr.appendChild(document.createElement("TD")).appendChild(document.createElement("input"));
	        td.type = 'checkbox';
	        td.id = 'tcheck' + j;
	        
	        (function(m) {
	            var check = document.getElementById('tcheck' + m);
	            console.log(check);
	            $('#uploadbtn').click(function(event) {
	                  if(check.checked == true) {
	                    /* var imgID = response.meta.images.image[m].objectId;
	                    console.log(imgID); */
	                    PlanetX.api( "get", "https://apis.skplanetx.com/tcloud/token","JSON", {"version" :1} , tcloud_update );
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
	           td4.innerHTML = response.meta.movies.movie[j].size + "byte";
	        
	        var td5 = createtr.appendChild(document.createElement("TD"));
	           var regExp4 = /\.([\da-z\._]*)\?/;
	          var str4 = response.meta.movies.movie[j].downloadUrl;
	          var result4 = str4.match(regExp4);
	          td5.innerHTML = result4[1];
	      }
	    });
	console.log(response.meta.movies);
}
function tcloud_documents (response) {
	$('#tclouddocuments').click(function(event) {
        $('#tbody>tr').remove();
        for(j = 0; j < response.meta.documents.document.length ; j++) {
          var createtr = newtr.appendChild(document.createElement("TR"));
          createtr.id = "tcloudlist" + j ;
          
          var td = createtr.appendChild(document.createElement("TD")).appendChild(document.createElement("input"));
          td.type = 'checkbox';
          
          var td1 = createtr.appendChild(document.createElement("TD"));
          td1.innerHTML = response.meta.documents.document[j].name;
          var regExpicon = /\.([\da-z\._]*)\?/;
          var stricon = response.meta.documents.document[j].downloadUrl;
          var resulticon = stricon.match(regExp4);
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
            td4.innerHTML = response.meta.documents.document[j].size + "byte";  
          
          var td5 = createtr.appendChild(document.createElement("TD"));
             var regExp4 = /\.([\da-z\._]*)\?/;
            var str4 = response.meta.documents.document[j].downloadUrl;
            var result4 = str4.match(regExp4);
            td5.innerHTML = result4[1];
        }
      });
	console.log(response.meta.documents);
}
	
function userProfile_callback( data ) {
	console.log(data);
    /* var resultMessage, resultDivision = $("#result1"); 
    resultMessage = "<h2> userProfile success </h2>" ;
             
    for ( var property in data.profile ) {
        resultMessage +=  (property + " : " + data.profile[property] + "<br>") ;
    }
             
    resultDivision.html( resultMessage );        */
  }


/* $('#tcloudlogin').click(function(event) {
	
	PlanetX.login(); 
	
});  */