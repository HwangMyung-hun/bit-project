package net.totalCloud.DDalki.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.totalCloud.DDalki.domain.CloudVo;


public interface CloudDao {

  void insert(CloudVo cloud);


  List<CloudVo> activefind(HashMap<String, Object> sqlParams);

  
  List<CloudVo> selectList(Map<String,Object> paramMap);  
  
  int countAll(String word);
  
  CloudVo selectOne(int no);

  String tcloudactive(HashMap<String, Object> sqlParams);

  void hasCloud(HashMap<String, Object> sqlParams);

  Object alreadyExistsCloud(HashMap<String, Object> sqlParams);
  

}