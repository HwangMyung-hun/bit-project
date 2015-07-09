// checkbox select all

var check = false;
function CheckAll(){
  var chk = document.getElementsByName("dbxlist");
  if(check == false){
    check = true;
    for(var i=0; i<chk.length;i++){                                                                    
      chk[i].checked = true;     //모두 체크
    }
  }else{
    check = false;
    for(var i=0; i<chk.length;i++){                                                                    
      chk[i].checked = false;     //모두 해제
    }
  }
}


// Dropbox List
  var ip = 'localhost:9999/ddalki';
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
        
        $('#dbxsidelist2>li').remove();
        for (i = 0; i < folderrows.length; i++) {
          li = newul.appendChild(document.createElement("LI")).appendChild(document.createElement("a"));
          li.innerHTML = folderrows[i];
          li.id = "dbxList";
               $('#tbody>tr').remove();
                for(j = 0; j < filerows.length ; j++) {

                  var createtr = newtr.appendChild(document.createElement("TR"));
                  createtr.id = "dbxfilelist" + j;
                  
                  td1 = createtr.appendChild(document.createElement("TD")).appendChild(document.createElement("input"));
                  td1.type = 'checkbox';
                  td1.name = 'dbxlist';
                  td1.id = 'dcheck' + j;
                  td1.value = filerows[j];
                  
                  td2 = createtr.appendChild(document.createElement("TD"));
                  td2.id = "dbxfillname" + j;
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
  
  
  
  
  // Dropbox Upload
 $(function () {
   $('#dbxUpload').fileupload({
       dataType: 'json',

       done: function (e, data) {
           $("tr:has(td)").remove();
           $.each(data.result, function (index, file) {

               $("#uploaded-files").append(
                       $('<tr/>')
                       .append($('<td/>').text(file.fileName))
                       .append($('<td/>').text(file.fileSize))
                       .append($('<td/>').text(file.fileType))
                       .append($('<td/>').html("<a href=''http://' + ip + directoryLocation + '/dbxUpload.do"+index+"'>Click</a>"))
                       )//end $("#uploaded-files").append()
           }); 
       },

       progressall: function (e, data) {
           var progress = parseInt(data.loaded / data.total * 100, 10);
           $('#progress .bar').css(
               'width',
               progress + '%'
           );
       },

   });
});
 
 
 // Dropbox Download

 $('#dbxDownload').click(function(event){
   var dbxlist = $('input[name="dbxlist"]:checked').map(function(){
     return this.value;
   }).get();
   console.log(dbxlist);
   $.ajax('http://' + ip + directoryLocation + '/dbxDownload.do', {
     type: 'POST',
     data: {
       radha: dbxlist,
     },
     success: function (msg) {
       alert(msg);
     }
   });
 });
 
 
