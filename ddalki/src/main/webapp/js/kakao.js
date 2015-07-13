// 사용할 앱의 Javascript 키를 설정해 주세요.
Kakao.init('da71339ba6568c0984f01908db866f23');
var kakaologin = false;

function loginWithKakao() {
	// 로그인 창을 띄웁니다.
	Kakao.Auth.login({
		success : function(authObj) {
			console.log('로그인 성공' + JSON.stringify(authObj));
			document.location.reload();
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
	if (kakaologin == true) {
		console.log('리스트 뿌릴 준비 완료');
		Kakao.API.request({
			url: '/v1/api/story/mystories'
		}).then(function (res) {
			//console.log(res.0.media_type);
			$('#tbody>tr').remove();
			for(j = 0; j < 17 ; j++) {
			//console.log(res[j][content]);
			//console.log("asdfadf"+ res[0]["id"])
/*			for(var i in res) {
				console.log(res[i]);
				for(var j in res[i]) {
					console.log("res["+i+"]["+j+"] : " + res[i][j])
				}*/
				
				
				var createtr = newtr.appendChild(document.createElement("TR"));
				createtr.id = "kakaolist" + j;

				//var td = createtr.appendChild(document.createElement("TD")).innerHTML="추가내용";
				var td = createtr.appendChild(document.createElement("TD")).appendChild(document.createElement("input"));
				td.type = 'checkbox';
				td.id = 'kakaocheck' + j;
				//td.className = 'testclass';

				var td1 = createtr.appendChild(document.createElement("TD"));
				var td2 = createtr.appendChild(document.createElement("TD"));
				var td3 = createtr.appendChild(document.createElement("TD"));
				var td4 = createtr.appendChild(document.createElement("TD"));
				var td5 = createtr.appendChild(document.createElement("TD"));
				
				td1.innerHTML = res[j].content;
//				td1.appendChild(document.createElement("img"));
//				td1.img.src=res[j].media.small;
				//console.log("이미지 주소"+res[j].media.original);
				td2.innerHTML = ' ';
				td3.innerHTML = res[j].created_at;
				td4.innerHTML = res[j].original;
				td5.innerHTML = res[j].media_type;
				
				/*var view = new Image();
			//view.src = response.meta.images.image[j].thumbnailUrl;
			view.src = res;
			td1.innerHTML = res.;
			img1 = td1.appendChild(view);
			img1.id = "image1";*/
			};
		}), function(err) {
			console.log(err);
		};
	}else{
		alert("로그인하시기 바랍니다.")
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
					console.log(JSON.stringify(res));
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


$(function(){
	kakaoListInit()
});