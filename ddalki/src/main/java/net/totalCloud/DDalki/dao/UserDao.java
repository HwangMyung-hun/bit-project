package net.totalCloud.DDalki.dao;

import java.util.HashMap;
import java.util.Map;

import net.totalCloud.DDalki.domain.UserVo;


public interface UserDao {
  void insert(UserVo user);

  String duplication(String user);
  
  UserVo selectOne(HashMap<String, Object> sqlParams);

  String idfind(HashMap<String, Object> sqlParams);

  void pwdUpdate(HashMap<String, Object> sqlParams);
  
}
