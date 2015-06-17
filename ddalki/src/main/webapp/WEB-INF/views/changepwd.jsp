<%@ page language="java" 
    contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>    
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
<div>
email : ${email}<br>
비밀번호 : <input id="pwd" type="password" name="pwd" onkeyup="ajaxSendPWD()"><br>
비밀번호 확인 : <input id="pwd2" type="password" name="pwd2" onkeyup="ajaxSendPWD2()"><br>
<button id="enterbtn">확인</button>
<input id="email" type="hidden" name="email" value="${email}"><br>
</div>
<div id ="results">
</div>
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