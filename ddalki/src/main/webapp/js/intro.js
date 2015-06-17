$("#loginbtn").mouseover(function(){
	  this.src="./img/intro_login_on.jpg";
});
 $("#loginbtn").mouseout(function(){
	 this.src="./img/intro_login.jpg";
});
 $("#joinbtn").mouseover(function(){
	    this.src="./img/intro_join_on.jpg";
});
$("#joinbtn").mouseout(function(){
	   this.src="./img/intro_join.jpg";
});
$("#findidbtn").mouseover(function(){
    this.src="./img/intro_idfind_on.jpg";
});
$("#findidbtn").mouseout(function(){
   this.src="./img/intro_idfind.jpg";
});
$("#pwdfind").mouseover(function(){
    this.src="./img/intro_pwfind_on.jpg";
});
$("#pwdfind").mouseout(function(){
   this.src="./img/intro_pwfind.jpg";
});
$("#canclebtn").mouseover(function(){
	  this.src="./img/join_cancel_on.jpg";
});
$("#canclebtn").mouseout(function(){
	 this.src="./img/join_cancel.jpg";
});
$("#enterbtn").mouseover(function(){
	    this.src="./img/join_join_on.jpg";
});
$("#enterbtn").mouseout(function(){
	   this.src="./img/join_join.jpg";
});




var btn = document.getElementById('loginbtn');
var joinbtn = document.getElementById('joinbtn');

joinbtn.onclick = function(event) {
	tojoinform();
}

function tojoinform() {
	$('div.join').css('display', 'inline-block');
	$('div.login').css('display', 'none');
}

function tomainform() {
	$('div.join').css('display', 'none');
	$('div.login').css('display', 'inline-block');
}

function gomain() {
	location.href = './ddalki-main/mainTable.html';
}


var face = function(){
move('#facebook')
.to(-400, -150)
.duration('0.5s')
.then()
    .set('opacity', 1)
    .duration('1s')
    .then()
      .to(Math.random() * 80, Math.random() *  -40)
      .duration('12s')
      .then()
        .to(Math.random() * -40, Math.random() * 80)
        .duration('11s')
        .then()
          .to(Math.random() * -40, Math.random() * -40)
          .duration('9s')
          .pop()
        .pop()
      .pop()
    .pop()
.end();

move('#icloud')
.to(400, -150)
.duration('0.5s')
.then()
    .set('opacity', 1)
    .duration('1s')
    .then()
      .to(Math.random() * -70, Math.random() * 100)
      .duration('13s')
      .then()
        .to(Math.random() * -70, Math.random() * -50)
        .duration('10s')
        .then()
          .to(Math.random() * 100, Math.random() *  -50)
          .duration('8s')
          .pop()
        .pop()
      .pop()
    .pop()
.end();

move('#ndrive')
.to(130, -240)
.duration('0.5s')
.then()
    .set('opacity', 1)
    .duration('1s')
    .then()
      .to(Math.random() * 40, Math.random() *  -70)
      .duration('13s')
      .then()
        .to(Math.random() * -80, Math.random() * 60)
        .duration('13s')
        .then()
          .to(Math.random() * 40, Math.random() * 30)
          .duration('13s')
          .pop()
        .pop()
      .pop()
    .pop()
.end();

move('#dropbox')
.to(-500, 20)
.duration('0.5s')
.then()
    .set('opacity', 1)
    .duration('1s')
    .then()
      .to(Math.random() * -70, Math.random() *  -30)
      .duration('10s')
      .then()
        .to(Math.random() * 90, Math.random() * 90)
        .duration('13s')
        .then()
          .to(Math.random() * -30, Math.random() * -80)
          .duration('9s')
          .pop()
        .pop()
      .pop()
    .pop()
.end();

move('#ucloud')
.to(-150, -240)
.duration('0.5s')
.then()
    .set('opacity', 1)
    .duration('1s')
    .then()
      .to(Math.random() * -40, Math.random() *  70)
      .duration('8s')
      .then()
        .to(Math.random() * -30, Math.random() * 20)
        .duration('10s')
        .then()
          .to(Math.random() * 70, Math.random() * -90)
          .duration('12s')
          .pop()
        .pop()
      .pop()
    .pop()
.end();

move('#onedrive')
.to(500, 20)
.duration('0.5s')
.then()
    .set('opacity', 1)
    .duration('1s')
    .then()
      .to(Math.random() * 50, Math.random() *  50)
      .duration('11s')
      .then()
        .to(Math.random() * -40, Math.random() * -80)
        .duration('9s')
        .then()
          .to(Math.random() * -20, Math.random() * 30)
          .duration('13s')
          .pop()
        .pop()
      .pop()
    .pop()
.end();

}

face();

