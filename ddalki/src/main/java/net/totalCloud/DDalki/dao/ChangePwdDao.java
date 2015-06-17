package net.totalCloud.DDalki.dao;

import net.totalCloud.DDalki.domain.ChangePwdVo;


public interface ChangePwdDao {

  void deletedo(String email);
  
  int allowCodeSelect(String email);

  void addition(ChangePwdVo changePwdVo);
}
