package net.totalCloud.DDalki.domain;

import java.io.Serializable;

public class CloudVo implements Serializable{
  private static final long serialVersionUID = 1L;
  
  protected String      email;
  protected String      cloudtype;  
  protected String      cloudid;
  protected String      token;
  protected String      active;
  
  
  public String getEmail() {
    return email;
  }
  public void setEmail(String email) {
    this.email = email;
  }
  public String getCloudtype() {
    return cloudtype;
  }
  public void setCloudtype(String cloudtype) {
    this.cloudtype = cloudtype;
  }
  public String getCloudid() {
    return cloudid;
  }
  public void setCloudid(String cloudid) {
    this.cloudid = cloudid;
  }
  public String getToken() {
    return token;
  }
  public void setToken(String token) {
    this.token = token;
  }
  public String getActive() {
    return active;
  }
  public void setActive(String active) {
    this.active = active;
  }
  
  
  
  
  
}
