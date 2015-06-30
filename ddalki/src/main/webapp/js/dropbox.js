var ip = 'cloud.ddalki.com:9999/ddalki';
  var directoryLocation = '/cloud';
	$.ajax('http://' + ip + directoryLocation + '/getDbxFolder.do', {
    method: 'GET',
    dataType: 'json',
    success: function(result) {
      var folderrows = result.folderData;
      var filerows = result.fileData;
      var detailrows = result.detailData;
      
      $('#dbxsidelist').click(function(event){

        var newul = document.getElementById("dbxsidelist2");
        var newLI = document.getElementById("LI");
        
        var newul2 = document.getElementById("dropboxlist");
        var newtr = document.getElementById("tbody");
        
        for (i = 0; i < folderrows.length; i++) {
          li = newul.appendChild(document.createElement("LI")).appendChild(document.createElement("a"));
          li.innerHTML = folderrows[i];
          li.id = "dbxList" + i;
               $('#tbody>tr').remove(); 
                for(j = 0; j < filerows.length ; j++) {

                  var createtr = newtr.appendChild(document.createElement("TR"));
                  createtr.id = "dbxfillist" + j;
                  
                  td1 = createtr.appendChild(document.createElement("TD"));
                  td1.type = 'checkbox';
                  
                  td2 = createtr.appendChild(document.createElement("TD"));
                  td2.innerHTML = filerows[j];
                  
                  td3 = createtr.appendChild(document.createElement("Td"));
                  
                  td4 = createtr.appendChild(document.createElement("Td"));
                  var regExp2 = /\"([\d\/:\s]*)U/;
                  var strDate2 = detailrows[j];
                  var result = strDate2.match(regExp2);
                  td4.innerHTML = result[1];
                  
                  
                  td5 = createtr.appendChild(document.createElement("Td"));
                  var regExp3 = /\"([\w\.]*)\"/;
                  var strDate3 = detailrows[j];
                  var result2 = strDate3.match(regExp3);
                  
                  td6 = createtr.appendChild(document.createElement("Td"));
                  var regExp4 = /(?!\/\w+\.)(\w+$)|(?!\/\w+\.)(\w+)(?=\?.*$)/;
                  var strDate4 = filerows[j];
                  var result3 = strDate4.match(regExp4);
                  td6.innerHTML = result3[1];
                }
              }
          
    });
      
    },
    error: function(xhr, textStatus, errorThrown) {
      alert('자걱.\n' + 
          '잠시 후 다시 시도하세요.\n' +
      '계속 창이 뜬다면, 관리자에 문의하세요.(사내번호:1112)');
    }
  });
	