btn.onclick = function(event) {
	$.ajax('http://' + ip + directoryLocation + '/login.do', {
	    method: 'POST',
	    dataType: 'json',
	    data: {
	    	loginemail: $('#loginemail').val(),
	    	loginpwd: $('#loginpwd').val()
	    },
	    success: function(result) {
	    	if (result.idcheck == "yes") {
	    		
	    		console.log(result.data);
	    		console.log(result.data.pwd);
	    		console.log(result.data.email);
	    		
	    		alert(result.data.name + '님 환영합니다.');
	    		
	    		move.select = function(selector){
	    		      return $(selector).get(0);
	    		    };
	    		    

	    		    move('#facebook')
	    		      .x(0)
	    		      .scale(.3)
	    		      .duration(1000)
	    		      .set('opacity', 0)
	    		      .delay(400)
	    		      .end();
	    		    
	    		    move('#icloud')
	    		      .x(0)
	    		      .scale(.3)
	    		      .set('opacity', 0)
	    		      .duration(1000)
	    		      .delay(400)
	    		      .end();

	    		    move('#ndrive')
	    		      .x(0)
	    		      .scale(.3)
	    		      .set('opacity', 0)
	    		      .duration(1200)
	    		      .delay(400)
	    		      .end();
	    		    
	    		    move('#dropbox')
	    		    .x(0)
	    		    .scale(.3)
	    		    .set('opacity', 0)
	    		    .duration(1200)
	    		    .delay(400)
	    		    .end();
	    		    
	    		    move('#ucloud')
	    		    .x(0)
	    		    .scale(.3)
	    		    .set('opacity', 0)
	    		    .duration(1200)
	    		    .delay(400)
	    		    .end();
	    		    
	    		    move('#onedrive')
	    		    .x(0)
	    		    .scale(.3)
	    		    .set('opacity', 0)
	    		    .duration(1200)
	    		    .delay(400)
	    		    .end();
	    		    
	    		    move('#header')
	    		    .translate(10, 400)
	    		    .scale(.3)
	    		    .set('opacity', 0)
	    		    .duration(1200)
	    		    .delay(400)
	    		    .end();
	    		    
	    		    move('#button')
	    		    .translate(10, -200)
	    		    .scale(.3)
	    		    .rotate(-360)
	    		    .set('opacity', 0)
	    		    .duration(1200)
	    		    .delay(400)
	    		    .end();
	    		    
	    		    move('#footer')
	    		    .translate(10, -400)
	    		    .scale(.3)
	    		    .set('opacity', 0)
	    		    .duration(1200)
	    		    .delay(400)
	    		    .end();
	    		    
	    		    move('#center')
	    		    .scale(20)
	    		    .duration(1500)
	    		    .set('opacity', 0)
	    		    .delay(1500)
	    		    .scale(.002)
	    		    .end();
	    		    
	    		    move('#inputBox')
	    		    .translate(10, 50)
	    		    .scale(.3)
	    		    .rotate(-360)
	    		    .set('opacity', 0)
	    		    .duration(1000)
	    		    .delay(400)
	    		    .end();
	    		    
	    		    setTimeout("gomain()",2800);
	    	} else {
	    		alert("아이디와 비밀번호가 일치하지 않습니다.")
	    	}
	    	console.log(result.idcheck);
	    },
	    error: function(xhr, textStatus, errorThrown) {
	      alert('작업을 완료할 수 없습니다.\n' + 
	          '잠시 후 다시 시도하세요.\n' +
	          '계속 창이 뜬다면, 관리자에 문의하세요.(사내번호:3)');
	    }
	  });
    
};

$('#findidbtn').click(function(event) {
	  document.getElementById('popupLayer').style.display="inline-block";
	});
$('#closepop').click(function(event) {
	document.getElementById('popupLayer').style.display="none";
});

$('#pwdfind').click(function(event) {
	  document.getElementById('popupLayer2').style.display="inline-block";
	});
$('#closepop2').click(function(event) {
	document.getElementById('popupLayer2').style.display="none";
});

$('#idfind').click(function(event) {
  $.ajax('http://' + ip + directoryLocation + '/idfind.do', {
    method: 'POST',
    dataType: 'json',
    data: {
      name: $('#findname').val(),
      tel: $('#findtel').val()
    },
    success: function(result) {
       if (result.idfind == null) {
        document.getElementById('foundid').innerHTML =
                '찾으시는 이메일이 존재하지 않습니다.';
      } else {
      document.getElementById('foundid').innerHTML =
            '요청하신 이메일은 ' + result.idfind + ' 입니다.';
      } 
    },
    error: function(xhr, textStatus, errorThrown) {
      alert('자걱.\n' + 
          '잠시 후 다시 시도하세요.\n' +
      '계속 창이 뜬다면, 관리자에 문의하세요.(사내번호:1112)');
    }
  });
});

$('#findpw').click(function() {
	var random = Math.floor( (Math.random() * (1000000 - 10000 + 1)) + 10000 );
	var email = $('#findemail').val();
	console.log(random);
  $.ajax({
	  type: 'POST',
	  url: 'https://mandrillapp.com/api/1.0/messages/send.json',
	  data: {
	    key : 'WRa1tdxZVCZI6b94cA_pGQ',
	    message: {
	      from_email: 'ujbj84@gmail.com',
	      to: [
	          {
	            email: $('#findemail').val(),
	            name: 'hello',
	            type: 'to'
	          }
	        ],
	      autotext: 'true',
	      subject: 'DDalki',
	      html: '<a href="http://192.168.103.65:9999/ddalki/cloud/mypwdupdate.do?email=' + email + '&allowcode=' + random + '">클릭하시면 변경페이지로 이동합니다.</a>'
	      //html: '<form action="http://192.168.103.65:9999/ddalki/cloud/mypwdupdate.do" method="POST" name="pwdupdate"><input type="hidden" value="' + $('#loginemail').val() + '" name ="email"><br><button>변경하러가기</button></form>'
	    }
	  }
	 }).done(function(response) {
	   console.log(response); 
	 });
	 
  $.ajax('http://' + ip + directoryLocation + '/allowcode.do', {
    method: 'POST',
    dataType: 'json',
    data: {
      email: $('#findemail').val(),
      allowcode: random
    }
  });
});
