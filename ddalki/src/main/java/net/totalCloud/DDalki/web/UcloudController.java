package net.totalCloud.DDalki.web;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.stream.JsonWriter;
import com.kt.openplatform.sdk.KTOpenApiWebHandler;

@Controller
@RequestMapping("/cloud")
public class UcloudController {

  private static final Logger logger = LoggerFactory.getLogger(UcloudController.class);
  
  static String api_key = "B2GUAy42qP3rdJWwT8EvibBPrGLXolW8tvinrCCUvnGHi5F3q9";
  static String secret_key = "DEwi80tih3HF6OfcqyqK2InAbKeiM4qutRFaF3j1is4AuME0lU";
  
  private static final KTOpenApiWebHandler m_handler = KTOpenApiWebHandler.createHandler(api_key, secret_key);
  
  @RequestMapping("/ucloudlogin.do")
  public Object getuserinfo (HttpServletRequest request, HttpServletResponse response, HttpSession session) throws IOException {
    
    if (request.getParameter("oauth_verifier") != null) {
      //클라우드 로그인 후 
      String verifier = request.getParameter("oauth_verifier"); 
      System.out.println("검증토큰:" + verifier);
      
      session.setAttribute("ucloud", "ok");
      
      Cookie ucloudCookie = new Cookie("ucloud", "ok");
      ucloudCookie.setMaxAge(60 * 60 * 24 * 30);
      
      response.sendRedirect("../ddalki-main/main.html");
    }
    
    HashMap<String,Object> responseData = new HashMap<String,Object>();
    responseData.put("status", "success");
    
    try {
      if(m_handler.isOAuthRequested()) {
        m_handler.retrieveAccessToken(request);
      }
      String api_id = "1.0.UCLOUD.BASIC.GETUSERINFO";
      
      Map<String, ?> params = new HashMap<String, String> ();
      
      Map<String, ?> resultMap = m_handler.call(api_id, params, null, request, response, false);
      
      logger.debug("result = " + resultMap.toString());
      
      responseData.put("data", resultMap);
      System.out.println(resultMap);
      
   // 최소 1회 이상의 API호출 후에 
      Map <String, String> access_token = null; 
      if( m_handler.hasAccessToken() ) {
        access_token = m_handler.getAccessToken(); // access_token.get(“oauth_token”) 값과 access_token.get(“oauth_token_secret”) 값을 DB/Session에 저장 
        System.out.println("---------------------------");
        System.out.println(access_token);
        session.setAttribute("ucloudtoken", access_token);
        System.out.println("---------------------------");
      }
      if ( m_handler == null ) {
        System.out.println("APIHandler 중 오류가 발생하였습니다.");
        return null; 
      } // 앞서 DB/Session에 저장한 access_token.get(“oauth_token”) 값과 access_token.get(“oauth_token_secret”) 값을 아래 setAccessToken 메소드를 통해 저장 
      m_handler.setAccessToken(access_token.get("oauth_token"), access_token.get("oauth_token_secret")); // 위에서 설정한 Access Token이 유효하면 API 호출이 OAuth 인증 없이 제공됨 }
      
    } catch (Exception ex) {
      ex.getMessage();
      ex.printStackTrace();
    }
    
    return responseData;
  }
  
  @RequestMapping("/ucloudok")
  public Object ucloudok(HttpSession session) throws Exception{
    
    
    HashMap<String,Object> responseData = new HashMap<String,Object>();
    responseData.put("status", "success");
    System.out.println(session.getAttribute("ucloud"));
    responseData.put("ucloud", "ok");
    
    return responseData;
    
  }
  
  @RequestMapping("/ucloudfolderlist")
  public Object ucloudfolder(HttpServletRequest request, HttpServletResponse response, HttpSession session) throws Exception{
    
    HashMap<String,Object> responseData = new HashMap<String,Object>();
    responseData.put("status", "success");
    ObjectMapper mapper = new ObjectMapper();
    try {
      if(m_handler.isOAuthRequested()) {
        m_handler.retrieveAccessToken(request);
      }
      String api_id = "1.0.UCLOUD.BASIC.GETSYNCFOLDER";
      
      Map<String, ?> params = new HashMap<String, String> ();
      
      Map<String, ?> resultMap = m_handler.call(api_id, params, null, request, response, false);
      
      logger.debug("result = " + resultMap.toString());
      responseData.put("data", resultMap.get("Folders").toString());
      System.out.println(resultMap.get("Folders"));
      
    } catch (Exception ex) {
      ex.getMessage();
      ex.printStackTrace();
    }
    System.out.println("여기?");
    return responseData;
    
  }
  
}






