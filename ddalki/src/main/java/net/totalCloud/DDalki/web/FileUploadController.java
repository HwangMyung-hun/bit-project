package net.totalCloud.DDalki.web;

import java.io.File;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;

/* 실습 목표: 파일 업로드 처리 */

@Controller
@RequestMapping("/cloud")
public class FileUploadController {
  @Autowired
  ServletContext ctx;
  
  @RequestMapping("/fileUpload")
  public String fileUpload(
      MultipartFile fbfile,
      Model model) throws Exception {
    
    // 업로드 파일의 이름을 생성한다.
    String filename = fbfile.getOriginalFilename();
    
    model.addAttribute("file", filename);
    
    fbfile.transferTo(new File(ctx.getRealPath("/upload") + "/" + filename));
    
    return "cloud/FileUpload";
  }
  
}










