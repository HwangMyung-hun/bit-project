
$('#enterbtn').click(function(event) {
	if (beanBox()) {
		$.ajax('http://' + ip + directoryLocation + '/duplication.do', {
			method: 'POST',
			dataType: 'json',
			data: {
				email: $('#email').val()
			},
			success: function(result) {
				DataIntegrity(result);
			},
			error: function(xhr, textStatus, errorThrown) {
				alert('작업을 완료할 수 없습니다.\n' + 
						'잠시 후 다시 시도하세요.\n' +
				'계속 창이 뜬다면, 관리자에 문의하세요.(사내번호:1112)');
				$('#email').val("");
				$('#pwd').val("");
				$('#pwd2').val("");
			}
		});
	}
});

function passwordAble() {
	if (($('#pwd').val() === $('#pwd2').val())) {
	  return true;
	} else {
	  return false;
	}
}

function add() {
$.ajax('http://' + ip + directoryLocation + '/add.do', {
  method: 'POST',
  dataType: 'json',
  data: {
    email: $('#email').val(),
    pwd: $('#pwd').val(),
    name: $('#name').val(),
    tel: $('tel').val()
  },
  success: function(result) {
    alert('회원가입을 완료하였습니다.\n');
    $('#canclebtn').trigger('click');
    
  },
  error: function(xhr, textStatus, errorThrown) {
    alert('작업을 완료할 수 없습니다.\n' + 
        '잠시 후 다시 시도하세요.\n' +
        '계속 창이 뜬다면, 관리자에 문의하세요.(사내번호:1112)');
  }
});
}

function spellingAble() {
for (var i = 0; $('#pwd').val()[i]; i++) {
  if (('a' <= $('#pwd').val()[i] && $('#pwd').val()[i] <= 'z') 
      || ('A' <= $('#pwd').val()[i] && $('#pwd').val()[i] <= 'Z')) {}
  else {
    if ('0' <= $('#pwd').val()[i] && $('#pwd').val()[i] <= '9') {}
    else {
      if ($('#pwd').val()[i] == '!' ||  $('#pwd').val()[i] == '*'
            || $('#pwd').val()[i] == '?' || $('#pwd').val()[i] == '#'
            || $('#pwd').val()[i] == '$') {}
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
      if ($('#pwd2').val()[i] == '!' ||  $('#pwd2').val()[i] == '*'
          || $('#pwd2').val()[i] == '?' || $('#pwd2').val()[i] == '#'
          || $('#pwd2').val()[i] == '$') {}
      else {
        return false;
      }
    }
  }
}
return true;
}

function DataIntegrity(result) {
 if (result.duplication === "ok") {
     if(passwordAble()) {
       if (spellingAble()) {
         add();
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
  } else {
     alert('아이디가 유효하지 않습니다.\n'
               + '다시 입력해주세요!!\n' 
               + '(중복 아이디가 존재합니다.)');
     $('#email').val("");
  }
}

function beanBox() {
	
	if ($('#email').val() == "") {
	  alert("email을 입력하세요!!");
	  return false;
 	} else if (emailCheck()){
		alert('올바른 이메일 형식이 아닙니다.');
		return false;
	} else if ($('#pwd').val() == "") {
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

function emailCheck() {			
	for (i=0 ; i < $('#email').val().length ; i++){
		if ($('#email').val()[i] == "@") {
			break;
		} else {
			if(i == $('#email').val().length-1) {
				return true;
			}
		}
	}	
	return false;
}