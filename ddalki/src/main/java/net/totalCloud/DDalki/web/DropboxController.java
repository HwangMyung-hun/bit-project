package net.totalCloud.DDalki.web;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.Locale;

import javax.servlet.http.HttpServletResponse;

import net.totalCloud.DDalki.dao.CloudDao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.dropbox.core.DbxAppInfo;
import com.dropbox.core.DbxClient;
import com.dropbox.core.DbxEntry;
import com.dropbox.core.DbxException;
import com.dropbox.core.DbxRequestConfig;
import com.dropbox.core.DbxWebAuthNoRedirect;
import com.dropbox.core.DbxWriteMode;
import com.google.gson.Gson;

@Controller
@RequestMapping("/cloud")
public class DropboxController {
  
  @Autowired
  CloudDao cloudDao;

  @RequestMapping("/getDbxFolder")
  public ResponseEntity<String> getDropboxFolder() {
    HashMap<String, Object> dropObj = new HashMap<String, Object>();
    HttpHeaders headers = null;
    try {
      final String APP_KEY = "qzns5zfu3vczlxu";
      final String APP_SECRET = "001cd8v786u6d8v";

      DbxAppInfo appInfo = new DbxAppInfo(APP_KEY, APP_SECRET);

      DbxRequestConfig config = new DbxRequestConfig("AppTest112", Locale
          .getDefault().toString());

      DbxClient client = new DbxClient(config,
          "w5XObf1AiAoAAAAAAAAGU5yAaeDRgHvwbRXA75Yel7SmkJfwjf7kS_bpZ3DXpDH8");

      new DbxWebAuthNoRedirect(config, appInfo);

      DbxEntry.WithChildren listing = client.getMetadataWithChildren("/");

      System.out.println("Files in the root path:");

      System.out.println(listing);

      ArrayList<String> folderList = new ArrayList<String>();
      ArrayList<String> fileList = new ArrayList<String>();
      ArrayList<String> detailList = new ArrayList<String>();

      for (DbxEntry child : listing.children) {
        if (child.isFolder() == true) {
          int i = 0;
          folderList.add(i, child.name);
          i++;
        }
      }

      for (DbxEntry child : listing.children) {
        if (child.isFile() == true) {
          int i = 0;
          fileList.add(i, child.name);
          i++;
        }
      }

      for (DbxEntry child : listing.children) {
        if (child.isFile() == true) {
          int i = 0;
          detailList.add(i, child.toString());
          i++;
        }
      }

      for (DbxEntry child : listing.children) {
        if (child.isFile() == true) {
          int i = 0;
          detailList.add(i, child.toString());
          i++;
        }
        System.out.println(detailList);
      }

      dropObj.put("status", "success");
      dropObj.put("folderData", folderList);
      dropObj.put("fileData", fileList);
      dropObj.put("detailData", detailList);

      headers = new HttpHeaders();
      headers.add("Content-Type", "text/plain;charset=UTF-8");
      headers.add("Access-Control-Allow-Origin", "*");

    } catch (Exception e) {
      e.printStackTrace();
    }

    System.out.println("-------------");
    return new ResponseEntity<String>(new Gson().toJson(dropObj), headers,
        HttpStatus.OK);
  }


      LinkedList<FileMeta> files = new LinkedList<FileMeta>();
      FileMeta fileMeta = null;
      @RequestMapping(value="/dbxUpload", method = RequestMethod.POST)
      public @ResponseBody LinkedList<FileMeta> upload(MultipartHttpServletRequest request, HttpServletResponse response) throws IOException {
   
       
        
          //1. build an iterator
           Iterator<String> itr =  request.getFileNames();
           MultipartFile mpf = null;
   
           //2. get each file
           while(itr.hasNext()){
   
               //2.1 get next MultipartFile
               mpf = request.getFile(itr.next()); 
               System.out.println(mpf.getOriginalFilename() +" uploaded! "+files.size());
   
               //2.2 if files > 10 remove the first from the list
               if(files.size() >= 10)
                   files.pop();
   
               //2.3 create new fileMeta
               fileMeta = new FileMeta();
               fileMeta.setFileName(mpf.getOriginalFilename());
               fileMeta.setFileSize(mpf.getSize()/1024+" Kb");
               fileMeta.setFileType(mpf.getContentType());
               
               
   
               try {
                 
                 fileMeta.setBytes(mpf.getBytes());
                 
                   // copy file to local disk (make sure the path "e.g. D:/temp/files" exists)            
                   FileCopyUtils.copy(mpf.getBytes(), new FileOutputStream("/Users/chan/bit/workspace/ddalki/src/main/webapp/upload/"+mpf.getOriginalFilename()));
   
              } catch (IOException e) {
                  // TODO Auto-generated catch block
                  e.printStackTrace();
              }
               //2.4 add to files
               files.add(fileMeta);
           }
          // result will be like this
          // [{"fileName":"app_engine-85x77.png","fileSize":"8 Kb","fileType":"image/png"},...]
           
           
           DbxRequestConfig config = new DbxRequestConfig("AppTest112", Locale
           .getDefault().toString());
     
         DbxClient client = new DbxClient(config,
           "w5XObf1AiAoAAAAAAAAGcVezrk-8ryquTVQ11OV75Sd9JiFXFZ2G3ipvxuqWV1jj");
         
         System.out.println(files);
       
       File inputFile = new File("/Users/chan/bit/workspace/ddalki/src/main/webapp/upload/"+mpf.getOriginalFilename());
       System.out.println(inputFile);
       System.out.println(files);
       FileInputStream fileInputStream = new FileInputStream(inputFile);
       try {
        DbxEntry.File uploadedFile = client.uploadFile("/" + mpf.getOriginalFilename(),
             DbxWriteMode.add(), inputFile.length(), fileInputStream);
        System.out.println(uploadedFile);
      } catch (DbxException e) {
        e.printStackTrace();
      } 
          return files;
      }
          
      
      @RequestMapping("/dbxDownload")
      public void DbxDown() {
        
        
        try {
          System.out.println();
          DbxRequestConfig config = new DbxRequestConfig("AppTest112",
              Locale.getDefault().toString());

          DbxClient client = new DbxClient(config,
              "w5XObf1AiAoAAAAAAAAGcVezrk-8ryquTVQ11OV75Sd9JiFXFZ2G3ipvxuqWV1jj");

          FileOutputStream outputStream = new FileOutputStream(
              "working-draft.txt");

          DbxEntry.File downloadedFile = client.getFile("/working-draft.txt",
              null, outputStream);


        } catch (Exception e) {
          e.printStackTrace();
        }
        
      }
  
}
