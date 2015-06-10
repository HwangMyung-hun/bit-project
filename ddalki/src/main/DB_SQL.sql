-- 회원정보2
DROP TABLE userInfo;

-- 클라우드계정
DROP TABLE cloudinfo;

-- 회원정보2
CREATE TABLE userInfo (
  email VARCHAR(40)  NOT NULL, 
  pwd   VARCHAR(255) NOT NULL, 
  name  VARCHAR(50)  NULL,     
  tel   VARCHAR(30)  NULL      
);

-- 회원정보2 기본키
CREATE UNIQUE INDEX PK_userInfo
  ON userInfo ( 
    email ASC 
  );

-- 회원정보2
ALTER TABLE userInfo
  ADD
    CONSTRAINT PK_userInfo 
    PRIMARY KEY (
      email 
    );

-- 회원정보2
COMMENT ON TABLE userInfo IS '회원정보2';

-- 이메일
COMMENT ON COLUMN userInfo.email IS '이메일';

-- 비밀번호
COMMENT ON COLUMN userInfo.pwd IS '비밀번호';

-- 이름
COMMENT ON COLUMN userInfo.name IS '이름';

-- 전화번호
COMMENT ON COLUMN userInfo.tel IS '전화번호';

-- 회원정보2 기본키
COMMENT ON INDEX PK_userInfo IS '회원정보2 기본키';

-- 회원정보2 기본키
COMMENT ON CONSTRAINT userInfo.PK_userInfo IS '회원정보2 기본키';

-- 클라우드계정
CREATE TABLE cloudinfo (
  email     VARCHAR(40)  NOT NULL, 
  cloudtype VARCHAR(50)  NOT NULL, 
  cloudid   VARCHAR(40)  NOT NULL, 
  token     VARCHAR(255) NULL,     
  active    VARCHAR(1)   NULL      
);

-- 클라우드계정 기본키
CREATE UNIQUE INDEX PK_cloudinfo
  ON cloudinfo ( 
    email     ASC, 
    cloudtype ASC, 
    cloudid   ASC  
  );

-- 클라우드계정
ALTER TABLE cloudinfo
  ADD
    CONSTRAINT PK_cloudinfo 
    PRIMARY KEY (
      email,     
      cloudtype, 
      cloudid    
    );

-- 클라우드계정
COMMENT ON TABLE cloudinfo IS '클라우드계정';

-- 이메일
COMMENT ON COLUMN cloudinfo.email IS '이메일';

-- 클라우드종류
COMMENT ON COLUMN cloudinfo.cloudtype IS '클라우드종류';

-- 아이디
COMMENT ON COLUMN cloudinfo.cloudid IS '아이디';

-- 토큰
COMMENT ON COLUMN cloudinfo.token IS '토큰';

-- 활성화
COMMENT ON COLUMN cloudinfo.active IS '활성화';

-- 클라우드계정 기본키
COMMENT ON INDEX PK_cloudinfo IS '클라우드계정 기본키';

-- 클라우드계정 기본키
COMMENT ON CONSTRAINT cloudinfo.PK_cloudinfo IS '클라우드계정 기본키';

-- 클라우드계정
ALTER TABLE cloudinfo
  ADD
    CONSTRAINT FK_userInfo_TO_cloudinfo 
    FOREIGN KEY (
      email 
    )
    REFERENCES userInfo ( 
      email 
    );

-- 회원정보 -> 클라우드계정
COMMENT ON CONSTRAINT cloudinfo.FK_userInfo_TO_cloudinfo IS '회원정보 -> 클라우드계정';