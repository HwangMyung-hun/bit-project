package net.totalCloud.DDalki.web;

import java.util.HashMap;

import net.totalCloud.DDalki.dao.UserDao;
import net.totalCloud.DDalki.domain.UserVo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/ddalki")
public class UserController {
  
  @Autowired
  UserDao userDao;
  
  @RequestMapping("/add")
  public ResponseEntity<String> add(UserVo user) throws Exception {
    userDao.insert(user);
    
    HashMap<String,Object> responseData = new HashMap<String,Object>();
    responseData.put("status", "success");
    
    HttpHeaders headers = new HttpHeaders();
    headers.add("Content-Type", "text/plain;charset=UTF-8");
    headers.add("Access-Control-Allow-Origin", "*");
    
    return new ResponseEntity<String>(
                new Gson().toJson(responseData),
                headers,
                HttpStatus.OK);
  }
}
