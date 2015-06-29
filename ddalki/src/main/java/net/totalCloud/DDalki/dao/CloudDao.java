package net.totalCloud.DDalki.dao;

import java.util.List;
import java.util.Map;

import net.totalCloud.DDalki.domain.CloudVo;


public interface CloudDao {

  void insert(CloudVo cloud);

  
  List<CloudVo> selectList(Map<String,Object> paramMap);  
  
  int countAll(String word);
  
  CloudVo selectOne(int no);
  

}