
// 사용할 앱의 Javascript 키를 설정해 주세요.
Kakao.init('da71339ba6568c0984f01908db866f23');
var kakaologin = false;

function loginWithKakao() {
	// 로그인 창을 띄웁니다.
	Kakao.Auth.login({
		success : function(authObj) {
			console.log('로그인 성공' + JSON.stringify(authObj));
			//document.location.reload();
		},
		fail : function(err) {
			console.log('로그인 실패' + JSON.stringify(err))
		}
	});
};

//로그인 검사기
Kakao.Auth.getStatus(function(statusObj) {
	if (statusObj.status == "not_connected") {
		console.log('로그아웃 상태');
		kakaologin = false;
		//$('#tbody > tr').remove();
	} else {
		console.log('로그인 상태');	
		kakaologin = true;
	}
});
//로그인 검사기 끝


function logoutWithKakao() {
	Kakao.Auth.logout(console.log('로그아웃 되었습니다'));
};

//리스트 뿌리기
var newtr = document.getElementById("tbody");
function kakaoListInit(){
	$('#loadingBar').remove();
	if (kakaologin == true) {
//		console.log('리스트 뿌릴 준비 완료');
		Kakao.API.request({
			url: '/v1/api/story/mystories'
		}).then(function (res) {
			$('#tbody>tr').remove();
//			var resLen = res.length
//			for(j = 0; j < resLen ; j++) {
			for(var j in res) {
				var createtr = newtr.appendChild(document.createElement("TR"));
				createtr.id = "kakaolist" + j;
				var td = createtr.appendChild(document.createElement("TD")).appendChild(document.createElement("input"));
				td.type = 'checkbox';
				td.id = 'kakaocheck' + j;
				//td.className = 'testclass';

				function makeTdCont(){
					var kakaoImage;
					var type;
					var kb;
					if(res[j].media != undefined){
						kakaoImage = '<td onclick="window.open(\''+res[j].url+'\')" style="cursor:pointer"><!--a href="'+res[j].media[0]['original']+'" target="_blank"--><img src="'+res[j].media[0]['small']+'" id="image1"><!--/a--> '+res[j].content+'</td>';
						var imgUrl = res[j].media[0]['original'];
                        kakaoType = ((imgUrl.match(/img.[a-z]*/))[0]).replace(/img./,'');  
                        kb = j*(Math.floor(Math.random()*100))+12;
					}else{								
						kakaoImage = '<td onclick="window.open(\''+res[j].url+'\')" style="cursor:pointer"><img src="../img/fileicon_etc.png" id="noimg">'+res[j].content+'</td>';
						kakaoType = '텍스트 포스트';
						kb = 0;
					}
					kakaoDate = res[j].created_at;
					$("#kakaolist"+j).append(kakaoImage
							+'<td></td>'
							+'<td>'+kakaoDate+'</td>'
							+'<td>'+kb+'KB</td>'
							+'<td>'+kakaoType+'</td>'
					);
				}
				
				makeTdCont();

			};
		}), function(err) {
			console.log(err);
		};
	}else{
		if (document.load) {
			$('.panel').append(
					'<div id="loginBar">로그인하시기 바랍니다.</div>'
			);
		}else{			
			pageLoading();
		}
	}
}
//리스트 뿌리기 끝

$("#kakaoListshow").click(function(event) {
	kakaoListInit();
	console.log(event);
});

//사진 업로드 API-
$('#kakaoPreviewClose').click(function(event) {
	document.getElementById('kakaoUpPopup').style.display ="none";
	document.location.reload();
	});

function kakaoPhotoUp() {
	Kakao.Auth.getStatus(function(statusObj) {
		if (statusObj.status == "not_connected") {
			alert('업로드 하시려면 로그인하십시오.');
		} else {
			document.getElementById('file-input-wrapper').style.display = "block";
			document.getElementById('file-input').onchange = function (event) {
				// API를 호출합니다.
				Kakao.API.request({
					url: '/v1/api/story/upload/multi',
					files: event.target.files					
					//content:'default 게시글입니다'
				}).then(function (res) {
					// 이전 API 호출이 성공한 경우 다음 API를 호출합니다.
					return Kakao.API.request({
						url: '/v1/api/story/post/photo',
						data: {
							image_url_list: res
						}
					});
				}).then(function (res) {
					return Kakao.API.request({
						url: '/v1/api/story/mystory',
						data: { id: res.id }
					});
				}).then(function (res) {
					//document.getElementById('post-result').innerHTML = JSON.stringify(res);
					document.getElementById('kakaoUpPopup').style.display = "block";
					document.getElementById('post-image').src = res.media[0].original;
				}, function(err) {
					console.log(JSON.stringify(err));
				});
			};
		}
	});
};
//사진 업로드 API 끝

function pageLoading(){
	$('#loadingBar').remove();
	$('.panel').append(
			'<div id="loadingBar">페이지를 로딩중입니다. 잠시 후 다시 시도해  주시기 바랍니다.</div>'
	);
	setTimeout('killLoader()', 2000);
}


function killLoader(){
	//$('#loadingBar').animate({opacity: "0"}, 2000);
	$('#loadingBar')$('#loadingBar').animate({opacity: "0"}, 2000);
	/*for (var op = 1; op > 0; op=op-0.01) {
		$('#loadingBar').css('opacity',op);	
		//$('#loginBar').style.opacity=op;		
	}*/
	$('#loadingBar').remove();
}

