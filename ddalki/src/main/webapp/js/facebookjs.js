(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/ko_KR/sdk.js#xfbml=1&version=v2.3&appId=1850145288544328";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

window.fbAsyncInit = function() {
    FB.init({
      appId : '1850145288544328',
      cookie : true, // enable cookies to allow the server to access 
      status : true, // the session
      xfbml : true, // parse social plugins on this page
      version : 'v2.3' // use version 2.2
    });

    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
}

	$('#facebooklogin').click(function(event) {
		
		FB.login(function(response) {
		var token;
		var cloudid;
		var newul = document.getElementById("facebooklist");
		var newLI = document.createElement("LI");
		
			if (response.status === 'connected') {
				token = response.authResponse.accessToken;
				console.log(response.authResponse.accessToken);
		    console.log(response.authResponse.userID);
				
		    FB.api('/v2.3/'+ response.authResponse.userID, function(response) {
		    	cloudid = response.email;
		          console.log(response);
		          console.log(response.name);
		          console.log(cloudid);
		       

		    $.ajax('http://' + ip + directoryLocation + '/addcloud.do', {
		        method: 'POST',
		        dataType: 'json',
		        data: {
		          email: $.session.get('useremail'),
		          cloudtype: 'facebook',
		          cloudid: cloudid,
		          token: token,
		          active: 'Y'
		        },
		        success: function(result) {
		           alert('facebook 등록이 완료되었습니다.');
		        },
		        error: function(xhr, textStatus, errorThrown) {
		          alert('자걱.\n' + 
		              '잠시 후 다시 시도하세요.\n' +
		          '계속 창이 뜬다면, 관리자에 문의하세요.(사내번호:1112)');
		        }
		      });
		    });
		    
		    FB.api('me/albums', function(response) {
		        console.log(response);
		        var newul2 = document.getElementById("facebooklist");
		        var newtr = document.getElementById("tbody");
		        
		        for (i = 0; i < response.data.length; i++) {
		                li = newul2.appendChild(document.createElement("LI")).appendChild(document.createElement("a"));
		                li.innerHTML = response.data[i].name;
		                li.id = "fbfolderlist" + i;
		                
		                (function(m) {
		                  $('#fbfolderlist' + m).click(function(event) {
		                     $('#tbody>tr').remove(); 
		                    FB.api(response.data[m].id + '/photos', function(response2) {
		                      for(j = 0; j < response2.data.length ; j++) {
		                        var regExp = /\/([\da-z\._]*)\?/;
		                        var str = response2.data[j].picture;
		                        var result = str.match(regExp);
		 
		                        var createtr = newtr.appendChild(document.createElement("TR"));
		                        createtr.id = "fbimagelist" + j;
		                        
		                        td1 = createtr.appendChild(document.createElement("TD"));
		                        //td1.type = 'checkbox';
		                        
		                        td2 = createtr.appendChild(document.createElement("TD"));
		                        td2.innerHTML = result[1];
		                        var view2 = new Image();
		                        view2.src = response2.data[j].picture;
		                        img1 = td2.appendChild(view2);
		                        console.log(response2.data[j].picture);
		                        img1.id = "image1";
		                        
		                        td3 = createtr.appendChild(document.createElement("Td"));
		                        
		                        td4 = createtr.appendChild(document.createElement("Td"));
		                        var regExp2 = /^([0-9-]*)T/;
		                        var str2 = response2.data[j].updated_time;
		                        var result2 = str2.match(regExp2);
		                        var regExp3 = /T([0-9:]*)\+/;
		                        var str3 = response2.data[j].updated_time;
		                        var result3 = str3.match(regExp3);
		                        td4.innerHTML = result2[1] + " " + " / " + " " + result3[1];
		                        
		                        td5 = createtr.appendChild(document.createElement("Td"));
		                        
		                        td6 = createtr.appendChild(document.createElement("Td"));
		                        var regExp4 = /\.([\da-z\._]*)\?/;
		                        var str4 = response2.data[j].picture;
		                        var result4 = str.match(regExp4);
		                        td6.innerHTML = result4 [1];
		     
		                        console.log(response2);
		                        document.getElementById("fbimagelist" + j).style.cursor = "pointer";
		                        /* (function(z) {
		                          $('#fbimagelist' + z).click(function(event) {
		                            window.open(response2.data[z].source, "사진", "width=800, height=700, toolbar=no, menubar=no, scrollbars=no, resizable=yes" );
		                          });
		                        })(j); */
		                      }
		                    });
		                  });
		                })(i);
		              } 
		      });
		    
		    } else if (response.status === 'not_authorized') {
		    	  
		    } else {

		    }
		}, {
			scope : 'publish_actions, user_photos',
			return_scopes : true
		});

	});

	function checkLoginState() {
		FB.getLoginStatus(function(response) {
			statusChangeCallback(response);
		});
	}

	function statusChangeCallback(response) {

		if (response.status === 'connected') {
			var album3;
			FB.api('/me', function(response) {
				  
            });
			
			FB.api('me/albums', function(response) {
				var newul2 = document.getElementById("facebooklist");
				var newtr = document.getElementById("tbody");
				for (i = 0; i < response.data.length; i++) {
		            li = newul2.appendChild(document.createElement("LI")).appendChild(document.createElement("a"));
		            li.innerHTML = response.data[i].name;
		            li.id = "fbfolderlist" + i;
		            
		            (function(m) {
			            $('#fbfolderlist' + m).click(function(event) {
			            	$('#tbody>tr').remove();
			            	console.log(response.data[m].id);
			            	$('#uploadbtn').click(function(event) {
			            		console.log(response.data[m].id);  
			            		/* document.getElementById('upload2').style.display = "block";
			            		$('#fbuploadbtn').click(function(event) {
				            		console.log($('#fbfile').val());
			            			 FB.api('/' + response.data[m].id + '/photos', 'post', {
	                                    message: $('#fbtext').val(),
	                                    url: $('#fbfile').val()   
	                                }, function(response){

	                                    if (!response || response.error) {
	                                        console.log('error');
	                                        console.log(response.error);
	                                    } else {
	                                        console.log('ok');
	                                    }
	                                }); 
			            		}); */
			            		FB.api('/' + response.data[m].id + '/photos', 'post', {
                                    message:'photo description',
                                    url: "http://192.168.103.65:9999/ddalki/upload/pic03.jpg"   
                                }, function(response){

                                    if (!response || response.error) {
                                        console.log('error');
                                        console.log(response.error);
                                    } else {
                                        console.log('ok');
                                    }
                                });  
			            	});
			            	
			            	FB.api(response.data[m].id + '/photos', function(response2) {
				            	for(j = 0; j < response2.data.length ; j++) {
				            		var regExp = /\/([\da-z\._]*)\?/;
                        var str = response2.data[j].picture;
                        var result = str.match(regExp);
 
                        var createtr = newtr.appendChild(document.createElement("TR"));
                        createtr.id = "fbimagelist" + j;
                        
                        td1 = createtr.appendChild(document.createElement("TD")).appendChild(document.createElement("input"));
                        td1.type = 'checkbox';
                        td1.id = 'tcheck' + j;
                        
                        /* (function(k) {
                            var check = document.getElementById('tcheck' + k);
                            $('#uploadbtn').click(function(event) {
                                  if(check.checked == true) {
                                    
                                     FB.api('/' + response.data[j].id + '/photos', 'post', {
                                        message:'photo description',
                                        url: "http://ojsfile.ohmynews.com/MEM_ETC/00074927.jpg"   
                                    }, function(response){

                                        if (!response || response.error) {
                                            console.log('error');
                                            console.log(response.error);
                                        } else {
                                            console.log('ok');
                                        }
                                    });   
                                  }
                                });
                          })(j); */
                        
                        td2 = createtr.appendChild(document.createElement("TD"));
                        td2.innerHTML = result[1];
                        var view2 = new Image();
                        view2.src = response2.data[j].picture;
                        img1 = td2.appendChild(view2);
                        img1.id = "image1";
                        
                        td3 = createtr.appendChild(document.createElement("Td"));
                        
                        td4 = createtr.appendChild(document.createElement("Td"));
                        var regExp2 = /^([0-9-]*)T/;
                        var str2 = response2.data[j].updated_time;
                        var result2 = str2.match(regExp2);
                        var regExp3 = /T([0-9:]*)\+/;
                        var str3 = response2.data[j].updated_time;
                        var result3 = str3.match(regExp3);
                        td4.innerHTML = result2[1] + " " + " / " + " " + result3[1];
                        
                        td5 = createtr.appendChild(document.createElement("Td"));
                        
                        td6 = createtr.appendChild(document.createElement("Td"));
                        var regExp4 = /\.([\da-z\._]*)\?/;
                        var str4 = response2.data[j].picture;
                        var result4 = str.match(regExp4);
                        td6.innerHTML = result4 [1];
		 
				                
				                /* (function(z) {
					                $('#fbimagelist' + z).click(function(event) {
					                	window.open(response2.data[z].source, "사진", "width=800, height=700, toolbar=no, menubar=no, scrollbars=no, resizable=yes" );
					                });
				                })(j); */
				            	}
			            	});
		              });
		            })(i);
		          } 
			});


			testAPI(response.authResponse.userID);
			
		} else if (response.status === 'not_authorized') {

		} else {

		}
	}
	
	function testAPI(uid) {
	      FB.api('/v2.3/'+uid, function(response) {
	    	  /* console.log(response);
	        console.log(response.email);
	        console.log(response.name); */
	      });
	    }
	
	
	
 