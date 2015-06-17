package net.totalCloud.DDalki.domain;

import java.io.Serializable;

public class ChangePwdVo implements Serializable{
  private static final long serialVersionUID = 1L;
  
  protected String      email;
  protected int         allowcode;
  
  @Override
  public String toString() {
    return "ChangePwdVo [email=" + email + ", allowcode=" + allowcode + "]";
  }
  
  public String getEmail() {
    return email;
  }
  public void setEmail(String email) {
    this.email = email;
  }
  public int getAllowcode() {
    return allowcode;
  }
  public void setAllowcode(int allowcode) {
    this.allowcode = allowcode;
  }  
  
  
}
