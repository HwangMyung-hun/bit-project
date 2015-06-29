package net.totalCloud.DDalki.domain;

import java.io.Serializable;

public class CloudVo implements Serializable{
  private static final long serialVersionUID = 1L;
  
  protected String      email;
  protected String      cloudtype;  
  protected String      cloudid;
  protected String      token;
  protected String      active;
  protected String      name;
  protected String      shared;
  protected String      modifiedDate;
  protected String      size;
  protected String      type;
  
  
  public String getName() {
    return name;
  }
  public void setName(String name) {
    this.name = name;
  }
  public String getShared() {
    return shared;
  }
  public void setShared(String shared) {
    this.shared = shared;
  }
  public String getModifiedDate() {
    return modifiedDate;
  }
  public void setModifiedDate(String modifiedDate) {
    this.modifiedDate = modifiedDate;
  }
  public String getSize() {
    return size;
  }
  public void setSize(String size) {
    this.size = size;
  }
  public String getType() {
    return type;
  }
  public void setType(String type) {
    this.type = type;
  }
  public static long getSerialversionuid() {
    return serialVersionUID;
  }
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
