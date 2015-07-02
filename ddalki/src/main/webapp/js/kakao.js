
// 사용할 앱의 Javascript 키를 설정해 주세요.
Kakao.init('da71339ba6568c0984f01908db866f23');
function loginWithKakao() {
	// 로그인 창을 띄웁니다.
	Kakao.Auth.login({
		success: function(authObj) {
			alert(JSON.stringify(authObj));
		},
		fail: function(err) {
			alert(JSON.stringify(err))
		}
	});	
};
