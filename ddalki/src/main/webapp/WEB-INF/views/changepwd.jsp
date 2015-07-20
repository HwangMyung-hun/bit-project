<%@ page language="java" 
    contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>    
<html>
<head>
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
<!-- Optional theme -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css">
<!-- Latest compiled and minified JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>ddalki 비밀번호 변경</title>
<style type="text/css">
body{width: 100%; background : url('http://www.waldegraves.co.uk/wp-content/themes/waldegraves/images/sky-bg.jpg') repeat-x;}
</style>
</head>
<body>
<a href=""><img src="http://localhost:9999/ddalki/img/top_logo.png" alt="딸기 소프트"></a>
<div style="position: absolute;left: 50%;margin-left: -260px;">
<div class="navbar navbar-default" style="width: 460px;margin: 30px">
<h3 style="margin:20px 0 0 50px" class="navbar-text"><span class="label label-default">email</span><span style="margin: 37px">${email}</span></h3><br><br>
<form class="form-horizontal" style="width: 690px;margin: 30px">
  <div class="form-group">
    <label for="inputEmail3" class="col-sm-2 control-label">비밀번호</label>
    <div class="col-sm-10"><!-- id="inputEmail3"  -->
      <input style="width: 250px" id="pwd" class="form-control" type="password" name="pwd" onkeyup="ajaxSendPWD()" class="form-control" placeholder="비밀번호">
    </div>
  </div>
  <div class="form-group">
    <label for="inputPassword3" class="col-sm-2 control-label">비밀번호 확인</label>
    <div class="col-sm-10"><!-- id="inputPassword3" -->
      <input style="width: 250px" id="pwd2" class="form-control" type="password" name="pwd2" onkeyup="ajaxSendPWD2()"  placeholder="비밀번호 확인">
    </div>
  </div>
  <div class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
      <button style="margin: 0 0 0 195px" id="enterbtn" class="btn btn-default">확인</button>
    </div>
  </div>
<div id ="results">
</div>
</form>
</div>
</div>
<input id="email" type="hidden" name="email" value="${email}">
</body>
<script
  src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.3/jquery.min.js"></script>
<script type="text/javascript" src="../js/jquery-1.11.2.js"></script>
<script type="text/javascript">
var ip = 'localhost:9999/ddalki';
var directoryLocation = '/cloud';
$('#enterbtn').click(function(event) {
  if (beanBox() && DataIntegrity()) {
    $.ajax('http://' + ip + directoryLocation + '/pwdupdate.do', {
      method: 'POST',
      dataType: 'json',
      data: {
        email: $('#email').val(),
        pwd: $('#pwd').val()
      },
      success: function(result) {
    	  alert('성공');
    	  location.href='/ddalki/';
      },
      error: function(xhr, textStatus, errorThrown) {
        alert('작업을 완료할 수 없습니다.\n' + 
            '잠시 후 다시 시도하세요.\n' +
        '계속 창이 뜬다면, 관리자에 문의하세요.(사내번호:2)');
      }
    });
  }
});
function ajaxSendPWD() {
  var pwd = $('#pwd').val();
  var reg_pwd = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&]).*$/;
  if(reg_pwd.test(pwd) === false){
     document.getElementById('results').innerHTML =
              '비밀번호 보안이 취약하여 사용할 수 없습니다.';
     document.getElementById('results').style.color="red";
  } else {
    document.getElementById('results').innerHTML =
              '사용 가능한 비밀번호 입니다.';
     document.getElementById('results').style.color="blue";
  }

}

function ajaxSendPWD2() {
  if ($('#pwd2').val() != $('#pwd').val()) {
     document.getElementById('results').innerHTML =
              '비밀번호가 서로 다릅니다.';
     document.getElementById('results').style.color="red";
  } else {
    document.getElementById('results').innerHTML =
              '일치한 비밀번호 입니다.';
     document.getElementById('results').style.color="blue";
  }

}
  

	function passwordAble() {
	  if (($('#pwd').val() === $('#pwd2').val())) {
	    return true;
	  } else {
	    return false;
	  }
	}

	function spellingAble() {
	for (var i = 0; $('#pwd').val()[i]; i++) {
	  if (('a' <= $('#pwd').val()[i] && $('#pwd').val()[i] <= 'z') 
	      || ('A' <= $('#pwd').val()[i] && $('#pwd').val()[i] <= 'Z')) {}
	  else {
	    if ('0' <= $('#pwd').val()[i] && $('#pwd').val()[i] <= '9') {}
	    else {
	      if ($('#pwd').val()[i] == '!' ||  $('#pwd').val()[i] == '@'
	            || $('#pwd').val()[i] == '$' || $('#pwd').val()[i] == '#'
	            || $('#pwd').val()[i] == '%' || $('#pwd').val()[i] == '^'
	            || $('#pwd').val()[i] == '&') {}
	      else {
	        return false;
	      }
	    }
	  }
	}
	for (var i = 0; $('#pwd2').val()[i]; i++) {
	  if ('a' <= $('#pwd2').val()[i] && $('#pwd2').val()[i] <= 'z') {}
	  else {
	    if ('0' <= $('#pwd2').val()[i] && $('#pwd2').val()[i] <= '9') {}
	    else {
	      if ($('#pwd2').val()[i] == '!' ||  $('#pwd2').val()[i] == '@'
	          || $('#pwd2').val()[i] == '$' || $('#pwd2').val()[i] == '#'
	          || $('#pwd2').val()[i] == '%' || $('#pwd2').val()[i] == '^'
	          || $('#pwd2').val()[i] == '&') {}
	      else {
	        return false;
	      }
	    }
	  }
	}
	return true;
	}

	function DataIntegrity() {
	     if(passwordAble()) {
	       if (spellingAble()) {
	    	   return true;
	       } else {
	         alert('비밀번호가 유효하지 않습니다.\n'
	                 + '다시 입력해주세요.\n'
	                 + '(허용하지 않는 단어를 포함합니다.)');
	         $('#pwd').val("");
	         $('#pwd2').val("");
	       }
	     } else {
	       if (spellingAble()) {
	         alert('비밀번호가 유효하지 않습니다.\n'
	                 + '다시 입력해주세요.\n' 
	                 + '(비번이 같지 않습니다.)');
	         $('#pwd').val("");
	         $('#pwd2').val("");
	       } else {
	         alert('비밀번호가 유효하지 않습니다.\n'
	                 + '다시 입력해주세요.\n'
	                 + '(비번이 같지 않습니다.)\n'
	                 + '(비번이 같지 않습니다.)');
	         $('#pwd').val("");
	         $('#pwd2').val("");
	       }
	     }
	     return false;
	}

	function beanBox() {
	  
    if ($('#pwd').val() == "") {
	    alert("password을 입력하세요!!");
	    return false;
	  } else if ($('#pwd2').val() == "") {
	    alert("password 중복확인을 입력하세요!!");
	    return false;
	  } else if ($('#pwd').val().length < 8) {
	    alert("비밀번호가 짧습니다.!!\n" 
	    + "(8자 이상으로 해주세요.)");
	    return false;
	  } else if ($('#pwd2').val().length < 8) {
	    alert("비밀번호 중복확인이 짧습니다.!!\n" 
	    + "(8자 이상으로 해주세요.)");
	    return false;
	  }
	  
	  return true;
	}

</script>
</html>