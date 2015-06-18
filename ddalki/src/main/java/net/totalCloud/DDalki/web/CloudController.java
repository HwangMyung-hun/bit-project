package net.totalCloud.DDalki.web;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.totalCloud.DDalki.dao.ChangePwdDao;
import net.totalCloud.DDalki.dao.CloudDao;
import net.totalCloud.DDalki.dao.UserDao;
import net.totalCloud.DDalki.domain.ChangePwdVo;
import net.totalCloud.DDalki.domain.CloudVo;
import net.totalCloud.DDalki.domain.UserVo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

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
  
}
