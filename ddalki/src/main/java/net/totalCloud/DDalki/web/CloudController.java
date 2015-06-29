package net.totalCloud.DDalki.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Locale;

import net.totalCloud.DDalki.dao.CloudDao;
import net.totalCloud.DDalki.domain.CloudVo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.dropbox.core.DbxAppInfo;
import com.dropbox.core.DbxClient;
import com.dropbox.core.DbxEntry;
import com.dropbox.core.DbxRequestConfig;
import com.dropbox.core.DbxWebAuthNoRedirect;
import com.google.gson.Gson;

@Controller
@RequestMapping("/cloud")
public class CloudController {
  
  @Autowired
  CloudDao cloudDao;
  
  @RequestMapping("/addcloud")
  public Object add(CloudVo cloud) throws Exception {
    System.out.println(cloud.getCloudid());
    System.out.println(cloud.getEmail());
    System.out.println(cloud.getToken());
    cloudDao.insert(cloud);
    HashMap<String,Object> responseData = new HashMap<String,Object>();
    responseData.put("status", "success");
    
    return responseData;
  }
  
  @RequestMapping("/active")
  public Object idfind(String email) throws Exception{
    
    HashMap<String,Object> sqlParams = new HashMap<String,Object>();
    sqlParams.put("email", email);
    sqlParams.put("active", "Y");
    
    HashMap<String,Object> responseData = new HashMap<String,Object>();
    responseData.put("status", "success");
    responseData.put("idfind", cloudDao.activefind(sqlParams));
    
    return responseData;
    
  }

  @RequestMapping("/getDbxFolder")
  public ResponseEntity<String> getDropboxFolder()  {
    HashMap<String, Object> dropObj = new HashMap<String, Object>();
    HttpHeaders headers = null;
    try {
      final String APP_KEY = "qzns5zfu3vczlxu";
      final String APP_SECRET = "001cd8v786u6d8v";

      DbxAppInfo appInfo = new DbxAppInfo(APP_KEY, APP_SECRET);

      DbxRequestConfig config = new DbxRequestConfig("AppTest112",
          Locale.getDefault().toString());

      DbxClient client = new DbxClient(config,
          "w5XObf1AiAoAAAAAAAAGU5yAaeDRgHvwbRXA75Yel7SmkJfwjf7kS_bpZ3DXpDH8");

      new DbxWebAuthNoRedirect(config,
          appInfo);
      
      DbxEntry.WithChildren listing = client.getMetadataWithChildren("/");
      
//      System.out.println(listing.children.get(1));
      System.out.println("Files in the root path:");
      
      System.out.println(listing);
      new CloudVo();
      
      ArrayList<String> nameList = new ArrayList<String>();
      
      for (DbxEntry child : listing.children) {
        if (child.isFolder() == true) {
        int i = 0;
        nameList.add(i, child.name);
        i++;
        }
      }
      
      dropObj.put("status", "success");
      dropObj.put("data", nameList);

        headers = new HttpHeaders();
        headers.add("Content-Type", "text/plain;charset=UTF-8");
        headers.add("Access-Control-Allow-Origin", "*");
        
        
    } catch (Exception e) {
      e.printStackTrace();
    }
    
    System.out.println("-------------");
    return new ResponseEntity<String>(
        new Gson().toJson(dropObj),
        headers,
        HttpStatus.OK);
  }
  
  @RequestMapping("/getDbxList")
  public ResponseEntity<String> getDropboxList()  {
    HashMap<String, Object> dropObj = new HashMap<String, Object>();
    HttpHeaders headers = null;
    try {
      final String APP_KEY = "qzns5zfu3vczlxu";
      final String APP_SECRET = "001cd8v786u6d8v";

      DbxAppInfo appInfo = new DbxAppInfo(APP_KEY, APP_SECRET);

      DbxRequestConfig config = new DbxRequestConfig("AppTest112",
          Locale.getDefault().toString());

      DbxClient client = new DbxClient(config,
          "w5XObf1AiAoAAAAAAAAGU5yAaeDRgHvwbRXA75Yel7SmkJfwjf7kS_bpZ3DXpDH8");

      new DbxWebAuthNoRedirect(config,
          appInfo);
      
      DbxEntry.WithChildren listing = client.getMetadataWithChildren("/");
      
//      System.out.println(listing.children.get(1));
      System.out.println("Files in the root path:");
      
      System.out.println(listing);
      new CloudVo();
      
      ArrayList<String> nameList = new ArrayList<String>();

      for (DbxEntry child : listing.children) {
        int i = 0;
        nameList.add(i, child.name);
        i++;
      }
      
      dropObj.put("status", "success");
      dropObj.put("data", nameList);
      
      for (DbxEntry child : listing.children) {
        if (child.isFolder() == true) {
          System.out.println("  " + child.name + ": "
              + child);
        }
      }

        headers = new HttpHeaders();
        headers.add("Content-Type", "text/plain;charset=UTF-8");
        headers.add("Access-Control-Allow-Origin", "*");
        
        
    } catch (Exception e) {
      e.printStackTrace();
    }
    
    System.out.println("-------------");
    return new ResponseEntity<String>(
        new Gson().toJson(dropObj),
        headers,
        HttpStatus.OK);
  }
  
  
}
