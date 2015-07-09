// 사용할 앱의 Javascript 키를 설정해 주세요.
Kakao.init('da71339ba6568c0984f01908db866f23');
function loginWithKakao() {
	// 로그인 창을 띄웁니다.
	Kakao.Auth.login({
		success : function(authObj) {
			//console.log('대따마');
			console.log('로그인 성공' + JSON.stringify(authObj));
		},
		fail : function(err) {
			console.log('로그인 실패' + JSON.stringify(err))
		}
	});
};

function logoutWithKakao() {
	Kakao.Auth.logout(console.log('로그아웃 되었습니다'));
};


Kakao.Auth.getStatus(function(statusObj) {
	if (statusObj.status == "not_connected") {
		console.log('로그아웃 상태');
	} else {
		console.log('로그인 상태');
		$("#kakaoListshow").click(function(event) {
			Kakao.API.request({
				url: '/v1/api/story/mystories'
			}).then(function (res) {
				console.log(res)
			}), function(err) {
				console.log(err);
			}
		});
	}
});

//사진 업로드 API
$('#kakaoPreviewClose').click(function(event) {
	document.getElementById('kakaoUpPopup').style.display ="none";
	};
);

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
