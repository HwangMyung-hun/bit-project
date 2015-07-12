package net.totalCloud.DDalki.web;

import java.util.HashMap;
import net.totalCloud.DDalki.dao.CloudDao;
import net.totalCloud.DDalki.domain.CloudVo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

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
    HashMap<String, Object> responseData = new HashMap<String, Object>();
    responseData.put("status", "success");

    return responseData;
  }

  @RequestMapping("/active")
  public Object activefind(String email) throws Exception {

    HashMap<String, Object> sqlParams = new HashMap<String, Object>();
    sqlParams.put("email", email);
    sqlParams.put("active", "Y");

    HashMap<String, Object> responseData = new HashMap<String, Object>();
    responseData.put("status", "success");
    responseData.put("idfind", cloudDao.activefind(sqlParams));

    return responseData;

  }

  @RequestMapping("/tcloudactive")
  public Object tcloudactivefind(String email) throws Exception {

    HashMap<String, Object> sqlParams = new HashMap<String, Object>();
    sqlParams.put("email", email);
    sqlParams.put("cloudtype", "tcloud");

    HashMap<String, Object> responseData = new HashMap<String, Object>();
    responseData.put("status", "success");
    responseData.put("tcloudactive", cloudDao.tcloudactive(sqlParams));

    return responseData;

  }
  
  @RequestMapping("/hasCloud")
  public Object hasCloud(String email, String cloudtype, String cloudid) 
		  throws Exception {

    HashMap<String, Object> sqlParams = new HashMap<String, Object>();
    sqlParams.put("email", email);
    sqlParams.put("cloudtype", cloudtype);
    sqlParams.put("cloudid", cloudid);

    HashMap<String, Object> responseData = new HashMap<String, Object>();
    if(cloudDao.alreadyExistsCloud(sqlParams) == null) {
    	cloudDao.hasCloud(sqlParams);
    	responseData.put("status", "success");
    	responseData.put("cloud", "success");
    } else {
    	responseData.put("status", "success");
    	responseData.put("cloud", "exist");
    }

    return responseData;

  }

}