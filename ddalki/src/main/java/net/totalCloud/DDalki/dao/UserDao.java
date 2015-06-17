package net.totalCloud.DDalki.dao;

import java.util.HashMap;

import net.totalCloud.DDalki.domain.UserVo;

public interface UserDao {

  String duplication(String user);
  
  UserVo selectOne(HashMap<String, Object> sqlParams);

  String idfind(HashMap<String, Object> sqlParams);

  void pwdUpdate(HashMap<String, Object> sqlParams);

  void insert(UserVo user);


}