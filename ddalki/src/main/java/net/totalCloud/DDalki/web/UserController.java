package net.totalCloud.DDalki.web;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.totalCloud.DDalki.dao.ChangePwdDao;
import net.totalCloud.DDalki.dao.UserDao;
import net.totalCloud.DDalki.domain.ChangePwdVo;
import net.totalCloud.DDalki.domain.UserVo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("/ddalki")
@RequestMapping("/cloud")
public class UserController {
  
  @Autowired
  UserDao userDao;
  
  @Autowired
  ChangePwdDao changePwdDao;
  
  @RequestMapping("/add")
  public Object add(UserVo user) throws Exception {
    userDao.insert(user);
    
    HashMap<String,Object> responseData = new HashMap<String,Object>();
    responseData.put("status", "success");
    
    return responseData;
  }
  
  @RequestMapping("/duplication")
  public Object duplication(String email) throws Exception {
    HashMap<String,Object> responseData = new HashMap<String,Object>();
    responseData.put("status", "success");
    if (userDao.duplication(email) == null) {
      responseData.put("duplication", "ok");      
    } else {
      responseData.put("duplication", "no");
    }
    
    return responseData;
  }
  
  @RequestMapping(value="/login",method=RequestMethod.POST)
  public Object login(String loginemail, String loginpwd, HttpSession session, HttpServletResponse response) throws Exception{
    
    HashMap<String,Object> sqlParams = new HashMap<String,Object>();
    sqlParams.put("email", loginemail);
    sqlParams.put("pwd", loginpwd);
    
    HashMap<String,Object> responseData = new HashMap<String,Object>();
    responseData.put("status", "success");
    
    UserVo user = userDao.selectOne(sqlParams);
    
    if (user == null ) {
      responseData.put("idcheck", "no");
      session.invalidate();
    } else {
      responseData.put("idcheck", "yes");
      responseData.put("data", userDao.selectOne(sqlParams));
      session.setAttribute("user", user);
      System.out.println(((UserVo)session.getAttribute("user")).getName());
    }
    
    return responseData;
  }
  
  @RequestMapping("/idfind")
  public Object idfind(String name, String tel) throws Exception{
    
    HashMap<String,Object> sqlParams = new HashMap<String,Object>();
    sqlParams.put("name", name);
    sqlParams.put("tel", tel);
    
    HashMap<String,Object> responseData = new HashMap<String,Object>();
    responseData.put("status", "success");
    responseData.put("idfind", userDao.idfind(sqlParams));
    
    return responseData;
    
  }
  
  @RequestMapping("/pwdupdate")
  public Object pwdUpdate(String email, String pwd) throws Exception{
    
    HashMap<String,Object> sqlParams = new HashMap<String,Object>();
    sqlParams.put("email", email);
    sqlParams.put("pwd", pwd);
    userDao.pwdUpdate(sqlParams);
    
    
    HashMap<String,Object> responseData = new HashMap<String,Object>();
    responseData.put("status", "success");
    
    return responseData;
    
  }
  
  @RequestMapping("/mypwdupdate")
  public Object mypwdupdate(String email, String allowcode, HttpServletRequest request) throws Exception {
    System.out.println(changePwdDao.allowCodeSelect(email));
    if (Integer.parseInt(allowcode) == changePwdDao.allowCodeSelect(email)) {
      request.setAttribute("email", email);
      changePwdDao.deletedo(email);
      return "changepwd";
    } else {
      return "pwdMatchingFail";
    }
  }
  
  @RequestMapping("/allowcode")
  public void allowcode(String email, String allowcode) throws Exception {
    ChangePwdVo pwd = new ChangePwdVo();
    pwd.setEmail(email);
    pwd.setAllowcode(Integer.parseInt(allowcode));
    System.out.println(allowcode);
    System.out.println(email);
    changePwdDao.deletedo(email);
    changePwdDao.addition(pwd);
  }
}
