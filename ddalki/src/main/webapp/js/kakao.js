
// 사용할 앱의 Javascript 키를 설정해 주세요.
Kakao.init('da71339ba6568c0984f01908db866f23');
function loginWithKakao() {
	// 로그인 창을 띄웁니다.
	Kakao.Auth.login({
		success: function(authObj) {
			alert('로그인 성공'+JSON.stringify(authObj));
		},
		fail: function(err) {
			alert('로그인 실패'+JSON.stringify(err))
		}
	});	
};
function logoutWithKakao() {
	Kakao.Auth.logout(alert('로그아웃 되었습니다'));
}