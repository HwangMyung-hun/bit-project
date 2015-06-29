package net.totalCloud.DDalki;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.kt.openplatform.sdk.KTOpenApiWebHandler;

@WebServlet("/cloud/ucloudlogin.xx")
public class UcloudServlert extends HttpServlet {
 private static final Logger logger = LoggerFactory.getLogger(UcloudServlert.class);
  
  static String api_key = "B2GUAy42qP3rdJWwT8EvibBPrGLXolW8tvinrCCUvnGHi5F3q9";
  static String secret_key = "DEwi80tih3HF6OfcqyqK2InAbKeiM4qutRFaF3j1is4AuME0lU";
  
  private static final KTOpenApiWebHandler m_handler = KTOpenApiWebHandler.createHandler(api_key, secret_key);
  
  @Override
  protected void service(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {
    
    if (request.getParameter("oauth_verifier") != null) {
      //클라우드 로그인 후 
      String verifier = request.getParameter("oauth_verifier"); 
      System.out.println("검증토큰:" + verifier);
      
      response.sendRedirect("../ddalki-main/main.html");
    }
    
    HashMap<String,Object> responseData = new HashMap<String,Object>();
    responseData.put("status", "success");
    
    try {
      if(m_handler.isOAuthRequested()) {
        m_handler.retrieveAccessToken(request);
      }
      String api_id = "1.0.UCLOUD.BASIC.GETSYNCFOLDER";
      
      Map<String, ?> params = new HashMap<String, String> ();
      
      Map<String, ?> resultMap = m_handler.call(api_id, params, null, request, response, false);
      
      logger.debug("result = " + resultMap.toString());
      
      responseData.put("data", resultMap);
      System.out.println("------------------------------------");
      System.out.println(resultMap);
      
      
    } catch (Exception ex) {
      ex.getMessage();
      ex.printStackTrace();
    }
  }
}
